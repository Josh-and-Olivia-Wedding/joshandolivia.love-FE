import { DotComponent, IDotCss, IDotElement, dot } from "dothtml";
import language from "./language";


export default class YesNoSelect extends DotComponent{

	props: { [key: string]: any; } = {
		selected: false,
		lang: localStorage.getItem("lang") || "en",
	};

	events: { [key: string]: (...params: any[]) => void; } = {
		"change": ()=>{}
	}

	constructor(defaultValue: boolean){
		super(defaultValue);

		dot.bus.on("language", (lang)=>{
			this.props.lang = lang;
		});
	}

	getStr(str: keyof (typeof language)){
		return ()=>language[str][this.props.lang];
	}

	change(){
		this.props.selected = !this.props.selected;

		this.events.change(this.props.selected);
	}

	builder(defaultValue: boolean): IDotElement {
		this.props.selected = defaultValue;
		return dot.div(
			dot.div(()=>this.props.selected ? this.getStr("yesNoBtnYes") : this.getStr("yesNoBtnNo")).class({"inner-btn": true, yes: ()=>this.props.selected, no: ()=>!this.props.selected})
		).class("yes-no-btn").onClick(()=>{this.change()})
	}

	style(css: IDotCss): void {
		css(".yes-no-btn")
			.position("relative")
			.borderRadius(5)
			.padding(3)
			.fontSize(14)
			.marginLeft(10)
			.width(40)
			.border("1px solid white")
			.cursor("pointer")
			.textAlign("center")

		css(".inner-btn")
			.transition("background-color 0.5s")

		css(".yes")
			.backgroundColor("green")

		css(".no")
			.backgroundColor("#444")
	}
}