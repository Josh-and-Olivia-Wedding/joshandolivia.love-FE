"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_home_rsvp-stuff_c"],{

/***/ "./src/home/rsvp-stuff/clickable-input.ts":
/*!************************************************!*\
  !*** ./src/home/rsvp-stuff/clickable-input.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
class ClickableInput extends dothtml_1.DotComponent {
    constructor() {
        super(...arguments);
        this.props = {
            showInput: false,
            value: ""
        };
        this.events = {
            save: (value) => { }
        };
        this.isLocked = false;
    }
    onClick() {
        console.log(this.isLocked);
        if (this.isLocked)
            return;
        this.props.showInput = true;
        this.$refs.input.value = this.props.value || "";
        this.$refs.input.focus();
    }
    onKeyDown(e) {
        // TODO: cancel if escape. 
        // Save if enter.
        if (e.code == "Enter") {
            this.saveAndClose();
        }
        else if (e.code == "Escape") {
            this.cancel();
        }
    }
    saveAndClose() {
        if (this.props.showInput) {
            this.props.showInput = false;
            this.props.value = this.$refs.input.value;
            this.events.save(this.props.value);
        }
    }
    cancel() {
        this.props.showInput = false;
    }
    builder(defaultValue, isLocked) {
        this.props.value = defaultValue;
        this.isLocked = isLocked;
        console.log("LOCKED?", isLocked);
        return dothtml_1.dot.div(dothtml_1.dot.input()
            .class({
            "input": true,
            hidden: () => !this.props.showInput
        })
            .onKeyDown((e) => this.onKeyDown(e))
            .onBlur(() => this.saveAndClose())
            .ref("input") // ref doesn't work!
            .div(() => this.props.value).class({
            "clickable-label": true,
            hidden: () => this.props.showInput
        }).onClick(() => this.onClick())).class("container");
    }
    style(css) {
        css(".container")
            .padding(10);
        css(".input")
            .height(16)
            .display("block")
            .widthP(100)
            .backgroundColor(0, 0, 0, 0.5)
            .cursor("pointer")
            .color("white")
            .padding(4);
        css(".clickable-label")
            .height(16)
            // .widthP(100)
            .backgroundColor(0, 0, 0, 0.5)
            .cursor("pointer")
            .color("white")
            .padding(4);
        css(".hidden")
            .display("none");
    }
}
exports["default"] = ClickableInput;


/***/ }),

/***/ "./src/home/rsvp-stuff/confirmation-pane.ts":
/*!**************************************************!*\
  !*** ./src/home/rsvp-stuff/confirmation-pane.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const page_section_1 = __importDefault(__webpack_require__(/*! ../page-section */ "./src/home/page-section.ts"));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const rsvp_options_1 = __importDefault(__webpack_require__(/*! ./rsvp-options */ "./src/home/rsvp-stuff/rsvp-options.ts"));
const language_1 = __importDefault(__webpack_require__(/*! ./language */ "./src/home/rsvp-stuff/language.ts"));
const invite_template_1 = __importDefault(__webpack_require__(/*! ./invite-template */ "./src/home/rsvp-stuff/invite-template.ts"));
let isLocked = window.location.search.indexOf("ADMIN=true") == -1;
class ConfirmationPane extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {
            loadingMessage: null,
            guest: null,
            err: null,
            lang: "en",
            eventDetailsHtml: ""
        };
        this.plus1s = [];
    }
    getStr(str, args) {
        return () => {
            let final = language_1.default[str][this.props.lang];
            if (args) {
                for (let i = 0; i < args.length; i++) {
                    final = final.split(`{${i}}`).join(args[i]);
                }
            }
            return final;
        };
    }
    getRawStr(str, args) {
        let final = language_1.default[str][this.props.lang];
        if (args) {
            for (let i = 0; i < args.length; i++) {
                final = final.split(`{${i}}`).join(args[i]);
            }
        }
        return final;
    }
    ready() {
        this.fetchGuest();
    }
    changeLang(lang) {
        dothtml_1.dot.bus.emit("language", lang);
        this.props.lang = lang;
        localStorage.setItem("lang", lang);
        this.$updateStyles();
        this.reloadEventDetailsHtml();
    }
    async showModal(message, buttons) {
        let removing = false;
        return new Promise((resolve) => {
            (0, dothtml_1.dot)(document.body).div(dothtml_1.dot.div(dothtml_1.dot.span(message)
                .br()
                .br()
                .each(buttons, b => {
                return dothtml_1.dot.button(b.caption).style(dothtml_1.dot.css.padding(10).fontSize(30).backgroundColor("gold").cursor("pointer").margin(20)).onClick(() => {
                    if (removing)
                        return;
                    removing = true;
                    // dot("#modal").style(dot.css.opacity(0));
                    document.getElementById("modal").style.opacity = "0";
                    setTimeout(() => {
                        document.body.removeChild(document.getElementById("modal"));
                        resolve(b.value);
                    }, 600);
                });
            }))
                .style(dothtml_1.dot.css
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
                .backgroundColor(30, 30, 30, 0.8)
                .borderRadius(80)
                .textAlign("center")
                .verticalAlign("middle")
                .border("5px solid gold"))).style(dothtml_1.dot.css
                .position("fixed")
                .top(0)
                .left(0)
                .right(0)
                .bottom(0)
                .zIndex(1000)
                .backdropFilter(f => f.blur(5).brightness(50).sepia(100))
                .opacity(1)
                .border("50px solid black")
                .transition("opacity 0.5s ease")).id("modal");
        });
    }
    async fetchGuest() {
        let guestId = "";
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const paramValue = urlParams.get("invite");
        if (paramValue) {
            guestId = paramValue.split("_")[0];
        }
        else {
            let hash = window.location.hash;
            guestId = hash.split("_")[1];
        }
        if (!guestId || guestId.length == 0) {
            this.props.err = "Invalid guestId.";
            return;
        }
        this.props.loadingMessage = language_1.default.loadingGuestMsg[this.props.lang];
        {
            let userLang = navigator.language || navigator["userLanguage"];
            userLang = (userLang || "").split('-')[0];
            if (userLang != "el" && userLang != "fr")
                userLang = "en";
            this.props.lang = userLang;
            localStorage.setItem("lang", this.props.lang);
        }
        try {
            let result = await fetch(`https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/get-invite-details?guestId=${guestId}`);
            let jsonData = await result.json();
            this.plus1s = JSON.parse(jsonData.Plus1Data) ?? [];
            if (!isLocked && jsonData.RsvpStatus != "CONFIRMED") {
                // If it's the first load, set the language to whatever the invite says. This is a special feature for certain guests.
                if (jsonData.Lang == "el") {
                    this.props.lang = jsonData.Lang;
                    localStorage.setItem("lang", jsonData.Lang);
                }
                // Set default RSVP!
                let rsvp = "DECLINED";
                if (paramValue || window.location.hash.indexOf("#invite_") == 0) {
                    rsvp = await this.showModal(this.getStr("inviteModalQuestion")(), [
                        { caption: this.getStr("yesNoBtnYes")(), value: "CONFIRMED" },
                        { caption: this.getStr("yesNoBtnNo")(), value: "DECLINED" },
                    ]);
                }
                else {
                    rsvp = window.location.hash.indexOf("#confirm_") == 0 ? "CONFIRMED" : "DECLINED";
                }
                jsonData.RsvpStatus = rsvp;
                for (let i = 0; i < this.plus1s.length; i++) {
                    this.plus1s[i].RsvpStatus = rsvp;
                }
                await this.saveGuest(jsonData);
                this.showModal(this.getStr("rsvpConfirmation")(), [{ caption: "OK", value: "ok" }]);
            }
            this.props.loadingMessage = "";
            this.props.guest = jsonData;
            this.$updateStyles();
            this.reloadEventDetailsHtml();
            return jsonData;
        }
        catch (e) {
            console.error(e);
            this.props.loadingMessage = language_1.default.fetchGuestError[this.props.lang];
        }
    }
    async saveGuest(jsonData = this.props.guest) {
        this.props.loadingMessage = language_1.default.savingRsvpMsg[this.props.lang];
        jsonData.Plus1Data = JSON.stringify(this.plus1s.map(x => x));
        let result = await fetch(`https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/update-guest-status`, {
            method: "POST",
            body: JSON.stringify(jsonData)
        });
        this.props.loadingMessage = "";
    }
    async savePlusOne(data) {
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
    reloadEventDetailsHtml() {
        this.props.eventDetailsHtml = invite_template_1.default
            .replace("{invitationDetailsGuestName}", this.getStr("invitationDetailsGuestName", [this.props.guest.FullName])())
            .replace("{invitationDetailsAmpersand}", this.getStr("invitationDetailsAmpersand")())
            .replace("{invitationDetailsGroomNamePrefix}", this.getStr("invitationDetailsGroomNamePrefix")())
            .replace("{invitationDetailsBrideNamePrefix}", this.getStr("invitationDetailsBrideNamePrefix")())
            .replace("{invitationDetailsMessage}", this.getStr("invitationDetailsMessage")())
            .replace("{weddingDate}", this.getStr("weddingDate")());
    }
    builder() {
        return super.builder(
        // dot.h1(this.getStr("reservationDetailsHeader"))
        dothtml_1.dot.div(dothtml_1.dot.when(() => {
            let g = this.props.guest;
            let e = this.props.err;
            return !!(g || e);
        }, () => {
            if (this.props.err) {
                return dothtml_1.dot.p(this.getStr("fetchGuestError"));
            }
            else {
                // return dot.h2(this.getStr("eventInformationHeader"))
                return dothtml_1.dot.div(dothtml_1.dot.div(() => this.props.eventDetailsHtml).class("invite-details")
                    .div(dothtml_1.dot.img().class("love-photo").src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/rsvp-love-img.jpg").width(400)).class("love-photo-container")).class("invite-section")
                    .h2("Locked In")
                    .div("Our special day is coming up in a matter of days, and reservations are now locked in. For last-minute status changes, contact the bride or groom.")
                    .h2(this.getStr("rsvpHeader"))
                    .div(dothtml_1.dot.h(() => {
                    let options = new rsvp_options_1.default(this.props.guest, isLocked);
                    options.on("update", (guest) => {
                        this.saveGuest(guest);
                    });
                    return options;
                })
                    .div(dothtml_1.dot.h2(this.getStr("yourPlusOnesHeader"))
                    .div(dothtml_1.dot.when(!this.plus1s?.length, () => dothtml_1.dot.p(this.getStr("noPlusOnesMessage")))))
                    .each(this.plus1s, d => {
                    let options = new rsvp_options_1.default(d, isLocked);
                    options.on("update", (guest) => {
                        this.savePlusOne(guest);
                    });
                    return options;
                }))
                    .h2(this.getStr("weddingFeastMenuHeader"))
                    .p(this.getStr("celebrationOfLoveFlavor"))
                    .div(dothtml_1.dot.ol(dothtml_1.dot.li(this.getStr("appetizersTeasePalate"))
                    .li(this.getStr("butternutSquashSoup"))
                    .li(this.getStr("mushroomPestoRigatoni"))
                    .li(this.getStr("chooseYourMain"))
                    .ul(dothtml_1.dot.li(this.getStr("veggieFiloTurnover"))
                    .li(this.getStr("vegetableTikkaSkewer"))
                    .li(this.getStr("veganRiceStuffedPeppers")))
                    .li(this.getStr("iceCreamCrepe")))).class("ol-container").br()
                    .div(dothtml_1.dot.div(dothtml_1.dot.img().src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/turnover.png"))
                    .div(dothtml_1.dot.img().src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/skewers.png"))
                    .div(dothtml_1.dot.img().src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/peppers.png"))).class("food-images").br()
                    .h2(this.getStr("giftsHeader"))
                    .p(this.getStr("giftsMessage"))
                    .h2(this.getStr("locationHeader"))
                    .div(dothtml_1.dot.div(dothtml_1.dot.p(this.getStr("ceremonyReceptionLocation")().replace("Fantasy Farm", `<a href="https://fantasyfarm.ca" target="_blank">Fantasy Farm</a>`).replace("Ballroom", "<b>Ballroom</b>"))).class("ceremony-location")
                    .br()
                    .a(dothtml_1.dot.img().src("https://sideris-wedding-images.s3.us-east-2.amazonaws.com/map.png")).class("map-a").hRef("https://goo.gl/maps/fDuH6GWWtvymuGDK7").target("_blank"));
            }
        })
            .otherwise(() => {
            return dothtml_1.dot.p(() => this.props.loadingMessage);
        })));
    }
    style(css) {
        super.style(css);
        css("li")
            .marginBottom(8)
            .color("#EEE");
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
            .filter(f => f
            .brightness(150)
        // .contrast(120)
        // .sepia(20)
        );
        css(".love-photo-container")
            .flexGrow(1);
        css(".invite-details")
            .flexGrow(3)
            .backgroundColor("rgba(0,0,0,0.7)")
            .paddingTop(20)
            .paddingBottom(20)
            .borderRadius(20);
        css(".ceremony-location")
            .backgroundColor(70, 55, 0, 0.7)
            .borderRadius(8)
            .padding(8)
            .color(238, 187, 51);
        css("a")
            .color(238, 187, 51)
            .textDecoration("underline dotted");
        css(".map-a")
            .display("block")
            .widthP(100)
            .textAlign("center");
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
            .sepia(100));
        css(".food-images")
            .gap(5)
            .display("flex")
            .justifyContent("space-evenly")
            .flexWrap("wrap");
        css(".food-images div")
            .textAlign("center")
            .flexGrow(1);
        css(".food-images img")
            .width(250)
            .height(250)
            .borderRadiusP(50)
            .border("3px solid #AA8220")
            .borderColor(238, 187, 51)
            .boxShadow("0 8px 16px rgba(0, 0, 0, 0.7)");
    }
}
exports["default"] = ConfirmationPane;


/***/ }),

/***/ "./src/home/rsvp-stuff/invite-template.ts":
/*!************************************************!*\
  !*** ./src/home/rsvp-stuff/invite-template.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = `
	<p style="font-size:20px; color: rgb(170, 170, 170); text-align: center; font-family: &quot;Script MT&quot;, &quot;Segoe script&quot;, Rage, &quot;Lucida Handwriting&quot;, cursive, Satisfy;">{invitationDetailsGuestName}</p>
	<h2 style="font-family: &quot;Script MT&quot;, &quot;Segoe script&quot;, Rage, &quot;Lucida Handwriting&quot;, cursive, Satisfy; font-size: 32px; color: rgb(255, 255, 255); margin-bottom: 20px; text-align: center; line-height: 24px;"><span style="font-size: 18px;">{invitationDetailsGroomNamePrefix}</span><span style="font-size: 52px;">J</span>oshua<br><span style="font-size: 18px;">{invitationDetailsAmpersand}</span><br><span style="font-size: 18px;">{invitationDetailsBrideNamePrefix}</span><span style="font-size: 52px;">O</span>livia</h2>
	<p style="font-size:20px; color: rgb(170, 170, 170); text-align: center; font-family: &quot;Script MT&quot;, &quot;Segoe script&quot;, Rage, &quot;Lucida Handwriting&quot;, cursive, Satisfy;">{invitationDetailsMessage}</p>
	<table style="width: auto; margin: 0px auto; border-collapse: collapse; text-align: center;">
		<tr>
			<td x-apple-data-detectors="false" style="border-right: 3px solid rgb(238, 187, 51); padding: 16px; color: rgb(221, 221, 221); font-size: 24px;">3:45</td>
			<td x-apple-data-detectors="false" style="border-right: 3px solid rgb(238, 187, 51); padding: 16px; color: rgb(238, 238, 238); font-size: 42px;">{weddingDate}</td>
			<td x-apple-data-detectors="false" style="padding: 16px; color: rgb(221, 221, 221); font-size: 24px;">2024</td>
		</tr>
	</table>
	<div style="text-align: center; margin: 20px auto; font-size: 28px; color:rgb(238,187,51);">TORONTO</div>
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfaG9tZV9yc3ZwLXN0dWZmX2MuNDFkYTExMWNhM2FhYWY2Yjg0MzkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw4RkFBa0U7QUFHbEUsTUFBcUIsY0FBZSxTQUFRLHNCQUFZO0lBQXhEOztRQUVDLFVBQUssR0FBRztZQUNQLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRSxFQUFFO1NBQ1Q7UUFFRCxXQUFNLEdBQW1EO1lBQ3hELElBQUksRUFBRSxDQUFDLEtBQWEsRUFBQyxFQUFFLEdBQUMsQ0FBQztTQUN6QixDQUFDO1FBRUYsYUFBUSxHQUFZLEtBQUssQ0FBQztJQTZFM0IsQ0FBQztJQTNFQSxPQUFPO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsSUFBRyxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBMEIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBZ0I7UUFDekIsMkJBQTJCO1FBQzNCLGlCQUFpQjtRQUVqQixJQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNwQjthQUNJLElBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Q7SUFDRixDQUFDO0lBRUQsWUFBWTtRQUNYLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdB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TSxDQUFDO2FBQ2YsY0FBYyxDQUFDLGNBQWMsQ0FBQzthQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzthQUNyQixTQUFTLENBQUMsUUFBUSxDQUFDO2FBQ25CLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFYixHQUFHLENBQUMsa0JBQWtCLENBQUM7YUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxhQUFhLENBQUMsRUFBRSxDQUFDO2FBQ2pCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzthQUMzQixXQUFXLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUM7YUFDdkIsU0FBUyxDQUFDLCtCQUErQixDQUFDO0lBQzdDLENBQUM7Q0FDRDtBQTNZRCxzQ0EyWUM7Ozs7Ozs7Ozs7Ozs7QUM5WkQscUJBQWU7Ozs7Ozs7Ozs7OztDQVlkLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9yc3ZwLXN0dWZmL2NsaWNrYWJsZS1pbnB1dC50cyIsIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9yc3ZwLXN0dWZmL2NvbmZpcm1hdGlvbi1wYW5lLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL3JzdnAtc3R1ZmYvaW52aXRlLXRlbXBsYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvdENvbXBvbmVudCwgSURvdENzcywgSURvdEVsZW1lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpY2thYmxlSW5wdXQgZXh0ZW5kcyBEb3RDb21wb25lbnR7XHJcblxyXG5cdHByb3BzID0ge1xyXG5cdFx0c2hvd0lucHV0OiBmYWxzZSxcclxuXHRcdHZhbHVlOiBcIlwiXHJcblx0fVxyXG5cclxuXHRldmVudHM6IHsgW2tleTogc3RyaW5nXTogKC4uLnBhcmFtczogYW55W10pID0+IHZvaWQ7IH0gPSB7XHJcblx0XHRzYXZlOiAodmFsdWU6IHN0cmluZyk9Pnt9XHJcblx0fTtcclxuXHJcblx0aXNMb2NrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0b25DbGljaygpe1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5pc0xvY2tlZCk7XHJcblx0XHRpZih0aGlzLmlzTG9ja2VkKSByZXR1cm47XHJcblx0XHR0aGlzLnByb3BzLnNob3dJbnB1dCA9IHRydWU7XHJcblx0XHQodGhpcy4kcmVmcy5pbnB1dCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHRoaXMucHJvcHMudmFsdWUgfHwgXCJcIjtcclxuXHRcdHRoaXMuJHJlZnMuaW5wdXQuZm9jdXMoKTtcclxuXHR9XHJcblx0b25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpe1xyXG5cdFx0Ly8gVE9ETzogY2FuY2VsIGlmIGVzY2FwZS4gXHJcblx0XHQvLyBTYXZlIGlmIGVudGVyLlxyXG5cclxuXHRcdGlmKGUuY29kZSA9PSBcIkVudGVyXCIpe1xyXG5cdFx0XHR0aGlzLnNhdmVBbmRDbG9zZSgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihlLmNvZGUgPT0gXCJFc2NhcGVcIil7XHJcblx0XHRcdHRoaXMuY2FuY2VsKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzYXZlQW5kQ2xvc2UoKXtcclxuXHRcdGlmKHRoaXMucHJvcHMuc2hvd0lucHV0KXtcclxuXHRcdFx0dGhpcy5wcm9wcy5zaG93SW5wdXQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy52YWx1ZSA9ICh0aGlzLiRyZWZzLmlucHV0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG5cdFx0XHR0aGlzLmV2ZW50cy5zYXZlKHRoaXMucHJvcHMudmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjYW5jZWwoKXtcclxuXHRcdHRoaXMucHJvcHMuc2hvd0lucHV0ID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRidWlsZGVyKGRlZmF1bHRWYWx1ZTogc3RyaW5nLCBpc0xvY2tlZDogYm9vbGVhbik6IElEb3RFbGVtZW50IHtcclxuXHRcdHRoaXMucHJvcHMudmFsdWUgPSBkZWZhdWx0VmFsdWU7XHJcblx0XHR0aGlzLmlzTG9ja2VkID0gaXNMb2NrZWQ7XHJcblx0XHRjb25zb2xlLmxvZyhcIkxPQ0tFRD9cIiwgaXNMb2NrZWQpO1xyXG5cclxuXHRcdHJldHVybiBkb3QuZGl2KFxyXG5cdFx0XHRkb3QuaW5wdXQoKVxyXG5cdFx0XHRcdC5jbGFzcyh7XHJcblx0XHRcdFx0XHRcImlucHV0XCI6IHRydWUsXHJcblx0XHRcdFx0XHRoaWRkZW46ICgpPT4hdGhpcy5wcm9wcy5zaG93SW5wdXRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbktleURvd24oKGUpPT50aGlzLm9uS2V5RG93bihlKSlcclxuXHRcdFx0XHQub25CbHVyKCgpPT50aGlzLnNhdmVBbmRDbG9zZSgpKVxyXG5cdFx0XHRcdC5yZWYoXCJpbnB1dFwiKSAvLyByZWYgZG9lc24ndCB3b3JrIVxyXG5cdFx0XHQuZGl2KCgpPT50aGlzLnByb3BzLnZhbHVlKS5jbGFzcyh7XHJcblx0XHRcdFx0XCJjbGlja2FibGUtbGFiZWxcIjogdHJ1ZSxcclxuXHRcdFx0XHRoaWRkZW46ICgpPT50aGlzLnByb3BzLnNob3dJbnB1dFxyXG5cdFx0XHR9KS5vbkNsaWNrKCgpPT50aGlzLm9uQ2xpY2soKSlcclxuXHRcdCkuY2xhc3MoXCJjb250YWluZXJcIilcclxuXHR9XHJcblxyXG5cdHN0eWxlKGNzczogSURvdENzcyk6IHZvaWQge1xyXG5cdFx0Y3NzKFwiLmNvbnRhaW5lclwiKVxyXG5cdFx0XHQucGFkZGluZygxMClcclxuXHJcblx0XHRjc3MoXCIuaW5wdXRcIilcclxuXHRcdFx0LmhlaWdodCgxNilcclxuXHRcdFx0LmRpc3BsYXkoXCJibG9ja1wiKVxyXG5cdFx0XHQud2lkdGhQKDEwMClcclxuXHRcdFx0LmJhY2tncm91bmRDb2xvcigwLDAsMCwwLjUpXHJcblx0XHRcdC5jdXJzb3IoXCJwb2ludGVyXCIpXHJcblx0XHRcdC5jb2xvcihcIndoaXRlXCIpXHJcblx0XHRcdC5wYWRkaW5nKDQpXHJcblxyXG5cdFx0Y3NzKFwiLmNsaWNrYWJsZS1sYWJlbFwiKVxyXG5cdFx0XHQuaGVpZ2h0KDE2KVxyXG5cdFx0XHQvLyAud2lkdGhQKDEwMClcclxuXHRcdFx0LmJhY2tncm91bmRDb2xvcigwLDAsMCwwLjUpXHJcblx0XHRcdC5jdXJzb3IoXCJwb2ludGVyXCIpXHJcblx0XHRcdC5jb2xvcihcIndoaXRlXCIpXHJcblx0XHRcdC5wYWRkaW5nKDQpXHJcblxyXG5cdFx0Y3NzKFwiLmhpZGRlblwiKVxyXG5cdFx0XHQuZGlzcGxheShcIm5vbmVcIilcclxuXHR9XHJcbn0iLCJpbXBvcnQgeyBJRG90R2VuZXJpY0VsZW1lbnQgfSBmcm9tIFwiZG90aHRtbC9saWIvaS1kb3RcIjtcclxuaW1wb3J0IFBhZ2VTZWN0aW9uIGZyb20gXCIuLi9wYWdlLXNlY3Rpb25cIjtcclxuaW1wb3J0IHsgSURvdENzcywgZG90IH0gZnJvbSBcImRvdGh0bWxcIjtcclxuaW1wb3J0IFJzdnBPcHRpb25zIGZyb20gXCIuL3JzdnAtb3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBHdWVzdCB9IGZyb20gXCIuL2d1ZXN0XCI7XHJcbmltcG9ydCBsYW5ndWFnZSBmcm9tIFwiLi9sYW5ndWFnZVwiO1xyXG5pbXBvcnQgaW52aXRlVGVtcGxhdGUgZnJvbSBcIi4vaW52aXRlLXRlbXBsYXRlXCI7XHJcblxyXG50eXBlIE1hc3Rlckd1ZXN0ID0gR3Vlc3QgJiB7XHJcblx0UGx1czFEYXRhOiBzdHJpbmc7XHJcbn1cclxuXHJcbnR5cGUgTW9kZWxCdXR0b24gPSB7XHJcblx0Y2FwdGlvbjogc3RyaW5nO1xyXG5cdHZhbHVlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmxldCBpc0xvY2tlZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcIkFETUlOPXRydWVcIikgPT0gLTE7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtYXRpb25QYW5lIGV4dGVuZHMgUGFnZVNlY3Rpb257XHJcblxyXG5cdHByb3BzOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfSA9IHtcclxuXHRcdGxvYWRpbmdNZXNzYWdlOiBudWxsLFxyXG5cdFx0Z3Vlc3Q6IG51bGwgYXMgTWFzdGVyR3Vlc3QsXHJcblx0XHRlcnI6IG51bGwsXHJcblx0XHRsYW5nOiBcImVuXCIsLy9sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhbmdcIikgfHwgXCJlbFwiLFxyXG5cdFx0ZXZlbnREZXRhaWxzSHRtbDogXCJcIlxyXG5cdH07XHJcblxyXG5cdHBsdXMxczogQXJyYXk8R3Vlc3Q+ID0gW107XHJcblxyXG5cdGdldFN0cihzdHI6IGtleW9mICh0eXBlb2YgbGFuZ3VhZ2UpLCBhcmdzPzogQXJyYXk8c3RyaW5nfG51bWJlcnxib29sZWFuPil7XHJcblx0XHRyZXR1cm4gKCk9PntcclxuXHRcdFx0bGV0IGZpbmFsID0gbGFuZ3VhZ2Vbc3RyXVt0aGlzLnByb3BzLmxhbmddO1xyXG5cdFx0XHRpZihhcmdzKXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRmaW5hbCA9IGZpbmFsLnNwbGl0KGB7JHtpfX1gKS5qb2luKGFyZ3NbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmluYWw7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Z2V0UmF3U3RyKHN0cjoga2V5b2YgKHR5cGVvZiBsYW5ndWFnZSksIGFyZ3M/OiBBcnJheTxzdHJpbmd8bnVtYmVyfGJvb2xlYW4+KXtcclxuXHRcdGxldCBmaW5hbCA9IGxhbmd1YWdlW3N0cl1bdGhpcy5wcm9wcy5sYW5nXTtcclxuXHRcdGlmKGFyZ3Mpe1xyXG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0ZmluYWwgPSBmaW5hbC5zcGxpdChgeyR7aX19YCkuam9pbihhcmdzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZpbmFsO1xyXG5cdH1cclxuXHJcblx0cmVhZHkoKTogdm9pZCB7XHJcblx0XHR0aGlzLmZldGNoR3Vlc3QoKTtcclxuXHR9XHJcblxyXG5cdGNoYW5nZUxhbmcobGFuZyl7XHJcblx0XHRkb3QuYnVzLmVtaXQoXCJsYW5ndWFnZVwiLCBsYW5nKTtcclxuXHRcdHRoaXMucHJvcHMubGFuZyA9IGxhbmc7XHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhbmdcIiwgbGFuZyk7XHJcblx0XHR0aGlzLiR1cGRhdGVTdHlsZXMoKTtcclxuXHRcdHRoaXMucmVsb2FkRXZlbnREZXRhaWxzSHRtbCgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc2hvd01vZGFsKG1lc3NhZ2U6IHN0cmluZywgYnV0dG9uczogQXJyYXk8TW9kZWxCdXR0b24+KTogUHJvbWlzZTxzdHJpbmc+e1xyXG5cdFx0bGV0IHJlbW92aW5nID0gZmFsc2U7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHRkb3QoZG9jdW1lbnQuYm9keSkuZGl2KFxyXG5cdFx0XHRcdGRvdC5kaXYoXHJcblx0XHRcdFx0XHRkb3Quc3BhbihtZXNzYWdlKVxyXG5cdFx0XHRcdFx0LmJyKClcclxuXHRcdFx0XHRcdC5icigpXHJcblx0XHRcdFx0XHQuZWFjaChidXR0b25zLCBiPT57XHJcblx0XHRcdFx0XHRcdHJldHVybiBkb3QuYnV0dG9uKGIuY2FwdGlvbikuc3R5bGUoXHJcblx0XHRcdFx0XHRcdFx0ZG90LmNzcy5wYWRkaW5nKDEwKS5mb250U2l6ZSgzMCkuYmFja2dyb3VuZENvbG9yKFwiZ29sZFwiKS5jdXJzb3IoXCJwb2ludGVyXCIpLm1hcmdpbigyMClcclxuXHRcdFx0XHRcdFx0KS5vbkNsaWNrKCgpPT57IFxyXG5cdFx0XHRcdFx0XHRcdGlmKHJlbW92aW5nKSByZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0cmVtb3ZpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdC8vIGRvdChcIiNtb2RhbFwiKS5zdHlsZShkb3QuY3NzLm9wYWNpdHkoMCkpO1xyXG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIikuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PntcclxuXHRcdFx0XHRcdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKGIudmFsdWUpO1xyXG5cdFx0XHRcdFx0XHRcdH0sNjAwKTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0KVxyXG5cdFx0XHRcdC5zdHlsZShkb3QuY3NzXHJcblx0XHRcdFx0XHQucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxyXG5cdFx0XHRcdFx0LmNvbG9yKFwid2hpdGVcIilcclxuXHRcdFx0XHRcdC5sZWZ0UCg1MClcclxuXHRcdFx0XHRcdC50b3BQKDUwKVxyXG5cdFx0XHRcdFx0Lm1hcmdpbihcImF1dG9cIilcclxuXHRcdFx0XHRcdC50cmFuc2Zvcm0odCA9PiB0LnRyYW5zbGF0ZVhQKC01MCkudHJhbnNsYXRlWVAoLTUwKSlcclxuXHRcdFx0XHRcdC5taW5XaWR0aCgzMDApXHJcblx0XHRcdFx0XHQubWF4V2lkdGgoODAwKVxyXG5cdFx0XHRcdFx0Lm1pbkhlaWdodCgyMDApXHJcblx0XHRcdFx0XHQucGFkZGluZyg1MClcclxuXHRcdFx0XHRcdC5wYWRkaW5nVG9wKDEwMClcclxuXHRcdFx0XHRcdC5mb250U2l6ZSgyNClcclxuXHRcdFx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMzAsMzAsMzAsMC44KVxyXG5cdFx0XHRcdFx0LmJvcmRlclJhZGl1cyg4MClcclxuXHRcdFx0XHRcdC50ZXh0QWxpZ24oXCJjZW50ZXJcIilcclxuXHRcdFx0XHRcdC52ZXJ0aWNhbEFsaWduKFwibWlkZGxlXCIpXHJcblx0XHRcdFx0XHQuYm9yZGVyKFwiNXB4IHNvbGlkIGdvbGRcIilcclxuXHRcdFx0XHQpXHJcblx0XHRcdCkuc3R5bGUoZG90LmNzc1xyXG5cdFx0XHRcdC5wb3NpdGlvbihcImZpeGVkXCIpXHJcblx0XHRcdFx0LnRvcCgwKVxyXG5cdFx0XHRcdC5sZWZ0KDApXHJcblx0XHRcdFx0LnJpZ2h0KDApXHJcblx0XHRcdFx0LmJvdHRvbSgwKVxyXG5cdFx0XHRcdC56SW5kZXgoMTAwMClcclxuXHRcdFx0XHQuYmFja2Ryb3BGaWx0ZXIoZj0+Zi5ibHVyKDUpLmJyaWdodG5lc3MoNTApLnNlcGlhKDEwMCkpXHJcblx0XHRcdFx0Lm9wYWNpdHkoMSlcclxuXHRcdFx0XHQuYm9yZGVyKFwiNTBweCBzb2xpZCBibGFja1wiKVxyXG5cdFx0XHRcdC50cmFuc2l0aW9uKFwib3BhY2l0eSAwLjVzIGVhc2VcIilcclxuXHRcdFx0KS5pZChcIm1vZGFsXCIpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBmZXRjaEd1ZXN0KCl7XHJcblxyXG5cdFx0bGV0IGd1ZXN0SWQgPSBcIlwiO1xyXG5cdFx0XHJcblx0XHRjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcblx0XHRjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5U3RyaW5nKTtcclxuXHRcdGNvbnN0IHBhcmFtVmFsdWUgPSB1cmxQYXJhbXMuZ2V0KFwiaW52aXRlXCIpO1xyXG5cclxuXHRcdGlmKHBhcmFtVmFsdWUpe1xyXG5cdFx0XHRndWVzdElkID0gcGFyYW1WYWx1ZS5zcGxpdChcIl9cIilbMF07XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRsZXQgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG5cdFx0XHRndWVzdElkID0gaGFzaC5zcGxpdChcIl9cIilbMV07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIWd1ZXN0SWQgfHwgZ3Vlc3RJZC5sZW5ndGggPT0gMCl7XHJcblx0XHRcdHRoaXMucHJvcHMuZXJyID0gXCJJbnZhbGlkIGd1ZXN0SWQuXCI7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnByb3BzLmxvYWRpbmdNZXNzYWdlID0gbGFuZ3VhZ2UubG9hZGluZ0d1ZXN0TXNnW3RoaXMucHJvcHMubGFuZ107XHJcblxyXG5cdFx0e1xyXG5cdFx0XHRsZXQgdXNlckxhbmcgPSBuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgbmF2aWdhdG9yW1widXNlckxhbmd1YWdlXCJdOyBcclxuXHRcdFx0dXNlckxhbmcgPSAodXNlckxhbmd8fFwiXCIpLnNwbGl0KCctJylbMF07XHJcblx0XHRcdGlmKHVzZXJMYW5nICE9IFwiZWxcIiAmJiB1c2VyTGFuZyAhPSBcImZyXCIpIHVzZXJMYW5nID0gXCJlblwiO1xyXG5cdFx0XHR0aGlzLnByb3BzLmxhbmcgPSB1c2VyTGFuZztcclxuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsYW5nXCIsIHRoaXMucHJvcHMubGFuZyk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHRyeXtcclxuXHRcdFxyXG5cdFx0XHRsZXQgcmVzdWx0ID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vMmZpdWNnaWNsOC5leGVjdXRlLWFwaS51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9nZXQtaW52aXRlLWRldGFpbHM/Z3Vlc3RJZD0ke2d1ZXN0SWR9YCk7XHJcblx0XHRcdGxldCBqc29uRGF0YSA9IGF3YWl0IHJlc3VsdC5qc29uKCk7XHJcblx0XHRcdHRoaXMucGx1czFzID0gSlNPTi5wYXJzZShqc29uRGF0YS5QbHVzMURhdGEpID8/IFtdO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYoIWlzTG9ja2VkICYmIGpzb25EYXRhLlJzdnBTdGF0dXMgIT0gXCJDT05GSVJNRURcIil7XHJcblxyXG5cdFx0XHRcdC8vIElmIGl0J3MgdGhlIGZpcnN0IGxvYWQsIHNldCB0aGUgbGFuZ3VhZ2UgdG8gd2hhdGV2ZXIgdGhlIGludml0ZSBzYXlzLiBUaGlzIGlzIGEgc3BlY2lhbCBmZWF0dXJlIGZvciBjZXJ0YWluIGd1ZXN0cy5cclxuXHJcblx0XHRcdFx0aWYoanNvbkRhdGEuTGFuZyA9PSBcImVsXCIpe1xyXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5sYW5nID0ganNvbkRhdGEuTGFuZztcclxuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGFuZ1wiLCBqc29uRGF0YS5MYW5nKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFNldCBkZWZhdWx0IFJTVlAhXHJcblxyXG5cdFx0XHRcdGxldCByc3ZwID0gXCJERUNMSU5FRFwiO1xyXG5cclxuXHRcdFx0XHRpZihwYXJhbVZhbHVlIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2YoXCIjaW52aXRlX1wiKSA9PSAwKXtcclxuXHRcdFx0XHRcdHJzdnAgPSBhd2FpdCB0aGlzLnNob3dNb2RhbCh0aGlzLmdldFN0cihcImludml0ZU1vZGFsUXVlc3Rpb25cIikoKSwgW1xyXG5cdFx0XHRcdFx0XHR7Y2FwdGlvbjogdGhpcy5nZXRTdHIoXCJ5ZXNOb0J0blllc1wiKSgpIGFzIHN0cmluZywgdmFsdWU6IFwiQ09ORklSTUVEXCJ9LFxyXG5cdFx0XHRcdFx0XHR7Y2FwdGlvbjogdGhpcy5nZXRTdHIoXCJ5ZXNOb0J0bk5vXCIpKCkgYXMgc3RyaW5nLCB2YWx1ZTogXCJERUNMSU5FRFwifSxcclxuXHRcdFx0XHRcdF0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0cnN2cCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2YoXCIjY29uZmlybV9cIikgPT0gMCA/IFwiQ09ORklSTUVEXCIgOiBcIkRFQ0xJTkVEXCI7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRqc29uRGF0YS5Sc3ZwU3RhdHVzID0gcnN2cDtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wbHVzMXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVzMXNbaV0uUnN2cFN0YXR1cyA9IHJzdnA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhd2FpdCB0aGlzLnNhdmVHdWVzdChqc29uRGF0YSk7XHJcblx0XHRcdFx0dGhpcy5zaG93TW9kYWwodGhpcy5nZXRTdHIoXCJyc3ZwQ29uZmlybWF0aW9uXCIpKCksIFt7Y2FwdGlvbjogXCJPS1wiLCB2YWx1ZTogXCJva1wifV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnByb3BzLmxvYWRpbmdNZXNzYWdlID0gXCJcIjtcclxuXHRcdFx0dGhpcy5wcm9wcy5ndWVzdCA9IGpzb25EYXRhO1xyXG5cdFx0XHR0aGlzLiR1cGRhdGVTdHlsZXMoKTtcclxuXHRcdFx0dGhpcy5yZWxvYWRFdmVudERldGFpbHNIdG1sKCk7XHJcblx0XHRcdHJldHVybiBqc29uRGF0YTtcclxuXHRcdH1cclxuXHRcdGNhdGNoKGUpe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHR0aGlzLnByb3BzLmxvYWRpbmdNZXNzYWdlID0gbGFuZ3VhZ2UuZmV0Y2hHdWVzdEVycm9yW3RoaXMucHJvcHMubGFuZ107XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyBzYXZlR3Vlc3QoanNvbkRhdGEgPSB0aGlzLnByb3BzLmd1ZXN0KXtcclxuXHRcdHRoaXMucHJvcHMubG9hZGluZ01lc3NhZ2UgPSBsYW5ndWFnZS5zYXZpbmdSc3ZwTXNnW3RoaXMucHJvcHMubGFuZ107XHJcblx0XHRqc29uRGF0YS5QbHVzMURhdGEgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnBsdXMxcy5tYXAoeD0+eCkpO1xyXG5cdFx0bGV0IHJlc3VsdCA9IGF3YWl0IGZldGNoKGBodHRwczovLzJmaXVjZ2ljbDguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vdXBkYXRlLWd1ZXN0LXN0YXR1c2AsIHtcclxuXHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcclxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoanNvbkRhdGEpXHJcblx0XHR9KTtcclxuXHRcdHRoaXMucHJvcHMubG9hZGluZ01lc3NhZ2UgPSBcIlwiO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc2F2ZVBsdXNPbmUoZGF0YSl7XHJcblx0XHQvLyBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wbHVzMXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0Ly8gXHRsZXQgcDEgPSB0aGlzLnBsdXMxc1tpXTtcclxuXHRcdC8vIFx0aWYocDEuSWQgPT0gZGF0YS5JZCAmJiBwMS5GdWxsTmFtZSA9PSBkYXRhLkZ1bGxOYW1lKXtcclxuXHRcdC8vIFx0XHRjb25zb2xlLmxvZyhwMSk7XHJcblx0XHQvLyBcdFx0YnJlYWs7XHJcblx0XHQvLyBcdH1cclxuXHRcdC8vIH1cclxuXHJcblx0XHQvLyB0aGlzLnJlbG9hZEV2ZW50RGV0YWlsc0h0bWwoKTtcclxuXHRcdGF3YWl0IHRoaXMuc2F2ZUd1ZXN0KCk7XHJcblx0fVxyXG5cclxuXHRyZWxvYWRFdmVudERldGFpbHNIdG1sKCl7XHJcblx0XHR0aGlzLnByb3BzLmV2ZW50RGV0YWlsc0h0bWwgPSBpbnZpdGVUZW1wbGF0ZVxyXG5cdFx0XHQucmVwbGFjZShcIntpbnZpdGF0aW9uRGV0YWlsc0d1ZXN0TmFtZX1cIiwgdGhpcy5nZXRTdHIoXCJpbnZpdGF0aW9uRGV0YWlsc0d1ZXN0TmFtZVwiLCBbdGhpcy5wcm9wcy5ndWVzdC5GdWxsTmFtZV0pKCkpXHJcblx0XHRcdC5yZXBsYWNlKFwie2ludml0YXRpb25EZXRhaWxzQW1wZXJzYW5kfVwiLCB0aGlzLmdldFN0cihcImludml0YXRpb25EZXRhaWxzQW1wZXJzYW5kXCIpKCkpXHJcblx0XHRcdC5yZXBsYWNlKFwie2ludml0YXRpb25EZXRhaWxzR3Jvb21OYW1lUHJlZml4fVwiLCB0aGlzLmdldFN0cihcImludml0YXRpb25EZXRhaWxzR3Jvb21OYW1lUHJlZml4XCIpKCkpXHJcblx0XHRcdC5yZXBsYWNlKFwie2ludml0YXRpb25EZXRhaWxzQnJpZGVOYW1lUHJlZml4fVwiLCB0aGlzLmdldFN0cihcImludml0YXRpb25EZXRhaWxzQnJpZGVOYW1lUHJlZml4XCIpKCkpXHJcblx0XHRcdC5yZXBsYWNlKFwie2ludml0YXRpb25EZXRhaWxzTWVzc2FnZX1cIiwgdGhpcy5nZXRTdHIoXCJpbnZpdGF0aW9uRGV0YWlsc01lc3NhZ2VcIikoKSlcclxuXHRcdFx0LnJlcGxhY2UoXCJ7d2VkZGluZ0RhdGV9XCIsIHRoaXMuZ2V0U3RyKFwid2VkZGluZ0RhdGVcIikoKSlcclxuXHR9XHJcblxyXG5cdGJ1aWxkZXIoKTogSURvdEdlbmVyaWNFbGVtZW50IHtcclxuXHRcdHJldHVybiBzdXBlci5idWlsZGVyKFxyXG5cdFx0XHQvLyBkb3QuaDEodGhpcy5nZXRTdHIoXCJyZXNlcnZhdGlvbkRldGFpbHNIZWFkZXJcIikpXHJcblx0XHRcdGRvdC5kaXYoXHJcblx0XHRcdFx0ZG90LndoZW4oKCk9PntcclxuXHRcdFx0XHRcdGxldCBnID0gdGhpcy5wcm9wcy5ndWVzdDtcclxuXHRcdFx0XHRcdGxldCBlID0gdGhpcy5wcm9wcy5lcnI7XHJcblx0XHRcdFx0XHRyZXR1cm4gISEoZyB8fCBlKTtcclxuXHRcdFx0XHR9LCAoKT0+e1xyXG5cdFx0XHRcdFx0aWYodGhpcy5wcm9wcy5lcnIpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZG90LnAodGhpcy5nZXRTdHIoXCJmZXRjaEd1ZXN0RXJyb3JcIikpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0XHQvLyByZXR1cm4gZG90LmgyKHRoaXMuZ2V0U3RyKFwiZXZlbnRJbmZvcm1hdGlvbkhlYWRlclwiKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGRvdC5kaXYoXHJcblx0XHRcdFx0XHRcdFx0ZG90LmRpdigoKT0+dGhpcy5wcm9wcy5ldmVudERldGFpbHNIdG1sKS5jbGFzcyhcImludml0ZS1kZXRhaWxzXCIpXHJcblx0XHRcdFx0XHRcdFx0LmRpdihcclxuXHRcdFx0XHRcdFx0XHRcdGRvdC5pbWcoKS5jbGFzcyhcImxvdmUtcGhvdG9cIikuc3JjKFwiaHR0cHM6Ly9zaWRlcmlzLXdlZGRpbmctaW1hZ2VzLnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3JzdnAtbG92ZS1pbWcuanBnXCIpLndpZHRoKDQwMClcclxuXHRcdFx0XHRcdFx0XHQpLmNsYXNzKFwibG92ZS1waG90by1jb250YWluZXJcIilcclxuXHRcdFx0XHRcdFx0KS5jbGFzcyhcImludml0ZS1zZWN0aW9uXCIpXHJcblxyXG5cdFx0XHRcdFx0XHQuaDIoXCJMb2NrZWQgSW5cIilcclxuXHRcdFx0XHRcdFx0LmRpdihcIk91ciBzcGVjaWFsIGRheSBpcyBjb21pbmcgdXAgaW4gYSBtYXR0ZXIgb2YgZGF5cywgYW5kIHJlc2VydmF0aW9ucyBhcmUgbm93IGxvY2tlZCBpbi4gRm9yIGxhc3QtbWludXRlIHN0YXR1cyBjaGFuZ2VzLCBjb250YWN0IHRoZSBicmlkZSBvciBncm9vbS5cIilcclxuXHRcdFx0XHRcdFx0LmgyKHRoaXMuZ2V0U3RyKFwicnN2cEhlYWRlclwiKSlcclxuXHRcdFx0XHRcdFx0LmRpdihcclxuXHRcdFx0XHRcdFx0XHRkb3QuaCgoKT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IG9wdGlvbnMgPSBuZXcgUnN2cE9wdGlvbnModGhpcy5wcm9wcy5ndWVzdCwgaXNMb2NrZWQpXHJcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uKFwidXBkYXRlXCIsIChndWVzdCk9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5zYXZlR3Vlc3QoZ3Vlc3QpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC5kaXYoXHJcblx0XHRcdFx0XHRcdFx0XHRkb3QuaDIodGhpcy5nZXRTdHIoXCJ5b3VyUGx1c09uZXNIZWFkZXJcIikpXHJcblx0XHRcdFx0XHRcdFx0XHQuZGl2KGRvdC53aGVuKCF0aGlzLnBsdXMxcz8ubGVuZ3RoLCAoKT0+ZG90LnAodGhpcy5nZXRTdHIoXCJub1BsdXNPbmVzTWVzc2FnZVwiKSkpKVxyXG5cdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHQuZWFjaCh0aGlzLnBsdXMxcywgZD0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IG9wdGlvbnMgPSBuZXcgUnN2cE9wdGlvbnMoZCwgaXNMb2NrZWQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbihcInVwZGF0ZVwiLCAoZ3Vlc3QpPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2F2ZVBsdXNPbmUoZ3Vlc3QpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQpXHJcblxyXG5cdFx0XHRcdFx0XHQuaDIodGhpcy5nZXRTdHIoXCJ3ZWRkaW5nRmVhc3RNZW51SGVhZGVyXCIpKVxyXG5cdFx0XHRcdFx0XHQucCh0aGlzLmdldFN0cihcImNlbGVicmF0aW9uT2ZMb3ZlRmxhdm9yXCIpKVxyXG5cdFx0XHRcdFx0XHQuZGl2KFxyXG5cdFx0XHRcdFx0XHRcdFx0ZG90Lm9sKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkb3QubGkodGhpcy5nZXRTdHIoXCJhcHBldGl6ZXJzVGVhc2VQYWxhdGVcIikpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5saSh0aGlzLmdldFN0cihcImJ1dHRlcm51dFNxdWFzaFNvdXBcIikpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5saSh0aGlzLmdldFN0cihcIm11c2hyb29tUGVzdG9SaWdhdG9uaVwiKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmxpKHRoaXMuZ2V0U3RyKFwiY2hvb3NlWW91ck1haW5cIikpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC51bChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkb3QubGkodGhpcy5nZXRTdHIoXCJ2ZWdnaWVGaWxvVHVybm92ZXJcIikpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmxpKHRoaXMuZ2V0U3RyKFwidmVnZXRhYmxlVGlra2FTa2V3ZXJcIikpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmxpKHRoaXMuZ2V0U3RyKFwidmVnYW5SaWNlU3R1ZmZlZFBlcHBlcnNcIikpXHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmxpKHRoaXMuZ2V0U3RyKFwiaWNlQ3JlYW1DcmVwZVwiKSlcclxuXHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0KS5jbGFzcyhcIm9sLWNvbnRhaW5lclwiKS5icigpXHJcblx0XHRcdFx0XHRcdC5kaXYoXHJcblx0XHRcdFx0XHRcdFx0ZG90LmRpdihkb3QuaW1nKCkuc3JjKFwiaHR0cHM6Ly9zaWRlcmlzLXdlZGRpbmctaW1hZ2VzLnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3R1cm5vdmVyLnBuZ1wiKSlcclxuXHRcdFx0XHRcdFx0XHQuZGl2KGRvdC5pbWcoKS5zcmMoXCJodHRwczovL3NpZGVyaXMtd2VkZGluZy1pbWFnZXMuczMudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vc2tld2Vycy5wbmdcIikpXHJcblx0XHRcdFx0XHRcdFx0LmRpdihkb3QuaW1nKCkuc3JjKFwiaHR0cHM6Ly9zaWRlcmlzLXdlZGRpbmctaW1hZ2VzLnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3BlcHBlcnMucG5nXCIpKVxyXG5cdFx0XHRcdFx0XHQpLmNsYXNzKFwiZm9vZC1pbWFnZXNcIikuYnIoKVxyXG5cclxuXHRcdFx0XHRcdFx0LmgyKHRoaXMuZ2V0U3RyKFwiZ2lmdHNIZWFkZXJcIikpXHJcblx0XHRcdFx0XHRcdC5wKHRoaXMuZ2V0U3RyKFwiZ2lmdHNNZXNzYWdlXCIpKVxyXG5cclxuXHRcdFx0XHRcdFx0LmgyKHRoaXMuZ2V0U3RyKFwibG9jYXRpb25IZWFkZXJcIikpXHJcblx0XHRcdFx0XHRcdC5kaXYoXHJcblx0XHRcdFx0XHRcdFx0ZG90LmRpdihcclxuXHRcdFx0XHRcdFx0XHRcdGRvdC5wKHRoaXMuZ2V0U3RyKFwiY2VyZW1vbnlSZWNlcHRpb25Mb2NhdGlvblwiKSgpLnJlcGxhY2UoXCJGYW50YXN5IEZhcm1cIiwgYDxhIGhyZWY9XCJodHRwczovL2ZhbnRhc3lmYXJtLmNhXCIgdGFyZ2V0PVwiX2JsYW5rXCI+RmFudGFzeSBGYXJtPC9hPmApLnJlcGxhY2UoXCJCYWxscm9vbVwiLCBcIjxiPkJhbGxyb29tPC9iPlwiKSlcclxuXHRcdFx0XHRcdFx0XHQpLmNsYXNzKFwiY2VyZW1vbnktbG9jYXRpb25cIilcclxuXHRcdFx0XHRcdFx0XHQuYnIoKVxyXG5cdFx0XHRcdFx0XHRcdC5hKFxyXG5cdFx0XHRcdFx0XHRcdFx0ZG90LmltZygpLnNyYyhcImh0dHBzOi8vc2lkZXJpcy13ZWRkaW5nLWltYWdlcy5zMy51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9tYXAucG5nXCIpXHJcblx0XHRcdFx0XHRcdFx0KS5jbGFzcyhcIm1hcC1hXCIpLmhSZWYoXCJodHRwczovL2dvby5nbC9tYXBzL2ZEdUg2R1dXdHZ5bXVHREs3XCIpLnRhcmdldChcIl9ibGFua1wiKVxyXG5cdFx0XHRcdFx0XHQpXHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vdGhlcndpc2UoKCk9PntcclxuXHRcdFx0XHRcdHJldHVybiBkb3QucCgoKT0+dGhpcy5wcm9wcy5sb2FkaW5nTWVzc2FnZSlcclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHN0eWxlKGNzczogSURvdENzcyk6IHZvaWQge1xyXG5cdFx0c3VwZXIuc3R5bGUoY3NzKTtcclxuXHJcblx0XHRjc3MoXCJsaVwiKVxyXG5cdFx0XHQubWFyZ2luQm90dG9tKDgpXHJcblx0XHRcdC5jb2xvcihcIiNFRUVcIilcclxuXHRcdFx0Ly8gLmZvbnRXZWlnaHQoXCJib2xkXCIpXHJcblxyXG5cdFx0Y3NzKFwiLmludml0ZS1zZWN0aW9uXCIpXHJcblx0XHRcdC5kaXNwbGF5KFwiZmxleFwiKVxyXG5cdFx0XHQuZ2FwKDIwKVxyXG5cdFx0XHQucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxyXG5cdFx0XHQuYWxpZ25JdGVtcyhcImNlbnRlclwiKVxyXG5cdFx0XHQuZmxleFdyYXAoXCJ3cmFwXCIpXHJcblx0XHRcdC50ZXh0QWxpZ24oXCJjZW50ZXJcIik7XHJcblxyXG5cdFx0Y3NzKFwiLmxvdmUtcGhvdG9cIilcclxuXHRcdFx0LmJvcmRlclJhZGl1c1AoNTApXHJcblx0XHRcdC5ib3JkZXIoXCIzcHggc29saWQgI0FBODczMFwiKVxyXG5cdFx0XHQuYm94U2hhZG93KFwiMCA4cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuNylcIilcclxuXHRcdFx0LnRyYW5zaXRpb24oXCJ0cmFuc2Zvcm0gMC4zcyBlYXNlLCBvcGFjaXR5IDAuM3MgZWFzZVwiKVxyXG5cdFx0XHQuZmlsdGVyKGY9PmZcclxuXHRcdFx0XHQuYnJpZ2h0bmVzcygxNTApXHJcblx0XHRcdFx0Ly8gLmNvbnRyYXN0KDEyMClcclxuXHRcdFx0XHQvLyAuc2VwaWEoMjApXHJcblx0XHRcdClcclxuXHJcblx0XHRjc3MoXCIubG92ZS1waG90by1jb250YWluZXJcIilcclxuXHRcdFx0LmZsZXhHcm93KDEpXHJcblxyXG5cdFx0Y3NzKFwiLmludml0ZS1kZXRhaWxzXCIpXHJcblx0XHRcdC5mbGV4R3JvdygzKVxyXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKFwicmdiYSgwLDAsMCwwLjcpXCIpXHJcblx0XHRcdC5wYWRkaW5nVG9wKDIwKVxyXG5cdFx0XHQucGFkZGluZ0JvdHRvbSgyMClcclxuXHRcdFx0LmJvcmRlclJhZGl1cygyMCk7XHJcblxyXG5cdFx0Y3NzKFwiLmNlcmVtb255LWxvY2F0aW9uXCIpXHJcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoNzAsNTUsMCwwLjcpXHJcblx0XHRcdC5ib3JkZXJSYWRpdXMoOClcclxuXHRcdFx0LnBhZGRpbmcoOClcclxuXHRcdFx0LmNvbG9yKDIzOCwxODcsNTEpXHJcblxyXG5cdFx0Y3NzKFwiYVwiKVxyXG5cdFx0XHQuY29sb3IoMjM4LCAxODcsIDUxKVxyXG5cdFx0XHQudGV4dERlY29yYXRpb24oXCJ1bmRlcmxpbmUgZG90dGVkXCIpXHJcblxyXG5cdFx0Y3NzKFwiLm1hcC1hXCIpXHJcblx0XHRcdC5kaXNwbGF5KFwiYmxvY2tcIilcclxuXHRcdFx0LndpZHRoUCgxMDApXHJcblx0XHRcdC50ZXh0QWxpZ24oXCJjZW50ZXJcIilcclxuXHJcblx0XHRjc3MoXCIubWFwLWEgaW1nXCIpXHJcblx0XHRcdC53aWR0aFAoMTAwKVxyXG5cdFx0XHQubWF4V2lkdGgoODAwKVxyXG5cdFx0XHQuYm9yZGVyUmFkaXVzUCgyNSlcclxuXHRcdFx0LmJvcmRlcihcIjNweCBzb2xpZCB3aGl0ZVwiKVxyXG5cdFx0XHQuYm94U2hhZG93KFwiMCA4cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuNylcIilcclxuXHRcdFx0LmZpbHRlcihmID0+IGZcclxuXHRcdFx0XHQvLyAuY29udHJhc3QoMTUwKVxyXG5cdFx0XHRcdC5icmlnaHRuZXNzKDkwKVxyXG5cdFx0XHRcdC8vIC5odWVSb3RhdGUoXCI5MGRlZ1wiIGFzIGFueSlcclxuXHRcdFx0XHQvLyAuZ3JheXNjYWxlKDQwKVxyXG5cdFx0XHRcdC5zZXBpYSgxMDApXHJcblx0XHRcdClcclxuXHJcblx0XHRjc3MoXCIuZm9vZC1pbWFnZXNcIilcclxuXHRcdFx0LmdhcCg1KVxyXG5cdFx0XHQuZGlzcGxheShcImZsZXhcIilcclxuXHRcdFx0Lmp1c3RpZnlDb250ZW50KFwic3BhY2UtZXZlbmx5XCIpXHJcblx0XHRcdC5mbGV4V3JhcChcIndyYXBcIilcclxuXHRcdFx0XHJcblx0XHRjc3MoXCIuZm9vZC1pbWFnZXMgZGl2XCIpXHJcblx0XHRcdC50ZXh0QWxpZ24oXCJjZW50ZXJcIilcclxuXHRcdFx0LmZsZXhHcm93KDEpXHJcblxyXG5cdFx0Y3NzKFwiLmZvb2QtaW1hZ2VzIGltZ1wiKVxyXG5cdFx0XHQud2lkdGgoMjUwKVxyXG5cdFx0XHQuaGVpZ2h0KDI1MClcclxuXHRcdFx0LmJvcmRlclJhZGl1c1AoNTApXHJcblx0XHRcdC5ib3JkZXIoXCIzcHggc29saWQgI0FBODIyMFwiKVxyXG5cdFx0XHQuYm9yZGVyQ29sb3IoMjM4LDE4Nyw1MSlcclxuXHRcdFx0LmJveFNoYWRvdyhcIjAgOHB4IDE2cHggcmdiYSgwLCAwLCAwLCAwLjcpXCIpXHJcblx0fVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgYFxyXG5cdDxwIHN0eWxlPVwiZm9udC1zaXplOjIwcHg7IGNvbG9yOiByZ2IoMTcwLCAxNzAsIDE3MCk7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udC1mYW1pbHk6ICZxdW90O1NjcmlwdCBNVCZxdW90OywgJnF1b3Q7U2Vnb2Ugc2NyaXB0JnF1b3Q7LCBSYWdlLCAmcXVvdDtMdWNpZGEgSGFuZHdyaXRpbmcmcXVvdDssIGN1cnNpdmUsIFNhdGlzZnk7XCI+e2ludml0YXRpb25EZXRhaWxzR3Vlc3ROYW1lfTwvcD5cclxuXHQ8aDIgc3R5bGU9XCJmb250LWZhbWlseTogJnF1b3Q7U2NyaXB0IE1UJnF1b3Q7LCAmcXVvdDtTZWdvZSBzY3JpcHQmcXVvdDssIFJhZ2UsICZxdW90O0x1Y2lkYSBIYW5kd3JpdGluZyZxdW90OywgY3Vyc2l2ZSwgU2F0aXNmeTsgZm9udC1zaXplOiAzMnB4OyBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpOyBtYXJnaW4tYm90dG9tOiAyMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiAyNHB4O1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiAxOHB4O1wiPntpbnZpdGF0aW9uRGV0YWlsc0dyb29tTmFtZVByZWZpeH08L3NwYW4+PHNwYW4gc3R5bGU9XCJmb250LXNpemU6IDUycHg7XCI+Sjwvc3Bhbj5vc2h1YTxicj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogMThweDtcIj57aW52aXRhdGlvbkRldGFpbHNBbXBlcnNhbmR9PC9zcGFuPjxicj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogMThweDtcIj57aW52aXRhdGlvbkRldGFpbHNCcmlkZU5hbWVQcmVmaXh9PC9zcGFuPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiA1MnB4O1wiPk88L3NwYW4+bGl2aWE8L2gyPlxyXG5cdDxwIHN0eWxlPVwiZm9udC1zaXplOjIwcHg7IGNvbG9yOiByZ2IoMTcwLCAxNzAsIDE3MCk7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udC1mYW1pbHk6ICZxdW90O1NjcmlwdCBNVCZxdW90OywgJnF1b3Q7U2Vnb2Ugc2NyaXB0JnF1b3Q7LCBSYWdlLCAmcXVvdDtMdWNpZGEgSGFuZHdyaXRpbmcmcXVvdDssIGN1cnNpdmUsIFNhdGlzZnk7XCI+e2ludml0YXRpb25EZXRhaWxzTWVzc2FnZX08L3A+XHJcblx0PHRhYmxlIHN0eWxlPVwid2lkdGg6IGF1dG87IG1hcmdpbjogMHB4IGF1dG87IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IHRleHQtYWxpZ246IGNlbnRlcjtcIj5cclxuXHRcdDx0cj5cclxuXHRcdFx0PHRkIHgtYXBwbGUtZGF0YS1kZXRlY3RvcnM9XCJmYWxzZVwiIHN0eWxlPVwiYm9yZGVyLXJpZ2h0OiAzcHggc29saWQgcmdiKDIzOCwgMTg3LCA1MSk7IHBhZGRpbmc6IDE2cHg7IGNvbG9yOiByZ2IoMjIxLCAyMjEsIDIyMSk7IGZvbnQtc2l6ZTogMjRweDtcIj4zOjQ1PC90ZD5cclxuXHRcdFx0PHRkIHgtYXBwbGUtZGF0YS1kZXRlY3RvcnM9XCJmYWxzZVwiIHN0eWxlPVwiYm9yZGVyLXJpZ2h0OiAzcHggc29saWQgcmdiKDIzOCwgMTg3LCA1MSk7IHBhZGRpbmc6IDE2cHg7IGNvbG9yOiByZ2IoMjM4LCAyMzgsIDIzOCk7IGZvbnQtc2l6ZTogNDJweDtcIj57d2VkZGluZ0RhdGV9PC90ZD5cclxuXHRcdFx0PHRkIHgtYXBwbGUtZGF0YS1kZXRlY3RvcnM9XCJmYWxzZVwiIHN0eWxlPVwicGFkZGluZzogMTZweDsgY29sb3I6IHJnYigyMjEsIDIyMSwgMjIxKTsgZm9udC1zaXplOiAyNHB4O1wiPjIwMjQ8L3RkPlxyXG5cdFx0PC90cj5cclxuXHQ8L3RhYmxlPlxyXG5cdDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IG1hcmdpbjogMjBweCBhdXRvOyBmb250LXNpemU6IDI4cHg7IGNvbG9yOnJnYigyMzgsMTg3LDUxKTtcIj5UT1JPTlRPPC9kaXY+XHJcbmA7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==