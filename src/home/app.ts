import { DotComponent, IDotCss, dot } from "dothtml";
import MainSection from "./main-section";
import StaryBg from "../components/stary-bg";
import RsvpSection from "./rsvp-section";
import AboutTheCouple from "./about-the-couple";
import UnsubscribePane from "./rsvp-stuff/unsubscribe-pane";
import ConfirmationPane from "./rsvp-stuff/confirmation-pane";

enum SIZE_MODE {
	DESKTOP,
	MOBILE
}

export default class App extends DotComponent{
	props = {
		sizeMode: SIZE_MODE.DESKTOP as SIZE_MODE
	}
	mainSection: MainSection;

	builder(){
		this.mainSection = new MainSection();
		this.resize();

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const paramValue = urlParams.get("invite");
		
		return dot.div(

			dot.when((!!paramValue) || window.location.hash.startsWith("#confirm_") || window.location.hash.startsWith("#invite_") || window.location.hash.startsWith("#decline_"), ()=>{
				return new ConfirmationPane();
			})
			.otherwiseWhen(window.location.hash.startsWith("#unsubscribe_"), ()=>{
				return new UnsubscribePane();
			})
			.otherwise(()=>{
				return dot.h(this.mainSection)
					.h(new RsvpSection())
					.h(new AboutTheCouple());
			})

		).ref("container")
		.class({
			"mobile-content": ()=> this.props.sizeMode == SIZE_MODE.MOBILE,
			"desktop-content": ()=> this.props.sizeMode == SIZE_MODE.DESKTOP
		})
	}

	style(css: IDotCss){

		css(this.$refs.container)
			.position("relative")
			.backgroundColor(70,55,0,0.6)
			// .backgroundColor(200,170,50,0.6)
			.borderRadius(10)
			.marginTop(0)
			.marginBottom(0)
			.marginLeft("auto")
			.marginRight("auto")
			.padding(30)
			.widthP(70)
			.maxWidth(1200)
			.zIndex(2)
			.backdropFilter(f => f.blur(3));
			// .opacity()

		css(".mobile-content")
			.widthP(100)
			.padding(0)
			.paddingTop(15)
			// .marginLeft(-15)
			// .marginRight(-15)
	}

	resize(){
		// let contentPanel = this.$refs.container;
		if (window.innerWidth <= 768) {
			this.props.sizeMode = SIZE_MODE.MOBILE;
		} else {
			this.props.sizeMode = SIZE_MODE.DESKTOP;
		}

		this.mainSection.resize();
	}

	ready(): void {
		window.addEventListener("resize", ()=>this.resize());
	}
}