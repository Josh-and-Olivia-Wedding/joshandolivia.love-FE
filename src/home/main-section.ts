import { IDotCss, dot } from "dothtml";
import PageSection from "./page-section";
import mainImage from "../assets/images/main-image.jpg";
import EVENT_DETAILS from "../event-details";
import DateWidget from "./date-widget";

const CURSIVE_FONT = "Script MT, Segoe script, Rage, Lucida Handwriting, cursive, Satisfy";

const WEDDING_DATE = EVENT_DETAILS.date;

function countdownToDate(targetDate = WEDDING_DATE): string {
    const now = new Date();
    const timeDifference = ((targetDate as any) - (now as any)) as number;
    
    // Convert difference in milliseconds to days
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(hours / (24));
    
    return days > 0 ? `${days} DAYS` : ((days == 0 && hours >= 0) ? `${hours % 24} HOURS` : null);
}

export default class MainSection extends PageSection{

	props = {
		countdown: countdownToDate()
	}

	builder(){

		// Extracting and formatting the date and time from WEDDING_DATE
		const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		const timeOptions = { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
		

		return super.builder(
			dot.div(
				dot.div().class("wedding-bg")
				.div(
					dot.h1("Josh and Olivia").ref("names")
					// .p("Special Day").ref("specialDay")
					.p("Thank you for joining us!.").class("subheading")
					.br()
					.br()
					.div(
						dot.span(()=>this.props.countdown).ref("countdown")
					).id("countdown")
					.br()
					.br()
					.div(new DateWidget())
				).class("overlay")
			).class("section-container")
		);
	}

	style(css: IDotCss){
		super.style(css);
		css(".section-container")
			// .position("absolute")
			.position("relative")
			.height(1000)
			.widthP(100)
			.overflow("hidden")
			// .zIndex();

		css(".wedding-bg")
			.widthP(100)
			.height(1000)
			// .height("auto")
			.position("absolute")
			.topP(50)
			.backgroundImage(mainImage as any)
			.backgroundPosition("50% 50%")
			.backgroundRepeat("no-repeat")
			.backgroundSize("cover")
			.transform(t => t.translateYP(-50));
		
		css(".overlay")
			.position("absolute")
			.top(0)
			.left(0)
			.right(0)
			.bottom(0)
			.backgroundColor(0,0,0,0.6)
			.padding(20)
			.display("flex")
			.flexDirection("column")
			.alignItems("center")
			.justifyContent("center")
			.textAlign("center")
			// .backdropFilter(f => f.blur(3))
			.transition("opacity 2s ease-in-out")
			.opacity(0);

		setTimeout(()=>{
			css(".overlay").opacity(1);
		}, 1000);

		css(".subheading")
			.color("white")
			.fontWeight("300")
			.fontFamily(CURSIVE_FONT)
			.fontSizeEm(1.3)

		css(".wedding-date")
			.color("white")
			.marginTop(15)
			.fontWeight("bold")
			.fontSizeEm(2)

		css(this.$refs.countdown)
			.color(100,100,255)
			.fontFamily("consolas")
			.marginTop(15)
			.marginBottom(15)
			.marginLeft(0)
			.marginRight(0)
			.fontSizeEm(5);

		css(this.$refs.names)
			.fontSizeEm(8)
			.color("#EB3")
			// .background("linear-gradient(45deg, #000000, #221100, #000000)")
			.padding(20)
			.borderRadius(30)
			// .backdropFilter(f => f.blur(2))
			// .background("#000")
			.backgroundClip("text")
			.opacity(0.6)
			.margin(0)
			.fontFamily("faradila")
			.textShadow("2px 2px 2px rgba(0, 0, 0, 0.5)")
	}

	resize(){
		// // let contentPanel = this.$refs.container;
		// if (window.innerWidth <= 768) {
		// 	this.props.sizeMode = SIZE_MODE.MOBILE;
		// } else {
		// 	this.props.sizeMode = SIZE_MODE.DESKTOP;
		// }

		// this.mainSection.resize();
	}

	ready(){
		setInterval(()=>{
			this.props.countdown = countdownToDate();
		}, 1000*60)
	}
}