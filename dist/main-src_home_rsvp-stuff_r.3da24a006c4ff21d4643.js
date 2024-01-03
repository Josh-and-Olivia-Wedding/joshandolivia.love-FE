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
            .div(dothtml_1.dot.button(this.getStr("veggieFiloTurnoverConcise")).onClick(() => this.chooseTurnover()).class({
            "select-meal-btn": true,
            selected: () => this.props.turnoverSelected
        })
            .button(this.getStr("vegetableTikkaSkewerConcise")).onClick(() => this.chooseSkewer()).class({
            "select-meal-btn": true,
            selected: () => this.props.skewerSelected
        })
            .button(this.getStr("veganRiceStuffedPeppersConcise")).onClick(() => this.choosePeppers()).class({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfaG9tZV9yc3ZwLXN0dWZmX3IuM2RhMjRhMDA2YzRmZjIxZDQ2NDMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4RkFBa0U7QUFDbEUsOEhBQTBDO0FBRTFDLCtHQUFrQztBQUNsQyxvSUFBK0M7QUFHL0MsTUFBcUIsV0FBWSxTQUFRLHNCQUFZO0lBdUJwRCxZQUFZLEtBQVksRUFBRSxRQUFpQjtRQUMxQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUF0QmQsVUFBSyxHQUFVLElBQUksQ0FBQztRQUVwQixVQUFLLEdBQTRCO1lBQ2hDLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFdBQVcsRUFBRSxLQUFLO1NBQ2xCLENBQUM7UUFFRixXQUFNLEdBQUc7WUFDUixRQUFRLEVBQUUsQ0FBQyxLQUFZLEVBQUMsRUFBRSxHQUFDLENBQUM7U0FDNUI7UUFXQSxhQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQTRCLEVBQUUsSUFBbUM7UUFDdkUsT0FBTyxHQUFFLEVBQUU7WUFDVixJQUFJLEtBQUssR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsSUFBRyxJQUFJLEVBQUM7Z0JBQ1AsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JB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QUMsTUFBTSxDQUFDO0lBQzFCLENBQUM7Q0FDRDtBQTdERCxpQ0E2REMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9yc3ZwLXN0dWZmL3JzdnAtb3B0aW9ucy50cyIsIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9yc3ZwLXN0dWZmL3Vuc3Vic2NyaWJlLXBhbmUudHMiLCJ3ZWJwYWNrOi8vd2VkZGluZy13ZWJzaXRlLy4vc3JjL2hvbWUvcnN2cC1zdHVmZi95ZXMtbm8tc2VsZWN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvdENvbXBvbmVudCwgSURvdENzcywgSURvdEVsZW1lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcbmltcG9ydCBZZXNOb1NlbGVjdCBmcm9tIFwiLi95ZXMtbm8tc2VsZWN0XCI7XHJcbmltcG9ydCB7IEd1ZXN0IH0gZnJvbSBcIi4vZ3Vlc3RcIjtcclxuaW1wb3J0IGxhbmd1YWdlIGZyb20gXCIuL2xhbmd1YWdlXCI7XHJcbmltcG9ydCBDbGlja2FibGVJbnB1dCBmcm9tIFwiLi9jbGlja2FibGUtaW5wdXRcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSc3ZwT3B0aW9ucyBleHRlbmRzIERvdENvbXBvbmVudHtcclxuXHJcblx0Z3Vlc3Q6IEd1ZXN0ID0gbnVsbDtcclxuXHJcblx0cHJvcHM6IHsgW2tleTogc3RyaW5nXTogYW55OyB9ID0ge1xyXG5cdFx0bGFuZzogXCJlblwiLC8vbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYW5nXCIpIHx8IFwiZW5cIixcclxuXHRcdGF0dGVuZGluZzogdHJ1ZSxcclxuXHRcdHR1cm5vdmVyU2VsZWN0ZWQ6IHRydWUsXHJcblx0XHRza2V3ZXJTZWxlY3RlZDogZmFsc2UsXHJcblx0XHRwZXBwZXJzU2VsZWN0ZWQ6IGZhbHNlLFxyXG5cdFx0c2hvd1NhdmVUeHQ6IGZhbHNlLFxyXG5cdH07XHJcblxyXG5cdGV2ZW50cyA9IHtcclxuXHRcdFwidXBkYXRlXCI6IChndWVzdDogR3Vlc3QpPT57fVxyXG5cdH1cclxuXHJcblx0cnN2cEJ1dHRvbjogWWVzTm9TZWxlY3Q7XHJcblx0YWxjb2hvbEJ1dHRvbjogWWVzTm9TZWxlY3Q7XHJcblx0ZGlldGFyeVJlc3RyaWN0aW9uczogQ2xpY2thYmxlSW5wdXQ7XHJcblx0cGhvbmVGaWVsZDogYW55O1xyXG5cdGlzTG9ja2VkOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihndWVzdDogR3Vlc3QsIGlzTG9ja2VkOiBib29sZWFuKXtcclxuXHRcdHN1cGVyKGd1ZXN0KTtcclxuXHJcblx0XHRkb3QuYnVzLm9uKFwibGFuZ3VhZ2VcIiwgKGxhbmcpPT57XHJcblx0XHRcdHRoaXMucHJvcHMubGFuZyA9IGxhbmc7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmlzTG9ja2VkID0gaXNMb2NrZWQ7XHJcblx0fVxyXG5cclxuXHRnZXRTdHIoc3RyOiBrZXlvZiAodHlwZW9mIGxhbmd1YWdlKSwgYXJncz86IEFycmF5PHN0cmluZ3xudW1iZXJ8Ym9vbGVhbj4pe1xyXG5cdFx0cmV0dXJuICgpPT57XHJcblx0XHRcdGxldCBmaW5hbCA9IGxhbmd1YWdlW3N0cl1bdGhpcy5wcm9wcy5sYW5nXTtcclxuXHRcdFx0aWYoYXJncyl7XHJcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0ZmluYWwgPSBmaW5hbC5zcGxpdChgeyR7aX19YCkuam9pbihhcmdzW2ldKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZpbmFsO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHNhdmUoKXtcclxuXHRcdHRoaXMuZXZlbnRzLnVwZGF0ZSh0aGlzLmd1ZXN0KTtcclxuXHJcblx0XHRkb3QuY3NzKHRoaXMuJHJlZnMuc2F2ZWRUeHQpXHJcblx0XHRcdC5vcGFjaXR5KDEpXHJcblx0XHRcdC50cmFuc2l0aW9uKFwib3BhY2l0eSAwLjAycyBlYXNlXCIpXHJcblx0XHRcclxuXHRcdHNldFRpbWVvdXQoKCk9PntcclxuXHRcdFx0ZG90LmNzcyh0aGlzLiRyZWZzLnNhdmVkVHh0KVxyXG5cdFx0XHRcdC5vcGFjaXR5KDApXHJcblx0XHRcdFx0LnRyYW5zaXRpb24oXCJvcGFjaXR5IDJzIGVhc2VcIilcclxuXHRcdFx0Ly8gdGhpcy5wcm9wcy5zaG93U2F2ZVR4dCA9IGZhbHNlO1xyXG5cclxuXHRcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlRGlldGFyeVJlc3RyaWN0aW9ucyh2YWx1ZTogc3RyaW5nKXtcclxuXHRcdHRoaXMuZ3Vlc3QuRGlldGFyeVJlc3RyaWN0aW9ucyA9IHZhbHVlO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0fVxyXG5cdHVwZGF0ZVBob25lTnVtYmVyKHZhbHVlOiBzdHJpbmcpe1xyXG5cdFx0dGhpcy5ndWVzdC5QaG9uZSA9IHZhbHVlO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0fVxyXG5cdHVwZGF0ZUFsY29ob2wodmFsdWU6IGJvb2xlYW4pe1xyXG5cdFx0dGhpcy5ndWVzdC5Ecmlua3NBbGNvaG9sID0gdmFsdWU7XHJcblx0XHR0aGlzLnNhdmUoKTtcclxuXHR9XHJcblxyXG5cdGNob29zZVR1cm5vdmVyKCl7XHJcblx0XHRpZih0aGlzLmlzTG9ja2VkKSByZXR1cm47XHJcblx0XHR0aGlzLnByb3BzLnR1cm5vdmVyU2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5wcm9wcy5za2V3ZXJTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5wcm9wcy5wZXBwZXJzU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuZ3Vlc3QuTWVhbE1haW5TZWxlY3Rpb25JZCA9IFwidHVybm92ZXJcIjtcclxuXHRcdHRoaXMuc2F2ZSgpO1xyXG5cdH1cclxuXHJcblx0Y2hvb3NlU2tld2VyKCl7XHJcblx0XHRpZih0aGlzLmlzTG9ja2VkKSByZXR1cm47XHJcblx0XHR0aGlzLnByb3BzLnR1cm5vdmVyU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMucHJvcHMuc2tld2VyU2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5wcm9wcy5wZXBwZXJzU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuZ3Vlc3QuTWVhbE1haW5TZWxlY3Rpb25JZCA9IFwic2tld2VyXCI7XHJcblx0XHR0aGlzLnNhdmUoKTtcclxuXHR9XHJcblxyXG5cdGNob29zZVBlcHBlcnMoKXtcclxuXHRcdGlmKHRoaXMuaXNMb2NrZWQpIHJldHVybjtcclxuXHRcdHRoaXMucHJvcHMudHVybm92ZXJTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5wcm9wcy5za2V3ZXJTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5wcm9wcy5wZXBwZXJzU2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID0gXCJwZXBwZXJzXCI7XHJcblx0XHR0aGlzLnNhdmUoKTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkZXIoZ3Vlc3Q6IEd1ZXN0KTogSURvdEVsZW1lbnQge1xyXG5cclxuXHRcdHRoaXMuZ3Vlc3QgPSBndWVzdDtcclxuXHRcdC8vIHRoaXMucHJvcHMubmFtZSA9IGd1ZXN0Lk5hbWU7XHJcblx0XHQvLyB0aGlzLnByb3BzLmVtYWlsID0gZ3Vlc3QuRW1haWw7XHJcblxyXG5cdFx0bGV0IGF0dGVuZGluZyA9IHRoaXMuZ3Vlc3QuUnN2cFN0YXR1cyA9PSBcIkNPTkZJUk1FRFwiO1xyXG5cdFx0Ly8gdGhpcy5wcm9wcy5hdHRlbmRpbmcgPSB0aGlzLmd1ZXN0LlJzdnBTdGF0dXMgPT0gXCJDT05GSVJNRURcIjtcclxuXHRcdHRoaXMucnN2cEJ1dHRvbiA9IG5ldyBZZXNOb1NlbGVjdChhdHRlbmRpbmcsIHRoaXMuaXNMb2NrZWQpO1xyXG5cclxuXHRcdHRoaXMuZ3Vlc3QuTWVhbE1haW5TZWxlY3Rpb25JZCA9IHRoaXMuZ3Vlc3QuTWVhbE1haW5TZWxlY3Rpb25JZCB8fCBcInR1cm5vdmVyXCI7XHJcblxyXG5cdFx0dGhpcy5wcm9wcy50dXJub3ZlclNlbGVjdGVkID0gdGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID09IFwidHVybm92ZXJcIjtcclxuXHRcdHRoaXMucHJvcHMuc2tld2VyU2VsZWN0ZWQgPSB0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPT0gXCJza2V3ZXJcIjtcclxuXHRcdHRoaXMucHJvcHMucGVwcGVyc1NlbGVjdGVkID0gdGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID09IFwicGVwcGVyc1wiO1xyXG5cclxuXHRcdHRoaXMucnN2cEJ1dHRvbi5vbihcImNoYW5nZVwiLCAodmFsdWUpPT57XHJcblx0XHRcdGlmKHRoaXMuaXNMb2NrZWQpIHJldHVybjtcclxuXHRcdFx0Ly8gdGhpcy5wcm9wcy5hdHRlbmRpbmcgPSB2YWx1ZTtcclxuXHRcdFx0YXR0ZW5kaW5nID0gdmFsdWU7XHJcblx0XHRcdC8vIGlmKHZhbHVlKXtcclxuXHRcdFx0Ly8gXHQvLyB0aGlzLiR1cGRhdGVTdHlsZXMoKTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0dGhpcy4kcmVmcy5pc0F0dGVuZGluZy5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyBcImJsb2NrXCIgOiBcIm5vbmVcIjtcclxuXHRcdFx0dGhpcy4kcmVmcy5pc05vdEF0dGVuZGluZy5zdHlsZS5kaXNwbGF5ID0gIXZhbHVlID8gXCJibG9ja1wiIDogXCJub25lXCI7XHJcblxyXG5cdFx0XHR0aGlzLmd1ZXN0LlJzdnBTdGF0dXMgPSB2YWx1ZSA/IFwiQ09ORklSTUVEXCIgOiBcIkRFQ0xJTkVEXCI7XHJcblxyXG5cdFx0XHR0aGlzLnNhdmUoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWxjb2hvbEJ1dHRvbiA9IG5ldyBZZXNOb1NlbGVjdCh0cnVlLCB0aGlzLmlzTG9ja2VkKTtcclxuXHRcdHRoaXMuZGlldGFyeVJlc3RyaWN0aW9ucyA9IG5ldyBDbGlja2FibGVJbnB1dCh0aGlzLmd1ZXN0LkRpZXRhcnlSZXN0cmljdGlvbnMsIHRoaXMuaXNMb2NrZWQpO1xyXG5cdFx0dGhpcy5kaWV0YXJ5UmVzdHJpY3Rpb25zLm9uKFwic2F2ZVwiLCAodmFsdWUpPT57XHJcblx0XHRcdHRoaXMudXBkYXRlRGlldGFyeVJlc3RyaWN0aW9ucyh2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyB0aGlzLnBob25lRmllbGQgPSBuZXcgQ2xpY2thYmxlSW5wdXQodGhpcy5ndWVzdC5QaG9uZSk7XHJcblx0XHQvLyB0aGlzLnBob25lRmllbGQub24oXCJzYXZlXCIsICh2YWx1ZSk9Pnt0aGlzLnVwZGF0ZVBob25lTnVtYmVyKHZhbHVlKTt9KTtcclxuXHJcblx0XHRyZXR1cm4gZG90LmRpdihcclxuXHRcdFx0ZG90LmRpdihcclxuXHRcdFx0XHRkb3QuZGl2KHRoaXMuZ2V0U3RyKFwiZ3Vlc3RIZWFkZXJcIiwgW3RoaXMuZ3Vlc3QuRnVsbE5hbWVdKSkuY2xhc3MoXCJndWVzdC1uYW1lXCIpXHJcblx0XHRcdFx0LmRpdih0aGlzLmdldFN0cihcInNhdmVkQ29uZmlybWF0aW9uXCIpKS5jbGFzcyh7XHJcblx0XHRcdFx0XHRcInNhdmVkLXR4dFwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XCJoaWRlXCI6ICgpPT4hdGhpcy5wcm9wcy5zaG93U2F2ZVR4dCxcclxuXHRcdFx0XHRcdFwic2hvd1wiOiAoKT0+dGhpcy5wcm9wcy5zaG93U2F2ZVR4dFxyXG5cdFx0XHRcdH0pLnJlZihcInNhdmVkVHh0XCIpXHJcblx0XHRcdFx0LmRpdih0aGlzLmdldFN0cihcImF0dGVuZGluZ0xhYmVsXCIpKVxyXG5cdFx0XHRcdC5kaXYodGhpcy5yc3ZwQnV0dG9uKVxyXG5cdFx0XHQpLmNsYXNzKFwiaGVhZGVyXCIpXHJcblx0XHRcdC5kaXYoXHJcblxyXG5cdFx0XHRcdGRvdC5kaXYoXHJcblx0XHRcdFx0XHRkb3QuZGl2KFxyXG5cdFx0XHRcdFx0XHRkb3QuZGl2KFxyXG5cdFx0XHRcdFx0XHRcdGRvdC5iKHRoaXMuZ2V0U3RyKFwibWVhbFNlbGVjdGlvbkhlYWRlclwiKSkuY2xhc3MoXCJzdWJoZWFkZXJcIilcclxuXHRcdFx0XHRcdFx0XHQuZGl2KFxyXG5cdFx0XHRcdFx0XHRcdFx0ZG90LmRpdih0aGlzLmdldFN0cihcImNob29zZU1haW5Db3Vyc2VcIikpXHJcblx0XHRcdFx0XHRcdFx0XHQuZGl2KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkb3QuYnV0dG9uKHRoaXMuZ2V0U3RyKFwidmVnZ2llRmlsb1R1cm5vdmVyQ29uY2lzZVwiKSkub25DbGljaygoKT0+dGhpcy5jaG9vc2VUdXJub3ZlcigpKS5jbGFzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJzZWxlY3QtbWVhbC1idG5cIjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZDogKCk9PnRoaXMucHJvcHMudHVybm92ZXJTZWxlY3RlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuYnV0dG9uKHRoaXMuZ2V0U3RyKFwidmVnZXRhYmxlVGlra2FTa2V3ZXJDb25jaXNlXCIpKS5vbkNsaWNrKCgpPT50aGlzLmNob29zZVNrZXdlcigpKS5jbGFzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJzZWxlY3QtbWVhbC1idG5cIjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZDogKCk9PnRoaXMucHJvcHMuc2tld2VyU2VsZWN0ZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmJ1dHRvbih0aGlzLmdldFN0cihcInZlZ2FuUmljZVN0dWZmZWRQZXBwZXJzQ29uY2lzZVwiKSkub25DbGljaygoKT0+dGhpcy5jaG9vc2VQZXBwZXJzKCkpLmNsYXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcInNlbGVjdC1tZWFsLWJ0blwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkOiAoKT0+dGhpcy5wcm9wcy5wZXBwZXJzU2VsZWN0ZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdCkuY2xhc3MoXCJtZWFsLWJ0bnNcIilcclxuXHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdCkuY2xhc3Moe1wiaGlkZGVuMlwiOiAoKT0+dGhpcy5ndWVzdC5Jc0NoaWxkfSlcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdC5iKHRoaXMuZ2V0U3RyKFwicHJlZmVyZW5jZXNIZWFkZXJcIikpLmNsYXNzKFwic3ViaGVhZGVyXCIpXHJcblx0XHRcdFx0XHQuZGl2KFxyXG5cdFx0XHRcdFx0XHRkb3Quc3Bhbih0aGlzLmdldFN0cihcImFsbGVyZ2llc0RpZXRhcnlSZXN0cmljdGlvbnNcIikpXHJcblx0XHRcdFx0XHRcdC5icigpXHJcblx0XHRcdFx0XHRcdC5oKHRoaXMuZGlldGFyeVJlc3RyaWN0aW9ucylcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdC5kaXYoXHJcblx0XHRcdFx0XHRcdGRvdC5pbnB1dCgpXHJcblx0XHRcdFx0XHRcdFx0Ly8gLnZhbHVlKHRoaXMuZ3Vlc3QuRHJpbmtzQWxjb2hvbClcclxuXHRcdFx0XHRcdFx0XHQuY2xhc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0XCJhbGNvaG9sLWNoZWNrXCI6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcImhpZGRlbjJcIjogISF0aGlzLmd1ZXN0LklzQ2hpbGRcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC50eXBlKFwiY2hlY2tib3hcIilcclxuXHRcdFx0XHRcdFx0XHQuZGlzYWJsZWQodGhpcy5pc0xvY2tlZClcclxuXHRcdFx0XHRcdFx0XHQub25DaGFuZ2UoKGUpPT50aGlzLnVwZGF0ZUFsY29ob2woKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpKVxyXG5cdFx0XHRcdFx0XHRcdC5yZWYoXCJkcmlua3NBbGNvaG9sXCIpXHJcblx0XHRcdFx0XHRcdC5sYWJlbCh0aGlzLmdldFN0cihcImV4cGVjdERyaW5raW5nQWxjb2hvbFwiKSlcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdC8vIC5iKHRoaXMuZ2V0U3RyKFwiY29udGFjdEluZm9IZWFkZXJcIikpLmNsYXNzKFwic3ViaGVhZGVyXCIpXHJcblx0XHRcdFx0XHQvLyAuZGl2KFxyXG5cdFx0XHRcdFx0Ly8gXHRkb3Quc3Bhbih0aGlzLmdldFN0cihcInBob25lTGFiZWxcIikpXHJcblx0XHRcdFx0XHQvLyBcdC5icigpXHJcblx0XHRcdFx0XHQvLyBcdC5oKHRoaXMucGhvbmVGaWVsZClcclxuXHRcdFx0XHRcdC8vIClcclxuXHRcdFx0XHQpLnJlZihcImlzQXR0ZW5kaW5nXCIpXHJcblxyXG5cdFx0XHRcdC5pKHRoaXMuZ2V0U3RyKFwibm90QXR0ZW5kaW5nXCIpKS5yZWYoXCJpc05vdEF0dGVuZGluZ1wiKVxyXG5cdFx0XHRcdC8vIC53aGVuKCgpPT4hdGhpcy5wcm9wcy5hdHRlbmRpbmcsICgpPT57XHJcblx0XHRcdFx0Ly8gfSlcclxuXHRcdFx0KS5jbGFzcyhcIm9wdGlvbnNcIilcclxuXHRcdCkuY2xhc3MoXCJyc3ZwLW9wdGlvbnNcIik7XHJcblx0fVxyXG5cclxuXHRyZWFkeSgpe1xyXG5cdFx0KHRoaXMuJHJlZnMuZHJpbmtzQWxjb2hvbCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkID0gdGhpcy5ndWVzdC5Ecmlua3NBbGNvaG9sO1xyXG5cdH1cclxuXHJcblx0c3R5bGUoY3NzOiBJRG90Q3NzKTogdm9pZCB7XHJcblx0XHQvLyByZXR1cm47XHJcblx0XHRjc3MoXCIuaGlkZGVuMlwiKVxyXG5cdFx0XHQuZGlzcGxheShcIm5vbmVcIik7XHJcblxyXG5cdFx0Y3NzKFwiLnJzdnAtb3B0aW9uc1wiKVxyXG5cdFx0XHQubWFyZ2luQm90dG9tKDIwKVxyXG5cclxuXHRcdGNzcyhcIi5oZWFkZXJcIilcclxuXHRcdFx0LmRpc3BsYXkoXCJmbGV4XCIpXHJcblx0XHRcdC5mbGV4RGlyZWN0aW9uKFwicm93XCIpXHJcblx0XHRcdC5wYWRkaW5nKDEwKVxyXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKDIwLDIwLDIwLDAuOClcclxuXHRcdFx0LmJvcmRlclRvcExlZnRSYWRpdXMoNSlcclxuXHRcdFx0LmJvcmRlclRvcFJpZ2h0UmFkaXVzKDUpXHJcblx0XHRcdC5mb250U2l6ZSgyMClcclxuXHRcdFx0XHJcblx0XHRjc3MoXCIuZ3Vlc3QtbmFtZVwiKVxyXG5cdFx0XHQuZmxleEdyb3coMTApXHJcblxyXG5cdFx0Y3NzKFwiLnNhdmVkLXR4dFwiKVxyXG5cdFx0XHQuZmxleEdyb3coMSlcclxuXHRcdFx0LmNvbG9yKFwiZ3JlZW5cIilcclxuXHRcdFx0LmZvbnRXZWlnaHQoXCJib2xkXCIpXHJcblxyXG5cdFx0Y3NzKFwiLnNhdmVkLXR4dC5oaWRlXCIpXHJcblx0XHRcdC5vcGFjaXR5KDApXHJcblx0XHRcdC50cmFuc2l0aW9uKFwib3BhY2l0eSAycyBlYXNlXCIpXHJcblx0XHRjc3MoXCIuc2F2ZWQtdHh0LnNob3dcIilcclxuXHRcdFx0Lm9wYWNpdHkoMSlcclxuXHRcdFx0LnRyYW5zaXRpb24oXCJvcGFjaXR5IDAuMDJzIGVhc2VcIilcclxuXHRcdFxyXG5cdFx0Y3NzKFwiLm9wdGlvbnNcIilcclxuXHRcdFx0LmZsZXhEaXJlY3Rpb24oXCJyb3dcIilcclxuXHRcdFx0LnBhZGRpbmcoMTApXHJcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMjU1LDI1NSwyNTUsMC4zKVxyXG5cdFx0XHQuYm9yZGVyQm90dG9tTGVmdFJhZGl1cyg1KVxyXG5cdFx0XHQuYm9yZGVyQm90dG9tUmlnaHRSYWRpdXMoNSlcclxuXHRcdFx0LmNvbG9yKFwiIzExMVwiKVxyXG5cclxuXHRcdGNzcyhcIi5zdWJoZWFkZXJcIilcclxuXHRcdFx0LmRpc3BsYXkoXCJibG9ja1wiKVxyXG5cdFx0XHQuZm9udFdlaWdodChcImJvbGRcIilcclxuXHRcdFx0LmZvbnRTaXplKDE4KVxyXG5cdFx0XHQubWFyZ2luVG9wKDEwKVxyXG5cdFx0XHQubWFyZ2luQm90dG9tKDEwKVxyXG5cclxuXHRcdGNzcyhcIi5tZWFsLWJ0bnNcIilcclxuXHRcdFx0LmRpc3BsYXkoXCJmbGV4XCIpXHJcblx0XHRcdC5mbGV4V3JhcChcIndyYXBcIilcclxuXHRcdFx0LmdhcCgxMClcclxuXHRcdFx0Lmp1c3RpZnlDb250ZW50KFwic3BhY2UtZXZlbmx5XCIpXHJcblx0XHRcdC53aWR0aFAoMTAwKVxyXG5cclxuXHRcdGNzcyhcIi5zZWxlY3QtbWVhbC1idG5cIilcclxuXHRcdFx0LndpZHRoKDMwMClcclxuXHRcdFx0Ly8gLmRpc3BsYXkoXCJibG9ja1wiKVxyXG5cdFx0XHQubWFyZ2luKDUpXHJcblx0XHRcdC5wYWRkaW5nKDUpXHJcblx0XHRcdC5tYXJnaW5MZWZ0KDEwKVxyXG5cdFx0XHQuY3Vyc29yKFwicG9pbnRlclwiKVxyXG5cdFx0XHQuYm9yZGVyUmFkaXVzKDUpXHJcblx0XHRcdC5jb2xvcihcImdvbGRcIilcclxuXHRcdFx0LmJhY2tncm91bmRDb2xvcihcIiMyMjJcIilcclxuXHRcdFx0LnRyYW5zaXRpb24oXCJjb2xvciAwLjNzLCBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZVwiKVxyXG5cdFx0XHRcclxuXHRcdGNzcyhcIi5zZWxlY3QtbWVhbC1idG4uc2VsZWN0ZWRcIilcclxuXHRcdFx0LmNvbG9yKFwiYmxhY2tcIilcclxuXHRcdFx0LmJhY2tncm91bmRDb2xvcihcImdvbGRcIilcclxuXHRcdFx0LmZvbnRXZWlnaHQoXCJib2xkXCIpXHJcblxyXG5cdFx0Y3NzKFwiLmFsY29ob2wtY2hlY2tcIilcclxuXHRcdFx0Lm1hcmdpblJpZ2h0KDEwKVxyXG5cdFx0XHQud2lkdGgoMTYpLmhlaWdodCgxNilcclxuXHJcblx0XHRjc3MoXCJsYWJlbFwiKVxyXG5cdFx0XHQucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxyXG5cdFx0XHQubGluZUhlaWdodCgyMilcclxuXHRcdFx0LmhlaWdodCgyMilcclxuXHRcdFx0LmRpc3BsYXkoXCJpbmxpbmUtYmxvY2tcIilcclxuXHRcdFx0LnRvcCgtMylcclxuXHRcdGNzcyh0aGlzLiRyZWZzLmlzQXR0ZW5kaW5nKS5kaXNwbGF5KHRoaXMuZ3Vlc3QuUnN2cFN0YXR1cyA9PSBcIkNPTkZJUk1FRFwiID8gXCJibG9ja1wiIDogXCJub25lXCIpO1xyXG5cdFx0Y3NzKHRoaXMuJHJlZnMuaXNOb3RBdHRlbmRpbmcpLmRpc3BsYXkodGhpcy5ndWVzdC5Sc3ZwU3RhdHVzICE9IFwiQ09ORklSTUVEXCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIik7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgSURvdEdlbmVyaWNFbGVtZW50IH0gZnJvbSBcImRvdGh0bWwvbGliL2ktZG90XCI7XHJcbmltcG9ydCBQYWdlU2VjdGlvbiBmcm9tIFwiLi4vcGFnZS1zZWN0aW9uXCI7XHJcbmltcG9ydCB7IElEb3RDc3MsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5zdWJzY3JpYmVQYW5lIGV4dGVuZHMgUGFnZVNlY3Rpb257XHJcblxyXG5cdHByb3BzOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfSA9IHtcclxuXHRcdHVuc3ViYmVkOiBmYWxzZVxyXG5cdH07XHJcblxyXG5cdGFzeW5jIHVuc3ViKCl7XHJcblx0XHRkb3QodGhpcy4kcmVmcy5idXR0b25zKS5lbXB0eSgpLnAoXCJZb3Ugd2lsbCBiZSB1bnN1YnNjcmliZWQgZnJvbSBmdXJ0aGVyIGNvbW11bmljYXRpb24uIENvbnRhY3QgdGhlIGJyaWRlIG9yIHRoZSBncm9vbSBpZiB0aGlzIHdhcyBkb25lIGluIGVycm9yLiBcIikuYShcIkJhY2sgdG8gc2l0ZS5cIikuaFJlZih3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIilbMF0pO1xyXG5cdFx0dGhpcy4kdXBkYXRlU3R5bGVzKCk7XHJcblx0XHRcclxuXHRcdGxldCByZXN1bHQgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly8yZml1Y2dpY2w4LmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3VwZGF0ZS1ndWVzdC1zdGF0dXNgLCB7XHJcblx0XHRcdG1ldGhvZDogXCJQT1NUXCIsXHJcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRndWVzdElkOiB3aW5kb3cubG9jYXRpb24uaGFzaC5zcGxpdChcIl9cIilbMV0sXHJcblx0XHRcdFx0dW5zdWJzY3JpYmU6IHRydWVcclxuXHRcdFx0fSlcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z29CYWNrKCl7XHJcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKVswXTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkZXIoKTogSURvdEdlbmVyaWNFbGVtZW50IHtcclxuXHRcdHJldHVybiBzdXBlci5idWlsZGVyKFxyXG5cdFx0XHRkb3QuaDEoXCJVbnN1YnNjcmliZVwiKVxyXG5cdFx0XHQucChcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byB1bnN1YnNjcmliZT8gSWYgeW91IGRvLCB5b3Ugd29uJ3QgcmVjZWl2ZSBmdXJ0aGVyIG5vdGlmaWNhdGlvbnMuIFRoaXMgd2lsbCBub3QgYWZmZWN0IHlvdXIgUlNWUCBzdGF0dXMuXCIpXHJcblx0XHRcdC5icigpLmJyKClcclxuXHRcdFx0LmRpdihcclxuXHRcdFx0XHRkb3QuYnV0dG9uKFwiWWVzLCB1bnN1YnNjcmliZSFcIikub25DbGljaygoKT0+dGhpcy51bnN1YigpKVxyXG5cdFx0XHRcdC5icigpLmJyKClcclxuXHRcdFx0XHQuYnV0dG9uKFwiTm8sIHRha2UgbWUgYmFjayFcIikub25DbGljaygoKT0+dGhpcy5nb0JhY2soKSlcclxuXHRcdFx0KS5yZWYoXCJidXR0b25zXCIpXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0c3R5bGUoY3NzOiBJRG90Q3NzKTogdm9pZCB7XHJcblx0XHRzdXBlci5zdHlsZShjc3MpO1xyXG5cclxuXHRcdGNzcyhcImJ1dHRvblwiKS5mb250U2l6ZSgzNikuY3Vyc29yKFwicG9pbnRlclwiKTtcclxuXHRcdGNzcyhcImFcIikuY29sb3IoXCIjRERGXCIpO1xyXG5cdH1cclxufSIsImltcG9ydCB7IERvdENvbXBvbmVudCwgSURvdENzcywgSURvdEVsZW1lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcbmltcG9ydCBsYW5ndWFnZSBmcm9tIFwiLi9sYW5ndWFnZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllc05vU2VsZWN0IGV4dGVuZHMgRG90Q29tcG9uZW50e1xyXG5cclxuXHRwcm9wczogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0gPSB7XHJcblx0XHRzZWxlY3RlZDogZmFsc2UsXHJcblx0XHRsYW5nOiBcImVuXCIsLy8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYW5nXCIpIHx8IFwiZW5cIixcclxuXHR9O1xyXG5cclxuXHRldmVudHM6IHsgW2tleTogc3RyaW5nXTogKC4uLnBhcmFtczogYW55W10pID0+IHZvaWQ7IH0gPSB7XHJcblx0XHRcImNoYW5nZVwiOiAoKT0+e31cclxuXHR9XHJcblxyXG5cdGlzTG9ja2VkID0gZmFsc2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZTogYm9vbGVhbiwgaXNMb2NrZWQ6IGJvb2xlYW4pe1xyXG5cdFx0c3VwZXIoZGVmYXVsdFZhbHVlKTtcclxuXHRcdHRoaXMuaXNMb2NrZWQgPSBpc0xvY2tlZDtcclxuXHJcblx0XHRkb3QuYnVzLm9uKFwibGFuZ3VhZ2VcIiwgKGxhbmcpPT57XHJcblx0XHRcdHRoaXMucHJvcHMubGFuZyA9IGxhbmc7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldFN0cihzdHI6IGtleW9mICh0eXBlb2YgbGFuZ3VhZ2UpKXtcclxuXHRcdHJldHVybiAoKT0+bGFuZ3VhZ2Vbc3RyXVt0aGlzLnByb3BzLmxhbmddO1xyXG5cdH1cclxuXHJcblx0Y2hhbmdlKCl7XHJcblx0XHRpZih0aGlzLmlzTG9ja2VkKSByZXR1cm47XHJcblx0XHR0aGlzLnByb3BzLnNlbGVjdGVkID0gIXRoaXMucHJvcHMuc2VsZWN0ZWQ7XHJcblxyXG5cdFx0dGhpcy5ldmVudHMuY2hhbmdlKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xyXG5cdH1cclxuXHJcblx0YnVpbGRlcihkZWZhdWx0VmFsdWU6IGJvb2xlYW4pOiBJRG90RWxlbWVudCB7XHJcblx0XHR0aGlzLnByb3BzLnNlbGVjdGVkID0gZGVmYXVsdFZhbHVlO1xyXG5cdFx0cmV0dXJuIGRvdC5kaXYoXHJcblx0XHRcdGRvdC5kaXYoKCk9PnRoaXMucHJvcHMuc2VsZWN0ZWQgPyB0aGlzLmdldFN0cihcInllc05vQnRuWWVzXCIpIDogdGhpcy5nZXRTdHIoXCJ5ZXNOb0J0bk5vXCIpKS5jbGFzcyh7XCJpbm5lci1idG5cIjogdHJ1ZSwgeWVzOiAoKT0+dGhpcy5wcm9wcy5zZWxlY3RlZCwgbm86ICgpPT4hdGhpcy5wcm9wcy5zZWxlY3RlZH0pXHJcblx0XHQpLmNsYXNzKFwieWVzLW5vLWJ0blwiKS5vbkNsaWNrKCgpPT57dGhpcy5jaGFuZ2UoKX0pXHJcblx0fVxyXG5cclxuXHRzdHlsZShjc3M6IElEb3RDc3MpOiB2b2lkIHtcclxuXHRcdGNzcyhcIi55ZXMtbm8tYnRuXCIpXHJcblx0XHRcdC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXHJcblx0XHRcdC5ib3JkZXJSYWRpdXMoNSlcclxuXHRcdFx0LnBhZGRpbmcoMylcclxuXHRcdFx0LmZvbnRTaXplKDE0KVxyXG5cdFx0XHQubWFyZ2luTGVmdCgxMClcclxuXHRcdFx0LndpZHRoKDQwKVxyXG5cdFx0XHQuYm9yZGVyKFwiMXB4IHNvbGlkIHdoaXRlXCIpXHJcblx0XHRcdC5jdXJzb3IoXCJwb2ludGVyXCIpXHJcblx0XHRcdC50ZXh0QWxpZ24oXCJjZW50ZXJcIilcclxuXHJcblx0XHRjc3MoXCIuaW5uZXItYnRuXCIpXHJcblx0XHRcdC50cmFuc2l0aW9uKFwiYmFja2dyb3VuZC1jb2xvciAwLjVzXCIpXHJcblxyXG5cdFx0Y3NzKFwiLnllc1wiKVxyXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKFwiZ3JlZW5cIilcclxuXHJcblx0XHRjc3MoXCIubm9cIilcclxuXHRcdFx0LmJhY2tncm91bmRDb2xvcihcIiM0NDRcIilcclxuXHR9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=