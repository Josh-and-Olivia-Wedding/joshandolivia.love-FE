import { IDotGenericElement } from "dothtml/lib/i-dot";
import PageSection from "../page-section";
import { IDotCss, dot } from "dothtml";
import RsvpOptions from "./rsvp-options";
import { Guest } from "./guest";
import language from "./language";
import inviteTemplate from "./invite-template";

import sticks from "../../assets/images/joke/sticks-and-twigs.png";
import tofu from "../../assets/images/joke/raw-tofu.png";
import soylent from "../../assets/images/joke/soylent-green.png";

type MasterGuest = Guest & {
	Plus1Data: string;
}

type ModelButton = {
	caption: string;
	value: string;
}

let isLocked = true; //window.location.search.indexOf("ADMIN=true") == -1;
let lockedExceptionEmails = [];

export default class ConfirmationPane extends PageSection{

	props: { [key: string]: any; } = {
		loadingMessage: null,
		guest: null as MasterGuest,
		err: null,
		lang: "en",//localStorage.getItem("lang") || "el",
		eventDetailsHtml: ""
	};

	plus1s: Array<Guest> = [];

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

	getRawStr(str: keyof (typeof language), args?: Array<string|number|boolean>){
		let final = language[str][this.props.lang];
		if(args){
			for(let i = 0; i < args.length; i++){
				final = final.split(`{${i}}`).join(args[i]);
			}
		}
		return final;
	}

	ready(): void {
		this.fetchGuest();
	}

	changeLang(lang){
		dot.bus.emit("language", lang);
		this.props.lang = lang;
		localStorage.setItem("lang", lang);
		this.$updateStyles();
		this.reloadEventDetailsHtml();
	}

	async showModal(message: string, buttons: Array<ModelButton>): Promise<string>{
		let removing = false;
		return new Promise<string>((resolve) => {
			dot(document.body).div(
				dot.div(
					dot.span(message)
					.br()
					.br()
					.each(buttons, b=>{
						return dot.button(b.caption).style(
							dot.css.padding(10).fontSize(30).backgroundColor("gold").cursor("pointer").margin(20)
						).onClick(()=>{ 
							if(removing) return;
							removing = true;
							// dot("#modal").style(dot.css.opacity(0));
							document.getElementById("modal").style.opacity = "0";
							setTimeout(()=>{
								document.body.removeChild(document.getElementById("modal"));
								resolve(b.value);
							},600);
						})
					})
				)
				.style(dot.css
					.position("absolute")
					.color("white")
					.leftP(50)
					.topP(50)
					.margin("auto")
					.transform(t => t.translateXP(-50).translateYP(-50))
					.minWidth(300)
					.maxWidth(800)
					.minHeight(200)
					.padding(50)
					.paddingTop(100)
					.fontSize(24)
					.backgroundColor(30,30,30,0.8)
					.borderRadius(80)
					.textAlign("center")
					.verticalAlign("middle")
					.border("5px solid gold")
				)
			).style(dot.css
				.position("fixed")
				.top(0)
				.left(0)
				.right(0)
				.bottom(0)
				.zIndex(1000)
				.backdropFilter(f=>f.blur(5).brightness(50).sepia(100))
				.opacity(1)
				.border("50px solid black")
				.transition("opacity 0.5s ease")
			).id("modal");
		});
	}

	async fetchGuest(){

		let guestId = "";
		
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const paramValue = urlParams.get("invite");

		if(paramValue){
			guestId = paramValue.split("_")[0];
		}
		else{
			let hash = window.location.hash;
			guestId = hash.split("_")[1];
		}

		if(!guestId || guestId.length == 0){
			this.props.err = "Invalid guestId.";
			return;
		}

		this.props.loadingMessage = language.loadingGuestMsg[this.props.lang];

		{
			let userLang = navigator.language || navigator["userLanguage"]; 
			userLang = (userLang||"").split('-')[0];
			if(userLang != "el" && userLang != "fr") userLang = "en";
			this.props.lang = userLang;
			localStorage.setItem("lang", this.props.lang);
		}


		try{
		
			let result = await fetch(`https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/get-invite-details?guestId=${guestId}`);
			let jsonData = await result.json();
			this.plus1s = JSON.parse(jsonData.Plus1Data) ?? [];

			if(lockedExceptionEmails.indexOf(jsonData.Email) != -1){
				isLocked = false;
			}
			
			if(!isLocked && jsonData.RsvpStatus != "CONFIRMED"){

				// If it's the first load, set the language to whatever the invite says. This is a special feature for certain guests.

				if(jsonData.Lang == "el"){
					this.props.lang = jsonData.Lang;
					localStorage.setItem("lang", jsonData.Lang);
				}

				// Set default RSVP!

				let rsvp = "DECLINED";

				if(paramValue || window.location.hash.indexOf("#invite_") == 0){
					rsvp = await this.showModal(this.getStr("inviteModalQuestion")(), [
						{caption: this.getStr("yesNoBtnYes")() as string, value: "CONFIRMED"},
						{caption: this.getStr("yesNoBtnNo")() as string, value: "DECLINED"},
					]);
				}
				else{
					rsvp = window.location.hash.indexOf("#confirm_") == 0 ? "CONFIRMED" : "DECLINED";
				}

				
				jsonData.RsvpStatus = rsvp;
				for(let i = 0; i < this.plus1s.length; i++){
					this.plus1s[i].RsvpStatus = rsvp;
				}

				await this.saveGuest(jsonData);
				this.showModal(this.getStr("rsvpConfirmation")(), [{caption: "OK", value: "ok"}]);
			}
			
			this.props.loadingMessage = "";
			this.props.guest = jsonData;
			this.$updateStyles();
			this.reloadEventDetailsHtml();
			return jsonData;
		}
		catch(e){
			console.error(e);
			this.props.loadingMessage = language.fetchGuestError[this.props.lang];
		}
	}

	async saveGuest(jsonData = this.props.guest){
		this.props.loadingMessage = language.savingRsvpMsg[this.props.lang];
		jsonData.Plus1Data = JSON.stringify(this.plus1s.map(x=>x));
		let result = await fetch(`https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/update-guest-status`, {
			method: "POST",
			body: JSON.stringify(jsonData)
		});
		this.props.loadingMessage = "";
	}

	async savePlusOne(data){
		// for(let i = 0; i < this.plus1s.length; i++){
		// 	let p1 = this.plus1s[i];
		// 	if(p1.Id == data.Id && p1.FullName == data.FullName){
		// 		console.log(p1);
		// 		break;
		// 	}
		// }

		// this.reloadEventDetailsHtml();
		await this.saveGuest();
	}

	reloadEventDetailsHtml(){
		this.props.eventDetailsHtml = inviteTemplate
			.replace("{invitationDetailsGuestName}", this.getStr("invitationDetailsGuestName", [this.props.guest.FullName])())
			.replace("{invitationDetailsAmpersand}", this.getStr("invitationDetailsAmpersand")())
			.replace("{invitationDetailsGroomNamePrefix}", this.getStr("invitationDetailsGroomNamePrefix")())
			.replace("{invitationDetailsBrideNamePrefix}", this.getStr("invitationDetailsBrideNamePrefix")())
			.replace("{invitationDetailsMessage}", this.getStr("invitationDetailsMessage")())
			.replace("{weddingDate}", this.getStr("weddingDate")())
	}

	builder(): IDotGenericElement {
		return super.builder(
			// dot.h1(this.getStr("reservationDetailsHeader"))
			dot.div(
				dot.when(()=>{
					let g = this.props.guest;
					let e = this.props.err;
					return !!(g || e);
				}, ()=>{
					if(this.props.err){
						return dot.p(this.getStr("fetchGuestError"))
					}
					else{
						// return dot.h2(this.getStr("eventInformationHeader"))
						return dot.div(
							dot.div(()=>this.props.eventDetailsHtml).class("invite-details")
							.div(
								dot.img().class("love-photo").src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/rsvp-love-img.jpg").width(400)
							).class("love-photo-container")
						).class("invite-section")

						.h2("Locked In")
						.div("Our special day is coming up in a matter of days, and reservations are now locked in. For last-minute status changes, contact the bride or groom.")
						.h2(this.getStr("rsvpHeader"))
						.div(
							dot.h(()=>{
								let options = new RsvpOptions(this.props.guest, isLocked)
								options.on("update", (guest)=>{
									this.saveGuest(guest);
								});
								return options;
							})
							.div(
								dot.h2(this.getStr("yourPlusOnesHeader"))
								.div(dot.when(!this.plus1s?.length, ()=>dot.p(this.getStr("noPlusOnesMessage"))))
							)
							.each(this.plus1s, d=>{
								let options = new RsvpOptions(d, isLocked);
								options.on("update", (guest)=>{
									this.savePlusOne(guest);
								});
								return options;
							})
						)

						.h2(this.getStr("weddingFeastMenuHeader"))
						.p(this.getStr("celebrationOfLoveFlavor"))
						.div(
								dot.ol(
									dot.li(this.getStr("appetizersTeasePalate"))
									.li(this.props.guest.FullName == "Luca Sideris" ? "Dehydrated butternut squash." : this.getStr("butternutSquashSoup"))
									.li(this.props.guest.FullName == "Luca Sideris" ? "Fresh mushrooms from the local forest." : this.getStr("mushroomPestoRigatoni"))
									.li(this.getStr("chooseYourMain"))
									.ul(
										dot.li(this.props.guest.FullName == "Luca Sideris" ? "Sticks and twigs - a staple in every vegan diet." : this.getStr("veggieFiloTurnover"))
										.li(this.props.guest.FullName == "Luca Sideris" ? "Cold Tofu - the best way to eat raw unseasoned processed soy." : this.getStr("vegetableTikkaSkewer"))
										.li(this.props.guest.FullName == "Luca Sideris" ? "Soylent Green - what is this stuff?" : this.getStr("veganRiceStuffedPeppers"))
									)
									.li(this.props.guest.FullName == "Luca Sideris" ? "A bag of organic raisins." : this.getStr("iceCreamCrepe"))
								)
						).class("ol-container").br()
						.div(
							dot.div(dot.img().src(this.props.guest.FullName == "Luca Sideris" ? sticks : "https://sideris-wedding-images.s3.us-east-2.amazonaws.com/turnover.png"))
							.div(dot.img().src(this.props.guest.FullName == "Luca Sideris" ? tofu : "https://sideris-wedding-images.s3.us-east-2.amazonaws.com/skewers.png"))
							.div(dot.img().src(this.props.guest.FullName == "Luca Sideris" ? soylent : "https://sideris-wedding-images.s3.us-east-2.amazonaws.com/peppers.png"))
						).class("food-images").br()

						.h2(this.getStr("giftsHeader"))
						.p(this.getStr("giftsMessage"))

						.h2(this.getStr("locationHeader"))
						.div(
							dot.div(
								dot.p(this.getStr("ceremonyReceptionLocation")().replace("Fantasy Farm", `<a href="https://fantasyfarm.ca" target="_blank">Fantasy Farm</a>`).replace("Ballroom", "<b>Ballroom</b>"))
							).class("ceremony-location")
							.br()
							.a(
								dot.img().src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/map.png")
							).class("map-a").hRef("https://goo.gl/maps/fDuH6GWWtvymuGDK7").target("_blank")
						)

					}

				})
				.otherwise(()=>{
					return dot.p(()=>this.props.loadingMessage)

				})
			)
		);
	}

	style(css: IDotCss): void {
		super.style(css);

		css("li")
			.marginBottom(8)
			.color("#EEE")
			// .fontWeight("bold")

		css(".invite-section")
			.display("flex")
			.gap(20)
			.position("relative")
			.alignItems("center")
			.flexWrap("wrap")
			.textAlign("center");

		css(".love-photo")
			.borderRadiusP(50)
			.border("3px solid #AA8730")
			.boxShadow("0 8px 16px rgba(0, 0, 0, 0.7)")
			.transition("transform 0.3s ease, opacity 0.3s ease")
			.filter(f=>f
				.brightness(150)
				// .contrast(120)
				// .sepia(20)
			)

		css(".love-photo-container")
			.flexGrow(1)

		css(".invite-details")
			.flexGrow(3)
			.backgroundColor("rgba(0,0,0,0.7)")
			.paddingTop(20)
			.paddingBottom(20)
			.borderRadius(20);

		css(".ceremony-location")
			.backgroundColor(70,55,0,0.7)
			.borderRadius(8)
			.padding(8)
			.color(238,187,51)

		css("a")
			.color(238, 187, 51)
			.textDecoration("underline dotted")

		css(".map-a")
			.display("block")
			.widthP(100)
			.textAlign("center")

		css(".map-a img")
			.widthP(100)
			.maxWidth(800)
			.borderRadiusP(25)
			.border("3px solid white")
			.boxShadow("0 8px 16px rgba(0, 0, 0, 0.7)")
			.filter(f => f
				// .contrast(150)
				.brightness(90)
				// .hueRotate("90deg" as any)
				// .grayscale(40)
				.sepia(100)
			)

		css(".food-images")
			.gap(5)
			.display("flex")
			.justifyContent("space-evenly")
			.flexWrap("wrap")
			
		css(".food-images div")
			.textAlign("center")
			.flexGrow(1)

		css(".food-images img")
			.width(250)
			.height(250)
			.borderRadiusP(50)
			.border("3px solid #AA8220")
			.borderColor(238,187,51)
			.boxShadow("0 8px 16px rgba(0, 0, 0, 0.7)")
	}
}