import "./styles/styles.css";

// import "./styles/fonts.css";
import precious from "./assets/fonts/Precious.ttf";
const preciousFontFace = new FontFace("precious", `url(${precious})`);
preciousFontFace.load().then(f=>{
	document.fonts.add(f);
});

import faradila from "./assets/fonts/faradila.ttf";
const faradilaFontFace = new FontFace("faradila", `url(${faradila})`);
faradilaFontFace.load().then(f=>{
	document.fonts.add(f);
});

// orbitronFont.load().then((loadedFont) => {
// 	document.fonts.add(loadedFont);
// });

import { dot } from "dothtml";
import App from "./home/app";
import StaryBg from "./components/stary-bg";
// import Splash from "./components/splash";


dot("body")
	.h(new StaryBg())
	.h(new App());

dot.css("body")
	.margin(0)
	.padding(0)
	.paddingTop(50)
	.paddingBottom(50)
	.backgroundColor(0)
	.fontFamily("Arial, sans-serif")
	.color("white");