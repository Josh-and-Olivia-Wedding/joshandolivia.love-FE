"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_home_d"],{

/***/ "./src/home/date-widget.ts":
/*!*********************************!*\
  !*** ./src/home/date-widget.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
class DateWidget extends dothtml_1.DotComponent {
    builder() {
        return dothtml_1.dot.table(dothtml_1.dot.tr(dothtml_1.dot
            .td("3:45 PM").class("td1")
            .td("Jan 13").class("td2")
            .td("2024").class("td3")));
    }
    style(css) {
        css("table")
            .width('auto')
            .marginLeft(0)
            .marginRight(0)
            .borderCollapse('collapse')
            .textAlign('center');
        css("td").padding(16);
        css(".td1")
            .fontSize(24)
            .color("#DDD")
            .borderRight("3px solid #EB3");
        css(".td2")
            .fontSize(42)
            .color("#EEE")
            .borderRight("3px solid #EB3");
        css(".td3")
            .fontSize(24)
            .color("#DDD");
    }
}
exports["default"] = DateWidget;


/***/ }),

/***/ "./src/home/main-section.ts":
/*!**********************************!*\
  !*** ./src/home/main-section.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const page_section_1 = __importDefault(__webpack_require__(/*! ./page-section */ "./src/home/page-section.ts"));
const main_image_jpg_1 = __importDefault(__webpack_require__(/*! ../assets/images/main-image.jpg */ "./src/assets/images/main-image.jpg"));
const event_details_1 = __importDefault(__webpack_require__(/*! ../event-details */ "./src/event-details.ts"));
const date_widget_1 = __importDefault(__webpack_require__(/*! ./date-widget */ "./src/home/date-widget.ts"));
const CURSIVE_FONT = "Script MT, Segoe script, Rage, Lucida Handwriting, cursive, Satisfy";
const WEDDING_DATE = event_details_1.default.date;
function countdownToDate(targetDate = WEDDING_DATE) {
    const now = new Date();
    const timeDifference = (targetDate - now);
    // Convert difference in milliseconds to days
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(hours / (24));
    return days > 0 ? `${days} DAYS` : ((days == 0 && hours >= 0) ? `${hours % 24} HOURS` : null);
}
class MainSection extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {
            countdown: countdownToDate()
        };
    }
    builder() {
        // Extracting and formatting the date and time from WEDDING_DATE
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
        return super.builder(dothtml_1.dot.div(dothtml_1.dot.div().class("wedding-bg")
            .div(dothtml_1.dot.h1("Josh and Olivia").ref("names")
            // .p("Special Day").ref("specialDay")
            .p("Thank you for joining us!.").class("subheading")
            .br()
            .br()
            .div(dothtml_1.dot.span(() => this.props.countdown).ref("countdown")).id("countdown")
            .br()
            .br()
            .div(new date_widget_1.default())).class("overlay")).class("section-container"));
    }
    style(css) {
        super.style(css);
        css(".section-container")
            // .position("absolute")
            .position("relative")
            .height(1000)
            .widthP(100)
            .overflow("hidden");
        // .zIndex();
        css(".wedding-bg")
            .widthP(100)
            .height(1000)
            // .height("auto")
            .position("absolute")
            .topP(50)
            .backgroundImage(main_image_jpg_1.default)
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
            .backgroundColor(0, 0, 0, 0.6)
            .padding(20)
            .display("flex")
            .flexDirection("column")
            .alignItems("center")
            .justifyContent("center")
            .textAlign("center")
            // .backdropFilter(f => f.blur(3))
            .transition("opacity 2s ease-in-out")
            .opacity(0);
        setTimeout(() => {
            css(".overlay").opacity(1);
        }, 1000);
        css(".subheading")
            .color("white")
            .fontWeight("300")
            .fontFamily(CURSIVE_FONT)
            .fontSizeEm(1.3);
        css(".wedding-date")
            .color("white")
            .marginTop(15)
            .fontWeight("bold")
            .fontSizeEm(2);
        css(this.$refs.countdown)
            .color(100, 100, 255)
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
            .textShadow("2px 2px 2px rgba(0, 0, 0, 0.5)");
    }
    resize() {
        // // let contentPanel = this.$refs.container;
        // if (window.innerWidth <= 768) {
        // 	this.props.sizeMode = SIZE_MODE.MOBILE;
        // } else {
        // 	this.props.sizeMode = SIZE_MODE.DESKTOP;
        // }
        // this.mainSection.resize();
    }
    ready() {
        setInterval(() => {
            this.props.countdown = countdownToDate();
        }, 1000 * 60);
    }
}
exports["default"] = MainSection;


/***/ }),

/***/ "./src/home/page-section.ts":
/*!**********************************!*\
  !*** ./src/home/page-section.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
class PageSection extends dothtml_1.DotComponent {
    builder(content) {
        return dothtml_1.dot.div(content).class("page-section");
    }
    style(css) {
        css(".page-section")
            .position("relative")
            .widthP(100)
            .overflow("hidden");
        // .border("5px solid red");
    }
}
exports["default"] = PageSection;


/***/ }),

/***/ "./src/home/rsvp-section.ts":
/*!**********************************!*\
  !*** ./src/home/rsvp-section.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const page_section_1 = __importDefault(__webpack_require__(/*! ./page-section */ "./src/home/page-section.ts"));
const THREE = __importStar(__webpack_require__(/*! three */ "./node_modules/three/build/three.cjs"));
const simplex_1 = __importDefault(__webpack_require__(/*! ../scripts/simplex */ "./src/scripts/simplex.ts"));
let scene, camera, renderer;
let pillars = [];
let noise = (0, simplex_1.default)(50);
// 1. Initialization:
function initThreeScene(container) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 7;
    camera.position.y = 7;
    camera.lookAt(0, 0, 0);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    dothtml_1.dot.css(renderer.domElement)
        .position("absolute")
        .top(0)
        .left(0)
        .zIndex(1);
    const light = new THREE.PointLight(0xffffff, 100, 500);
    light.position.set(5, 10, 10);
    scene.add(light);
    // 2. Creating Hexagonal Pillars:
    const radiusTop = 1;
    const bevel = 0.05;
    const radiusBottom = 1;
    const height = 10;
    const radialSegments = 6; // hexagon
    const hexGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, undefined, true);
    const surfaceGeometry = new THREE.CircleGeometry(radiusTop - bevel, radialSegments);
    const coneGeometry = new THREE.CylinderGeometry(radiusTop - bevel, radiusBottom, bevel, radialSegments, undefined, true);
    const mainMaterial = new THREE.MeshStandardMaterial({
        color: 0x707070,
        metalness: 0.7,
        roughness: 0.2,
        flatShading: true
    });
    const bevelMaterial = new THREE.MeshStandardMaterial({
        color: 0xE0C080,
        metalness: 0.7,
        roughness: 0.2
    });
    let pillarRows = 10; // adjust for desired number of pillars
    let pillarCols = 8; // adjust for desired number of pillars
    for (let i = 0; i < pillarRows; i++) {
        for (let j = 0; j < pillarCols; j++) {
            let pillar = new THREE.Group();
            let mainPart = new THREE.Mesh(hexGeometry, mainMaterial);
            let topPart = new THREE.Mesh(coneGeometry, bevelMaterial);
            let surfacePart = new THREE.Mesh(surfaceGeometry, mainMaterial);
            pillar.add(mainPart);
            pillar.add(topPart);
            pillar.add(surfacePart);
            topPart.position.y = height / 2 + bevel / 2;
            surfacePart.position.y = height / 2 + bevel;
            surfacePart.rotation.x = -Math.PI / 2;
            surfacePart.rotation.z = -Math.PI / 2;
            // pillar.position.y = Math.random() * 0.5 - 0.25; // random offset
            pillar.position.x = (i - pillarRows / 2) * 1.7; // adjust for spacing
            pillar.position.z = (j - pillarCols / 2) * 1.8 + (i % 2 ? 1 : 0); // adjust for spacing
            pillar.rotation.y = Math.PI / 2;
            pillars.push(pillar);
            scene.add(pillar);
        }
    }
}
function onWindowResize(container) {
    // Update camera's aspect ratio
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    // Update renderer size
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}
let originalNow = Date.now() / 1000;
function animate() {
    requestAnimationFrame(animate);
    // Animate pillars here if necessary
    // Example: pillars[0].position.y += 0.01;
    let now = Date.now() / 1000;
    for (let i = 0; i < pillars.length; i++) {
        let p = pillars[i];
        let y = noise(p.position.x, (now - originalNow) / 1000, p.position.z);
        p.position.y = y;
    }
    renderer.render(scene, camera);
}
class RsvpSection extends page_section_1.default {
    constructor() {
        super(...arguments);
        this.props = {};
    }
    builder() {
        return super.builder(dothtml_1.dot.div(dothtml_1.dot.div(dothtml_1.dot.h1("News")
            .p("The wedding took place January 13 at Fanntasy Farm. We'll be providing a photo and video upload link shortly.<br />Click <a href=\"https://buy.stripe.com/8wM8zL6Ja31I7oQcMM\" target=\"_blank\">here</a> to give a gift!")).class("overlay")).ref("container").class("section-container"));
    }
    style(css) {
        super.style(css);
        css(".section-container")
            .height(400)
            .widthP(100);
        css(".overlay")
            .position("absolute")
            .top(0)
            .left(0)
            .right(0)
            .bottom(0)
            .backgroundColor(0, 0, 0, 0.5)
            .display("flex")
            .flexDirection("column")
            .alignItems("center")
            .justifyContent("center")
            .textAlign("center")
            .zIndex(2)
            .backdropFilter(f => f.blur(3));
        css(".overlay h1")
            .fontSizeEm(2.5)
            .color("white")
            .margin(0);
    }
    ready() {
        initThreeScene(this.$refs.container);
        // initThreeScene(document.body as HTMLDivElement);
        window.addEventListener('resize', () => {
            onWindowResize(this.$refs.container);
        });
        // Hack because mobile devices misbehave sometimes.
        let lastWidth = this.$refs.container.offsetWidth;
        setInterval(() => {
            let newWidth = this.$refs.container.offsetWidth;
            if (newWidth != lastWidth) {
                lastWidth = newWidth;
                onWindowResize(this.$refs.container);
            }
        }, 500); // every second
        animate();
    }
}
exports["default"] = RsvpSection;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzthQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUViLENBQUM7SUFFRCxLQUFLO1FBQ0osY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBMkIsQ0FBQyxDQUFDO1FBQ3ZELG1EQUFtRDtRQUVuRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUN0QyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUEyQixDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxtREFBbUQ7UUFDbkQsSUFBSSxTQUFTLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUE0QixDQUFDLFdBQVcsQ0FBQztRQUNyRSxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2hCLElBQUksUUFBUSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBNEIsQ0FBQyxXQUFXLENBQUM7WUFDcEUsSUFBRyxRQUFRLElBQUksU0FBUyxFQUFDO2dCQUN4QixTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUNyQixjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUEyQixDQUFDLENBQUM7YUFDdkQ7UUFDRixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlO1FBRXhCLE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNEO0FBbkVELGlDQW1FQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL2RhdGUtd2lkZ2V0LnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ob21lL21haW4tc2VjdGlvbi50cyIsIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvaG9tZS9wYWdlLXNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vd2VkZGluZy13ZWJzaXRlLy4vc3JjL2hvbWUvcnN2cC1zZWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvdENvbXBvbmVudCwgSURvdENzcywgSURvdEVsZW1lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVdpZGdldCBleHRlbmRzIERvdENvbXBvbmVudHtcclxuXHRidWlsZGVyKCk6IElEb3RFbGVtZW50IHtcclxuXHJcblx0XHRyZXR1cm4gZG90LnRhYmxlKFxyXG5cdFx0XHRkb3QudHIoXHJcblx0XHRcdFx0ZG90XHJcblx0XHRcdFx0XHQudGQoXCIzOjQ1IFBNXCIpLmNsYXNzKFwidGQxXCIpXHJcblx0XHRcdFx0XHQudGQoXCJKYW4gMTNcIikuY2xhc3MoXCJ0ZDJcIilcclxuXHRcdFx0XHRcdC50ZChcIjIwMjRcIikuY2xhc3MoXCJ0ZDNcIilcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHN0eWxlKGNzczogSURvdENzcyl7XHJcblx0XHRjc3MoXCJ0YWJsZVwiKVxyXG5cdFx0XHQud2lkdGgoJ2F1dG8nKVxyXG5cdFx0XHQubWFyZ2luTGVmdCgwKVxyXG5cdFx0XHQubWFyZ2luUmlnaHQoMClcclxuXHRcdFx0LmJvcmRlckNvbGxhcHNlKCdjb2xsYXBzZScpXHJcblx0XHRcdC50ZXh0QWxpZ24oJ2NlbnRlcicpO1xyXG5cclxuXHRcdGNzcyhcInRkXCIpLnBhZGRpbmcoMTYpO1xyXG5cdFx0XHJcblx0XHRjc3MoXCIudGQxXCIpXHJcblx0XHRcdC5mb250U2l6ZSgyNClcclxuXHRcdFx0LmNvbG9yKFwiI0RERFwiKVxyXG5cdFx0XHQuYm9yZGVyUmlnaHQoXCIzcHggc29saWQgI0VCM1wiKVxyXG5cdFx0Y3NzKFwiLnRkMlwiKVxyXG5cdFx0XHQuZm9udFNpemUoNDIpXHJcblx0XHRcdC5jb2xvcihcIiNFRUVcIilcclxuXHRcdFx0LmJvcmRlclJpZ2h0KFwiM3B4IHNvbGlkICNFQjNcIilcclxuXHRcdGNzcyhcIi50ZDNcIilcclxuXHRcdFx0LmZvbnRTaXplKDI0KVxyXG5cdFx0XHQuY29sb3IoXCIjREREXCIpO1xyXG5cdH1cclxuXHJcbn0iLCJpbXBvcnQgeyBJRG90Q3NzLCBkb3QgfSBmcm9tIFwiZG90aHRtbFwiO1xyXG5pbXBvcnQgUGFnZVNlY3Rpb24gZnJvbSBcIi4vcGFnZS1zZWN0aW9uXCI7XHJcbmltcG9ydCBtYWluSW1hZ2UgZnJvbSBcIi4uL2Fzc2V0cy9pbWFnZXMvbWFpbi1pbWFnZS5qcGdcIjtcclxuaW1wb3J0IEVWRU5UX0RFVEFJTFMgZnJvbSBcIi4uL2V2ZW50LWRldGFpbHNcIjtcclxuaW1wb3J0IERhdGVXaWRnZXQgZnJvbSBcIi4vZGF0ZS13aWRnZXRcIjtcclxuXHJcbmNvbnN0IENVUlNJVkVfRk9OVCA9IFwiU2NyaXB0IE1ULCBTZWdvZSBzY3JpcHQsIFJhZ2UsIEx1Y2lkYSBIYW5kd3JpdGluZywgY3Vyc2l2ZSwgU2F0aXNmeVwiO1xyXG5cclxuY29uc3QgV0VERElOR19EQVRFID0gRVZFTlRfREVUQUlMUy5kYXRlO1xyXG5cclxuZnVuY3Rpb24gY291bnRkb3duVG9EYXRlKHRhcmdldERhdGUgPSBXRURESU5HX0RBVEUpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IHRpbWVEaWZmZXJlbmNlID0gKCh0YXJnZXREYXRlIGFzIGFueSkgLSAobm93IGFzIGFueSkpIGFzIG51bWJlcjtcclxuICAgIFxyXG4gICAgLy8gQ29udmVydCBkaWZmZXJlbmNlIGluIG1pbGxpc2Vjb25kcyB0byBkYXlzXHJcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodGltZURpZmZlcmVuY2UgLyAoMTAwMCAqIDYwICogNjApKTtcclxuICAgIGNvbnN0IGRheXMgPSBNYXRoLmZsb29yKGhvdXJzIC8gKDI0KSk7XHJcbiAgICBcclxuICAgIHJldHVybiBkYXlzID4gMCA/IGAke2RheXN9IERBWVNgIDogKChkYXlzID09IDAgJiYgaG91cnMgPj0gMCkgPyBgJHtob3VycyAlIDI0fSBIT1VSU2AgOiBudWxsKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNlY3Rpb24gZXh0ZW5kcyBQYWdlU2VjdGlvbntcclxuXHJcblx0cHJvcHMgPSB7XHJcblx0XHRjb3VudGRvd246IGNvdW50ZG93blRvRGF0ZSgpXHJcblx0fVxyXG5cclxuXHRidWlsZGVyKCl7XHJcblxyXG5cdFx0Ly8gRXh0cmFjdGluZyBhbmQgZm9ybWF0dGluZyB0aGUgZGF0ZSBhbmQgdGltZSBmcm9tIFdFRERJTkdfREFURVxyXG5cdFx0Y29uc3QgZGF0ZU9wdGlvbnMgPSB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycgfTtcclxuXHRcdGNvbnN0IHRpbWVPcHRpb25zID0geyBob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTogJzItZGlnaXQnLCB0aW1lWm9uZU5hbWU6ICdzaG9ydCcgfTtcclxuXHRcdFxyXG5cclxuXHRcdHJldHVybiBzdXBlci5idWlsZGVyKFxyXG5cdFx0XHRkb3QuZGl2KFxyXG5cdFx0XHRcdGRvdC5kaXYoKS5jbGFzcyhcIndlZGRpbmctYmdcIilcclxuXHRcdFx0XHQuZGl2KFxyXG5cdFx0XHRcdFx0ZG90LmgxKFwiSm9zaCBhbmQgT2xpdmlhXCIpLnJlZihcIm5hbWVzXCIpXHJcblx0XHRcdFx0XHQvLyAucChcIlNwZWNpYWwgRGF5XCIpLnJlZihcInNwZWNpYWxEYXlcIilcclxuXHRcdFx0XHRcdC5wKFwiVGhhbmsgeW91IGZvciBqb2luaW5nIHVzIS5cIikuY2xhc3MoXCJzdWJoZWFkaW5nXCIpXHJcblx0XHRcdFx0XHQuYnIoKVxyXG5cdFx0XHRcdFx0LmJyKClcclxuXHRcdFx0XHRcdC5kaXYoXHJcblx0XHRcdFx0XHRcdGRvdC5zcGFuKCgpPT50aGlzLnByb3BzLmNvdW50ZG93bikucmVmKFwiY291bnRkb3duXCIpXHJcblx0XHRcdFx0XHQpLmlkKFwiY291bnRkb3duXCIpXHJcblx0XHRcdFx0XHQuYnIoKVxyXG5cdFx0XHRcdFx0LmJyKClcclxuXHRcdFx0XHRcdC5kaXYobmV3IERhdGVXaWRnZXQoKSlcclxuXHRcdFx0XHQpLmNsYXNzKFwib3ZlcmxheVwiKVxyXG5cdFx0XHQpLmNsYXNzKFwic2VjdGlvbi1jb250YWluZXJcIilcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRzdHlsZShjc3M6IElEb3RDc3Mpe1xyXG5cdFx0c3VwZXIuc3R5bGUoY3NzKTtcclxuXHRcdGNzcyhcIi5zZWN0aW9uLWNvbnRhaW5lclwiKVxyXG5cdFx0XHQvLyAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxyXG5cdFx0XHQucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxyXG5cdFx0XHQuaGVpZ2h0KDEwMDApXHJcblx0XHRcdC53aWR0aFAoMTAwKVxyXG5cdFx0XHQub3ZlcmZsb3coXCJoaWRkZW5cIilcclxuXHRcdFx0Ly8gLnpJbmRleCgpO1xyXG5cclxuXHRcdGNzcyhcIi53ZWRkaW5nLWJnXCIpXHJcblx0XHRcdC53aWR0aFAoMTAwKVxyXG5cdFx0XHQuaGVpZ2h0KDEwMDApXHJcblx0XHRcdC8vIC5oZWlnaHQoXCJhdXRvXCIpXHJcblx0XHRcdC5wb3NpdGlvbihcImFic29sdXRlXCIpXHJcblx0XHRcdC50b3BQKDUwKVxyXG5cdFx0XHQuYmFja2dyb3VuZEltYWdlKG1haW5JbWFnZSBhcyBhbnkpXHJcblx0XHRcdC5iYWNrZ3JvdW5kUG9zaXRpb24oXCI1MCUgNTAlXCIpXHJcblx0XHRcdC5iYWNrZ3JvdW5kUmVwZWF0KFwibm8tcmVwZWF0XCIpXHJcblx0XHRcdC5iYWNrZ3JvdW5kU2l6ZShcImNvdmVyXCIpXHJcblx0XHRcdC50cmFuc2Zvcm0odCA9PiB0LnRyYW5zbGF0ZVlQKC01MCkpO1xyXG5cdFx0XHJcblx0XHRjc3MoXCIub3ZlcmxheVwiKVxyXG5cdFx0XHQucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxyXG5cdFx0XHQudG9wKDApXHJcblx0XHRcdC5sZWZ0KDApXHJcblx0XHRcdC5yaWdodCgwKVxyXG5cdFx0XHQuYm90dG9tKDApXHJcblx0XHRcdC5iYWNrZ3JvdW5kQ29sb3IoMCwwLDAsMC42KVxyXG5cdFx0XHQucGFkZGluZygyMClcclxuXHRcdFx0LmRpc3BsYXkoXCJmbGV4XCIpXHJcblx0XHRcdC5mbGV4RGlyZWN0aW9uKFwiY29sdW1uXCIpXHJcblx0XHRcdC5hbGlnbkl0ZW1zKFwiY2VudGVyXCIpXHJcblx0XHRcdC5qdXN0aWZ5Q29udGVudChcImNlbnRlclwiKVxyXG5cdFx0XHQudGV4dEFsaWduKFwiY2VudGVyXCIpXHJcblx0XHRcdC8vIC5iYWNrZHJvcEZpbHRlcihmID0+IGYuYmx1cigzKSlcclxuXHRcdFx0LnRyYW5zaXRpb24oXCJvcGFjaXR5IDJzIGVhc2UtaW4tb3V0XCIpXHJcblx0XHRcdC5vcGFjaXR5KDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoKCk9PntcclxuXHRcdFx0Y3NzKFwiLm92ZXJsYXlcIikub3BhY2l0eSgxKTtcclxuXHRcdH0sIDEwMDApO1xyXG5cclxuXHRcdGNzcyhcIi5zdWJoZWFkaW5nXCIpXHJcblx0XHRcdC5jb2xvcihcIndoaXRlXCIpXHJcblx0XHRcdC5mb250V2VpZ2h0KFwiMzAwXCIpXHJcblx0XHRcdC5mb250RmFtaWx5KENVUlNJVkVfRk9OVClcclxuXHRcdFx0LmZvbnRTaXplRW0oMS4zKVxyXG5cclxuXHRcdGNzcyhcIi53ZWRkaW5nLWRhdGVcIilcclxuXHRcdFx0LmNvbG9yKFwid2hpdGVcIilcclxuXHRcdFx0Lm1hcmdpblRvcCgxNSlcclxuXHRcdFx0LmZvbnRXZWlnaHQoXCJib2xkXCIpXHJcblx0XHRcdC5mb250U2l6ZUVtKDIpXHJcblxyXG5cdFx0Y3NzKHRoaXMuJHJlZnMuY291bnRkb3duKVxyXG5cdFx0XHQuY29sb3IoMTAwLDEwMCwyNTUpXHJcblx0XHRcdC5mb250RmFtaWx5KFwiY29uc29sYXNcIilcclxuXHRcdFx0Lm1hcmdpblRvcCgxNSlcclxuXHRcdFx0Lm1hcmdpbkJvdHRvbSgxNSlcclxuXHRcdFx0Lm1hcmdpbkxlZnQoMClcclxuXHRcdFx0Lm1hcmdpblJpZ2h0KDApXHJcblx0XHRcdC5mb250U2l6ZUVtKDUpO1xyXG5cclxuXHRcdGNzcyh0aGlzLiRyZWZzLm5hbWVzKVxyXG5cdFx0XHQuZm9udFNpemVFbSg4KVxyXG5cdFx0XHQuY29sb3IoXCIjRUIzXCIpXHJcblx0XHRcdC8vIC5iYWNrZ3JvdW5kKFwibGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjMDAwMDAwLCAjMjIxMTAwLCAjMDAwMDAwKVwiKVxyXG5cdFx0XHQucGFkZGluZygyMClcclxuXHRcdFx0LmJvcmRlclJhZGl1cygzMClcclxuXHRcdFx0Ly8gLmJhY2tkcm9wRmlsdGVyKGYgPT4gZi5ibHVyKDIpKVxyXG5cdFx0XHQvLyAuYmFja2dyb3VuZChcIiMwMDBcIilcclxuXHRcdFx0LmJhY2tncm91bmRDbGlwKFwidGV4dFwiKVxyXG5cdFx0XHQub3BhY2l0eSgwLjYpXHJcblx0XHRcdC5tYXJnaW4oMClcclxuXHRcdFx0LmZvbnRGYW1pbHkoXCJmYXJhZGlsYVwiKVxyXG5cdFx0XHQudGV4dFNoYWRvdyhcIjJweCAycHggMnB4IHJnYmEoMCwgMCwgMCwgMC41KVwiKVxyXG5cdH1cclxuXHJcblx0cmVzaXplKCl7XHJcblx0XHQvLyAvLyBsZXQgY29udGVudFBhbmVsID0gdGhpcy4kcmVmcy5jb250YWluZXI7XHJcblx0XHQvLyBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNzY4KSB7XHJcblx0XHQvLyBcdHRoaXMucHJvcHMuc2l6ZU1vZGUgPSBTSVpFX01PREUuTU9CSUxFO1xyXG5cdFx0Ly8gfSBlbHNlIHtcclxuXHRcdC8vIFx0dGhpcy5wcm9wcy5zaXplTW9kZSA9IFNJWkVfTU9ERS5ERVNLVE9QO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHRcdC8vIHRoaXMubWFpblNlY3Rpb24ucmVzaXplKCk7XHJcblx0fVxyXG5cclxuXHRyZWFkeSgpe1xyXG5cdFx0c2V0SW50ZXJ2YWwoKCk9PntcclxuXHRcdFx0dGhpcy5wcm9wcy5jb3VudGRvd24gPSBjb3VudGRvd25Ub0RhdGUoKTtcclxuXHRcdH0sIDEwMDAqNjApXHJcblx0fVxyXG59IiwiaW1wb3J0IHsgRG90Q29tcG9uZW50LCBJRG90Q3NzLCBkb3QgfSBmcm9tIFwiZG90aHRtbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZVNlY3Rpb24gZXh0ZW5kcyBEb3RDb21wb25lbnR7XHJcblxyXG5cdGJ1aWxkZXIoY29udGVudCl7XHJcblx0XHRyZXR1cm4gZG90LmRpdihjb250ZW50KS5jbGFzcyhcInBhZ2Utc2VjdGlvblwiKVxyXG5cdH1cclxuXHJcblx0c3R5bGUoY3NzOiBJRG90Q3NzKXtcclxuXHRcdGNzcyhcIi5wYWdlLXNlY3Rpb25cIilcclxuXHRcdFx0LnBvc2l0aW9uKFwicmVsYXRpdmVcIilcclxuXHRcdFx0LndpZHRoUCgxMDApXHJcblx0XHRcdC5vdmVyZmxvdyhcImhpZGRlblwiKVxyXG5cdFx0XHQvLyAuYm9yZGVyKFwiNXB4IHNvbGlkIHJlZFwiKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgSURvdENzcywgZG90IH0gZnJvbSBcImRvdGh0bWxcIjtcclxuaW1wb3J0IFBhZ2VTZWN0aW9uIGZyb20gXCIuL3BhZ2Utc2VjdGlvblwiO1xyXG5cclxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgc2ltcGxleCBmcm9tIFwiLi4vc2NyaXB0cy9zaW1wbGV4XCI7XHJcblxyXG5sZXQgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXI7XHJcbmxldCBwaWxsYXJzID0gW107XHJcbmxldCBub2lzZSA9IHNpbXBsZXgoNTApO1xyXG5cclxuLy8gMS4gSW5pdGlhbGl6YXRpb246XHJcbmZ1bmN0aW9uIGluaXRUaHJlZVNjZW5lKGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcblxyXG4gICAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCBjb250YWluZXIub2Zmc2V0V2lkdGggLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0LCAwLjEsIDEwMDApO1xyXG4gICAgY2FtZXJhLnBvc2l0aW9uLnogPSA3O1xyXG4gICAgY2FtZXJhLnBvc2l0aW9uLnkgPSA3O1xyXG4gICAgY2FtZXJhLmxvb2tBdCgwLCAwLCAwKTtcclxuXHJcbiAgICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pO1xyXG4gICAgcmVuZGVyZXIuc2V0U2l6ZShjb250YWluZXIub2Zmc2V0V2lkdGgsIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuXHRkb3QuY3NzKHJlbmRlcmVyLmRvbUVsZW1lbnQpXHJcblx0XHQucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxyXG5cdFx0LnRvcCgwKVxyXG5cdFx0LmxlZnQoMClcclxuXHRcdC56SW5kZXgoMSlcclxuXHJcbiAgICBjb25zdCBsaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmZmZmLCAxMDAsIDUwMCk7XHJcbiAgICBsaWdodC5wb3NpdGlvbi5zZXQoNSwgMTAsIDEwKTtcclxuICAgIHNjZW5lLmFkZChsaWdodCk7XHJcblxyXG4gICAgLy8gMi4gQ3JlYXRpbmcgSGV4YWdvbmFsIFBpbGxhcnM6XHJcbiAgICBjb25zdCByYWRpdXNUb3AgPSAxO1xyXG4gICAgY29uc3QgYmV2ZWwgPSAwLjA1O1xyXG4gICAgY29uc3QgcmFkaXVzQm90dG9tID0gMTsgXHJcbiAgICBjb25zdCBoZWlnaHQgPSAxMDsgXHJcbiAgICBjb25zdCByYWRpYWxTZWdtZW50cyA9IDY7IC8vIGhleGFnb25cclxuICAgIGNvbnN0IGhleEdlb21ldHJ5ID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkocmFkaXVzVG9wLCByYWRpdXNCb3R0b20sIGhlaWdodCwgcmFkaWFsU2VnbWVudHMsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICBjb25zdCBzdXJmYWNlR2VvbWV0cnkgPSBuZXcgVEhSRUUuQ2lyY2xlR2VvbWV0cnkocmFkaXVzVG9wIC0gYmV2ZWwsIHJhZGlhbFNlZ21lbnRzKTtcclxuICAgIGNvbnN0IGNvbmVHZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KHJhZGl1c1RvcCAtIGJldmVsLCByYWRpdXNCb3R0b20sIGJldmVsLCByYWRpYWxTZWdtZW50cywgdW5kZWZpbmVkLCB0cnVlKTtcclxuXHJcbiAgICBjb25zdCBtYWluTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xyXG4gICAgICAgIGNvbG9yOiAweDcwNzA3MCxcclxuICAgICAgICBtZXRhbG5lc3M6IDAuNyxcclxuICAgICAgICByb3VnaG5lc3M6IDAuMixcclxuXHRcdGZsYXRTaGFkaW5nOiB0cnVlXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBiZXZlbE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcclxuICAgICAgICBjb2xvcjogMHhFMEMwODAsXHJcbiAgICAgICAgbWV0YWxuZXNzOiAwLjcsXHJcbiAgICAgICAgcm91Z2huZXNzOiAwLjJcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBwaWxsYXJSb3dzID0gMTA7IC8vIGFkanVzdCBmb3IgZGVzaXJlZCBudW1iZXIgb2YgcGlsbGFyc1xyXG4gICAgbGV0IHBpbGxhckNvbHMgPSA4OyAvLyBhZGp1c3QgZm9yIGRlc2lyZWQgbnVtYmVyIG9mIHBpbGxhcnNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGlsbGFyUm93czsgaSsrKSB7XHJcbiAgICBcdGZvciAobGV0IGogPSAwOyBqIDwgcGlsbGFyQ29sczsgaisrKSB7XHJcblx0XHRcdGxldCBwaWxsYXIgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuXHRcdFx0bGV0IG1haW5QYXJ0ID0gbmV3IFRIUkVFLk1lc2goaGV4R2VvbWV0cnksIG1haW5NYXRlcmlhbCk7XHJcblx0XHRcdGxldCB0b3BQYXJ0ID0gbmV3IFRIUkVFLk1lc2goY29uZUdlb21ldHJ5LCBiZXZlbE1hdGVyaWFsKTtcclxuXHRcdFx0bGV0IHN1cmZhY2VQYXJ0ID0gbmV3IFRIUkVFLk1lc2goc3VyZmFjZUdlb21ldHJ5LCBtYWluTWF0ZXJpYWwpO1xyXG5cdFx0XHRwaWxsYXIuYWRkKG1haW5QYXJ0KTtcclxuXHRcdFx0cGlsbGFyLmFkZCh0b3BQYXJ0KTtcclxuXHRcdFx0cGlsbGFyLmFkZChzdXJmYWNlUGFydCk7XHJcblx0XHRcdHRvcFBhcnQucG9zaXRpb24ueSA9IGhlaWdodCAvIDIgKyBiZXZlbCAvIDI7XHJcblx0XHRcdHN1cmZhY2VQYXJ0LnBvc2l0aW9uLnkgPSBoZWlnaHQgLyAyICsgYmV2ZWw7XHJcblx0XHRcdHN1cmZhY2VQYXJ0LnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XHJcblx0XHRcdHN1cmZhY2VQYXJ0LnJvdGF0aW9uLnogPSAtTWF0aC5QSSAvIDI7XHJcblx0XHRcdC8vIHBpbGxhci5wb3NpdGlvbi55ID0gTWF0aC5yYW5kb20oKSAqIDAuNSAtIDAuMjU7IC8vIHJhbmRvbSBvZmZzZXRcclxuXHRcdFx0cGlsbGFyLnBvc2l0aW9uLnggPSAoaSAtIHBpbGxhclJvd3MgLyAyKSAqIDEuNzsgLy8gYWRqdXN0IGZvciBzcGFjaW5nXHJcblx0XHRcdHBpbGxhci5wb3NpdGlvbi56ID0gKGogLSBwaWxsYXJDb2xzIC8gMikgKiAxLjggKyAoaSAlIDIgPyAxIDogMCk7IC8vIGFkanVzdCBmb3Igc3BhY2luZ1xyXG5cdFx0XHRwaWxsYXIucm90YXRpb24ueSA9IE1hdGguUEkgLyAyO1xyXG5cdFx0XHRwaWxsYXJzLnB1c2gocGlsbGFyKTtcclxuXHRcdFx0c2NlbmUuYWRkKHBpbGxhcik7XHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgIC8vIFVwZGF0ZSBjYW1lcmEncyBhc3BlY3QgcmF0aW9cclxuICAgIGNhbWVyYS5hc3BlY3QgPSBjb250YWluZXIub2Zmc2V0V2lkdGggLyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgcmVuZGVyZXIgc2l6ZVxyXG4gICAgcmVuZGVyZXIuc2V0U2l6ZShjb250YWluZXIub2Zmc2V0V2lkdGgsIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQpO1xyXG59XHJcblxyXG5sZXQgb3JpZ2luYWxOb3cgPSBEYXRlLm5vdygpIC8gMTAwMDtcclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcblxyXG4gICAgLy8gQW5pbWF0ZSBwaWxsYXJzIGhlcmUgaWYgbmVjZXNzYXJ5XHJcbiAgICAvLyBFeGFtcGxlOiBwaWxsYXJzWzBdLnBvc2l0aW9uLnkgKz0gMC4wMTtcclxuXHJcblx0bGV0IG5vdyA9IERhdGUubm93KCkgLyAxMDAwO1xyXG5cclxuXHRmb3IobGV0IGkgPSAwOyBpIDwgcGlsbGFycy5sZW5ndGg7IGkrKyl7XHJcblx0XHRsZXQgcCA9IHBpbGxhcnNbaV07XHJcblx0XHRsZXQgeSA9IG5vaXNlKHAucG9zaXRpb24ueCwgKG5vdyAtIG9yaWdpbmFsTm93KSAvIDEwMDAsIHAucG9zaXRpb24ueik7XHJcblx0XHRwLnBvc2l0aW9uLnkgPSB5O1xyXG5cdH1cclxuXHJcbiAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSc3ZwU2VjdGlvbiBleHRlbmRzIFBhZ2VTZWN0aW9ue1xyXG5cclxuXHRwcm9wcyA9IHtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0YnVpbGRlcigpe1xyXG5cclxuXHRcdHJldHVybiBzdXBlci5idWlsZGVyKFxyXG5cdFx0XHRkb3QuZGl2KFxyXG5cdFx0XHRcdGRvdC5kaXYoXHJcblx0XHRcdFx0XHRkb3QuaDEoXCJOZXdzXCIpXHJcblx0XHRcdFx0XHQucChcIlRoZSB3ZWRkaW5nIHRvb2sgcGxhY2UgSmFudWFyeSAxMyBhdCBGYW5udGFzeSBGYXJtLiBXZSdsbCBiZSBwcm92aWRpbmcgYSBwaG90byBhbmQgdmlkZW8gdXBsb2FkIGxpbmsgc2hvcnRseS48YnIgLz5DbGljayA8YSBocmVmPVxcXCJodHRwczovL2J1eS5zdHJpcGUuY29tLzh3TTh6TDZKYTMxSTdvUWNNTVxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPmhlcmU8L2E+IHRvIGdpdmUgYSBnaWZ0IVwiKVxyXG5cdFx0XHRcdCkuY2xhc3MoXCJvdmVybGF5XCIpXHJcblx0XHRcdCkucmVmKFwiY29udGFpbmVyXCIpLmNsYXNzKFwic2VjdGlvbi1jb250YWluZXJcIilcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRzdHlsZShjc3M6IElEb3RDc3Mpe1xyXG5cdFx0c3VwZXIuc3R5bGUoY3NzKTtcclxuXHJcblx0XHRjc3MoXCIuc2VjdGlvbi1jb250YWluZXJcIilcclxuXHRcdFx0LmhlaWdodCg0MDApXHJcblx0XHRcdC53aWR0aFAoMTAwKTtcclxuXHRcdFxyXG5cdFx0Y3NzKFwiLm92ZXJsYXlcIilcclxuXHRcdFx0LnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcclxuXHRcdFx0LnRvcCgwKVxyXG5cdFx0XHQubGVmdCgwKVxyXG5cdFx0XHQucmlnaHQoMClcclxuXHRcdFx0LmJvdHRvbSgwKVxyXG5cdFx0XHQuYmFja2dyb3VuZENvbG9yKDAsMCwwLDAuNSlcclxuXHRcdFx0LmRpc3BsYXkoXCJmbGV4XCIpXHJcblx0XHRcdC5mbGV4RGlyZWN0aW9uKFwiY29sdW1uXCIpXHJcblx0XHRcdC5hbGlnbkl0ZW1zKFwiY2VudGVyXCIpXHJcblx0XHRcdC5qdXN0aWZ5Q29udGVudChcImNlbnRlclwiKVxyXG5cdFx0XHQudGV4dEFsaWduKFwiY2VudGVyXCIpXHJcblx0XHRcdC56SW5kZXgoMilcclxuXHRcdFx0LmJhY2tkcm9wRmlsdGVyKGYgPT4gZi5ibHVyKDMpKTtcclxuXHRcdFxyXG5cdFx0Y3NzKFwiLm92ZXJsYXkgaDFcIilcclxuXHRcdFx0LmZvbnRTaXplRW0oMi41KVxyXG5cdFx0XHQuY29sb3IoXCJ3aGl0ZVwiKVxyXG5cdFx0XHQubWFyZ2luKDApO1xyXG5cclxuXHR9XHJcblxyXG5cdHJlYWR5KCk6IHZvaWQge1xyXG5cdFx0aW5pdFRocmVlU2NlbmUodGhpcy4kcmVmcy5jb250YWluZXIgYXMgSFRNTERpdkVsZW1lbnQpO1xyXG5cdFx0Ly8gaW5pdFRocmVlU2NlbmUoZG9jdW1lbnQuYm9keSBhcyBIVE1MRGl2RWxlbWVudCk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuXHRcdFx0b25XaW5kb3dSZXNpemUodGhpcy4kcmVmcy5jb250YWluZXIgYXMgSFRNTERpdkVsZW1lbnQpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdC8vIEhhY2sgYmVjYXVzZSBtb2JpbGUgZGV2aWNlcyBtaXNiZWhhdmUgc29tZXRpbWVzLlxyXG5cdFx0bGV0IGxhc3RXaWR0aCA9ICh0aGlzLiRyZWZzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkub2Zmc2V0V2lkdGg7XHJcblx0XHRzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdGxldCBuZXdXaWR0aCA9ICh0aGlzLiRyZWZzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkub2Zmc2V0V2lkdGg7XHJcblx0XHRcdGlmKG5ld1dpZHRoICE9IGxhc3RXaWR0aCl7XHJcblx0XHRcdFx0bGFzdFdpZHRoID0gbmV3V2lkdGg7XHJcblx0XHRcdFx0b25XaW5kb3dSZXNpemUodGhpcy4kcmVmcy5jb250YWluZXIgYXMgSFRNTERpdkVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCA1MDApOyAvLyBldmVyeSBzZWNvbmRcclxuXHJcblx0XHRhbmltYXRlKCk7XHJcblx0fVxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9