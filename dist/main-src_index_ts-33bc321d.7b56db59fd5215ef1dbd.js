"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_index_ts-33bc321d"],{

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");
// import "./styles/fonts.css";
const Precious_ttf_1 = __importDefault(__webpack_require__(/*! ./assets/fonts/Precious.ttf */ "./src/assets/fonts/Precious.ttf"));
const preciousFontFace = new FontFace("precious", `url(${Precious_ttf_1.default})`);
preciousFontFace.load().then(f => {
    document.fonts.add(f);
});
const faradila_ttf_1 = __importDefault(__webpack_require__(/*! ./assets/fonts/faradila.ttf */ "./src/assets/fonts/faradila.ttf"));
const faradilaFontFace = new FontFace("faradila", `url(${faradila_ttf_1.default})`);
faradilaFontFace.load().then(f => {
    document.fonts.add(f);
});
// orbitronFont.load().then((loadedFont) => {
// 	document.fonts.add(loadedFont);
// });
const dothtml_1 = __webpack_require__(/*! dothtml */ "./node_modules/dothtml/lib/dothtml.js");
const app_1 = __importDefault(__webpack_require__(/*! ./home/app */ "./src/home/app.ts"));
const stary_bg_1 = __importDefault(__webpack_require__(/*! ./components/stary-bg */ "./src/components/stary-bg.ts"));
// import Splash from "./components/splash";
(0, dothtml_1.dot)("body")
    .h(new stary_bg_1.default())
    .h(new app_1.default());
dothtml_1.dot.css("body")
    .margin(0)
    .padding(0)
    .paddingTop(50)
    .paddingBottom(50)
    .backgroundColor(0)
    .fontFamily("Arial, sans-serif")
    .color("white");


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfaW5kZXhfdHMtMzNiYzMyMWQuN2I1NmRiNTlmZDUyMTVlZjFkYmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwRUFBNkI7QUFFN0IsK0JBQStCO0FBQy9CLGtJQUFtRDtBQUNuRCxNQUFNLGdCQUFnQixHQUFHLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRSxPQUFPLHNCQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ3RFLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUU7SUFDL0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxrSUFBbUQ7QUFDbkQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUUsT0FBTyxzQkFBUSxHQUFHLENBQUMsQ0FBQztBQUN0RSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFFO0lBQy9CLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUgsNkNBQTZDO0FBQzdDLG1DQUFtQztBQUNuQyxNQUFNO0FBRU4sOEZBQThCO0FBQzlCLDBGQUE2QjtBQUM3QixxSEFBNEM7QUFDNUMsNENBQTRDO0FBRzVDLGlCQUFHLEVBQUMsTUFBTSxDQUFDO0tBQ1QsQ0FBQyxDQUFDLElBQUksa0JBQU8sRUFBRSxDQUFDO0tBQ2hCLENBQUMsQ0FBQyxJQUFJLGFBQUcsRUFBRSxDQUFDLENBQUM7QUFFZixhQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztLQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDVCxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ1YsVUFBVSxDQUFDLEVBQUUsQ0FBQztLQUNkLGFBQWEsQ0FBQyxFQUFFLENBQUM7S0FDakIsZUFBZSxDQUFDLENBQUMsQ0FBQztLQUNsQixVQUFVLENBQUMsbUJBQW1CLENBQUM7S0FDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VkZGluZy13ZWJzaXRlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc3R5bGVzL3N0eWxlcy5jc3NcIjtcclxuXHJcbi8vIGltcG9ydCBcIi4vc3R5bGVzL2ZvbnRzLmNzc1wiO1xyXG5pbXBvcnQgcHJlY2lvdXMgZnJvbSBcIi4vYXNzZXRzL2ZvbnRzL1ByZWNpb3VzLnR0ZlwiO1xyXG5jb25zdCBwcmVjaW91c0ZvbnRGYWNlID0gbmV3IEZvbnRGYWNlKFwicHJlY2lvdXNcIiwgYHVybCgke3ByZWNpb3VzfSlgKTtcclxucHJlY2lvdXNGb250RmFjZS5sb2FkKCkudGhlbihmPT57XHJcblx0ZG9jdW1lbnQuZm9udHMuYWRkKGYpO1xyXG59KTtcclxuXHJcbmltcG9ydCBmYXJhZGlsYSBmcm9tIFwiLi9hc3NldHMvZm9udHMvZmFyYWRpbGEudHRmXCI7XHJcbmNvbnN0IGZhcmFkaWxhRm9udEZhY2UgPSBuZXcgRm9udEZhY2UoXCJmYXJhZGlsYVwiLCBgdXJsKCR7ZmFyYWRpbGF9KWApO1xyXG5mYXJhZGlsYUZvbnRGYWNlLmxvYWQoKS50aGVuKGY9PntcclxuXHRkb2N1bWVudC5mb250cy5hZGQoZik7XHJcbn0pO1xyXG5cclxuLy8gb3JiaXRyb25Gb250LmxvYWQoKS50aGVuKChsb2FkZWRGb250KSA9PiB7XHJcbi8vIFx0ZG9jdW1lbnQuZm9udHMuYWRkKGxvYWRlZEZvbnQpO1xyXG4vLyB9KTtcclxuXHJcbmltcG9ydCB7IGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIi4vaG9tZS9hcHBcIjtcclxuaW1wb3J0IFN0YXJ5QmcgZnJvbSBcIi4vY29tcG9uZW50cy9zdGFyeS1iZ1wiO1xyXG4vLyBpbXBvcnQgU3BsYXNoIGZyb20gXCIuL2NvbXBvbmVudHMvc3BsYXNoXCI7XHJcblxyXG5cclxuZG90KFwiYm9keVwiKVxyXG5cdC5oKG5ldyBTdGFyeUJnKCkpXHJcblx0LmgobmV3IEFwcCgpKTtcclxuXHJcbmRvdC5jc3MoXCJib2R5XCIpXHJcblx0Lm1hcmdpbigwKVxyXG5cdC5wYWRkaW5nKDApXHJcblx0LnBhZGRpbmdUb3AoNTApXHJcblx0LnBhZGRpbmdCb3R0b20oNTApXHJcblx0LmJhY2tncm91bmRDb2xvcigwKVxyXG5cdC5mb250RmFtaWx5KFwiQXJpYWwsIHNhbnMtc2VyaWZcIilcclxuXHQuY29sb3IoXCJ3aGl0ZVwiKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=