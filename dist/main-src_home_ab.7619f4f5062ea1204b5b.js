"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_home_ab"],{

/***/ "./src/home/about-the-couple.ts":
/*!**************************************!*\
  !*** ./src/home/about-the-couple.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const page_section_1 = __importDefault(__webpack_require__(/*! ./page-section */ "./src/home/page-section.ts"));
const small_pic_jpg_1 = __importDefault(__webpack_require__(/*! ../assets/images/small-pic.jpg */ "./src/assets/images/small-pic.jpg"));
class AboutTheCouple extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {};
    }
    builder() {
        return super.builder(dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.h1("About Olivia and Josh")
            .img().src(small_pic_jpg_1.default).ref("smallImage")
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
            "a love that is their eternal promise."].join(" "))).class("overlay")).ref("container").class("section-container"));
    }
    style(css) {
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
            .backgroundColor(0, 0, 0, 0.3)
            .padding(20);
        // .backdropFilter(f => f.blur(3));
        css(".overlay h1")
            .fontSizeEm(2.5)
            .color("white")
            .margin(0);
        css(this.$refs.smallImage)
            .width(200)
            .height(200)
            .borderRadius(100)
            .float("right");
    }
}
exports["default"] = AboutTheCouple;


/***/ }),

/***/ "./src/home/app.ts":
/*!*************************!*\
  !*** ./src/home/app.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const main_section_1 = __importDefault(__webpack_require__(/*! ./main-section */ "./src/home/main-section.ts"));
const rsvp_section_1 = __importDefault(__webpack_require__(/*! ./rsvp-section */ "./src/home/rsvp-section.ts"));
const about_the_couple_1 = __importDefault(__webpack_require__(/*! ./about-the-couple */ "./src/home/about-the-couple.ts"));
const unsubscribe_pane_1 = __importDefault(__webpack_require__(/*! ./rsvp-stuff/unsubscribe-pane */ "./src/home/rsvp-stuff/unsubscribe-pane.ts"));
const confirmation_pane_1 = __importDefault(__webpack_require__(/*! ./rsvp-stuff/confirmation-pane */ "./src/home/rsvp-stuff/confirmation-pane.ts"));
var SIZE_MODE;
(function (SIZE_MODE) {
    SIZE_MODE[SIZE_MODE["DESKTOP"] = 0] = "DESKTOP";
    SIZE_MODE[SIZE_MODE["MOBILE"] = 1] = "MOBILE";
})(SIZE_MODE || (SIZE_MODE = {}));
class App extends dothtml_1.DotComponent {
    constructor() {
        super(...arguments);
        this.props = {
            sizeMode: SIZE_MODE.DESKTOP
        };
    }
    builder() {
        this.mainSection = new main_section_1.default();
        this.resize();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const paramValue = urlParams.get("invite");
        return dothtml_1.dot.div(dothtml_1.dot.when((!!paramValue) || window.location.hash.startsWith("#confirm_") || window.location.hash.startsWith("#invite_") || window.location.hash.startsWith("#decline_"), () => {
            return new confirmation_pane_1.default();
        })
            .otherwiseWhen(window.location.hash.startsWith("#unsubscribe_"), () => {
            return new unsubscribe_pane_1.default();
        })
            .otherwise(() => {
            return dothtml_1.dot.h(this.mainSection)
                .h(new rsvp_section_1.default())
                .h(new about_the_couple_1.default());
        })).ref("container")
            .class({
            "mobile-content": () => this.props.sizeMode == SIZE_MODE.MOBILE,
            "desktop-content": () => this.props.sizeMode == SIZE_MODE.DESKTOP
        });
    }
    style(css) {
        css(this.$refs.container)
            .position("relative")
            .backgroundColor(70, 55, 0, 0.6)
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
            .paddingTop(15);
        // .marginLeft(-15)
        // .marginRight(-15)
    }
    resize() {
        // let contentPanel = this.$refs.container;
        if (window.innerWidth <= 768) {
            this.props.sizeMode = SIZE_MODE.MOBILE;
        }
        else {
            this.props.sizeMode = SIZE_MODE.DESKTOP;
        }
        this.mainSection.resize();
    }
    ready() {
        window.addEventListener("resize", () => this.resize());
    }
}
exports["default"] = App;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUMsQ0FBQztRQUNoQyxhQUFhO1FBRWQsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2FBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ1YsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUNmLG1CQUFtQjtRQUNuQixvQkFBb0I7SUFDdEIsQ0FBQztJQUVELE1BQU07UUFDTCwyQ0FBMkM7UUFDM0MsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQ3ZDO2FBQU07WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSztRQUNKLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRSxFQUFFLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRDtBQTNFRCx5QkEyRUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9hYm91dC10aGUtY291cGxlLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRG90Q3NzLCBkb3QgfSBmcm9tIFwiZG90aHRtbFwiO1xyXG5pbXBvcnQgUGFnZVNlY3Rpb24gZnJvbSBcIi4vcGFnZS1zZWN0aW9uXCI7XHJcblxyXG5pbXBvcnQgc21hbGxJbWFnZSBmcm9tIFwiLi4vYXNzZXRzL2ltYWdlcy9zbWFsbC1waWMuanBnXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBYm91dFRoZUNvdXBsZSBleHRlbmRzIFBhZ2VTZWN0aW9ue1xyXG5cclxuXHRwcm9wcyA9IHtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0YnVpbGRlcigpe1xyXG5cclxuXHRcdHJldHVybiBzdXBlci5idWlsZGVyKFxyXG5cdFx0XHRkb3QuZGl2KFxyXG5cdFx0XHRcdGRvdC5kaXYoXHJcblx0XHRcdFx0XHRkb3QuaDEoXCJBYm91dCBPbGl2aWEgYW5kIEpvc2hcIilcclxuXHRcdFx0XHRcdC5pbWcoKS5zcmMoc21hbGxJbWFnZSkucmVmKFwic21hbGxJbWFnZVwiKVxyXG5cdFx0XHRcdFx0Ly8gLnAoW1wiSm9zaCBhbmQgT2xpdmlhIG1ldCBhdCBZb3JrIFVuaXZlcnNpdHkgaW4gMjAxMS4gSm9zaCB3YXMgZW5yb2xsZWQgaW4gQ29tcHV0ZXIgRW5naW5lZXJpbmcsIGFuZCBPbGl2aWFcIixcclxuXHRcdFx0XHRcdC8vIFx0XCJtYWpvcmVkIGluIEVuZ2xpc2ggYW5kIFByb2Zlc3Npb25hbCBXcml0aW5nLiBKb3NoIHdhcyBydW5uaW5nIGEgcm9ib3QgZmlnaHRpbmcgY2x1YiBhdCB0aGUgdGltZSB3aGVuXCIsXHJcblx0XHRcdFx0XHQvLyBcdFwiT2xpdmlhIHJlYWNoZWQgb3V0IHRvIGpvaW4gaXQuXCIsXHJcblx0XHRcdFx0XHQvLyBcdFwiPGJyIC8+PGJyIC8+XCIsXHJcblx0XHRcdFx0XHQvLyBcdFwiSm9zaCBoYXBwaWx5IGFjY2VwdGVkIGhlciBpbnRvIGhpcyBjbHViLCB3aGVyZSBzaGUgdG9vayBvbiBhbiBleGVjdXRpdmUgcm9sZSwgYW5kIHRoZSB0d28gYmVjYW1lIGZhc3RcIixcclxuXHRcdFx0XHRcdC8vIFx0XCJmcmllbmRzLlwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcIjxiciAvPjxiciAvPlwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcIk92ZXIgdGhlIGNvdXJzZSBvZiB0d28geWVhcnMsIHRoZXkgYmVjYW1lIGNsb3NlciwgYW5kIGFuIGV2ZW50dWFsIHJvbWFuY2UgYmxvc3NvbWVkIGJldHdlZW4gdGhlXCIsXHJcblx0XHRcdFx0XHQvLyBcdFwidHdvLiBUaGV5IGVuam95ZWQgc2hhcmVkIGludGVyZXN0cywgc3VjaCBhcyBjaGVzcywgdmlkZW8gZ2FtZXMsIHNub3dib2FyZGluZywgYW5kLCBvZiBjb3Vyc2UsIHJvYm90aWNzLlwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcIkFzIHRoZSB5ZWFycyBwYXNzZWQsIHRoZWlyIGxvdmUgZm9yIG9uZSBhbm90aGVyIGRlZXBlbmVkLiBMaWtlIGEgZmluZSB3aW5lLCBpdCBoYXMgaW1wcm92ZWQgb3ZlciB0aW1lXCIsXHJcblx0XHRcdFx0XHQvLyBcdFwiYW5kIGNvbnRpbnVlcyB0byBncm93LlwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcIjxiciAvPjxiciAvPlwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcIk9uIEphbnVhcnkgMjksIDIwMjIsIGR1cmluZyBhIHRyaXAgdG8gTWV4aWNvLCBKb3NoIGFuZCBPbGl2aWEgaGFkIGJlZW4gZGViYXRpbmcgb3ZlciB0aGUgY29uc3RlbGxhdGlvblwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcIk9yaW9uIHdoZW4gSm9zaCBkZWNpZGVkIHRvIHRha2UgdGhlaXIgcmVsYXRpb25zaGlwIHRvIHRoZSBuZXh0IGxldmVsIGFuZCBwcm9wb3NlZCBtYXJyaWFnZSB0byBPbGl2aWEuXCIsXHJcblx0XHRcdFx0XHQvLyBcdFwiQWZ0ZXIgZmVlbGluZyBsaWtlIGl0IHdhcyB0aW1l4oCUYW5kIHRoYXQgaXQgd2FzIOKAnHdyaXR0ZW4gaW4gdGhlIHN0YXJz4oCd4oCUYSBzaG9vdGluZyBzdGFyIG1hZGUgaXRzIHdheVwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcInRocm91Z2ggdGhlIGNlbnRlciBvZiB0aGUgY29uc3RlbGxhdGlvbiBPcmlvbi5cIixcclxuXHRcdFx0XHRcdC8vIFx0XCI8YnIgLz48YnIgLz5cIixcclxuXHRcdFx0XHRcdC8vIFx0XCJXaXRoIHRoaXMgcHJvZm91bmQgYmxlc3NpbmcgZnJvbSB0aGUgaGVhdmVucywgSm9zaCBnb3QgZG93biBvbiBvbmUga25lZSB0byBhc2sgT2xpdmlhIHRvIGJlIGhpcyBicmlkZS5cIixcclxuXHRcdFx0XHRcdC8vIFx0XCJBbHRob3VnaCB0aGVyZSB3YXMgbm8gcmluZyBpbnZvbHZlZCAoYXMgdGhlIHByb3Bvc2FsIHdhcyBub3QgcGxhbm5lZCksIHRoZSB0b2tlbiBvZiBhZmZlY3Rpb24gY291bGQgbm90XCIsXHJcblx0XHRcdFx0XHQvLyBcdFwiaGF2ZSBiZWVuIHN3ZWV0ZXI6IGEgRmVycmVybyBSb2NoZXIgY2hvY29sYXRlLlwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcIjxiciAvPjxiciAvPlwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcIldpdGggZ3JlYXQgam95LCBPbGl2aWEgYWNjZXB0ZWQgaGlzIHByb3Bvc2FsLCBhbmQgdGhlIHR3byBpbnZpdGUgeW91IHRvIGpvaW4gdGhlbSBpbiB0aGlzIHdvbmRlcmZ1bFwiLFxyXG5cdFx0XHRcdFx0Ly8gXHRcImNlbGVicmF0aW9uIG9mIHRoZWlyIGxvdmUuXCJdLmpvaW4oXCIgXCIpKVxyXG5cdFx0XHRcdFx0Ly8gLmhyKClcclxuXHRcdFx0XHRcdC5wKFtcIkluIHRoZSBoYWxsb3dlZCBoYWxscyBvZiBZb3JrIFVuaXZlcnNpdHksIHdoZXJlIGRyZWFtcyB3ZXJlIHdvdmVuIGZyb20gdGhlIHRocmVhZHMgb2YgYW1iaXRpb24sXCIsXHJcblx0XHRcdFx0XHRcdFwidHdvIHNvdWxzIGNvbnZlcmdlZCBpbiBhbiB1bmV4cGVjdGVkIGFsbGlhbmNlLiBKb3NoLCBhIENvbXB1dGVyIEVuZ2luZWVyaW5nIHZpcnR1b3NvIHdpdGggYSBwYXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcdFwiZm9yIG1lY2hhbmljYWwgY29tYmF0LCBsZWQgYSBiYW5kIG9mIHJvYm90IGZpZ2h0aW5nIGVudGh1c2lhc3RzLiBPbGl2aWEsIGFuIGV0aGVyZWFsIHNwaXJpdCBtYWpvcmluZ1wiLFxyXG5cdFx0XHRcdFx0XHRcImluIEVuZ2xpc2ggYW5kIFByb2Zlc3Npb25hbCBXcml0aW5nLCB3YXMgY2FwdGl2YXRlZCBieSB0aGUgc3BhcmtzIG9mIGNyZWF0aXZpdHkgc2hlIGZvdW5kIHRoZXJlLlwiLFxyXG5cdFx0XHRcdFx0XHRcIjxiciAvPjxiciAvPlwiLFxyXG5cdFx0XHRcdFx0XHRcIkEgbXlzdGVyaW91cyBjb25uZWN0aW9uIGRyZXcgT2xpdmlhIHRvIHRoZSBhcmVuYSBvZiBtZXRhbCBhbmQgY29kZSwgYW5kIHNoZSByZWFjaGVkIG91dCB0byBqb2luIHRoZSByYW5rcy5cIixcclxuXHRcdFx0XHRcdFx0XCJXaXRoIGEgd2VsY29taW5nIHNtaWxlLCBKb3NoIHVzaGVyZWQgaGVyIGludG8gaGlzIHdvcmxkLCBhbmQgc2hlIHF1aWNrbHkgZm91bmQgaGVyIHBsYWNlIHdpdGhpbiB0aGUgY2x1Yi5cIixcclxuXHRcdFx0XHRcdFx0XCJGcm9tIHRoZSBmdXNpb24gb2YgZ2VhcnMgYW5kIHByb3NlLCBhIGNhbWFyYWRlcmllIHdhcyBib3JuLCBhbmQgdGhleSB3ZXJlIGVudHdpbmVkIGFzIGZhc3QgZnJpZW5kcy5cIixcclxuXHRcdFx0XHRcdFx0XCI8YnIgLz48YnIgLz5cIixcclxuXHRcdFx0XHRcdFx0XCJJbiB0aGUgZGFuY2Ugb2YgbGlmZSwgdGhlaXIgY29ubmVjdGlvbiBldm9sdmVkLCBmbG91cmlzaGluZyBpbnRvIGEgcm9tYW5jZSB0aGF0IGJsb3Nzb21lZCB3aXRoIHNoYXJlZCBwYXNzaW9uc1wiLFxyXG5cdFx0XHRcdFx0XHRcIi0gY2hlc3MsIHZpZGVvIGdhbWVzLCBzbm93Ym9hcmRpbmcsIGFuZCwgYWJvdmUgYWxsLCByb2JvdGljcy4gVGhlaXIgbG92ZSB3YXMgYSB2aW50YWdlIGJsZW5kLCBtYXR1cmluZyBhbmRcIixcclxuXHRcdFx0XHRcdFx0XCJkZWVwZW5pbmcgbGlrZSBhIHJpY2ggd2luZS5cIixcclxuXHRcdFx0XHRcdFx0XCI8YnIgLz48YnIgLz5cIixcclxuXHRcdFx0XHRcdFx0XCJVcG9uIHRoZSAyOXRoIG9mIEphbnVhcnksIDIwMjIsIG9uIGEgYmVhdXRpZnVsIHN0YXJyeSBuaWdodCBpbiBNZXhpY28ncyB3YXJtIGVtYmFyY2UsIGFtaWQgYSBwbGF5ZnVsIGRlYmF0ZSBhYm91dCB0aGUgY29uc3RlbGxhdGlvblwiLFxyXG5cdFx0XHRcdFx0XHRcIk9yaW9uLCBKb3NoIHNlbnNlZCBhIG1vbWVudCByaXBlIHRvIHRha2UgYSBsb3ZlcidzIGNoYW5jZSB0byBzZW5kIHRoZWlyIHJlbGF0aW9uc2hpcCB0byB0aGUgbmV4dCBsZXZlbC5cIixcclxuXHRcdFx0XHRcdFx0XCJcXFwiSXQncyB3cml0dGVuIGluIHRoZSBzdGFycyxcXFwiIGhlIG11c2VkLiBBbmQgYXMgaGUgc3Bva2UsIGEgc2hvb3Rpbmcgc3RhciBmbGV3IGFjY3Jvc3MgdGhlIHNreSBhbmQgdGhyb3VnaCB0aGUgYmVsdCBvZiBPcmlvbi5cIixcclxuXHRcdFx0XHRcdFx0XCJBIHByb2ZvdW5kIGJsZXNzaW5nIGZyb20gdGhlIGhlYXZhbnMuIEFuZCB3aXRoIHRoZSBjb3Ntb3MgYmVhcmluZyB3aXRuZXNzIGhlIGdvdCBkb3duIG9uIG9uZSBrbmVlLlwiLFxyXG5cdFx0XHRcdFx0XHRcIk5vIHJpbmcgaW4gaGFuZCAoYXMgdGhlIHByb3Bvc2FsIHdhcyBub3QgcGxhbm5lZCksIHlldCBsb3ZlJ3MgaW50ZW50IG1vc3QgY2xlYXJseSBidXJuZWQsIEEgRmVycmVybyBSb2NoZXIsXCIsXHJcblx0XHRcdFx0XHRcdFwiYSB0b2tlbiByaWNoIGluIG1lYW5pbmcsIHRob3VnaCBpbiBnb2xkIHVud2VpZ2hlZC5cIixcclxuXHRcdFx0XHRcdFx0XCJBIHF1ZXN0aW9uIHdhcyBhc2tlZCwgYSB1bml2ZXJzZSBoZWxkIGl0cyBicmVhdGgsIGFuZCB3aXRoIGpveW91cyBjcnksIE9saXZpYSBhY2NlcHRlZC5cIixcclxuXHRcdFx0XHRcdFx0XCI8YnIgLz48YnIgLz5cIixcclxuXHRcdFx0XHRcdFx0XCJOb3csIHRoZXkgaW52aXRlIHlvdSB0byBiZSBhIHdpdG5lc3MgdG8gYSBjZWxlYnJhdGlvbiBsaWtlIG5vIG90aGVyLCBhIHRlc3RhbWVudCB0byBhIGxvdmUgYm9ybiBmcm9tIGZyaWVuZHNoaXAgYW5kIG51cnR1cmVkIHRocm91Z2hcIixcclxuXHRcdFx0XHRcdFx0XCJzaGFyZWQgZHJlYW1zLiBKb2luIHRoZW0gaW4gdG9hc3RpbmcgdG8gYSBsb3ZlIFxcXCJ3cml0dGVuIGluIHRoZSBzdGFycyxcXFwiIGEgbG92ZSB0aGF0IHRyYW5zY2VuZHMgb3JkaW5hcnkgYm91bmRzLFwiLFxyXG5cdFx0XHRcdFx0XHRcImEgbG92ZSB0aGF0IGlzIHRoZWlyIGV0ZXJuYWwgcHJvbWlzZS5cIl0uam9pbihcIiBcIikpXHJcblx0XHRcdFx0KS5jbGFzcyhcIm92ZXJsYXlcIilcclxuXHRcdFx0KS5yZWYoXCJjb250YWluZXJcIikuY2xhc3MoXCJzZWN0aW9uLWNvbnRhaW5lclwiKVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHN0eWxlKGNzczogSURvdENzcyl7XHJcblx0XHRzdXBlci5zdHlsZShjc3MpO1xyXG5cclxuXHRcdGNzcyhcIi5zZWN0aW9uLWNvbnRhaW5lclwiKVxyXG5cdFx0XHQvLyAuaGVpZ2h0KDUwMClcclxuXHRcdFx0LndpZHRoUCgxMDApO1xyXG5cdFx0XHJcblx0XHRjc3MoXCIub3ZlcmxheVwiKVxyXG5cdFx0XHQvLyAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxyXG5cdFx0XHQvLyAudG9wKDApXHJcblx0XHRcdC8vIC5sZWZ0KDApXHJcblx0XHRcdC8vIC5yaWdodCgwKVxyXG5cdFx0XHQvLyAuYm90dG9tKDApXHJcblx0XHRcdC8vIC5kaXNwbGF5KFwiZmxleFwiKVxyXG5cdFx0XHQvLyAuZmxleERpcmVjdGlvbihcImNvbHVtblwiKVxyXG5cdFx0XHQvLyAuYWxpZ25JdGVtcyhcImNlbnRlclwiKVxyXG5cdFx0XHQvLyAuanVzdGlmeUNvbnRlbnQoXCJjZW50ZXJcIilcclxuXHRcdFx0Ly8gLnRleHRBbGlnbihcImNlbnRlclwiKVxyXG5cdFx0XHQvLyAuekluZGV4KDIpXHJcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMCwwLDAsMC4zKVxyXG5cdFx0XHQucGFkZGluZygyMClcclxuXHRcdFx0Ly8gLmJhY2tkcm9wRmlsdGVyKGYgPT4gZi5ibHVyKDMpKTtcclxuXHRcdFxyXG5cdFx0Y3NzKFwiLm92ZXJsYXkgaDFcIilcclxuXHRcdFx0LmZvbnRTaXplRW0oMi41KVxyXG5cdFx0XHQuY29sb3IoXCJ3aGl0ZVwiKVxyXG5cdFx0XHQubWFyZ2luKDApO1xyXG5cclxuXHRcdGNzcyh0aGlzLiRyZWZzLnNtYWxsSW1hZ2UpXHJcblx0XHRcdC53aWR0aCgyMDApXHJcblx0XHRcdC5oZWlnaHQoMjAwKVxyXG5cdFx0XHQuYm9yZGVyUmFkaXVzKDEwMClcclxuXHRcdFx0LmZsb2F0KFwicmlnaHRcIilcclxuXHR9XHJcbn0iLCJpbXBvcnQgeyBEb3RDb21wb25lbnQsIElEb3RDc3MsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcbmltcG9ydCBNYWluU2VjdGlvbiBmcm9tIFwiLi9tYWluLXNlY3Rpb25cIjtcclxuaW1wb3J0IFN0YXJ5QmcgZnJvbSBcIi4uL2NvbXBvbmVudHMvc3RhcnktYmdcIjtcclxuaW1wb3J0IFJzdnBTZWN0aW9uIGZyb20gXCIuL3JzdnAtc2VjdGlvblwiO1xyXG5pbXBvcnQgQWJvdXRUaGVDb3VwbGUgZnJvbSBcIi4vYWJvdXQtdGhlLWNvdXBsZVwiO1xyXG5pbXBvcnQgVW5zdWJzY3JpYmVQYW5lIGZyb20gXCIuL3JzdnAtc3R1ZmYvdW5zdWJzY3JpYmUtcGFuZVwiO1xyXG5pbXBvcnQgQ29uZmlybWF0aW9uUGFuZSBmcm9tIFwiLi9yc3ZwLXN0dWZmL2NvbmZpcm1hdGlvbi1wYW5lXCI7XHJcblxyXG5lbnVtIFNJWkVfTU9ERSB7XHJcblx0REVTS1RPUCxcclxuXHRNT0JJTEVcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgRG90Q29tcG9uZW50e1xyXG5cdHByb3BzID0ge1xyXG5cdFx0c2l6ZU1vZGU6IFNJWkVfTU9ERS5ERVNLVE9QIGFzIFNJWkVfTU9ERVxyXG5cdH1cclxuXHRtYWluU2VjdGlvbjogTWFpblNlY3Rpb247XHJcblxyXG5cdGJ1aWxkZXIoKXtcclxuXHRcdHRoaXMubWFpblNlY3Rpb24gPSBuZXcgTWFpblNlY3Rpb24oKTtcclxuXHRcdHRoaXMucmVzaXplKCk7XHJcblxyXG5cdFx0Y29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG5cdFx0Y29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeVN0cmluZyk7XHJcblx0XHRjb25zdCBwYXJhbVZhbHVlID0gdXJsUGFyYW1zLmdldChcImludml0ZVwiKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGRvdC5kaXYoXHJcblxyXG5cdFx0XHRkb3Qud2hlbigoISFwYXJhbVZhbHVlKSB8fCB3aW5kb3cubG9jYXRpb24uaGFzaC5zdGFydHNXaXRoKFwiI2NvbmZpcm1fXCIpIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN0YXJ0c1dpdGgoXCIjaW52aXRlX1wiKSB8fCB3aW5kb3cubG9jYXRpb24uaGFzaC5zdGFydHNXaXRoKFwiI2RlY2xpbmVfXCIpLCAoKT0+e1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlybWF0aW9uUGFuZSgpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQub3RoZXJ3aXNlV2hlbih3aW5kb3cubG9jYXRpb24uaGFzaC5zdGFydHNXaXRoKFwiI3Vuc3Vic2NyaWJlX1wiKSwgKCk9PntcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFVuc3Vic2NyaWJlUGFuZSgpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQub3RoZXJ3aXNlKCgpPT57XHJcblx0XHRcdFx0cmV0dXJuIGRvdC5oKHRoaXMubWFpblNlY3Rpb24pXHJcblx0XHRcdFx0XHQuaChuZXcgUnN2cFNlY3Rpb24oKSlcclxuXHRcdFx0XHRcdC5oKG5ldyBBYm91dFRoZUNvdXBsZSgpKTtcclxuXHRcdFx0fSlcclxuXHJcblx0XHQpLnJlZihcImNvbnRhaW5lclwiKVxyXG5cdFx0LmNsYXNzKHtcclxuXHRcdFx0XCJtb2JpbGUtY29udGVudFwiOiAoKT0+IHRoaXMucHJvcHMuc2l6ZU1vZGUgPT0gU0laRV9NT0RFLk1PQklMRSxcclxuXHRcdFx0XCJkZXNrdG9wLWNvbnRlbnRcIjogKCk9PiB0aGlzLnByb3BzLnNpemVNb2RlID09IFNJWkVfTU9ERS5ERVNLVE9QXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3R5bGUoY3NzOiBJRG90Q3NzKXtcclxuXHJcblx0XHRjc3ModGhpcy4kcmVmcy5jb250YWluZXIpXHJcblx0XHRcdC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXHJcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoNzAsNTUsMCwwLjYpXHJcblx0XHRcdC8vIC5iYWNrZ3JvdW5kQ29sb3IoMjAwLDE3MCw1MCwwLjYpXHJcblx0XHRcdC5ib3JkZXJSYWRpdXMoMTApXHJcblx0XHRcdC5tYXJnaW5Ub3AoMClcclxuXHRcdFx0Lm1hcmdpbkJvdHRvbSgwKVxyXG5cdFx0XHQubWFyZ2luTGVmdChcImF1dG9cIilcclxuXHRcdFx0Lm1hcmdpblJpZ2h0KFwiYXV0b1wiKVxyXG5cdFx0XHQucGFkZGluZygzMClcclxuXHRcdFx0LndpZHRoUCg3MClcclxuXHRcdFx0Lm1heFdpZHRoKDEyMDApXHJcblx0XHRcdC56SW5kZXgoMilcclxuXHRcdFx0LmJhY2tkcm9wRmlsdGVyKGYgPT4gZi5ibHVyKDMpKTtcclxuXHRcdFx0Ly8gLm9wYWNpdHkoKVxyXG5cclxuXHRcdGNzcyhcIi5tb2JpbGUtY29udGVudFwiKVxyXG5cdFx0XHQud2lkdGhQKDEwMClcclxuXHRcdFx0LnBhZGRpbmcoMClcclxuXHRcdFx0LnBhZGRpbmdUb3AoMTUpXHJcblx0XHRcdC8vIC5tYXJnaW5MZWZ0KC0xNSlcclxuXHRcdFx0Ly8gLm1hcmdpblJpZ2h0KC0xNSlcclxuXHR9XHJcblxyXG5cdHJlc2l6ZSgpe1xyXG5cdFx0Ly8gbGV0IGNvbnRlbnRQYW5lbCA9IHRoaXMuJHJlZnMuY29udGFpbmVyO1xyXG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnNpemVNb2RlID0gU0laRV9NT0RFLk1PQklMRTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcHMuc2l6ZU1vZGUgPSBTSVpFX01PREUuREVTS1RPUDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm1haW5TZWN0aW9uLnJlc2l6ZSgpO1xyXG5cdH1cclxuXHJcblx0cmVhZHkoKTogdm9pZCB7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKT0+dGhpcy5yZXNpemUoKSk7XHJcblx0fVxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9