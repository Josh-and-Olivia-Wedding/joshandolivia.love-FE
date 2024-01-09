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
            // .disabled(this.isLocked)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfaG9tZV9yc3ZwLXN0dWZmX3IuZTJlM2EwNWI5ZDdmNzA1NmQ1NDAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4RkFBa0U7QUFDbEUsOEhBQTBDO0FBRTFDLCtHQUFrQztBQUNsQyxvSUFBK0M7QUFHL0MsTUFBcUIsV0FBWSxTQUFRLHNCQUFZO0lBdUJwRCxZQUFZLEtBQVksRUFBRSxRQUFpQjtRQUMxQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUF0QmQsVUFBSyxHQUFVLElBQUksQ0FBQztRQUVwQixVQUFLLEdBQTRCO1lBQ2hDLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFdBQVcsRUFBRSxLQUFLO1NBQ2xCLENBQUM7UUFFRixXQUFNLEdBQUc7WUFDUixRQUFRLEVBQUUsQ0FBQyxLQUFZLEVBQUMsRUFBRSxHQUFDLENBQUM7U0FDNUI7UUFXQSxhQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQTRCLEVBQUUsSUFBbUM7UUFDdkUsT0FBTyxHQUFFLEVBQUU7WUFDVixJQUFJLEtBQUssR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsSUFBRyxJQUFJLEVBQUM7Z0JBQ1AsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JB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QUFTLENBQUMsUUFBUSxDQUFDO1FBRXJCLEdBQUcsQ0FBQyxZQUFZLENBQUM7YUFDZixVQUFVLENBQUMsdUJBQXVCLENBQUM7UUFFckMsR0FBRyxDQUFDLE1BQU0sQ0FBQzthQUNULGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFFMUIsR0FBRyxDQUFDLEtBQUssQ0FBQzthQUNSLGVBQWUsQ0FBQyxNQUFNLENBQUM7SUFDMUIsQ0FBQztDQUNEO0FBN0RELGlDQTZEQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL3JzdnAtc3R1ZmYvcnN2cC1vcHRpb25zLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL3JzdnAtc3R1ZmYvdW5zdWJzY3JpYmUtcGFuZS50cyIsIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9yc3ZwLXN0dWZmL3llcy1uby1zZWxlY3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG90Q29tcG9uZW50LCBJRG90Q3NzLCBJRG90RWxlbWVudCwgZG90IH0gZnJvbSBcImRvdGh0bWxcIjtcclxuaW1wb3J0IFllc05vU2VsZWN0IGZyb20gXCIuL3llcy1uby1zZWxlY3RcIjtcclxuaW1wb3J0IHsgR3Vlc3QgfSBmcm9tIFwiLi9ndWVzdFwiO1xyXG5pbXBvcnQgbGFuZ3VhZ2UgZnJvbSBcIi4vbGFuZ3VhZ2VcIjtcclxuaW1wb3J0IENsaWNrYWJsZUlucHV0IGZyb20gXCIuL2NsaWNrYWJsZS1pbnB1dFwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJzdnBPcHRpb25zIGV4dGVuZHMgRG90Q29tcG9uZW50e1xyXG5cclxuXHRndWVzdDogR3Vlc3QgPSBudWxsO1xyXG5cclxuXHRwcm9wczogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0gPSB7XHJcblx0XHRsYW5nOiBcImVuXCIsLy9sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhbmdcIikgfHwgXCJlblwiLFxyXG5cdFx0YXR0ZW5kaW5nOiB0cnVlLFxyXG5cdFx0dHVybm92ZXJTZWxlY3RlZDogdHJ1ZSxcclxuXHRcdHNrZXdlclNlbGVjdGVkOiBmYWxzZSxcclxuXHRcdHBlcHBlcnNTZWxlY3RlZDogZmFsc2UsXHJcblx0XHRzaG93U2F2ZVR4dDogZmFsc2UsXHJcblx0fTtcclxuXHJcblx0ZXZlbnRzID0ge1xyXG5cdFx0XCJ1cGRhdGVcIjogKGd1ZXN0OiBHdWVzdCk9Pnt9XHJcblx0fVxyXG5cclxuXHRyc3ZwQnV0dG9uOiBZZXNOb1NlbGVjdDtcclxuXHRhbGNvaG9sQnV0dG9uOiBZZXNOb1NlbGVjdDtcclxuXHRkaWV0YXJ5UmVzdHJpY3Rpb25zOiBDbGlja2FibGVJbnB1dDtcclxuXHRwaG9uZUZpZWxkOiBhbnk7XHJcblx0aXNMb2NrZWQ6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGd1ZXN0OiBHdWVzdCwgaXNMb2NrZWQ6IGJvb2xlYW4pe1xyXG5cdFx0c3VwZXIoZ3Vlc3QpO1xyXG5cclxuXHRcdGRvdC5idXMub24oXCJsYW5ndWFnZVwiLCAobGFuZyk9PntcclxuXHRcdFx0dGhpcy5wcm9wcy5sYW5nID0gbGFuZztcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuaXNMb2NrZWQgPSBpc0xvY2tlZDtcclxuXHR9XHJcblxyXG5cdGdldFN0cihzdHI6IGtleW9mICh0eXBlb2YgbGFuZ3VhZ2UpLCBhcmdzPzogQXJyYXk8c3RyaW5nfG51bWJlcnxib29sZWFuPil7XHJcblx0XHRyZXR1cm4gKCk9PntcclxuXHRcdFx0bGV0IGZpbmFsID0gbGFuZ3VhZ2Vbc3RyXVt0aGlzLnByb3BzLmxhbmddO1xyXG5cdFx0XHRpZihhcmdzKXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRmaW5hbCA9IGZpbmFsLnNwbGl0KGB7JHtpfX1gKS5qb2luKGFyZ3NbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmluYWw7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0c2F2ZSgpe1xyXG5cdFx0dGhpcy5ldmVudHMudXBkYXRlKHRoaXMuZ3Vlc3QpO1xyXG5cclxuXHRcdGRvdC5jc3ModGhpcy4kcmVmcy5zYXZlZFR4dClcclxuXHRcdFx0Lm9wYWNpdHkoMSlcclxuXHRcdFx0LnRyYW5zaXRpb24oXCJvcGFjaXR5IDAuMDJzIGVhc2VcIilcclxuXHRcdFxyXG5cdFx0c2V0VGltZW91dCgoKT0+e1xyXG5cdFx0XHRkb3QuY3NzKHRoaXMuJHJlZnMuc2F2ZWRUeHQpXHJcblx0XHRcdFx0Lm9wYWNpdHkoMClcclxuXHRcdFx0XHQudHJhbnNpdGlvbihcIm9wYWNpdHkgMnMgZWFzZVwiKVxyXG5cdFx0XHQvLyB0aGlzLnByb3BzLnNob3dTYXZlVHh0ID0gZmFsc2U7XHJcblxyXG5cdFx0fSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVEaWV0YXJ5UmVzdHJpY3Rpb25zKHZhbHVlOiBzdHJpbmcpe1xyXG5cdFx0dGhpcy5ndWVzdC5EaWV0YXJ5UmVzdHJpY3Rpb25zID0gdmFsdWU7XHJcblx0XHR0aGlzLnNhdmUoKTtcclxuXHR9XHJcblx0dXBkYXRlUGhvbmVOdW1iZXIodmFsdWU6IHN0cmluZyl7XHJcblx0XHR0aGlzLmd1ZXN0LlBob25lID0gdmFsdWU7XHJcblx0XHR0aGlzLnNhdmUoKTtcclxuXHR9XHJcblx0dXBkYXRlQWxjb2hvbCh2YWx1ZTogYm9vbGVhbil7XHJcblx0XHR0aGlzLmd1ZXN0LkRyaW5rc0FsY29ob2wgPSB2YWx1ZTtcclxuXHRcdHRoaXMuc2F2ZSgpO1xyXG5cdH1cclxuXHJcblx0Y2hvb3NlVHVybm92ZXIoKXtcclxuXHRcdGlmKHRoaXMuaXNMb2NrZWQpIHJldHVybjtcclxuXHRcdHRoaXMucHJvcHMudHVybm92ZXJTZWxlY3RlZCA9IHRydWU7XHJcblx0XHR0aGlzLnByb3BzLnNrZXdlclNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLnByb3BzLnBlcHBlcnNTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID0gXCJ0dXJub3ZlclwiO1xyXG5cdFx0dGhpcy5zYXZlKCk7XHJcblx0fVxyXG5cclxuXHRjaG9vc2VTa2V3ZXIoKXtcclxuXHRcdGlmKHRoaXMuaXNMb2NrZWQpIHJldHVybjtcclxuXHRcdHRoaXMucHJvcHMudHVybm92ZXJTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5wcm9wcy5za2V3ZXJTZWxlY3RlZCA9IHRydWU7XHJcblx0XHR0aGlzLnByb3BzLnBlcHBlcnNTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID0gXCJza2V3ZXJcIjtcclxuXHRcdHRoaXMuc2F2ZSgpO1xyXG5cdH1cclxuXHJcblx0Y2hvb3NlUGVwcGVycygpe1xyXG5cdFx0aWYodGhpcy5pc0xvY2tlZCkgcmV0dXJuO1xyXG5cdFx0dGhpcy5wcm9wcy50dXJub3ZlclNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLnByb3BzLnNrZXdlclNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLnByb3BzLnBlcHBlcnNTZWxlY3RlZCA9IHRydWU7XHJcblx0XHR0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPSBcInBlcHBlcnNcIjtcclxuXHRcdHRoaXMuc2F2ZSgpO1xyXG5cdH1cclxuXHJcblx0YnVpbGRlcihndWVzdDogR3Vlc3QpOiBJRG90RWxlbWVudCB7XHJcblxyXG5cdFx0dGhpcy5ndWVzdCA9IGd1ZXN0O1xyXG5cdFx0Ly8gdGhpcy5wcm9wcy5uYW1lID0gZ3Vlc3QuTmFtZTtcclxuXHRcdC8vIHRoaXMucHJvcHMuZW1haWwgPSBndWVzdC5FbWFpbDtcclxuXHJcblx0XHRsZXQgYXR0ZW5kaW5nID0gdGhpcy5ndWVzdC5Sc3ZwU3RhdHVzID09IFwiQ09ORklSTUVEXCI7XHJcblx0XHQvLyB0aGlzLnByb3BzLmF0dGVuZGluZyA9IHRoaXMuZ3Vlc3QuUnN2cFN0YXR1cyA9PSBcIkNPTkZJUk1FRFwiO1xyXG5cdFx0dGhpcy5yc3ZwQnV0dG9uID0gbmV3IFllc05vU2VsZWN0KGF0dGVuZGluZywgdGhpcy5pc0xvY2tlZCk7XHJcblxyXG5cdFx0dGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkID0gdGhpcy5ndWVzdC5NZWFsTWFpblNlbGVjdGlvbklkIHx8IFwidHVybm92ZXJcIjtcclxuXHJcblx0XHR0aGlzLnByb3BzLnR1cm5vdmVyU2VsZWN0ZWQgPSB0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPT0gXCJ0dXJub3ZlclwiO1xyXG5cdFx0dGhpcy5wcm9wcy5za2V3ZXJTZWxlY3RlZCA9IHRoaXMuZ3Vlc3QuTWVhbE1haW5TZWxlY3Rpb25JZCA9PSBcInNrZXdlclwiO1xyXG5cdFx0dGhpcy5wcm9wcy5wZXBwZXJzU2VsZWN0ZWQgPSB0aGlzLmd1ZXN0Lk1lYWxNYWluU2VsZWN0aW9uSWQgPT0gXCJwZXBwZXJzXCI7XHJcblxyXG5cdFx0dGhpcy5yc3ZwQnV0dG9uLm9uKFwiY2hhbmdlXCIsICh2YWx1ZSk9PntcclxuXHRcdFx0aWYodGhpcy5pc0xvY2tlZCkgcmV0dXJuO1xyXG5cdFx0XHQvLyB0aGlzLnByb3BzLmF0dGVuZGluZyA9IHZhbHVlO1xyXG5cdFx0XHRhdHRlbmRpbmcgPSB2YWx1ZTtcclxuXHRcdFx0Ly8gaWYodmFsdWUpe1xyXG5cdFx0XHQvLyBcdC8vIHRoaXMuJHVwZGF0ZVN0eWxlcygpO1xyXG5cdFx0XHQvLyB9XHJcblxyXG5cdFx0XHR0aGlzLiRyZWZzLmlzQXR0ZW5kaW5nLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xyXG5cdFx0XHR0aGlzLiRyZWZzLmlzTm90QXR0ZW5kaW5nLnN0eWxlLmRpc3BsYXkgPSAhdmFsdWUgPyBcImJsb2NrXCIgOiBcIm5vbmVcIjtcclxuXHJcblx0XHRcdHRoaXMuZ3Vlc3QuUnN2cFN0YXR1cyA9IHZhbHVlID8gXCJDT05GSVJNRURcIiA6IFwiREVDTElORURcIjtcclxuXHJcblx0XHRcdHRoaXMuc2F2ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hbGNvaG9sQnV0dG9uID0gbmV3IFllc05vU2VsZWN0KHRydWUsIHRoaXMuaXNMb2NrZWQpO1xyXG5cdFx0dGhpcy5kaWV0YXJ5UmVzdHJpY3Rpb25zID0gbmV3IENsaWNrYWJsZUlucHV0KHRoaXMuZ3Vlc3QuRGlldGFyeVJlc3RyaWN0aW9ucywgdGhpcy5pc0xvY2tlZCk7XHJcblx0XHR0aGlzLmRpZXRhcnlSZXN0cmljdGlvbnMub24oXCJzYXZlXCIsICh2YWx1ZSk9PntcclxuXHRcdFx0dGhpcy51cGRhdGVEaWV0YXJ5UmVzdHJpY3Rpb25zKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIHRoaXMucGhvbmVGaWVsZCA9IG5ldyBDbGlja2FibGVJbnB1dCh0aGlzLmd1ZXN0LlBob25lKTtcclxuXHRcdC8vIHRoaXMucGhvbmVGaWVsZC5vbihcInNhdmVcIiwgKHZhbHVlKT0+e3RoaXMudXBkYXRlUGhvbmVOdW1iZXIodmFsdWUpO30pO1xyXG5cclxuXHRcdHJldHVybiBkb3QuZGl2KFxyXG5cdFx0XHRkb3QuZGl2KFxyXG5cdFx0XHRcdGRvdC5kaXYodGhpcy5nZXRTdHIoXCJndWVzdEhlYWRlclwiLCBbdGhpcy5ndWVzdC5GdWxsTmFtZV0pKS5jbGFzcyhcImd1ZXN0LW5hbWVcIilcclxuXHRcdFx0XHQuZGl2KHRoaXMuZ2V0U3RyKFwic2F2ZWRDb25maXJtYXRpb25cIikpLmNsYXNzKHtcclxuXHRcdFx0XHRcdFwic2F2ZWQtdHh0XCI6IHRydWUsXHJcblx0XHRcdFx0XHRcImhpZGVcIjogKCk9PiF0aGlzLnByb3BzLnNob3dTYXZlVHh0LFxyXG5cdFx0XHRcdFx0XCJzaG93XCI6ICgpPT50aGlzLnByb3BzLnNob3dTYXZlVHh0XHJcblx0XHRcdFx0fSkucmVmKFwic2F2ZWRUeHRcIilcclxuXHRcdFx0XHQuZGl2KHRoaXMuZ2V0U3RyKFwiYXR0ZW5kaW5nTGFiZWxcIikpXHJcblx0XHRcdFx0LmRpdih0aGlzLnJzdnBCdXR0b24pXHJcblx0XHRcdCkuY2xhc3MoXCJoZWFkZXJcIilcclxuXHRcdFx0LmRpdihcclxuXHJcblx0XHRcdFx0ZG90LmRpdihcclxuXHRcdFx0XHRcdGRvdC5kaXYoXHJcblx0XHRcdFx0XHRcdGRvdC5kaXYoXHJcblx0XHRcdFx0XHRcdFx0ZG90LmIodGhpcy5nZXRTdHIoXCJtZWFsU2VsZWN0aW9uSGVhZGVyXCIpKS5jbGFzcyhcInN1YmhlYWRlclwiKVxyXG5cdFx0XHRcdFx0XHRcdC5kaXYoXHJcblx0XHRcdFx0XHRcdFx0XHRkb3QuZGl2KHRoaXMuZ2V0U3RyKFwiY2hvb3NlTWFpbkNvdXJzZVwiKSlcclxuXHRcdFx0XHRcdFx0XHRcdC5kaXYoXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRvdC5idXR0b24oZ3Vlc3QuRnVsbE5hbWUgPT0gXCJMdWNhIFNpZGVyaXNcIiA/IFwiTGVhZnMgYW5kIFR3aWdzXCIgOiB0aGlzLmdldFN0cihcInZlZ2dpZUZpbG9UdXJub3ZlckNvbmNpc2VcIikpLm9uQ2xpY2soKCk9PnRoaXMuY2hvb3NlVHVybm92ZXIoKSkuY2xhc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwic2VsZWN0LW1lYWwtYnRuXCI6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ6ICgpPT50aGlzLnByb3BzLnR1cm5vdmVyU2VsZWN0ZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmJ1dHRvbihndWVzdC5GdWxsTmFtZSA9PSBcIkx1Y2EgU2lkZXJpc1wiID8gXCJDb2xkIFRvZnVcIiA6IHRoaXMuZ2V0U3RyKFwidmVnZXRhYmxlVGlra2FTa2V3ZXJDb25jaXNlXCIpKS5vbkNsaWNrKCgpPT50aGlzLmNob29zZVNrZXdlcigpKS5jbGFzcyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJzZWxlY3QtbWVhbC1idG5cIjogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZDogKCk9PnRoaXMucHJvcHMuc2tld2VyU2VsZWN0ZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmJ1dHRvbihndWVzdC5GdWxsTmFtZSA9PSBcIkx1Y2EgU2lkZXJpc1wiID8gXCJTb3lsZW50IEdyZWVuIFNtb290aGllXCIgOiB0aGlzLmdldFN0cihcInZlZ2FuUmljZVN0dWZmZWRQZXBwZXJzQ29uY2lzZVwiKSkub25DbGljaygoKT0+dGhpcy5jaG9vc2VQZXBwZXJzKCkpLmNsYXNzKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcInNlbGVjdC1tZWFsLWJ0blwiOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkOiAoKT0+dGhpcy5wcm9wcy5wZXBwZXJzU2VsZWN0ZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdCkuY2xhc3MoXCJtZWFsLWJ0bnNcIilcclxuXHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdCkuY2xhc3Moe1wiaGlkZGVuMlwiOiAoKT0+dGhpcy5ndWVzdC5Jc0NoaWxkfSlcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdC5iKHRoaXMuZ2V0U3RyKFwicHJlZmVyZW5jZXNIZWFkZXJcIikpLmNsYXNzKFwic3ViaGVhZGVyXCIpXHJcblx0XHRcdFx0XHQuZGl2KFxyXG5cdFx0XHRcdFx0XHRkb3Quc3Bhbih0aGlzLmdldFN0cihcImFsbGVyZ2llc0RpZXRhcnlSZXN0cmljdGlvbnNcIikpXHJcblx0XHRcdFx0XHRcdC5icigpXHJcblx0XHRcdFx0XHRcdC5oKHRoaXMuZGlldGFyeVJlc3RyaWN0aW9ucylcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdC5kaXYoXHJcblx0XHRcdFx0XHRcdGRvdC5pbnB1dCgpXHJcblx0XHRcdFx0XHRcdFx0Ly8gLnZhbHVlKHRoaXMuZ3Vlc3QuRHJpbmtzQWxjb2hvbClcclxuXHRcdFx0XHRcdFx0XHQuY2xhc3Moe1xyXG5cdFx0XHRcdFx0XHRcdFx0XCJhbGNvaG9sLWNoZWNrXCI6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcImhpZGRlbjJcIjogISF0aGlzLmd1ZXN0LklzQ2hpbGRcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC50eXBlKFwiY2hlY2tib3hcIilcclxuXHRcdFx0XHRcdFx0XHQvLyAuZGlzYWJsZWQodGhpcy5pc0xvY2tlZClcclxuXHRcdFx0XHRcdFx0XHQub25DaGFuZ2UoKGUpPT50aGlzLnVwZGF0ZUFsY29ob2woKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpKVxyXG5cdFx0XHRcdFx0XHRcdC5yZWYoXCJkcmlua3NBbGNvaG9sXCIpXHJcblx0XHRcdFx0XHRcdC5sYWJlbCh0aGlzLmdldFN0cihcImV4cGVjdERyaW5raW5nQWxjb2hvbFwiKSlcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdC8vIC5iKHRoaXMuZ2V0U3RyKFwiY29udGFjdEluZm9IZWFkZXJcIikpLmNsYXNzKFwic3ViaGVhZGVyXCIpXHJcblx0XHRcdFx0XHQvLyAuZGl2KFxyXG5cdFx0XHRcdFx0Ly8gXHRkb3Quc3Bhbih0aGlzLmdldFN0cihcInBob25lTGFiZWxcIikpXHJcblx0XHRcdFx0XHQvLyBcdC5icigpXHJcblx0XHRcdFx0XHQvLyBcdC5oKHRoaXMucGhvbmVGaWVsZClcclxuXHRcdFx0XHRcdC8vIClcclxuXHRcdFx0XHQpLnJlZihcImlzQXR0ZW5kaW5nXCIpXHJcblxyXG5cdFx0XHRcdC5pKHRoaXMuZ2V0U3RyKFwibm90QXR0ZW5kaW5nXCIpKS5yZWYoXCJpc05vdEF0dGVuZGluZ1wiKVxyXG5cdFx0XHRcdC8vIC53aGVuKCgpPT4hdGhpcy5wcm9wcy5hdHRlbmRpbmcsICgpPT57XHJcblx0XHRcdFx0Ly8gfSlcclxuXHRcdFx0KS5jbGFzcyhcIm9wdGlvbnNcIilcclxuXHRcdCkuY2xhc3MoXCJyc3ZwLW9wdGlvbnNcIik7XHJcblx0fVxyXG5cclxuXHRyZWFkeSgpe1xyXG5cdFx0KHRoaXMuJHJlZnMuZHJpbmtzQWxjb2hvbCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkID0gdGhpcy5ndWVzdC5Ecmlua3NBbGNvaG9sO1xyXG5cdH1cclxuXHJcblx0c3R5bGUoY3NzOiBJRG90Q3NzKTogdm9pZCB7XHJcblx0XHQvLyByZXR1cm47XHJcblx0XHRjc3MoXCIuaGlkZGVuMlwiKVxyXG5cdFx0XHQuZGlzcGxheShcIm5vbmVcIik7XHJcblxyXG5cdFx0Y3NzKFwiLnJzdnAtb3B0aW9uc1wiKVxyXG5cdFx0XHQubWFyZ2luQm90dG9tKDIwKVxyXG5cclxuXHRcdGNzcyhcIi5oZWFkZXJcIilcclxuXHRcdFx0LmRpc3BsYXkoXCJmbGV4XCIpXHJcblx0XHRcdC5mbGV4RGlyZWN0aW9uKFwicm93XCIpXHJcblx0XHRcdC5wYWRkaW5nKDEwKVxyXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKDIwLDIwLDIwLDAuOClcclxuXHRcdFx0LmJvcmRlclRvcExlZnRSYWRpdXMoNSlcclxuXHRcdFx0LmJvcmRlclRvcFJpZ2h0UmFkaXVzKDUpXHJcblx0XHRcdC5mb250U2l6ZSgyMClcclxuXHRcdFx0XHJcblx0XHRjc3MoXCIuZ3Vlc3QtbmFtZVwiKVxyXG5cdFx0XHQuZmxleEdyb3coMTApXHJcblxyXG5cdFx0Y3NzKFwiLnNhdmVkLXR4dFwiKVxyXG5cdFx0XHQuZmxleEdyb3coMSlcclxuXHRcdFx0LmNvbG9yKFwiZ3JlZW5cIilcclxuXHRcdFx0LmZvbnRXZWlnaHQoXCJib2xkXCIpXHJcblxyXG5cdFx0Y3NzKFwiLnNhdmVkLXR4dC5oaWRlXCIpXHJcblx0XHRcdC5vcGFjaXR5KDApXHJcblx0XHRcdC50cmFuc2l0aW9uKFwib3BhY2l0eSAycyBlYXNlXCIpXHJcblx0XHRjc3MoXCIuc2F2ZWQtdHh0LnNob3dcIilcclxuXHRcdFx0Lm9wYWNpdHkoMSlcclxuXHRcdFx0LnRyYW5zaXRpb24oXCJvcGFjaXR5IDAuMDJzIGVhc2VcIilcclxuXHRcdFxyXG5cdFx0Y3NzKFwiLm9wdGlvbnNcIilcclxuXHRcdFx0LmZsZXhEaXJlY3Rpb24oXCJyb3dcIilcclxuXHRcdFx0LnBhZGRpbmcoMTApXHJcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMjU1LDI1NSwyNTUsMC4zKVxyXG5cdFx0XHQuYm9yZGVyQm90dG9tTGVmdFJhZGl1cyg1KVxyXG5cdFx0XHQuYm9yZGVyQm90dG9tUmlnaHRSYWRpdXMoNSlcclxuXHRcdFx0LmNvbG9yKFwiIzExMVwiKVxyXG5cclxuXHRcdGNzcyhcIi5zdWJoZWFkZXJcIilcclxuXHRcdFx0LmRpc3BsYXkoXCJibG9ja1wiKVxyXG5cdFx0XHQuZm9udFdlaWdodChcImJvbGRcIilcclxuXHRcdFx0LmZvbnRTaXplKDE4KVxyXG5cdFx0XHQubWFyZ2luVG9wKDEwKVxyXG5cdFx0XHQubWFyZ2luQm90dG9tKDEwKVxyXG5cclxuXHRcdGNzcyhcIi5tZWFsLWJ0bnNcIilcclxuXHRcdFx0LmRpc3BsYXkoXCJmbGV4XCIpXHJcblx0XHRcdC5mbGV4V3JhcChcIndyYXBcIilcclxuXHRcdFx0LmdhcCgxMClcclxuXHRcdFx0Lmp1c3RpZnlDb250ZW50KFwic3BhY2UtZXZlbmx5XCIpXHJcblx0XHRcdC53aWR0aFAoMTAwKVxyXG5cclxuXHRcdGNzcyhcIi5zZWxlY3QtbWVhbC1idG5cIilcclxuXHRcdFx0LndpZHRoKDMwMClcclxuXHRcdFx0Ly8gLmRpc3BsYXkoXCJibG9ja1wiKVxyXG5cdFx0XHQubWFyZ2luKDUpXHJcblx0XHRcdC5wYWRkaW5nKDUpXHJcblx0XHRcdC5tYXJnaW5MZWZ0KDEwKVxyXG5cdFx0XHQuY3Vyc29yKFwicG9pbnRlclwiKVxyXG5cdFx0XHQuYm9yZGVyUmFkaXVzKDUpXHJcblx0XHRcdC5jb2xvcihcImdvbGRcIilcclxuXHRcdFx0LmJhY2tncm91bmRDb2xvcihcIiMyMjJcIilcclxuXHRcdFx0LnRyYW5zaXRpb24oXCJjb2xvciAwLjNzLCBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZVwiKVxyXG5cdFx0XHRcclxuXHRcdGNzcyhcIi5zZWxlY3QtbWVhbC1idG4uc2VsZWN0ZWRcIilcclxuXHRcdFx0LmNvbG9yKFwiYmxhY2tcIilcclxuXHRcdFx0LmJhY2tncm91bmRDb2xvcihcImdvbGRcIilcclxuXHRcdFx0LmZvbnRXZWlnaHQoXCJib2xkXCIpXHJcblxyXG5cdFx0Y3NzKFwiLmFsY29ob2wtY2hlY2tcIilcclxuXHRcdFx0Lm1hcmdpblJpZ2h0KDEwKVxyXG5cdFx0XHQud2lkdGgoMTYpLmhlaWdodCgxNilcclxuXHJcblx0XHRjc3MoXCJsYWJlbFwiKVxyXG5cdFx0XHQucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxyXG5cdFx0XHQubGluZUhlaWdodCgyMilcclxuXHRcdFx0LmhlaWdodCgyMilcclxuXHRcdFx0LmRpc3BsYXkoXCJpbmxpbmUtYmxvY2tcIilcclxuXHRcdFx0LnRvcCgtMylcclxuXHRcdGNzcyh0aGlzLiRyZWZzLmlzQXR0ZW5kaW5nKS5kaXNwbGF5KHRoaXMuZ3Vlc3QuUnN2cFN0YXR1cyA9PSBcIkNPTkZJUk1FRFwiID8gXCJibG9ja1wiIDogXCJub25lXCIpO1xyXG5cdFx0Y3NzKHRoaXMuJHJlZnMuaXNOb3RBdHRlbmRpbmcpLmRpc3BsYXkodGhpcy5ndWVzdC5Sc3ZwU3RhdHVzICE9IFwiQ09ORklSTUVEXCIgPyBcImJsb2NrXCIgOiBcIm5vbmVcIik7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgSURvdEdlbmVyaWNFbGVtZW50IH0gZnJvbSBcImRvdGh0bWwvbGliL2ktZG90XCI7XHJcbmltcG9ydCBQYWdlU2VjdGlvbiBmcm9tIFwiLi4vcGFnZS1zZWN0aW9uXCI7XHJcbmltcG9ydCB7IElEb3RDc3MsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5zdWJzY3JpYmVQYW5lIGV4dGVuZHMgUGFnZVNlY3Rpb257XHJcblxyXG5cdHByb3BzOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfSA9IHtcclxuXHRcdHVuc3ViYmVkOiBmYWxzZVxyXG5cdH07XHJcblxyXG5cdGFzeW5jIHVuc3ViKCl7XHJcblx0XHRkb3QodGhpcy4kcmVmcy5idXR0b25zKS5lbXB0eSgpLnAoXCJZb3Ugd2lsbCBiZSB1bnN1YnNjcmliZWQgZnJvbSBmdXJ0aGVyIGNvbW11bmljYXRpb24uIENvbnRhY3QgdGhlIGJyaWRlIG9yIHRoZSBncm9vbSBpZiB0aGlzIHdhcyBkb25lIGluIGVycm9yLiBcIikuYShcIkJhY2sgdG8gc2l0ZS5cIikuaFJlZih3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIilbMF0pO1xyXG5cdFx0dGhpcy4kdXBkYXRlU3R5bGVzKCk7XHJcblx0XHRcclxuXHRcdGxldCByZXN1bHQgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly8yZml1Y2dpY2w4LmV4ZWN1dGUtYXBpLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3VwZGF0ZS1ndWVzdC1zdGF0dXNgLCB7XHJcblx0XHRcdG1ldGhvZDogXCJQT1NUXCIsXHJcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRndWVzdElkOiB3aW5kb3cubG9jYXRpb24uaGFzaC5zcGxpdChcIl9cIilbMV0sXHJcblx0XHRcdFx0dW5zdWJzY3JpYmU6IHRydWVcclxuXHRcdFx0fSlcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z29CYWNrKCl7XHJcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKVswXTtcclxuXHR9XHJcblxyXG5cdGJ1aWxkZXIoKTogSURvdEdlbmVyaWNFbGVtZW50IHtcclxuXHRcdHJldHVybiBzdXBlci5idWlsZGVyKFxyXG5cdFx0XHRkb3QuaDEoXCJVbnN1YnNjcmliZVwiKVxyXG5cdFx0XHQucChcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byB1bnN1YnNjcmliZT8gSWYgeW91IGRvLCB5b3Ugd29uJ3QgcmVjZWl2ZSBmdXJ0aGVyIG5vdGlmaWNhdGlvbnMuIFRoaXMgd2lsbCBub3QgYWZmZWN0IHlvdXIgUlNWUCBzdGF0dXMuXCIpXHJcblx0XHRcdC5icigpLmJyKClcclxuXHRcdFx0LmRpdihcclxuXHRcdFx0XHRkb3QuYnV0dG9uKFwiWWVzLCB1bnN1YnNjcmliZSFcIikub25DbGljaygoKT0+dGhpcy51bnN1YigpKVxyXG5cdFx0XHRcdC5icigpLmJyKClcclxuXHRcdFx0XHQuYnV0dG9uKFwiTm8sIHRha2UgbWUgYmFjayFcIikub25DbGljaygoKT0+dGhpcy5nb0JhY2soKSlcclxuXHRcdFx0KS5yZWYoXCJidXR0b25zXCIpXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0c3R5bGUoY3NzOiBJRG90Q3NzKTogdm9pZCB7XHJcblx0XHRzdXBlci5zdHlsZShjc3MpO1xyXG5cclxuXHRcdGNzcyhcImJ1dHRvblwiKS5mb250U2l6ZSgzNikuY3Vyc29yKFwicG9pbnRlclwiKTtcclxuXHRcdGNzcyhcImFcIikuY29sb3IoXCIjRERGXCIpO1xyXG5cdH1cclxufSIsImltcG9ydCB7IERvdENvbXBvbmVudCwgSURvdENzcywgSURvdEVsZW1lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcbmltcG9ydCBsYW5ndWFnZSBmcm9tIFwiLi9sYW5ndWFnZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllc05vU2VsZWN0IGV4dGVuZHMgRG90Q29tcG9uZW50e1xyXG5cclxuXHRwcm9wczogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0gPSB7XHJcblx0XHRzZWxlY3RlZDogZmFsc2UsXHJcblx0XHRsYW5nOiBcImVuXCIsLy8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYW5nXCIpIHx8IFwiZW5cIixcclxuXHR9O1xyXG5cclxuXHRldmVudHM6IHsgW2tleTogc3RyaW5nXTogKC4uLnBhcmFtczogYW55W10pID0+IHZvaWQ7IH0gPSB7XHJcblx0XHRcImNoYW5nZVwiOiAoKT0+e31cclxuXHR9XHJcblxyXG5cdGlzTG9ja2VkID0gZmFsc2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZTogYm9vbGVhbiwgaXNMb2NrZWQ6IGJvb2xlYW4pe1xyXG5cdFx0c3VwZXIoZGVmYXVsdFZhbHVlKTtcclxuXHRcdHRoaXMuaXNMb2NrZWQgPSBpc0xvY2tlZDtcclxuXHJcblx0XHRkb3QuYnVzLm9uKFwibGFuZ3VhZ2VcIiwgKGxhbmcpPT57XHJcblx0XHRcdHRoaXMucHJvcHMubGFuZyA9IGxhbmc7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldFN0cihzdHI6IGtleW9mICh0eXBlb2YgbGFuZ3VhZ2UpKXtcclxuXHRcdHJldHVybiAoKT0+bGFuZ3VhZ2Vbc3RyXVt0aGlzLnByb3BzLmxhbmddO1xyXG5cdH1cclxuXHJcblx0Y2hhbmdlKCl7XHJcblx0XHRpZih0aGlzLmlzTG9ja2VkKSByZXR1cm47XHJcblx0XHR0aGlzLnByb3BzLnNlbGVjdGVkID0gIXRoaXMucHJvcHMuc2VsZWN0ZWQ7XHJcblxyXG5cdFx0dGhpcy5ldmVudHMuY2hhbmdlKHRoaXMucHJvcHMuc2VsZWN0ZWQpO1xyXG5cdH1cclxuXHJcblx0YnVpbGRlcihkZWZhdWx0VmFsdWU6IGJvb2xlYW4pOiBJRG90RWxlbWVudCB7XHJcblx0XHR0aGlzLnByb3BzLnNlbGVjdGVkID0gZGVmYXVsdFZhbHVlO1xyXG5cdFx0cmV0dXJuIGRvdC5kaXYoXHJcblx0XHRcdGRvdC5kaXYoKCk9PnRoaXMucHJvcHMuc2VsZWN0ZWQgPyB0aGlzLmdldFN0cihcInllc05vQnRuWWVzXCIpIDogdGhpcy5nZXRTdHIoXCJ5ZXNOb0J0bk5vXCIpKS5jbGFzcyh7XCJpbm5lci1idG5cIjogdHJ1ZSwgeWVzOiAoKT0+dGhpcy5wcm9wcy5zZWxlY3RlZCwgbm86ICgpPT4hdGhpcy5wcm9wcy5zZWxlY3RlZH0pXHJcblx0XHQpLmNsYXNzKFwieWVzLW5vLWJ0blwiKS5vbkNsaWNrKCgpPT57dGhpcy5jaGFuZ2UoKX0pXHJcblx0fVxyXG5cclxuXHRzdHlsZShjc3M6IElEb3RDc3MpOiB2b2lkIHtcclxuXHRcdGNzcyhcIi55ZXMtbm8tYnRuXCIpXHJcblx0XHRcdC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXHJcblx0XHRcdC5ib3JkZXJSYWRpdXMoNSlcclxuXHRcdFx0LnBhZGRpbmcoMylcclxuXHRcdFx0LmZvbnRTaXplKDE0KVxyXG5cdFx0XHQubWFyZ2luTGVmdCgxMClcclxuXHRcdFx0LndpZHRoKDQwKVxyXG5cdFx0XHQuYm9yZGVyKFwiMXB4IHNvbGlkIHdoaXRlXCIpXHJcblx0XHRcdC5jdXJzb3IoXCJwb2ludGVyXCIpXHJcblx0XHRcdC50ZXh0QWxpZ24oXCJjZW50ZXJcIilcclxuXHJcblx0XHRjc3MoXCIuaW5uZXItYnRuXCIpXHJcblx0XHRcdC50cmFuc2l0aW9uKFwiYmFja2dyb3VuZC1jb2xvciAwLjVzXCIpXHJcblxyXG5cdFx0Y3NzKFwiLnllc1wiKVxyXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKFwiZ3JlZW5cIilcclxuXHJcblx0XHRjc3MoXCIubm9cIilcclxuXHRcdFx0LmJhY2tncm91bmRDb2xvcihcIiM0NDRcIilcclxuXHR9XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=