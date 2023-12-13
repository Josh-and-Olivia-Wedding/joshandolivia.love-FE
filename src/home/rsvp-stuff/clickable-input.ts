import { DotComponent, IDotCss, IDotElement, dot } from "dothtml";


export default class ClickableInput extends DotComponent{

	props = {
		showInput: false,
		value: ""
	}

	events: { [key: string]: (...params: any[]) => void; } = {
		save: (value: string)=>{}
	};

	onClick(){
		this.props.showInput = true;
		(this.$refs.input as HTMLInputElement).value = this.props.value || "";
		this.$refs.input.focus();
	}
	onKeyDown(e: KeyboardEvent){
		// TODO: cancel if escape. 
		// Save if enter.

		if(e.code == "Enter"){
			this.saveAndClose();
		}
		else if(e.code == "Escape"){
			this.cancel();
		}
	}

	saveAndClose(){
		this.props.showInput = false;
		this.props.value = (this.$refs.input as HTMLInputElement).value;
		this.events.save(this.props.value);
	}
	cancel(){
		this.props.showInput = false;
	}

	builder(defaultValue: string): IDotElement {
		this.props.value = defaultValue;

		return dot.div(
			dot.input()
				.class({
					"input": true,
					hidden: ()=>!this.props.showInput
				})
				.onKeyDown((e)=>this.onKeyDown(e))
				.onBlur(()=>this.saveAndClose())
				.ref("input") // ref doesn't work!
			.div(()=>this.props.value).class({
				"clickable-label": true,
				hidden: ()=>this.props.showInput
			}).onClick(()=>this.onClick())
		).class("container")
	}

	style(css: IDotCss): void {
		css(".container")
			.padding(10)

		css(".input")
			.height(16)
			.display("block")
			.widthP(100)
			.backgroundColor(0,0,0,0.5)
			.cursor("pointer")
			.color("white")
			.padding(4)

		css(".clickable-label")
			.height(16)
			// .widthP(100)
			.backgroundColor(0,0,0,0.5)
			.cursor("pointer")
			.color("white")
			.padding(4)

		css(".hidden")
			.display("none")
	}
}