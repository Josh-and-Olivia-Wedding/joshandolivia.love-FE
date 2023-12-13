import { DotComponent, IDotCss, IDotElement, dot } from "dothtml";
import YesNoSelect from "./yes-no-select";
import { Guest } from "./guest";
import language from "./language";
import ClickableInput from "./clickable-input";


export default class RsvpOptions extends DotComponent{

	guest: Guest = null;

	props: { [key: string]: any; } = {
		lang: localStorage.getItem("lang") || "en",
		attending: true,
		turnoverSelected: true,
		skewerSelected: false,
		peppersSelected: false,
	};

	events = {
		"update": (guest: Guest)=>{}
	}

	rsvpButton: YesNoSelect;
	alcoholButton: YesNoSelect;
	dietaryRestrictions: ClickableInput;

	constructor(guest: Guest){
		super(guest);

		dot.bus.on("language", (lang)=>{
			this.props.lang = lang;
		});
	}

	getStr(str: keyof (typeof language), args?: Array<string|number|boolean>){
		return ()=>{
			let final = language[str][this.props.lang];
			if(args){
				for(let i = 0; i < args.length; i++){
					final = final.split(`{${i}}`).join(args[i]);
				}
			}
			return final;
		};
	}

	save(){
		this.events.update(this.guest);
	}

	updateDietaryRestrictions(value: string){
		this.guest.DietaryRestrictions = value;
		this.save();
	}
	updateAlcohol(value: boolean){
		this.guest.DrinksAlcohol = value;
		this.save();
	}

	chooseTurnover(){
		this.props.turnoverSelected = true;
		this.props.skewerSelected = false;
		this.props.peppersSelected = false;
		this.guest.MealMainSelectionId = "turnover";
		this.save();
	}

	chooseSkewer(){
		this.props.turnoverSelected = false;
		this.props.skewerSelected = true;
		this.props.peppersSelected = false;
		this.guest.MealMainSelectionId = "skewer";
		this.save();
	}

	choosePeppers(){
		this.props.turnoverSelected = false;
		this.props.skewerSelected = false;
		this.props.peppersSelected = true;
		this.guest.MealMainSelectionId = "peppers";
		this.save();
	}

	builder(guest: Guest): IDotElement {

		this.guest = guest;
		// this.props.name = guest.Name;
		// this.props.email = guest.Email;

		this.props.attending = this.guest.RsvpStatus == "CONFIRMED";
		this.rsvpButton = new YesNoSelect(this.props.attending);

		this.guest.MealMainSelectionId = this.guest.MealMainSelectionId || "turnover";

		this.props.turnoverSelected = this.guest.MealMainSelectionId == "turnover";
		this.props.skewerSelected = this.guest.MealMainSelectionId == "skewer";
		this.props.peppersSelected = this.guest.MealMainSelectionId == "peppers";

		this.rsvpButton.on("change", (value)=>{
			this.props.attending = value;
			if(value){
				this.$updateStyles();
			}

			this.guest.RsvpStatus = value ? "CONFIRMED" : "DECLINED";

			this.save();
		});

		this.alcoholButton = new YesNoSelect(true);
		this.dietaryRestrictions = new ClickableInput(this.guest.DietaryRestrictions);
		this.dietaryRestrictions.on("save", (value)=>{this.updateDietaryRestrictions(value);});

		return dot.div(
			dot.div(
				dot.div(this.getStr("guestHeader", [this.guest.FullName])).class("guest-name")
				.div(this.getStr("attendingLabel"))
				.div(this.rsvpButton)
			).class("header")
			.div(

				dot.div(
					dot.div(
						dot.when(!this.guest.IsChild, ()=>{
							return dot.b(this.getStr("mealSelectionHeader")).class("subheader")
							.div(
								dot.div(this.getStr("chooseMainCourse"))
								.div(
									dot.button(this.getStr("veggieFiloTurnoverConcise")).onClick(()=>this.chooseTurnover()).class({
										"select-meal-btn": true,
										selected: ()=>this.props.turnoverSelected
									})
									.button(this.getStr("vegetableTikkaSkewerConcise")).onClick(()=>this.chooseSkewer()).class({
										"select-meal-btn": true,
										selected: ()=>this.props.skewerSelected
									})
									.button(this.getStr("veganRiceStuffedPeppersConcise")).onClick(()=>this.choosePeppers()).class({
										"select-meal-btn": true,
										selected: ()=>this.props.peppersSelected
									})
								).class("meal-btns")
						)})
					)
					.b(this.getStr("preferencesHeader")).class("subheader")
					.div(
						dot.span(this.getStr("allergiesDietaryRestrictions"))
						.br()
						.h(this.dietaryRestrictions)
					)
					.div(
						dot.input()
							// .value(this.guest.DrinksAlcohol)
							.class({
								"alcohol-check": true,
								"hidden": ()=> !!this.guest.IsChild
							})
							.type("checkbox")
							.onChange((e)=>this.updateAlcohol((e.target as HTMLInputElement).checked))
							.ref("drinksAlcohol")
						.label(this.getStr("expectDrinkingAlcohol"))
					)
				).class({
					"hidden": ()=>!this.props.attending
				})

				.when(()=>!this.props.attending, ()=>{
					return dot.i(this.getStr("notAttending"))
				})
			).class({
				"options": true
			})
		).class("rsvp-options");
	}

	ready(){
		(this.$refs.drinksAlcohol as HTMLInputElement).checked = this.guest.DrinksAlcohol;
	}

	style(css: IDotCss): void {
		css(".hidden")
			.display("none");

		css(".rsvp-options")
			.marginBottom(20)

		css(".header")
			.display("flex")
			.flexDirection("row")
			.padding(10)
			.backgroundColor(20,20,20,0.8)
			.borderTopLeftRadius(5)
			.borderTopRightRadius(5)
			.fontSize(20)
			
		css(".guest-name")
			.flexGrow(1)
		
		css(".options")
			.flexDirection("row")
			.padding(10)
			.backgroundColor(255,255,255,0.3)
			.borderBottomLeftRadius(5)
			.borderBottomRightRadius(5)
			.color("#111")

		css(".subheader")
			.display("block")
			.fontWeight("bold")
			.fontSize(18)
			.marginTop(10)
			.marginBottom(10)

		css(".meal-btns")
			.display("flex")
			.flexWrap("wrap")
			.gap(10)
			.justifyContent("space-evenly")
			.widthP(100)

		css(".select-meal-btn")
			.width(300)
			// .display("block")
			.margin(5)
			.padding(5)
			.marginLeft(10)
			.cursor("pointer")
			.borderRadius(5)
			.color("gold")
			.backgroundColor("#222")
			.transition("color 0.3s, background-color 0.3s ease")
			
		css(".select-meal-btn.selected")
			.color("black")
			.backgroundColor("gold")
			.fontWeight("bold")

		css(".alcohol-check")
			.marginRight(10)
			.width(16).height(16)

		css("label")
			.position("relative")
			.lineHeight(22)
			.height(22)
			.display("inline-block")
			.top(-3)
	}
}