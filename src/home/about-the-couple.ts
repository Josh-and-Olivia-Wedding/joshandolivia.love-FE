import { IDotCss, dot } from "dothtml";
import PageSection from "./page-section";

import smallImage from "../assets/images/small-pic.jpg";

export default class AboutTheCouple extends PageSection{

	props = {
		
	}

	builder(){

		return super.builder(
			dot.div(
				dot.div(
					dot.h1("About Olivia and Josh")
					.img().src(smallImage).ref("smallImage")
					// .p(["Josh and Olivia met at York University in 2011. Josh was enrolled in Computer Engineering, and Olivia",
					// 	"majored in English and Professional Writing. Josh was running a robot fighting club at the time when",
					// 	"Olivia reached out to join it.",
					// 	"<br /><br />",
					// 	"Josh happily accepted her into his club, where she took on an executive role, and the two became fast",
					// 	"friends.",
					// 	"<br /><br />",
					// 	"Over the course of two years, they became closer, and an eventual romance blossomed between the",
					// 	"two. They enjoyed shared interests, such as chess, video games, snowboarding, and, of course, robotics.",
					// 	"As the years passed, their love for one another deepened. Like a fine wine, it has improved over time",
					// 	"and continues to grow.",
					// 	"<br /><br />",
					// 	"On January 29, 2022, during a trip to Mexico, Josh and Olivia had been debating over the constellation",
					// 	"Orion when Josh decided to take their relationship to the next level and proposed marriage to Olivia.",
					// 	"After feeling like it was time—and that it was “written in the stars”—a shooting star made its way",
					// 	"through the center of the constellation Orion.",
					// 	"<br /><br />",
					// 	"With this profound blessing from the heavens, Josh got down on one knee to ask Olivia to be his bride.",
					// 	"Although there was no ring involved (as the proposal was not planned), the token of affection could not",
					// 	"have been sweeter: a Ferrero Rocher chocolate.",
					// 	"<br /><br />",
					// 	"With great joy, Olivia accepted his proposal, and the two invite you to join them in this wonderful",
					// 	"celebration of their love."].join(" "))
					// .hr()
					.p(["In the hallowed halls of York University, where dreams were woven from the threads of ambition,",
						"two souls converged in an unexpected alliance. Josh, a Computer Engineering virtuoso with a passion",
						"for mechanical combat, led a band of robot fighting enthusiasts. Olivia, an ethereal spirit majoring",
						"in English and Professional Writing, was captivated by the sparks of creativity she found there.",
						"<br /><br />",
						"A mysterious connection drew Olivia to the arena of metal and code, and she reached out to join the ranks.",
						"With a welcoming smile, Josh ushered her into his world, and she quickly found her place within the club.",
						"From the fusion of gears and prose, a camaraderie was born, and they were entwined as fast friends.",
						"<br /><br />",
						"In the dance of life, their connection evolved, flourishing into a romance that blossomed with shared passions",
						"- chess, video games, snowboarding, and, above all, robotics. Their love was a vintage blend, maturing and",
						"deepening like a rich wine.",
						"<br /><br />",
						"Upon the 29th of January, 2022, on a beautiful starry night in Mexico's warm embarce, amid a playful debate about the constellation",
						"Orion, Josh sensed a moment ripe to take a lover's chance to send their relationship to the next level.",
						"\"It's written in the stars,\" he mused. And as he spoke, a shooting star flew accross the sky and through the belt of Orion.",
						"A profound blessing from the heavans. And with the cosmos bearing witness he got down on one knee.",
						"No ring in hand (as the proposal was not planned), yet love's intent most clearly burned, A Ferrero Rocher,",
						"a token rich in meaning, though in gold unweighed.",
						"A question was asked, a universe held its breath, and with joyous cry, Olivia accepted.",
						"<br /><br />",
						"Now, they invite you to be a witness to a celebration like no other, a testament to a love born from friendship and nurtured through",
						"shared dreams. Join them in toasting to a love \"written in the stars,\" a love that transcends ordinary bounds,",
						"a love that is their eternal promise."].join(" "))
				).class("overlay")
			).ref("container").class("section-container")
		);
	}

	style(css: IDotCss){
		super.style(css);

		css(".section-container")
			// .height(500)
			.widthP(100);
		
		css(".overlay")
			// .position("absolute")
			// .top(0)
			// .left(0)
			// .right(0)
			// .bottom(0)
			// .display("flex")
			// .flexDirection("column")
			// .alignItems("center")
			// .justifyContent("center")
			// .textAlign("center")
			// .zIndex(2)
			.backgroundColor(0,0,0,0.3)
			.padding(20)
			// .backdropFilter(f => f.blur(3));
		
		css(".overlay h1")
			.fontSizeEm(2.5)
			.color("white")
			.margin(0);

		css(this.$refs.smallImage)
			.width(200)
			.height(200)
			.borderRadius(100)
			.float("right")
	}
}