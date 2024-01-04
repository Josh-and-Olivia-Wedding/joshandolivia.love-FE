import { DotComponent, IDotCss, IDotElement, dot } from "dothtml";
import YesNoSelect from "./yes-no-select";
import { Guest } from "./guest";
import language from "./language";
import ClickableInput from "./clickable-input";


export default class RsvpOptions extends DotComponent{

	guest: Guest = null;

	props: { [key: string]: any; } = {
		lang: "en",//localStorage.getItem("lang") || "en",
		attending: true,
		turnoverSelected: true,
		skewerSelected: false,
		peppersSelected: false,
		showSaveTxt: false,
	};

	events = {
		"update": (guest: Guest)=>{}
	}

	rsvpButton: YesNoSelect;
	alcoholButton: YesNoSelect;
	dietaryRestrictions: ClickableInput;
	phoneField: any;
	isLocked: boolean;

	constructor(guest: Guest, isLocked: boolean){
		super(guest);

		dot.bus.on("language", (lang)=>{
			this.props.lang = lang;
		});

		this.isLocked = isLocked;
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

		dot.css(this.$refs.savedTxt)
			.opacity(1)
			.transition("opacity 0.02s ease")
		
		setTimeout(()=>{
			dot.css(this.$refs.savedTxt)
				.opacity(0)
				.transition("opacity 2s ease")
			// this.props.showSaveTxt = false;

		}, 1000);
	}

	updateDietaryRestrictions(value: string){
		this.guest.DietaryRestrictions = value;
		this.save();
	}
	updatePhoneNumber(value: string){
		this.guest.Phone = value;
		this.save();
	}
	updateAlcohol(value: boolean){
		this.guest.DrinksAlcohol = value;
		this.save();
	}

	chooseTurnover(){
		if(this.isLocked) return;
		this.props.turnoverSelected = true;
		this.props.skewerSelected = false;
		this.props.peppersSelected = false;
		this.guest.MealMainSelectionId = "turnover";
		this.save();
	}

	chooseSkewer(){
		if(this.isLocked) return;
		this.props.turnoverSelected = false;
		this.props.skewerSelected = true;
		this.props.peppersSelected = false;
		this.guest.MealMainSelectionId = "skewer";
		this.save();
	}

	choosePeppers(){
		if(this.isLocked) return;
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

		let attending = this.guest.RsvpStatus == "CONFIRMED";
		// this.props.attending = this.guest.RsvpStatus == "CONFIRMED";
		this.rsvpButton = new YesNoSelect(attending, this.isLocked);

		this.guest.MealMainSelectionId = this.guest.MealMainSelectionId || "turnover";

		this.props.turnoverSelected = this.guest.MealMainSelectionId == "turnover";
		this.props.skewerSelected = this.guest.MealMainSelectionId == "skewer";
		this.props.peppersSelected = this.guest.MealMainSelectionId == "peppers";

		this.rsvpButton.on("change", (value)=>{
			if(this.isLocked) return;
			// this.props.attending = value;
			attending = value;
			// if(value){
			// 	// this.$updateStyles();
			// }

			this.$refs.isAttending.style.display = value ? "block" : "none";
			this.$refs.isNotAttending.style.display = !value ? "block" : "none";

			this.guest.RsvpStatus = value ? "CONFIRMED" : "DECLINED";

			this.save();
		});

		this.alcoholButton = new YesNoSelect(true, this.isLocked);
		this.dietaryRestrictions = new ClickableInput(this.guest.DietaryRestrictions, this.isLocked);
		this.dietaryRestrictions.on("save", (value)=>{
			this.updateDietaryRestrictions(value);
		});

		// this.phoneField = new ClickableInput(this.guest.Phone);
		// this.phoneField.on("save", (value)=>{this.updatePhoneNumber(value);});

		return dot.div(
			dot.div(
				dot.div(this.getStr("guestHeader", [this.guest.FullName])).class("guest-name")
				.div(this.getStr("savedConfirmation")).class({
					"saved-txt": true,
					"hide": ()=>!this.props.showSaveTxt,
					"show": ()=>this.props.showSaveTxt
				}).ref("savedTxt")
				.div(this.getStr("attendingLabel"))
				.div(this.rsvpButton)
			).class("header")
			.div(

				dot.div(
					dot.div(
						dot.div(
							dot.b(this.getStr("mealSelectionHeader")).class("subheader")
							.div(
								dot.div(this.getStr("chooseMainCourse"))
								.div(
									dot.button(guest.FullName == "Luca Sideris" ? "Leafs and Twigs" : this.getStr("veggieFiloTurnoverConcise")).onClick(()=>this.chooseTurnover()).class({
										"select-meal-btn": true,
										selected: ()=>this.props.turnoverSelected
									})
									.button(guest.FullName == "Luca Sideris" ? "Cold Tofu" : this.getStr("vegetableTikkaSkewerConcise")).onClick(()=>this.chooseSkewer()).class({
										"select-meal-btn": true,
										selected: ()=>this.props.skewerSelected
									})
									.button(guest.FullName == "Luca Sideris" ? "Soylent Green Smoothie" : this.getStr("veganRiceStuffedPeppersConcise")).onClick(()=>this.choosePeppers()).class({
										"select-meal-btn": true,
										selected: ()=>this.props.peppersSelected
									})
								).class("meal-btns")
							)
						).class({"hidden2": ()=>this.guest.IsChild})
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
								"hidden2": !!this.guest.IsChild
							})
							.type("checkbox")
							.disabled(this.isLocked)
							.onChange((e)=>this.updateAlcohol((e.target as HTMLInputElement).checked))
							.ref("drinksAlcohol")
						.label(this.getStr("expectDrinkingAlcohol"))
					)
					// .b(this.getStr("contactInfoHeader")).class("subheader")
					// .div(
					// 	dot.span(this.getStr("phoneLabel"))
					// 	.br()
					// 	.h(this.phoneField)
					// )
				).ref("isAttending")

				.i(this.getStr("notAttending")).ref("isNotAttending")
				// .when(()=>!this.props.attending, ()=>{
				// })
			).class("options")
		).class("rsvp-options");
	}

	ready(){
		(this.$refs.drinksAlcohol as HTMLInputElement).checked = this.guest.DrinksAlcohol;
	}

	style(css: IDotCss): void {
		// return;
		css(".hidden2")
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
			.flexGrow(10)

		css(".saved-txt")
			.flexGrow(1)
			.color("green")
			.fontWeight("bold")

		css(".saved-txt.hide")
			.opacity(0)
			.transition("opacity 2s ease")
		css(".saved-txt.show")
			.opacity(1)
			.transition("opacity 0.02s ease")
		
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
		css(this.$refs.isAttending).display(this.guest.RsvpStatus == "CONFIRMED" ? "block" : "none");
		css(this.$refs.isNotAttending).display(this.guest.RsvpStatus != "CONFIRMED" ? "block" : "none");
	}
}