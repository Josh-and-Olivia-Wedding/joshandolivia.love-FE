import { DotComponent, IDotCss, dot } from "dothtml";

export default class PageSection extends DotComponent{

	builder(content){
		return dot.div(content).class("page-section")
	}

	style(css: IDotCss){
		css(".page-section")
			.position("relative")
			.widthP(100)
			.overflow("hidden")
			// .border("5px solid red");
	}
}
