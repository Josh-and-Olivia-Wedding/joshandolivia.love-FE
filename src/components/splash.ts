import { DotComponent, IDotCss, IDotElement, dot } from "dothtml";
import App from "../home/app";


export default class Splash extends DotComponent{
	builder(...args: any[]): IDotElement {
		return dot.div(
			dot.div(
				dot.p("Welcome to the website for Joshua and Olivia's upcoming wedding. Please note the wedding date and location have not yet been selected. This landing page is a technical preview.").class("welcome-text")
				.button("Continue").class("continue-button").onClick(()=>this.continue())
			).class("splash-content")
		).class("splash");
	}

	style(css: IDotCss): void {
		css(".splash")
			.position("fixed")
			.top(0)
			.left(0)
			.right(0)
			.bottom(0)
			.color("white")
			.display("flex")
			.alignItems("center")
			.justifyContent("center")
			.backgroundColor(0,0,0,0.7)
			.zIndex(5)
			.backdropFilter(f => f.blur(2))

		css(".splash-content")
			.textAlign("center")
			.maxWidthP(80)
			.padding(20)

		// css(".welcome-text")
		// 	.fontSizeEm(2)
		// 	.margin(20)
		// 	.lineHeight(2)

		// css(".continue-button")
		// 	.backgroundColor(255,255,0)
		// 	.color("black")
		// 	.paddingTop(15)
		// 	.paddingBottom(15)
		// 	.paddingLeft(30)
		// 	.paddingRight(30)
		// 	.fontSizeEm(1.2)
		// 	.border("3px solid rgba(255,255,255,0.5)")
		// 	.cursor("pointer")
		// 	.transition("all 0.3s ease")
	}

	continue(){
		this.$el.parentElement.removeChild(this.$el);

		dot("body")
			.h(new App());
	}
}