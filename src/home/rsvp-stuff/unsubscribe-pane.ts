import { IDotGenericElement } from "dothtml/lib/i-dot";
import PageSection from "../page-section";
import { IDotCss, dot } from "dothtml";


export default class UnsubscribePane extends PageSection{

	props: { [key: string]: any; } = {
		unsubbed: false
	};

	async unsub(){
		dot(this.$refs.buttons).empty().p("You will be unsubscribed from further communication. Contact the bride or the groom if this was done in error. ").a("Back to site.").hRef(window.location.href.split("#")[0]);
		this.$updateStyles();
		
		let result = await fetch(`https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/update-guest-status`, {
			method: "POST",
			body: JSON.stringify({
				guestId: window.location.hash.split("_")[1],
				unsubscribe: true
			})
		});
	}

	goBack(){
		window.location.href = window.location.href.split("#")[0];
	}

	builder(): IDotGenericElement {
		return super.builder(
			dot.h1("Unsubscribe")
			.p("Are you sure you want to unsubscribe? If you do, you won't receive further notifications. This will not affect your RSVP status.")
			.br().br()
			.div(
				dot.button("Yes, unsubscribe!").onClick(()=>this.unsub())
				.br().br()
				.button("No, take me back!").onClick(()=>this.goBack())
			).ref("buttons")
		);
	}

	style(css: IDotCss): void {
		super.style(css);

		css("button").fontSize(36).cursor("pointer");
		css("a").color("#DDF");
	}
}