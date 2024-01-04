"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_home_rsvp-stuff_r"],{

/***/ "./src/home/rsvp-stuff/rsvp-options.ts":
/*!*********************************************!*\
  !*** ./src/home/rsvp-stuff/rsvp-options.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const yes_no_select_1 = __importDefault(__webpack_require__(/*! ./yes-no-select */ "./src/home/rsvp-stuff/yes-no-select.ts"));
const language_1 = __importDefault(__webpack_require__(/*! ./language */ "./src/home/rsvp-stuff/language.ts"));
const clickable_input_1 = __importDefault(__webpack_require__(/*! ./clickable-input */ "./src/home/rsvp-stuff/clickable-input.ts"));
class RsvpOptions extends dothtml_1.DotComponent {
    constructor(guest, isLocked) {
        super(guest);
        this.guest = null;
        this.props = {
            lang: "en",
            attending: true,
            turnoverSelected: true,
            skewerSelected: false,
            peppersSelected: false,
            showSaveTxt: false,
        };
        this.events = {
            "update": (guest) => { }
        };
        dothtml_1.dot.bus.on("language", (lang) => {
            this.props.lang = lang;
        });
        this.isLocked = isLocked;
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
    save() {
        this.events.update(this.guest);
        dothtml_1.dot.css(this.$refs.savedTxt)
            .opacity(1)
            .transition("opacity 0.02s ease");
        setTimeout(() => {
            dothtml_1.dot.css(this.$refs.savedTxt)
                .opacity(0)
                .transition("opacity 2s ease");
            // this.props.showSaveTxt = false;
        }, 1000);
    }
    updateDietaryRestrictions(value) {
        this.guest.DietaryRestrictions = value;
        this.save();
    }
    updatePhoneNumber(value) {
        this.guest.Phone = value;
        this.save();
    }
    updateAlcohol(value) {
        this.guest.DrinksAlcohol = value;
        this.save();
    }
    chooseTurnover() {
        if (this.isLocked)
            return;
        this.props.turnoverSelected = true;
        this.props.skewerSelected = false;
        this.props.peppersSelected = false;
        this.guest.MealMainSelectionId = "turnover";
        this.save();
    }
    chooseSkewer() {
        if (this.isLocked)
            return;
        this.props.turnoverSelected = false;
        this.props.skewerSelected = true;
        this.props.peppersSelected = false;
        this.guest.MealMainSelectionId = "skewer";
        this.save();
    }
    choosePeppers() {
        if (this.isLocked)
            return;
        this.props.turnoverSelected = false;
        this.props.skewerSelected = false;
        this.props.peppersSelected = true;
        this.guest.MealMainSelectionId = "peppers";
        this.save();
    }
    builder(guest) {
        this.guest = guest;
        // this.props.name = guest.Name;
        // this.props.email = guest.Email;
        let attending = this.guest.RsvpStatus == "CONFIRMED";
        // this.props.attending = this.guest.RsvpStatus == "CONFIRMED";
        this.rsvpButton = new yes_no_select_1.default(attending, this.isLocked);
        this.guest.MealMainSelectionId = this.guest.MealMainSelectionId || "turnover";
        this.props.turnoverSelected = this.guest.MealMainSelectionId == "turnover";
        this.props.skewerSelected = this.guest.MealMainSelectionId == "skewer";
        this.props.peppersSelected = this.guest.MealMainSelectionId == "peppers";
        this.rsvpButton.on("change", (value) => {
            if (this.isLocked)
                return;
            // this.props.attending = value;
            attending = value;
            // if(value){
            // 	// this.$updateStyles();
            // }
            this.$refs.isAttending.style.display = value ? "block" : "none";
            this.$refs.isNotAttending.style.display = !value ? "block" : "none";
            this.guest.RsvpStatus = value ? "CONFIRMED" : "DECLINED";
            this.save();
        });
        this.alcoholButton = new yes_no_select_1.default(true, this.isLocked);
        this.dietaryRestrictions = new clickable_input_1.default(this.guest.DietaryRestrictions, this.isLocked);
        this.dietaryRestrictions.on("save", (value) => {
            this.updateDietaryRestrictions(value);
        });
        // this.phoneField = new ClickableInput(this.guest.Phone);
        // this.phoneField.on("save", (value)=>{this.updatePhoneNumber(value);});
        return dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.div(this.getStr("guestHeader", [this.guest.FullName])).class("guest-name")
            .div(this.getStr("savedConfirmation")).class({
            "saved-txt": true,
            "hide": () => !this.props.showSaveTxt,
            "show": () => this.props.showSaveTxt
        }).ref("savedTxt")
            .div(this.getStr("attendingLabel"))
            .div(this.rsvpButton)).class("header")
            .div(dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.b(this.getStr("mealSelectionHeader")).class("subheader")
            .div(dothtml_1.dot.div(this.getStr("chooseMainCourse"))
            .div(dothtml_1.dot.button(guest.FullName == "Luca Sideris" ? "Leafs and Twigs" : this.getStr("veggieFiloTurnoverConcise")).onClick(() => this.chooseTurnover()).class({
            "select-meal-btn": true,
            selected: () => this.props.turnoverSelected
        })
            .button(guest.FullName == "Luca Sideris" ? "Cold Tofu" : this.getStr("vegetableTikkaSkewerConcise")).onClick(() => this.chooseSkewer()).class({
            "select-meal-btn": true,
            selected: () => this.props.skewerSelected
        })
            .button(guest.FullName == "Luca Sideris" ? "Soylent Green Smoothie" : this.getStr("veganRiceStuffedPeppersConcise")).onClick(() => this.choosePeppers()).class({
            "select-meal-btn": true,
            selected: () => this.props.peppersSelected
        })).class("meal-btns"))).class({ "hidden2": () => this.guest.IsChild }))
            .b(this.getStr("preferencesHeader")).class("subheader")
            .div(dothtml_1.dot.span(this.getStr("allergiesDietaryRestrictions"))
            .br()
            .h(this.dietaryRestrictions))
            .div(dothtml_1.dot.input()
            // .value(this.guest.DrinksAlcohol)
            .class({
            "alcohol-check": true,
            "hidden2": !!this.guest.IsChild
        })
            .type("checkbox")
            .disabled(this.isLocked)
            .onChange((e) => this.updateAlcohol(e.target.checked))
            .ref("drinksAlcohol")
            .label(this.getStr("expectDrinkingAlcohol")))
        // .b(this.getStr("contactInfoHeader")).class("subheader")
        // .div(
        // 	dot.span(this.getStr("phoneLabel"))
        // 	.br()
        // 	.h(this.phoneField)
        // )
        ).ref("isAttending")
            .i(this.getStr("notAttending")).ref("isNotAttending")
        // .when(()=>!this.props.attending, ()=>{
        // })
        ).class("options")).class("rsvp-options");
    }
    ready() {
        this.$refs.drinksAlcohol.checked = this.guest.DrinksAlcohol;
    }
    style(css) {
        // return;
        css(".hidden2")
            .display("none");
        css(".rsvp-options")
            .marginBottom(20);
        css(".header")
            .display("flex")
            .flexDirection("row")
            .padding(10)
            .backgroundColor(20, 20, 20, 0.8)
            .borderTopLeftRadius(5)
            .borderTopRightRadius(5)
            .fontSize(20);
        css(".guest-name")
            .flexGrow(10);
        css(".saved-txt")
            .flexGrow(1)
            .color("green")
            .fontWeight("bold");
        css(".saved-txt.hide")
            .opacity(0)
            .transition("opacity 2s ease");
        css(".saved-txt.show")
            .opacity(1)
            .transition("opacity 0.02s ease");
        css(".options")
            .flexDirection("row")
            .padding(10)
            .backgroundColor(255, 255, 255, 0.3)
            .borderBottomLeftRadius(5)
            .borderBottomRightRadius(5)
            .color("#111");
        css(".subheader")
            .display("block")
            .fontWeight("bold")
            .fontSize(18)
            .marginTop(10)
            .marginBottom(10);
        css(".meal-btns")
            .display("flex")
            .flexWrap("wrap")
            .gap(10)
            .justifyContent("space-evenly")
            .widthP(100);
        css(".select-meal-btn")
            .width(300)
            // .display("block")
            .margin(5)
            .padding(5)
            .marginLeft(10)
            .cursor("pointer")
            .borderRadius(5)
            .color("gold")
            .backgroundColor("#222")
            .transition("color 0.3s, background-color 0.3s ease");
        css(".select-meal-btn.selected")
            .color("black")
            .backgroundColor("gold")
            .fontWeight("bold");
        css(".alcohol-check")
            .marginRight(10)
            .width(16).height(16);
        css("label")
            .position("relative")
            .lineHeight(22)
            .height(22)
            .display("inline-block")
            .top(-3);
        css(this.$refs.isAttending).display(this.guest.RsvpStatus == "CONFIRMED" ? "block" : "none");
        css(this.$refs.isNotAttending).display(this.guest.RsvpStatus != "CONFIRMED" ? "block" : "none");
    }
}
exports["default"] = RsvpOptions;


/***/ }),

/***/ "./src/home/rsvp-stuff/unsubscribe-pane.ts":
/*!*************************************************!*\
  !*** ./src/home/rsvp-stuff/unsubscribe-pane.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const page_section_1 = __importDefault(__webpack_require__(/*! ../page-section */ "./src/home/page-section.ts"));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
class UnsubscribePane extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {
            unsubbed: false
        };
    }
    async unsub() {
        (0, dothtml_1.dot)(this.$refs.buttons).empty().p("You will be unsubscribed from further communication. Contact the bride or the groom if this was done in error. ").a("Back to site.").hRef(window.location.href.split("#")[0]);
        this.$updateStyles();
        let result = await fetch(`https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/update-guest-status`, {
            method: "POST",
            body: JSON.stringify({
                guestId: window.location.hash.split("_")[1],
                unsubscribe: true
            })
        });
    }
    goBack() {
        window.location.href = window.location.href.split("#")[0];
    }
    builder() {
        return super.builder(dothtml_1.dot.h1("Unsubscribe")
            .p("Are you sure you want to unsubscribe? If you do, you won't receive further notifications. This will not affect your RSVP status.")
            .br().br()
            .div(dothtml_1.dot.button("Yes, unsubscribe!").onClick(() => this.unsub())
            .br().br()
            .button("No, take me back!").onClick(() => this.goBack())).ref("buttons"));
    }
    style(css) {
        super.style(css);
        css("button").fontSize(36).cursor("pointer");
        css("a").color("#DDF");
    }
}
exports["default"] = UnsubscribePane;


/***/ }),

/***/ "./src/home/rsvp-stuff/yes-no-select.ts":
/*!**********************************************!*\
  !*** ./src/home/rsvp-stuff/yes-no-select.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const language_1 = __importDefault(__webpack_require__(/*! ./language */ "./src/home/rsvp-stuff/language.ts"));
class YesNoSelect extends dothtml_1.DotComponent {
    constructor(defaultValue, isLocked) {
        super(defaultValue);
        this.props = {
            selected: false,
            lang: "en", // localStorage.getItem("lang") || "en",
        };
        this.events = {
            "change": () => { }
        };
        this.isLocked = false;
        this.isLocked = isLocked;
        dothtml_1.dot.bus.on("language", (lang) => {
            this.props.lang = lang;
        });
    }
    getStr(str) {
        return () => language_1.default[str][this.props.lang];
    }
    change() {
        if (this.isLocked)
            return;
        this.props.selected = !this.props.selected;
        this.events.change(this.props.selected);
    }
    builder(defaultValue) {
        this.props.selected = defaultValue;
        return dothtml_1.dot.div(dothtml_1.dot.div(() => this.props.selected ? this.getStr("yesNoBtnYes") : this.getStr("yesNoBtnNo")).class({ "inner-btn": true, yes: () => this.props.selected, no: () => !this.props.selected })).class("yes-no-btn").onClick(() => { this.change(); });
    }
    style(css) {
        css(".yes-no-btn")
            .position("relative")
            .borderRadius(5)
            .padding(3)
            .fontSize(14)
            .marginLeft(10)
            .width(40)
            .border("1px solid white")
            .cursor("pointer")
            .textAlign("center");
        css(".inner-btn")
            .transition("background-color 0.5s");
        css(".yes")
            .backgroundColor("green");
        css(".no")
            .backgroundColor("#444");
    }
}
exports["default"] = YesNoSelect;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfaG9tZV9yc3ZwLXN0dWZmX3IuMjQ0NTVkMmE3ZGYwNjljYTQyNTEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4RkFBa0U7QUFDbEUsOEhBQTBDO0FBRTFDLCtHQUFrQztBQUNsQyxvSUFBK0M7QUFHL0MsTUFBcUIsV0FBWSxTQUFRLHNCQUFZO0lBdUJwRCxZQUFZLEtBQVksRUFBRSxRQUFpQjtRQUMxQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUF0QmQsVUFBSyxHQUFVLElBQUksQ0FBQztRQUVwQixVQUFLLEdBQTRCO1lBQ2hDLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFdBQVcsRUFBRSxLQUFLO1NBQ2xCLENBQUM7UUFFRixXQUFNLEdBQUc7WUFDUixRQUFRLEVBQUUsQ0FBQyxLQUFZLEVBQUMsRUFBRSxHQUFDLENBQUM7U0FDNUI7UUFXQSxhQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQTRCLEVBQUUsSUFBbUM7UUFDdkUsT0FBTyxHQUFFLEVBQUU7WUFDVixJQUFJLEtBQUssR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsSUFBRyxJQUFJLEVBQUM7Z0JBQ1AsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JB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LENBQUMsU0FBUyxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFFckIsR0FBRyxDQUFDLFlBQVksQ0FBQzthQUNmLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQztRQUVyQyxHQUFHLENBQUMsTUFBTSxDQUFDO2FBQ1QsZUFBZSxDQUFDLE9BQU8sQ0FBQztRQUUxQixHQUFHLENBQUMsS0FBSyxDQUFDO2FBQ1IsZUFBZSxDQUFDLE1BQU0sQ0FBQztJQUMxQixDQUFDO0NBQ0Q7QUE3REQsaUNBNkRDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VkZGluZy13ZWJzaXRlLy4vc3JjL2hvbWUvcnN2cC1zdHVmZi9yc3ZwLW9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vd2VkZGluZy13ZWJzaXRlLy4vc3JjL2hvbWUvcnN2cC1zdHVmZi91bnN1YnNjcmliZS1wYW5lLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL3JzdnAtc3R1ZmYveWVzLW5vLXNlbGVjdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb3RDb21wb25lbnQsIElEb3RDc3MsIElEb3RFbGVtZW50LCBkb3QgfSBmcm9tIFwiZG90aHRtbFwiO1xyXG5pbXBvcnQgWWVzTm9TZWxlY3QgZnJvbSBcIi4veWVzLW5vLXNlbGVjdFwiO1xyXG5pbXBvcnQgeyBHdWVzdCB9IGZyb20gXCIuL2d1ZXN0XCI7XHJcbmltcG9ydCBsYW5ndWFnZSBmcm9tIFwiLi9sYW5ndWFnZVwiO1xyXG5pbXBvcnQgQ2xpY2thYmxlSW5wdXQgZnJvbSBcIi4vY2xpY2thYmxlLWlucHV0XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnN2cE9wdGlvbnMgZXh0ZW5kcyBEb3RDb21wb25lbnR7XHJcblxyXG5cdGd1ZXN0OiBHdWVzdCA9IG51bGw7XHJcblxyXG5cdHByb3BzOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfSA9IHtcclxuXHRcdGxhbmc6IFwiZW5cIiwvL2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGFuZ1wiKSB8fCBcImVuXCIsXHJcblx0XHRhdHRlbmRpbmc6IHRydWUsXHJcblx0XHR0dXJub3ZlclNlbGVjdGVkOiB0cnVlLFxyXG5cdFx0c2tld2VyU2VsZWN0ZWQ6IGZhbHNlLFxyXG5cdFx0cGVwcGVyc1NlbGVjdGVkOiBmYWxzZSxcclxuXHRcdHNob3dTYXZlVHh0OiBmYWxzZSxcclxuXHR9O1xyXG5cclxuXHRldmVudHMgPSB7XHJcblx0XHRcInVwZGF0ZVwiOiAoZ3Vlc3Q6IEd1ZXN0KT0+e31cclxuXHR9XHJcblxyXG5cdHJzdnBCdXR0b246IFllc05vU2VsZWN0O1xyXG5cdGFsY29ob2xCdXR0b246IFllc05vU2VsZWN0O1xyXG5cdGRpZXRhcnlSZXN0cmljdGlvbnM6IENsaWNrYWJsZUlucHV0O1xyXG5cdHBob25lRmllbGQ6IGFueTtcclxuXHRpc0xvY2tlZDogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IoZ3Vlc3Q6IEd1ZXN0LCBpc0xvY2tlZDogYm9vbGVhbil7XHJcblx0XHRzdXBlcihndWVzdCk7XHJcblxyXG5cdFx0ZG90LmJ1cy5vbihcImxhbmd1YWdlXCIsIChsYW5nKT0+e1xyXG5cdFx0XHR0aGlzLnByb3BzLmxhbmcgPSBsYW5nO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5pc0xvY2tlZCA9IGlzTG9ja2VkO1xyXG5cdH1cclxuXHJcblx0Z2V0U3RyKHN0cjoga2V5b2YgKHR5cGVvZiBsYW5ndWFnZSksIGFyZ3M/OiBBcnJheTxzdHJpbmd8bnVtYmVyfGJvb2xlYW4+KXtcclxuXHRcdHJldHVybiAoKT0+e1xyXG5cdFx0XHRsZXQgZmluYWwgPSBsYW5ndWFnZVtzdHJdW3RoaXMucHJvcHMubGFuZ107XHJcblx0XHRcdGlmKGFyZ3Mpe1xyXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdGZpbmFsID0gZmluYWwuc3BsaXQoYHske2l9fWApLmpvaW4oYXJnc1tpXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmaW5hbDtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRzYXZlKCl7XHJcblx0XHR0aGlzLmV2ZW50cy51cGRhdGUodGhpcy5ndWVzdCk7XHJcblxyXG5cdFx0ZG90LmNzcyh0aGlzLiRyZWZzLnNhdmVkVHh0KVxyXG5cdFx0XHQub3BhY2l0eSgxKVxyXG5cdFx0XHQudHJhbnNpdGlvbihcIm9wYWNpdHkgMC4wMnMgZWFzZVwiKVxyXG5cdFx0XHJcblx0XHRzZXRUaW1lb3V0KCgpPT57XHJcblx0XHRcdGRvdC5jc3ModGhpcy4kcmVmcy5zYXZlZFR4dClcclxuXHRcdFx0XHQub3BhY2l0eSgwKVxyXG5cdFx0XHRcdC50cmFuc2l0aW9uKFwib3BhY2l0eSAycyBlYXNlXCIpXHJcblx0XHRcdC8vIHRoaXMucHJvcHMuc2hvd1NhdmVUeHQgPSBmYWxzZTtcclxuXHJcblx0XHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZURpZXRhcnlSZXN0cmljdGlvbnModmFsdWU6IHN0cmluZyl7XHJcblx0XHR0aGlzLmd1ZXN0LkRpZXRhcnlSZXN0cmljdGlvbnMgPSB2YWx1ZTtcclxuXHRcdHRoaXMuc2F2ZSgpO1xyXG5cdH1cclxuXHR1cGRhdGVQaG9uZU51bWJlcih2YWx1ZTogc3RyaW5nKXtcclxuXHRcdHRoaXMuZ3Vlc3QuUGhvbmUgPSB2YWx1ZTtcclxuXHRcdHRoaXMuc2F2ZSgpO1xyXG5cdH1cclxuXHR1cGRhdGVBbGNvaG9sKHZhbHVlOiBib29sZWFuKXtcclxuXHRcdHRoaXMuZ3Vlc3QuRHJpbmtzQWxjb2hvbCA9IHZhbHVlO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0fVxyXG5cclxuXHRjaG9vc2VUdXJub3Zlcigpe1xyXG5cdFx0aWYodGhpcy5pc0xvY2tlZCkgcmV0dXJuO1xyXG5cdFx0dGhpcy5wcm9wcy50dXJub3ZlclNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMucHJvcHMuc2tld2VyU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMucHJvcHMucGVwcGVyc1NlbGVjdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPSBcInR1cm5vdmVyXCI7XHJcblx0XHR0aGlzLnNhdmUoKTtcclxuXHR9XHJcblxyXG5cdGNob29zZVNrZXdlcigpe1xyXG5cdFx0aWYodGhpcy5pc0xvY2tlZCkgcmV0dXJuO1xyXG5cdFx0dGhpcy5wcm9wcy50dXJub3ZlclNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLnByb3BzLnNrZXdlclNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMucHJvcHMucGVwcGVyc1NlbGVjdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPSBcInNrZXdlclwiO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0fVxyXG5cclxuXHRjaG9vc2VQZXBwZXJzKCl7XHJcblx0XHRpZih0aGlzLmlzTG9ja2VkKSByZXR1cm47XHJcblx0XHR0aGlzLnByb3BzLnR1cm5vdmVyU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMucHJvcHMuc2tld2VyU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMucHJvcHMucGVwcGVyc1NlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdHRoaXMuZ3Vlc3QuTWVhbE1haW5TZWxlY3Rpb25JZCA9IFwicGVwcGVyc1wiO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0fVxyXG5cclxuXHRidWlsZGVyKGd1ZXN0OiBHdWVzdCk6IElEb3RFbGVtZW50IHtcclxuXHJcblx0XHR0aGlzLmd1ZXN0ID0gZ3Vlc3Q7XHJcblx0XHQvLyB0aGlzLnByb3BzLm5hbWUgPSBndWVzdC5OYW1lO1xyXG5cdFx0Ly8gdGhpcy5wcm9wcy5lbWFpbCA9IGd1ZXN0LkVtYWlsO1xyXG5cclxuXHRcdGxldCBhdHRlbmRpbmcgPSB0aGlzLmd1ZXN0LlJzdnBTdGF0dXMgPT0gXCJDT05GSVJNRURcIjtcclxuXHRcdC8vIHRoaXMucHJvcHMuYXR0ZW5kaW5nID0gdGhpcy5ndWVzdC5Sc3ZwU3RhdHVzID09IFwiQ09ORklSTUVEXCI7XHJcblx0XHR0aGlzLnJzdnBCdXR0b24gPSBuZXcgWWVzTm9TZWxlY3QoYXR0ZW5kaW5nLCB0aGlzLmlzTG9ja2VkKTtcclxuXHJcblx0XHR0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPSB0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgfHwgXCJ0dXJub3ZlclwiO1xyXG5cclxuXHRcdHRoaXMucHJvcHMudHVybm92ZXJTZWxlY3RlZCA9IHRoaXMuZ3Vlc3QuTWVhbE1haW5TZWxlY3Rpb25JZCA9PSBcInR1cm5vdmVyXCI7XHJcblx0XHR0aGlzLnByb3BzLnNrZXdlclNlbGVjdGVkID0gdGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID09IFwic2tld2VyXCI7XHJcblx0XHR0aGlzLnByb3BzLnBlcHBlcnNTZWxlY3RlZCA9IHRoaXMuZ3Vlc3QuTWVhbE1haW5TZWxlY3Rpb25JZCA9PSBcInBlcHBlcnNcIjtcclxuXHJcblx0XHR0aGlzLnJzdnBCdXR0b24ub24oXCJjaGFuZ2VcIiwgKHZhbHVlKT0+e1xyXG5cdFx0XHRpZih0aGlzLmlzTG9ja2VkKSByZXR1cm47XHJcblx0XHRcdC8vIHRoaXMucHJvcHMuYXR0ZW5kaW5nID0gdmFsdWU7XHJcblx0XHRcdGF0dGVuZGluZyA9IHZhbHVlO1xyXG5cdFx0XHQvLyBpZih2YWx1ZSl7XHJcblx0XHRcdC8vIFx0Ly8gdGhpcy4kdXBkYXRlU3R5bGVzKCk7XHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHRcdHRoaXMuJHJlZnMuaXNBdHRlbmRpbmcuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gXCJibG9ja1wiIDogXCJub25lXCI7XHJcblx0XHRcdHRoaXMuJHJlZnMuaXNOb3RBdHRlbmRpbmcuc3R5bGUuZGlzcGxheSA9ICF2YWx1ZSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xyXG5cclxuXHRcdFx0dGhpcy5ndWVzdC5Sc3ZwU3RhdHVzID0gdmFsdWUgPyBcIkNPTkZJUk1FRFwiIDogXCJERUNMSU5FRFwiO1xyXG5cclxuXHRcdFx0dGhpcy5zYXZlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFsY29ob2xCdXR0b24gPSBuZXcgWWVzTm9TZWxlY3QodHJ1ZSwgdGhpcy5pc0xvY2tlZCk7XHJcblx0XHR0aGlzLmRpZXRhcnlSZXN0cmljdGlvbnMgPSBuZXcgQ2xpY2thYmxlSW5wdXQodGhpcy5ndWVzdC5EaWV0YXJ5UmVzdHJpY3Rpb25zLCB0aGlzLmlzTG9ja2VkKTtcclxuXHRcdHRoaXMuZGlldGFyeVJlc3RyaWN0aW9ucy5vbihcInNhdmVcIiwgKHZhbHVlKT0+e1xyXG5cdFx0XHR0aGlzLnVwZGF0ZURpZXRhcnlSZXN0cmljdGlvbnModmFsdWUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gdGhpcy5waG9uZUZpZWxkID0gbmV3IENsaWNrYWJsZUlucHV0KHRoaXMuZ3Vlc3QuUGhvbmUpO1xyXG5cdFx0Ly8gdGhpcy5waG9uZUZpZWxkLm9uKFwic2F2ZVwiLCAodmFsdWUpPT57dGhpcy51cGRhdGVQaG9uZU51bWJlcih2YWx1ZSk7fSk7XHJcblxyXG5cdFx0cmV0dXJuIGRvdC5kaXYoXHJcblx0XHRcdGRvdC5kaXYoXHJcblx0XHRcdFx0ZG90LmRpdih0aGlzLmdldFN0cihcImd1ZXN0SGVhZGVyXCIsIFt0aGlzLmd1ZXN0LkZ1bGxOYW1lXSkpLmNsYXNzKFwiZ3Vlc3QtbmFtZVwiKVxyXG5cdFx0XHRcdC5kaXYodGhpcy5nZXRTdHIoXCJzYXZlZENvbmZpcm1hdGlvblwiKSkuY2xhc3Moe1xyXG5cdFx0XHRcdFx0XCJzYXZlZC10eHRcIjogdHJ1ZSxcclxuXHRcdFx0XHRcdFwiaGlkZVwiOiAoKT0+IXRoaXMucHJvcHMuc2hvd1NhdmVUeHQsXHJcblx0XHRcdFx0XHRcInNob3dcIjogKCk9PnRoaXMucHJvcHMuc2hvd1NhdmVUeHRcclxuXHRcdFx0XHR9KS5yZWYoXCJzYXZlZFR4dFwiKVxyXG5cdFx0XHRcdC5kaXYodGhpcy5nZXRTdHIoXCJhdHRlbmRpbmdMYWJlbFwiKSlcclxuXHRcdFx0XHQuZGl2KHRoaXMucnN2cEJ1dHRvbilcclxuXHRcdFx0KS5jbGFzcyhcImhlYWRlclwiKVxyXG5cdFx0XHQuZGl2KFxyXG5cclxuXHRcdFx0XHRkb3QuZGl2KFxyXG5cdFx0XHRcdFx0ZG90LmRpdihcclxuXHRcdFx0XHRcdFx0ZG90LmRpdihcclxuXHRcdFx0XHRcdFx0XHRkb3QuYih0aGlzLmdldFN0cihcIm1lYWxTZWxlY3Rpb25IZWFkZXJcIikpLmNsYXNzKFwic3ViaGVhZGVyXCIpXHJcblx0XHRcdFx0XHRcdFx0LmRpdihcclxuXHRcdFx0XHRcdFx0XHRcdGRvdC5kaXYodGhpcy5nZXRTdHIoXCJjaG9vc2VNYWluQ291cnNlXCIpKVxyXG5cdFx0XHRcdFx0XHRcdFx0LmRpdihcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZG90LmJ1dHRvbihndWVzdC5GdWxsTmFtZSA9PSBcIkx1Y2EgU2lkZXJpc1wiID8gXCJMZWFmcyBhbmQgVHdpZ3NcIiA6IHRoaXMuZ2V0U3RyKFwidmVnZ2llRmlsb1R1cm5vdmVyQ29uY2lzZVwiKSkub25DbGljaygoKT0+dGhpcy5jaG9vc2VUdXJub3ZlcigpKS5jbGFzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJzZWxlY3QtbWVhbC1idG5cIjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZDogKCk9PnRoaXMucHJvcHMudHVybm92ZXJTZWxlY3RlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuYnV0dG9uKGd1ZXN0LkZ1bGxOYW1lID09IFwiTHVjYSBTaWRlcmlzXCIgPyBcIkNvbGQgVG9mdVwiIDogdGhpcy5nZXRTdHIoXCJ2ZWdldGFibGVUaWtrYVNrZXdlckNvbmNpc2VcIikpLm9uQ2xpY2soKCk9PnRoaXMuY2hvb3NlU2tld2VyKCkpLmNsYXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcInNlbGVjdC1tZWFsLWJ0blwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkOiAoKT0+dGhpcy5wcm9wcy5za2V3ZXJTZWxlY3RlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuYnV0dG9uKGd1ZXN0LkZ1bGxOYW1lID09IFwiTHVjYSBTaWRlcmlzXCIgPyBcIlNveWxlbnQgR3JlZW4gU21vb3RoaWVcIiA6IHRoaXMuZ2V0U3RyKFwidmVnYW5SaWNlU3R1ZmZlZFBlcHBlcnNDb25jaXNlXCIpKS5vbkNsaWNrKCgpPT50aGlzLmNob29zZVBlcHBlcnMoKSkuY2xhc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwic2VsZWN0LW1lYWwtYnRuXCI6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ6ICgpPT50aGlzLnByb3BzLnBlcHBlcnNTZWxlY3RlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0KS5jbGFzcyhcIm1lYWwtYnRuc1wiKVxyXG5cdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0KS5jbGFzcyh7XCJoaWRkZW4yXCI6ICgpPT50aGlzLmd1ZXN0LklzQ2hpbGR9KVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0LmIodGhpcy5nZXRTdHIoXCJwcmVmZXJlbmNlc0hlYWRlclwiKSkuY2xhc3MoXCJzdWJoZWFkZXJcIilcclxuXHRcdFx0XHRcdC5kaXYoXHJcblx0XHRcdFx0XHRcdGRvdC5zcGFuKHRoaXMuZ2V0U3RyKFwiYWxsZXJnaWVzRGlldGFyeVJlc3RyaWN0aW9uc1wiKSlcclxuXHRcdFx0XHRcdFx0LmJyKClcclxuXHRcdFx0XHRcdFx0LmgodGhpcy5kaWV0YXJ5UmVzdHJpY3Rpb25zKVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0LmRpdihcclxuXHRcdFx0XHRcdFx0ZG90LmlucHV0KClcclxuXHRcdFx0XHRcdFx0XHQvLyAudmFsdWUodGhpcy5ndWVzdC5Ecmlua3NBbGNvaG9sKVxyXG5cdFx0XHRcdFx0XHRcdC5jbGFzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcImFsY29ob2wtY2hlY2tcIjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFwiaGlkZGVuMlwiOiAhIXRoaXMuZ3Vlc3QuSXNDaGlsZFxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0LnR5cGUoXCJjaGVja2JveFwiKVxyXG5cdFx0XHRcdFx0XHRcdC5kaXNhYmxlZCh0aGlzLmlzTG9ja2VkKVxyXG5cdFx0XHRcdFx0XHRcdC5vbkNoYW5nZSgoZSk9PnRoaXMudXBkYXRlQWxjb2hvbCgoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCkpXHJcblx0XHRcdFx0XHRcdFx0LnJlZihcImRyaW5rc0FsY29ob2xcIilcclxuXHRcdFx0XHRcdFx0LmxhYmVsKHRoaXMuZ2V0U3RyKFwiZXhwZWN0RHJpbmtpbmdBbGNvaG9sXCIpKVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0Ly8gLmIodGhpcy5nZXRTdHIoXCJjb250YWN0SW5mb0hlYWRlclwiKSkuY2xhc3MoXCJzdWJoZWFkZXJcIilcclxuXHRcdFx0XHRcdC8vIC5kaXYoXHJcblx0XHRcdFx0XHQvLyBcdGRvdC5zcGFuKHRoaXMuZ2V0U3RyKFwicGhvbmVMYWJlbFwiKSlcclxuXHRcdFx0XHRcdC8vIFx0LmJyKClcclxuXHRcdFx0XHRcdC8vIFx0LmgodGhpcy5waG9uZUZpZWxkKVxyXG5cdFx0XHRcdFx0Ly8gKVxyXG5cdFx0XHRcdCkucmVmKFwiaXNBdHRlbmRpbmdcIilcclxuXHJcblx0XHRcdFx0LmkodGhpcy5nZXRTdHIoXCJub3RBdHRlbmRpbmdcIikpLnJlZihcImlzTm90QXR0ZW5kaW5nXCIpXHJcblx0XHRcdFx0Ly8gLndoZW4oKCk9PiF0aGlzLnByb3BzLmF0dGVuZGluZywgKCk9PntcclxuXHRcdFx0XHQvLyB9KVxyXG5cdFx0XHQpLmNsYXNzKFwib3B0aW9uc1wiKVxyXG5cdFx0KS5jbGFzcyhcInJzdnAtb3B0aW9uc1wiKTtcclxuXHR9XHJcblxyXG5cdHJlYWR5KCl7XHJcblx0XHQodGhpcy4kcmVmcy5kcmlua3NBbGNvaG9sIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQgPSB0aGlzLmd1ZXN0LkRyaW5rc0FsY29ob2w7XHJcblx0fVxyXG5cclxuXHRzdHlsZShjc3M6IElEb3RDc3MpOiB2b2lkIHtcclxuXHRcdC8vIHJldHVybjtcclxuXHRcdGNzcyhcIi5oaWRkZW4yXCIpXHJcblx0XHRcdC5kaXNwbGF5KFwibm9uZVwiKTtcclxuXHJcblx0XHRjc3MoXCIucnN2cC1vcHRpb25zXCIpXHJcblx0XHRcdC5tYXJnaW5Cb3R0b20oMjApXHJcblxyXG5cdFx0Y3NzKFwiLmhlYWRlclwiKVxyXG5cdFx0XHQuZGlzcGxheShcImZsZXhcIilcclxuXHRcdFx0LmZsZXhEaXJlY3Rpb24oXCJyb3dcIilcclxuXHRcdFx0LnBhZGRpbmcoMTApXHJcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMjAsMjAsMjAsMC44KVxyXG5cdFx0XHQuYm9yZGVyVG9wTGVmdFJhZGl1cyg1KVxyXG5cdFx0XHQuYm9yZGVyVG9wUmlnaHRSYWRpdXMoNSlcclxuXHRcdFx0LmZvbnRTaXplKDIwKVxyXG5cdFx0XHRcclxuXHRcdGNzcyhcIi5ndWVzdC1uYW1lXCIpXHJcblx0XHRcdC5mbGV4R3JvdygxMClcclxuXHJcblx0XHRjc3MoXCIuc2F2ZWQtdHh0XCIpXHJcblx0XHRcdC5mbGV4R3JvdygxKVxyXG5cdFx0XHQuY29sb3IoXCJncmVlblwiKVxyXG5cdFx0XHQuZm9udFdlaWdodChcImJvbGRcIilcclxuXHJcblx0XHRjc3MoXCIuc2F2ZWQtdHh0LmhpZGVcIilcclxuXHRcdFx0Lm9wYWNpdHkoMClcclxuXHRcdFx0LnRyYW5zaXRpb24oXCJvcGFjaXR5IDJzIGVhc2VcIilcclxuXHRcdGNzcyhcIi5zYXZlZC10eHQuc2hvd1wiKVxyXG5cdFx0XHQub3BhY2l0eSgxKVxyXG5cdFx0XHQudHJhbnNpdGlvbihcIm9wYWNpdHkgMC4wMnMgZWFzZVwiKVxyXG5cdFx0XHJcblx0XHRjc3MoXCIub3B0aW9uc1wiKVxyXG5cdFx0XHQuZmxleERpcmVjdGlvbihcInJvd1wiKVxyXG5cdFx0XHQucGFkZGluZygxMClcclxuXHRcdFx0LmJhY2tncm91bmRDb2xvcigyNTUsMjU1LDI1NSwwLjMpXHJcblx0XHRcdC5ib3JkZXJCb3R0b21MZWZ0UmFkaXVzKDUpXHJcblx0XHRcdC5ib3JkZXJCb3R0b21SaWdodFJhZGl1cyg1KVxyXG5cdFx0XHQuY29sb3IoXCIjMTExXCIpXHJcblxyXG5cdFx0Y3NzKFwiLnN1YmhlYWRlclwiKVxyXG5cdFx0XHQuZGlzcGxheShcImJsb2NrXCIpXHJcblx0XHRcdC5mb250V2VpZ2h0KFwiYm9sZFwiKVxyXG5cdFx0XHQuZm9udFNpemUoMTgpXHJcblx0XHRcdC5tYXJnaW5Ub3AoMTApXHJcblx0XHRcdC5tYXJnaW5Cb3R0b20oMTApXHJcblxyXG5cdFx0Y3NzKFwiLm1lYWwtYnRuc1wiKVxyXG5cdFx0XHQuZGlzcGxheShcImZsZXhcIilcclxuXHRcdFx0LmZsZXhXcmFwKFwid3JhcFwiKVxyXG5cdFx0XHQuZ2FwKDEwKVxyXG5cdFx0XHQuanVzdGlmeUNvbnRlbnQoXCJzcGFjZS1ldmVubHlcIilcclxuXHRcdFx0LndpZHRoUCgxMDApXHJcblxyXG5cdFx0Y3NzKFwiLnNlbGVjdC1tZWFsLWJ0blwiKVxyXG5cdFx0XHQud2lkdGgoMzAwKVxyXG5cdFx0XHQvLyAuZGlzcGxheShcImJsb2NrXCIpXHJcblx0XHRcdC5tYXJnaW4oNSlcclxuXHRcdFx0LnBhZGRpbmcoNSlcclxuXHRcdFx0Lm1hcmdpbkxlZnQoMTApXHJcblx0XHRcdC5jdXJzb3IoXCJwb2ludGVyXCIpXHJcblx0XHRcdC5ib3JkZXJSYWRpdXMoNSlcclxuXHRcdFx0LmNvbG9yKFwiZ29sZFwiKVxyXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKFwiIzIyMlwiKVxyXG5cdFx0XHQudHJhbnNpdGlvbihcImNvbG9yIDAuM3MsIGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlXCIpXHJcblx0XHRcdFxyXG5cdFx0Y3NzKFwiLnNlbGVjdC1tZWFsLWJ0bi5zZWxlY3RlZFwiKVxyXG5cdFx0XHQuY29sb3IoXCJibGFja1wiKVxyXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKFwiZ29sZFwiKVxyXG5cdFx0XHQuZm9udFdlaWdodChcImJvbGRcIilcclxuXHJcblx0XHRjc3MoXCIuYWxjb2hvbC1jaGVja1wiKVxyXG5cdFx0XHQubWFyZ2luUmlnaHQoMTApXHJcblx0XHRcdC53aWR0aCgxNikuaGVpZ2h0KDE2KVxyXG5cclxuXHRcdGNzcyhcImxhYmVsXCIpXHJcblx0XHRcdC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXHJcblx0XHRcdC5saW5lSGVpZ2h0KDIyKVxyXG5cdFx0XHQuaGVpZ2h0KDIyKVxyXG5cdFx0XHQuZGlzcGxheShcImlubGluZS1ibG9ja1wiKVxyXG5cdFx0XHQudG9wKC0zKVxyXG5cdFx0Y3NzKHRoaXMuJHJlZnMuaXNBdHRlbmRpbmcpLmRpc3BsYXkodGhpcy5ndWVzdC5Sc3ZwU3RhdHVzID09IFwiQ09ORklSTUVEXCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIik7XHJcblx0XHRjc3ModGhpcy4kcmVmcy5pc05vdEF0dGVuZGluZykuZGlzcGxheSh0aGlzLmd1ZXN0LlJzdnBTdGF0dXMgIT0gXCJDT05GSVJNRURcIiA/IFwiYmxvY2tcIiA6IFwibm9uZVwiKTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgeyBJRG90R2VuZXJpY0VsZW1lbnQgfSBmcm9tIFwiZG90aHRtbC9saWIvaS1kb3RcIjtcclxuaW1wb3J0IFBhZ2VTZWN0aW9uIGZyb20gXCIuLi9wYWdlLXNlY3Rpb25cIjtcclxuaW1wb3J0IHsgSURvdENzcywgZG90IH0gZnJvbSBcImRvdGh0bWxcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbnN1YnNjcmliZVBhbmUgZXh0ZW5kcyBQYWdlU2VjdGlvbntcclxuXHJcblx0cHJvcHM6IHsgW2tleTogc3RyaW5nXTogYW55OyB9ID0ge1xyXG5cdFx0dW5zdWJiZWQ6IGZhbHNlXHJcblx0fTtcclxuXHJcblx0YXN5bmMgdW5zdWIoKXtcclxuXHRcdGRvdCh0aGlzLiRyZWZzLmJ1dHRvbnMpLmVtcHR5KCkucChcIllvdSB3aWxsIGJlIHVuc3Vic2NyaWJlZCBmcm9tIGZ1cnRoZXIgY29tbXVuaWNhdGlvbi4gQ29udGFjdCB0aGUgYnJpZGUgb3IgdGhlIGdyb29tIGlmIHRoaXMgd2FzIGRvbmUgaW4gZXJyb3IuIFwiKS5hKFwiQmFjayB0byBzaXRlLlwiKS5oUmVmKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKVswXSk7XHJcblx0XHR0aGlzLiR1cGRhdGVTdHlsZXMoKTtcclxuXHRcdFxyXG5cdFx0bGV0IHJlc3VsdCA9IGF3YWl0IGZldGNoKGBodHRwczovLzJmaXVjZ2ljbDguZXhlY3V0ZS1hcGkudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vdXBkYXRlLWd1ZXN0LXN0YXR1c2AsIHtcclxuXHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcclxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG5cdFx0XHRcdGd1ZXN0SWQ6IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KFwiX1wiKVsxXSxcclxuXHRcdFx0XHR1bnN1YnNjcmliZTogdHJ1ZVxyXG5cdFx0XHR9KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnb0JhY2soKXtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIpWzBdO1xyXG5cdH1cclxuXHJcblx0YnVpbGRlcigpOiBJRG90R2VuZXJpY0VsZW1lbnQge1xyXG5cdFx0cmV0dXJuIHN1cGVyLmJ1aWxkZXIoXHJcblx0XHRcdGRvdC5oMShcIlVuc3Vic2NyaWJlXCIpXHJcblx0XHRcdC5wKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHVuc3Vic2NyaWJlPyBJZiB5b3UgZG8sIHlvdSB3b24ndCByZWNlaXZlIGZ1cnRoZXIgbm90aWZpY2F0aW9ucy4gVGhpcyB3aWxsIG5vdCBhZmZlY3QgeW91ciBSU1ZQIHN0YXR1cy5cIilcclxuXHRcdFx0LmJyKCkuYnIoKVxyXG5cdFx0XHQuZGl2KFxyXG5cdFx0XHRcdGRvdC5idXR0b24oXCJZZXMsIHVuc3Vic2NyaWJlIVwiKS5vbkNsaWNrKCgpPT50aGlzLnVuc3ViKCkpXHJcblx0XHRcdFx0LmJyKCkuYnIoKVxyXG5cdFx0XHRcdC5idXR0b24oXCJObywgdGFrZSBtZSBiYWNrIVwiKS5vbkNsaWNrKCgpPT50aGlzLmdvQmFjaygpKVxyXG5cdFx0XHQpLnJlZihcImJ1dHRvbnNcIilcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRzdHlsZShjc3M6IElEb3RDc3MpOiB2b2lkIHtcclxuXHRcdHN1cGVyLnN0eWxlKGNzcyk7XHJcblxyXG5cdFx0Y3NzKFwiYnV0dG9uXCIpLmZvbnRTaXplKDM2KS5jdXJzb3IoXCJwb2ludGVyXCIpO1xyXG5cdFx0Y3NzKFwiYVwiKS5jb2xvcihcIiNEREZcIik7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgRG90Q29tcG9uZW50LCBJRG90Q3NzLCBJRG90RWxlbWVudCwgZG90IH0gZnJvbSBcImRvdGh0bWxcIjtcclxuaW1wb3J0IGxhbmd1YWdlIGZyb20gXCIuL2xhbmd1YWdlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVzTm9TZWxlY3QgZXh0ZW5kcyBEb3RDb21wb25lbnR7XHJcblxyXG5cdHByb3BzOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfSA9IHtcclxuXHRcdHNlbGVjdGVkOiBmYWxzZSxcclxuXHRcdGxhbmc6IFwiZW5cIiwvLyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhbmdcIikgfHwgXCJlblwiLFxyXG5cdH07XHJcblxyXG5cdGV2ZW50czogeyBba2V5OiBzdHJpbmddOiAoLi4ucGFyYW1zOiBhbnlbXSkgPT4gdm9pZDsgfSA9IHtcclxuXHRcdFwiY2hhbmdlXCI6ICgpPT57fVxyXG5cdH1cclxuXHJcblx0aXNMb2NrZWQgPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IoZGVmYXVsdFZhbHVlOiBib29sZWFuLCBpc0xvY2tlZDogYm9vbGVhbil7XHJcblx0XHRzdXBlcihkZWZhdWx0VmFsdWUpO1xyXG5cdFx0dGhpcy5pc0xvY2tlZCA9IGlzTG9ja2VkO1xyXG5cclxuXHRcdGRvdC5idXMub24oXCJsYW5ndWFnZVwiLCAobGFuZyk9PntcclxuXHRcdFx0dGhpcy5wcm9wcy5sYW5nID0gbGFuZztcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0U3RyKHN0cjoga2V5b2YgKHR5cGVvZiBsYW5ndWFnZSkpe1xyXG5cdFx0cmV0dXJuICgpPT5sYW5ndWFnZVtzdHJdW3RoaXMucHJvcHMubGFuZ107XHJcblx0fVxyXG5cclxuXHRjaGFuZ2UoKXtcclxuXHRcdGlmKHRoaXMuaXNMb2NrZWQpIHJldHVybjtcclxuXHRcdHRoaXMucHJvcHMuc2VsZWN0ZWQgPSAhdGhpcy5wcm9wcy5zZWxlY3RlZDtcclxuXHJcblx0XHR0aGlzLmV2ZW50cy5jaGFuZ2UodGhpcy5wcm9wcy5zZWxlY3RlZCk7XHJcblx0fVxyXG5cclxuXHRidWlsZGVyKGRlZmF1bHRWYWx1ZTogYm9vbGVhbik6IElEb3RFbGVtZW50IHtcclxuXHRcdHRoaXMucHJvcHMuc2VsZWN0ZWQgPSBkZWZhdWx0VmFsdWU7XHJcblx0XHRyZXR1cm4gZG90LmRpdihcclxuXHRcdFx0ZG90LmRpdigoKT0+dGhpcy5wcm9wcy5zZWxlY3RlZCA/IHRoaXMuZ2V0U3RyKFwieWVzTm9CdG5ZZXNcIikgOiB0aGlzLmdldFN0cihcInllc05vQnRuTm9cIikpLmNsYXNzKHtcImlubmVyLWJ0blwiOiB0cnVlLCB5ZXM6ICgpPT50aGlzLnByb3BzLnNlbGVjdGVkLCBubzogKCk9PiF0aGlzLnByb3BzLnNlbGVjdGVkfSlcclxuXHRcdCkuY2xhc3MoXCJ5ZXMtbm8tYnRuXCIpLm9uQ2xpY2soKCk9Pnt0aGlzLmNoYW5nZSgpfSlcclxuXHR9XHJcblxyXG5cdHN0eWxlKGNzczogSURvdENzcyk6IHZvaWQge1xyXG5cdFx0Y3NzKFwiLnllcy1uby1idG5cIilcclxuXHRcdFx0LnBvc2l0aW9uKFwicmVsYXRpdmVcIilcclxuXHRcdFx0LmJvcmRlclJhZGl1cyg1KVxyXG5cdFx0XHQucGFkZGluZygzKVxyXG5cdFx0XHQuZm9udFNpemUoMTQpXHJcblx0XHRcdC5tYXJnaW5MZWZ0KDEwKVxyXG5cdFx0XHQud2lkdGgoNDApXHJcblx0XHRcdC5ib3JkZXIoXCIxcHggc29saWQgd2hpdGVcIilcclxuXHRcdFx0LmN1cnNvcihcInBvaW50ZXJcIilcclxuXHRcdFx0LnRleHRBbGlnbihcImNlbnRlclwiKVxyXG5cclxuXHRcdGNzcyhcIi5pbm5lci1idG5cIilcclxuXHRcdFx0LnRyYW5zaXRpb24oXCJiYWNrZ3JvdW5kLWNvbG9yIDAuNXNcIilcclxuXHJcblx0XHRjc3MoXCIueWVzXCIpXHJcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoXCJncmVlblwiKVxyXG5cclxuXHRcdGNzcyhcIi5ub1wiKVxyXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKFwiIzQ0NFwiKVxyXG5cdH1cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==