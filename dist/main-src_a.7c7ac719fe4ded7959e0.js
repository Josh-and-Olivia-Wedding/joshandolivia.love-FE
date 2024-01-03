"use strict";
(self["webpackChunkwedding_website"] = self["webpackChunkwedding_website"] || []).push([["main-src_a"],{

/***/ "./src/assets/fonts/Precious.ttf":
/*!***************************************!*\
  !*** ./src/assets/fonts/Precious.ttf ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/Precious.ttf");

/***/ }),

/***/ "./src/assets/fonts/faradila.ttf":
/*!***************************************!*\
  !*** ./src/assets/fonts/faradila.ttf ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/faradila.ttf");

/***/ }),

/***/ "./src/components/stary-bg.ts":
/*!************************************!*\
  !*** ./src/components/stary-bg.ts ***!
  \************************************/
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
const PIXI = __importStar(__webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.js"));
const simplex_1 = __importDefault(__webpack_require__(/*! ../scripts/simplex */ "./src/scripts/simplex.ts"));
let rNoise = (0, simplex_1.default)(50);
let gNoise = (0, simplex_1.default)(50);
let bNoise = (0, simplex_1.default)(50);
let now = Date.now() / 1000;
function mapLinear(value, a1, a2, b1, b2) {
    return b1 + (value - a1) * (b2 - b1) / (a2 - a1);
}
function generateStarColor() {
    // Random value between 0xC0 and 0xFF
    const randomValue = Math.floor(Math.random() * (0xFF - 0xC0 + 1)) + 0xC0;
    // Randomly decide which channel gets the random value
    const randomChannel = Math.floor(Math.random() * 3);
    let r, g, b;
    switch (randomChannel) {
        case 0: // Red gets the random value
            r = randomValue;
            g = 0xFF;
            b = 0xFF;
            break;
        case 1: // Green gets the random value
            r = 0xFF;
            g = randomValue;
            b = 0xFF;
            break;
        case 2: // Blue gets the random value
            r = 0xFF;
            g = 0xFF;
            b = randomValue;
            break;
    }
    // Combine r, g, and b into a single integer
    return (r << 16) + (g << 8) + b;
}
/**
 * Draw a star shape with an arbitrary number of points.
 * @ignore
 */
class Star extends PIXI.Polygon {
    /**
     * @param x - Center X position of the star
     * @param y - Center Y position of the star
     * @param points - The number of points of the star, must be > 1
     * @param radius - The outer radius of the star
     * @param innerRadius - The inner radius between points, default half `radius`
     * @param rotation - The rotation of the star in radians, where 0 is vertical
     */
    constructor(x, y, points, radius, innerRadius, rotation = 0) {
        innerRadius = innerRadius || radius / 2;
        const startAngle = (-1 * Math.PI / 2) + rotation;
        const len = points * 2;
        const delta = Math.PI * 2 / len;
        const polygon = [];
        for (let i = 0; i < len; i++) {
            const r = i % 2 ? innerRadius : radius;
            const angle = (i * delta) + startAngle;
            polygon.push(x + (r * Math.cos(angle)), y + (r * Math.sin(angle)));
        }
        super(polygon);
    }
}
/**
 * Draw a star shape with an arbitrary number of points.
 *
 * _Note: Only available with **@pixi/graphics-extras**._
 * @method PIXI.Graphics#drawStar
 * @param this
 * @param x - Center X position of the star
 * @param y - Center Y position of the star
 * @param points - The number of points of the star, must be > 1
 * @param radius - The outer radius of the star
 * @param innerRadius - The inner radius between points, default half `radius`
 * @param rotation - The rotation of the star in radians, where 0 is vertical
 * @returns - This Graphics object. Good for chaining method calls
 */
function drawStar(this2, x, y, points, radius, innerRadius, rotation = 0) {
    return this2.drawPolygon(new Star(x, y, points, radius, innerRadius, rotation));
}
function addStars(renderer, starContainer, milkyWayContainer, stars) {
    // Remove existing stars.
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        starContainer.removeChild(star);
    }
    milkyWayContainer.removeChildren();
    // Add milky way.
    // Create a graphics object and draw a circle
    let bgStarGfx = new PIXI.Graphics();
    bgStarGfx.beginFill(0xFFFFFF); // White color for the star
    bgStarGfx.drawCircle(0, 0, 3); // Draw a circle of radius 5 at position (5, 5)
    bgStarGfx.endFill();
    // Generate a texture from the graphics object
    const starTexture = renderer.generateTexture(bgStarGfx);
    let nBgStars = Math.min(10000, 10000 * (window.innerWidth * window.innerHeight / 3489280));
    for (let i = 0; i < nBgStars; i++) {
        let star = new PIXI.Sprite(starTexture);
        star.x = Math.random() * window.innerWidth;
        star.y = Math.random() * window.innerHeight;
        star.alpha = Math.random() * 0.8; // for some variation in brightness
        star.scale.set(0.334 + Math.random() * 0.666); // random scaling for size variation
        star.tint = generateStarColor();
        milkyWayContainer.addChild(star);
    }
    stars.length = 0;
    // Number of stars
    let numStars = Math.min(100, Math.floor(100 * (window.innerWidth * window.innerHeight / 3489280)));
    // Create stars
    for (let i = 0; i < numStars; i++) {
        let star = new PIXI.Graphics();
        star.beginFill(generateStarColor());
        // star.drawCircle(0, 0, 1);  // (x, y, radius)
        let inner = 2 + Math.random() * 2;
        let outer = inner + 2 + Math.random() * 2;
        drawStar(star, 0, 0, Math.floor(4 + Math.random() * 3), outer, inner, Math.random() * 2 * Math.PI);
        star.endFill();
        star.x = Math.random() * window.innerWidth;
        star.y = Math.random() * window.innerHeight;
        // Velocity for random motion
        star.vx = (Math.random() - 0.5) * 2 * speedFactor; // Random value between -1 and 1
        star.vy = (Math.random() - 0.5) * 2 * speedFactor;
        starContainer.addChild(star);
        stars.push(star);
    }
}
class ShootingStar {
    constructor(stage) {
        this.rSpeed = (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1);
        this.stage = stage;
        this.direction = Math.random() * Math.PI * 2;
        let w = window.innerWidth;
        let h = window.innerHeight;
        let d = Math.sqrt(w * w + h * h);
        this.sprite = new PIXI.Graphics();
        this.sprite.beginFill(generateStarColor());
        drawStar(this.sprite, 0, 0, 5, 8, 4, Math.random() * 2 * Math.PI);
        this.sprite.endFill();
        this.speed = Math.random() * 12 + 20;
        this.sprite.x = w / 2 - Math.sin(this.direction) * d / 2;
        this.sprite.y = h / 2 - Math.cos(this.direction) * d / 2;
        stage.addChild(this.sprite); // Assuming you've already defined starContainer
    }
    update(dt) {
        this.sprite.x += Math.cos(this.direction) * this.speed * dt;
        this.sprite.y += Math.sin(this.direction) * this.speed * dt;
        this.sprite.rotation += this.rSpeed * dt;
        let w = window.innerWidth / 2;
        let h = window.innerHeight / 2;
        let cx = this.sprite.x - w;
        let cy = this.sprite.y - h;
        let cd2 = cx * cx + cy * cy;
        if (cd2 > (h * h + w * w)) {
            this.remove();
            return false; // Indicate that the star has been removed
        }
        return true; // Star still in canvas
    }
    remove() {
        this.stage.removeChild(this.sprite);
    }
}
const speedFactor = 0.1;
class StaryBg extends dothtml_1.DotComponent {
    builder() {
        return dothtml_1.dot.div().class("star-bg-canvas-container").ref("canvasContainer");
    }
    style(css) {
        css(this.$refs.canvasContainer)
            .position("fixed")
            .left(0)
            .right(0)
            .top(0)
            .bottom(0)
            .zIndex(1);
    }
    ready() {
        // Create the Pixi Application
        const app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x000000,
        });
        this.$refs.canvasContainer.appendChild(app.view);
        const milkyWayContainer = new PIXI.ParticleContainer();
        const lineContainer = new PIXI.Container();
        const starContainer = new PIXI.Container();
        // Star data
        let stars = [];
        let shootingStars = [];
        app.stage.addChild(milkyWayContainer);
        app.stage.addChild(lineContainer);
        app.stage.addChild(starContainer);
        addStars(app.renderer, starContainer, milkyWayContainer, stars);
        // Game loop
        app.ticker.add((delta) => {
            // console.log(delta);
            lineContainer.removeChildren();
            // Update star positions
            for (let star of stars) {
                star.x += star.vx;
                star.y += star.vy;
                // Keep stars inside the screen bounds
                if (star.x < 0 || star.x > app.screen.width)
                    star.vx = -star.vx;
                if (star.y < 0 || star.y > app.screen.height)
                    star.vy = -star.vy;
            }
            // Check distances between stars and draw lines
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 300) { // 150 can be adjusted as needed
                        const line = new PIXI.Graphics();
                        const alpha = mapLinear(distance, 50, 150, 1, 0); // 50 and 150 are min and max distances to consider
                        const thickness = mapLinear(distance, 50, 150, 3, 1);
                        line.lineStyle(thickness, 0xAA99FF, alpha);
                        line.moveTo(stars[i].x, stars[i].y);
                        line.lineTo(stars[j].x, stars[j].y);
                        lineContainer.addChild(line);
                    }
                }
            }
            // Shooting stars.
            shootingStars = shootingStars.filter(star => star.update(delta));
            let probability = (10 / 30) * (delta / 60);
            // console.log(probability);
            if (Math.random() < probability) {
                shootingStars.push(new ShootingStar(starContainer));
            }
        });
        window.addEventListener("resize", () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            if (this.resizeDebounce) {
                clearTimeout(this.resizeDebounce);
            }
            this.resizeDebounce = setTimeout(() => {
                addStars(app.renderer, starContainer, milkyWayContainer, stars);
                this.resizeDebounce = null;
            }, 100);
        });
    }
}
exports["default"] = StaryBg;


/***/ }),

/***/ "./src/event-details.ts":
/*!******************************!*\
  !*** ./src/event-details.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const EVENT_DETAILS = Object.freeze({
    date: new Date("2024-01-13T15:45:00.000-05:00")
});
exports["default"] = EVENT_DETAILS;


/***/ }),

/***/ "./src/assets/images/main-image.jpg":
/*!******************************************!*\
  !*** ./src/assets/images/main-image.jpg ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "57f4fc6c3521f1a63991350b8aa76813.jpg");

/***/ }),

/***/ "./src/assets/images/small-pic.jpg":
/*!*****************************************!*\
  !*** ./src/assets/images/small-pic.jpg ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "6007f3fb8905ad283520c8fda5c7b679.jpg");

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfYS43YzdhYzcxOWZlNGRlZDc5NTllMC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQWUscUJBQXVCLHVCQUF1Qjs7Ozs7Ozs7Ozs7Ozs7QUNBN0QsaUVBQWUscUJBQXVCLHVCQUF1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBN0QsOEZBQTRDO0FBQzVDLHFHQUFnQztBQUNoQyw2R0FBeUM7QUFFekMsSUFBSSxNQUFNLEdBQUcscUJBQU8sRUFBQyxFQUFFLENBQUMsQ0FBQztBQUN6QixJQUFJLE1BQU0sR0FBRyxxQkFBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLElBQUksTUFBTSxHQUFHLHFCQUFPLEVBQUMsRUFBRSxDQUFDLENBQUM7QUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUU1QixTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUNwQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsU0FBUyxpQkFBaUI7SUFDdEIscUNBQXFDO0lBQ3JDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUV6RSxzREFBc0Q7SUFDdEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFcEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNaLFFB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LElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsZ0RBQWdEO0lBQ2xGLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRTtRQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxD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LElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRSxFQUFFO1lBQ3JDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTNELElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBQztnQkFDdEIsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNsQztZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUUsRUFBRTtnQkFDcEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUM1QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQW5HRCw2QkFtR0M7Ozs7Ozs7Ozs7Ozs7QUM3VEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsK0JBQStCLENBQUM7Q0FDL0MsQ0FBQyxDQUFDO0FBRUgscUJBQWUsYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNKN0IsaUVBQWUscUJBQXVCLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUNBL0UsaUVBQWUscUJBQXVCLHlDQUF5QyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvZm9udHMvUHJlY2lvdXMudHRmIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvZm9udHMvZmFyYWRpbGEudHRmIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9jb21wb25lbnRzL3N0YXJ5LWJnLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ldmVudC1kZXRhaWxzLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvaW1hZ2VzL21haW4taW1hZ2UuanBnIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvaW1hZ2VzL3NtYWxsLXBpYy5qcGciXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL1ByZWNpb3VzLnR0ZlwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9mYXJhZGlsYS50dGZcIjsiLCJpbXBvcnQgeyBEb3RDb21wb25lbnQsIGRvdCB9IGZyb20gXCJkb3RodG1sXCI7XHJcbmltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcclxuaW1wb3J0IHNpbXBsZXggZnJvbSBcIi4uL3NjcmlwdHMvc2ltcGxleFwiO1xyXG5cclxubGV0IHJOb2lzZSA9IHNpbXBsZXgoNTApO1xyXG5sZXQgZ05vaXNlID0gc2ltcGxleCg1MCk7XHJcbmxldCBiTm9pc2UgPSBzaW1wbGV4KDUwKTtcclxubGV0IG5vdyA9IERhdGUubm93KCkgLyAxMDAwO1xyXG5cclxuZnVuY3Rpb24gbWFwTGluZWFyKHZhbHVlLCBhMSwgYTIsIGIxLCBiMikge1xyXG4gICAgcmV0dXJuIGIxICsgKHZhbHVlIC0gYTEpICogKGIyIC0gYjEpIC8gKGEyIC0gYTEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVN0YXJDb2xvcigpIHtcclxuICAgIC8vIFJhbmRvbSB2YWx1ZSBiZXR3ZWVuIDB4QzAgYW5kIDB4RkZcclxuICAgIGNvbnN0IHJhbmRvbVZhbHVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDB4RkYgLSAweEMwICsgMSkpICsgMHhDMDtcclxuXHJcbiAgICAvLyBSYW5kb21seSBkZWNpZGUgd2hpY2ggY2hhbm5lbCBnZXRzIHRoZSByYW5kb20gdmFsdWVcclxuICAgIGNvbnN0IHJhbmRvbUNoYW5uZWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKTtcclxuXHJcbiAgICBsZXQgciwgZywgYjtcclxuICAgIHN3aXRjaCAocmFuZG9tQ2hhbm5lbCkge1xyXG4gICAgICAgIGNhc2UgMDogLy8gUmVkIGdldHMgdGhlIHJhbmRvbSB2YWx1ZVxyXG4gICAgICAgICAgICByID0gcmFuZG9tVmFsdWU7XHJcbiAgICAgICAgICAgIGcgPSAweEZGO1xyXG4gICAgICAgICAgICBiID0gMHhGRjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOiAvLyBHcmVlbiBnZXRzIHRoZSByYW5kb20gdmFsdWVcclxuICAgICAgICAgICAgciA9IDB4RkY7XHJcbiAgICAgICAgICAgIGcgPSByYW5kb21WYWx1ZTtcclxuICAgICAgICAgICAgYiA9IDB4RkY7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjogLy8gQmx1ZSBnZXRzIHRoZSByYW5kb20gdmFsdWVcclxuICAgICAgICAgICAgciA9IDB4RkY7XHJcbiAgICAgICAgICAgIGcgPSAweEZGO1xyXG4gICAgICAgICAgICBiID0gcmFuZG9tVmFsdWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbWJpbmUgciwgZywgYW5kIGIgaW50byBhIHNpbmdsZSBpbnRlZ2VyXHJcbiAgICByZXR1cm4gKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiO1xyXG59XHJcblxyXG4vKipcclxuICogRHJhdyBhIHN0YXIgc2hhcGUgd2l0aCBhbiBhcmJpdHJhcnkgbnVtYmVyIG9mIHBvaW50cy5cclxuICogQGlnbm9yZVxyXG4gKi9cclxuY2xhc3MgU3RhciBleHRlbmRzIFBJWEkuUG9seWdvblxyXG57XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB4IC0gQ2VudGVyIFggcG9zaXRpb24gb2YgdGhlIHN0YXJcclxuICAgICAqIEBwYXJhbSB5IC0gQ2VudGVyIFkgcG9zaXRpb24gb2YgdGhlIHN0YXJcclxuICAgICAqIEBwYXJhbSBwb2ludHMgLSBUaGUgbnVtYmVyIG9mIHBvaW50cyBvZiB0aGUgc3RhciwgbXVzdCBiZSA+IDFcclxuICAgICAqIEBwYXJhbSByYWRpdXMgLSBUaGUgb3V0ZXIgcmFkaXVzIG9mIHRoZSBzdGFyXHJcbiAgICAgKiBAcGFyYW0gaW5uZXJSYWRpdXMgLSBUaGUgaW5uZXIgcmFkaXVzIGJldHdlZW4gcG9pbnRzLCBkZWZhdWx0IGhhbGYgYHJhZGl1c2BcclxuICAgICAqIEBwYXJhbSByb3RhdGlvbiAtIFRoZSByb3RhdGlvbiBvZiB0aGUgc3RhciBpbiByYWRpYW5zLCB3aGVyZSAwIGlzIHZlcnRpY2FsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBwb2ludHM6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGlubmVyUmFkaXVzPzogbnVtYmVyLCByb3RhdGlvbiA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgaW5uZXJSYWRpdXMgPSBpbm5lclJhZGl1cyB8fCByYWRpdXMgLyAyO1xyXG5cclxuICAgICAgICBjb25zdCBzdGFydEFuZ2xlID0gKC0xICogTWF0aC5QSSAvIDIpICsgcm90YXRpb247XHJcbiAgICAgICAgY29uc3QgbGVuID0gcG9pbnRzICogMjtcclxuICAgICAgICBjb25zdCBkZWx0YSA9IE1hdGguUEkqMiAvIGxlbjtcclxuICAgICAgICBjb25zdCBwb2x5Z29uID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCByID0gaSAlIDIgPyBpbm5lclJhZGl1cyA6IHJhZGl1cztcclxuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSAoaSAqIGRlbHRhKSArIHN0YXJ0QW5nbGU7XHJcblxyXG4gICAgICAgICAgICBwb2x5Z29uLnB1c2goXHJcbiAgICAgICAgICAgICAgICB4ICsgKHIgKiBNYXRoLmNvcyhhbmdsZSkpLFxyXG4gICAgICAgICAgICAgICAgeSArIChyICogTWF0aC5zaW4oYW5nbGUpKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3VwZXIocG9seWdvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEcmF3IGEgc3RhciBzaGFwZSB3aXRoIGFuIGFyYml0cmFyeSBudW1iZXIgb2YgcG9pbnRzLlxyXG4gKlxyXG4gKiBfTm90ZTogT25seSBhdmFpbGFibGUgd2l0aCAqKkBwaXhpL2dyYXBoaWNzLWV4dHJhcyoqLl9cclxuICogQG1ldGhvZCBQSVhJLkdyYXBoaWNzI2RyYXdTdGFyXHJcbiAqIEBwYXJhbSB0aGlzXHJcbiAqIEBwYXJhbSB4IC0gQ2VudGVyIFggcG9zaXRpb24gb2YgdGhlIHN0YXJcclxuICogQHBhcmFtIHkgLSBDZW50ZXIgWSBwb3NpdGlvbiBvZiB0aGUgc3RhclxyXG4gKiBAcGFyYW0gcG9pbnRzIC0gVGhlIG51bWJlciBvZiBwb2ludHMgb2YgdGhlIHN0YXIsIG11c3QgYmUgPiAxXHJcbiAqIEBwYXJhbSByYWRpdXMgLSBUaGUgb3V0ZXIgcmFkaXVzIG9mIHRoZSBzdGFyXHJcbiAqIEBwYXJhbSBpbm5lclJhZGl1cyAtIFRoZSBpbm5lciByYWRpdXMgYmV0d2VlbiBwb2ludHMsIGRlZmF1bHQgaGFsZiBgcmFkaXVzYFxyXG4gKiBAcGFyYW0gcm90YXRpb24gLSBUaGUgcm90YXRpb24gb2YgdGhlIHN0YXIgaW4gcmFkaWFucywgd2hlcmUgMCBpcyB2ZXJ0aWNhbFxyXG4gKiBAcmV0dXJucyAtIFRoaXMgR3JhcGhpY3Mgb2JqZWN0LiBHb29kIGZvciBjaGFpbmluZyBtZXRob2QgY2FsbHNcclxuICovXHJcbmZ1bmN0aW9uIGRyYXdTdGFyKHRoaXMyOiBQSVhJLkdyYXBoaWNzLFxyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyLFxyXG4gICAgcG9pbnRzOiBudW1iZXIsXHJcbiAgICByYWRpdXM6IG51bWJlcixcclxuICAgIGlubmVyUmFkaXVzOiBudW1iZXIsXHJcbiAgICByb3RhdGlvbiA9IDApOiBQSVhJLkdyYXBoaWNzXHJcbntcclxuICAgIHJldHVybiB0aGlzMi5kcmF3UG9seWdvbihuZXcgU3Rhcih4LCB5LCBwb2ludHMsIHJhZGl1cywgaW5uZXJSYWRpdXMsIHJvdGF0aW9uKSBhcyBQSVhJLlBvbHlnb24pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdGFycyhyZW5kZXJlciwgc3RhckNvbnRhaW5lcjogUElYSS5Db250YWluZXIsIG1pbGt5V2F5Q29udGFpbmVyOiBQSVhJLlBhcnRpY2xlQ29udGFpbmVyLCBzdGFyczogQXJyYXk8UElYSS5HcmFwaGljcz4pe1xyXG5cclxuXHQvLyBSZW1vdmUgZXhpc3Rpbmcgc3RhcnMuXHJcblxyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBzdGFyID0gc3RhcnNbaV07XHJcblx0XHRzdGFyQ29udGFpbmVyLnJlbW92ZUNoaWxkKHN0YXIpO1xyXG5cdH1cclxuXHJcblx0bWlsa3lXYXlDb250YWluZXIucmVtb3ZlQ2hpbGRyZW4oKTtcclxuXHJcblx0Ly8gQWRkIG1pbGt5IHdheS5cclxuXHJcblx0Ly8gQ3JlYXRlIGEgZ3JhcGhpY3Mgb2JqZWN0IGFuZCBkcmF3IGEgY2lyY2xlXHJcblx0bGV0IGJnU3RhckdmeCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblx0YmdTdGFyR2Z4LmJlZ2luRmlsbCgweEZGRkZGRik7ICAvLyBXaGl0ZSBjb2xvciBmb3IgdGhlIHN0YXJcclxuXHRiZ1N0YXJHZnguZHJhd0NpcmNsZSgwLDAsMyk7ICAvLyBEcmF3IGEgY2lyY2xlIG9mIHJhZGl1cyA1IGF0IHBvc2l0aW9uICg1LCA1KVxyXG5cdGJnU3RhckdmeC5lbmRGaWxsKCk7XHJcblxyXG5cdC8vIEdlbmVyYXRlIGEgdGV4dHVyZSBmcm9tIHRoZSBncmFwaGljcyBvYmplY3RcclxuXHRjb25zdCBzdGFyVGV4dHVyZSA9IHJlbmRlcmVyLmdlbmVyYXRlVGV4dHVyZShiZ1N0YXJHZngpO1xyXG5cclxuXHRsZXQgbkJnU3RhcnMgPSBNYXRoLm1pbigxMDAwMCwgMTAwMDAgKiAod2luZG93LmlubmVyV2lkdGggKiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAzNDg5MjgwKSk7XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IG5CZ1N0YXJzOyBpKyspIHtcclxuXHRcdGxldCBzdGFyID0gbmV3IFBJWEkuU3ByaXRlKHN0YXJUZXh0dXJlKTtcclxuXHRcdHN0YXIueCA9IE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHRcdHN0YXIueSA9IE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblx0XHRzdGFyLmFscGhhID0gTWF0aC5yYW5kb20oKSAqIDAuODsgIC8vIGZvciBzb21lIHZhcmlhdGlvbiBpbiBicmlnaHRuZXNzXHJcblx0XHRzdGFyLnNjYWxlLnNldCgwLjMzNCArIE1hdGgucmFuZG9tKCkgKiAwLjY2Nik7ICAvLyByYW5kb20gc2NhbGluZyBmb3Igc2l6ZSB2YXJpYXRpb25cclxuXHRcdHN0YXIudGludCA9IGdlbmVyYXRlU3RhckNvbG9yKCk7XHJcblxyXG5cdFx0bWlsa3lXYXlDb250YWluZXIuYWRkQ2hpbGQoc3Rhcik7XHJcblx0fVxyXG5cclxuXHRzdGFycy5sZW5ndGggPSAwO1xyXG5cclxuXHQvLyBOdW1iZXIgb2Ygc3RhcnNcclxuXHRsZXQgbnVtU3RhcnMgPSBNYXRoLm1pbigxMDAsIE1hdGguZmxvb3IoMTAwICogKHdpbmRvdy5pbm5lcldpZHRoICogd2luZG93LmlubmVySGVpZ2h0IC8gMzQ4OTI4MCkpKTtcclxuXHJcblx0Ly8gQ3JlYXRlIHN0YXJzXHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBudW1TdGFyczsgaSsrKSB7XHJcblx0XHRsZXQgc3RhciA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcblx0XHRzdGFyLmJlZ2luRmlsbChnZW5lcmF0ZVN0YXJDb2xvcigpKTtcclxuXHRcdC8vIHN0YXIuZHJhd0NpcmNsZSgwLCAwLCAxKTsgIC8vICh4LCB5LCByYWRpdXMpXHJcblx0XHRsZXQgaW5uZXIgPSAyICsgTWF0aC5yYW5kb20oKSAqIDI7XHJcblx0XHRsZXQgb3V0ZXIgPSBpbm5lciArIDIgKyBNYXRoLnJhbmRvbSgpICogMjtcclxuXHRcdGRyYXdTdGFyKHN0YXIsMCwwLFxyXG5cdFx0XHRNYXRoLmZsb29yKDQgKyBNYXRoLnJhbmRvbSgpICogMyksXHJcblx0XHRcdG91dGVyLFxyXG5cdFx0XHRpbm5lcixcclxuXHRcdFx0TWF0aC5yYW5kb20oKSoyKk1hdGguUEkpO1xyXG5cdFx0c3Rhci5lbmRGaWxsKCk7XHJcblx0XHRzdGFyLnggPSBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGg7XHJcblx0XHRzdGFyLnkgPSBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVySGVpZ2h0O1xyXG5cdFx0XHJcblx0XHQvLyBWZWxvY2l0eSBmb3IgcmFuZG9tIG1vdGlvblxyXG5cdFx0KHN0YXIgYXMgYW55KS52eCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBzcGVlZEZhY3RvcjsgIC8vIFJhbmRvbSB2YWx1ZSBiZXR3ZWVuIC0xIGFuZCAxXHJcblx0XHQoc3RhciBhcyBhbnkpLnZ5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMiAqIHNwZWVkRmFjdG9yO1xyXG5cclxuXHRcdHN0YXJDb250YWluZXIuYWRkQ2hpbGQoc3Rhcik7XHJcblx0XHRzdGFycy5wdXNoKHN0YXIpO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU2hvb3RpbmdTdGFyIHtcclxuXHRzcHJpdGU6IFBJWEkuR3JhcGhpY3M7XHJcblx0c3BlZWQ6IG51bWJlcjtcclxuXHRkaXJlY3Rpb246IG51bWJlcjtcclxuXHRzdGFnZTogYW55O1xyXG5cdHJTcGVlZCA9ICgwLjMgKyBNYXRoLnJhbmRvbSgpICogMC41KSAqIChNYXRoLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGFnZTogUElYSS5Db250YWluZXIpIHtcclxuXHRcdHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuXHRcdHRoaXMuZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xyXG5cclxuXHRcdGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XHJcblx0XHRsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHRcdGxldCBkID0gTWF0aC5zcXJ0KHcqdytoKmgpO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUuYmVnaW5GaWxsKGdlbmVyYXRlU3RhckNvbG9yKCkpO1xyXG5cdFx0ZHJhd1N0YXIodGhpcy5zcHJpdGUsIDAsIDAsIDUsIDgsIDQsIE1hdGgucmFuZG9tKCkgKiAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUuZW5kRmlsbCgpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBNYXRoLnJhbmRvbSgpICogMTIgKyAyMDtcclxuICAgICAgICB0aGlzLnNwcml0ZS54ID0gdyAvIDIgLSBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbikgKiBkIC8gMjtcclxuICAgICAgICB0aGlzLnNwcml0ZS55ID0gaCAvIDIgLSBNYXRoLmNvcyh0aGlzLmRpcmVjdGlvbikgKiBkIC8gMjtcclxuICAgICAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLnNwcml0ZSk7ICAvLyBBc3N1bWluZyB5b3UndmUgYWxyZWFkeSBkZWZpbmVkIHN0YXJDb250YWluZXJcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICB0aGlzLnNwcml0ZS54ICs9IE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuICAgICAgICB0aGlzLnNwcml0ZS55ICs9IE1hdGguc2luKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuXHRcdHRoaXMuc3ByaXRlLnJvdGF0aW9uICs9IHRoaXMuclNwZWVkICogZHQ7XHJcblx0XHRsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcclxuXHRcdGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcclxuXHRcdGxldCBjeCA9IHRoaXMuc3ByaXRlLnggLSB3O1xyXG5cdFx0bGV0IGN5ID0gdGhpcy5zcHJpdGUueSAtIGg7XHJcblx0XHRsZXQgY2QyID0gY3gqY3grY3kqY3k7XHJcbiAgICAgICAgaWYgKGNkMiA+IChoKmgrdyp3KSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7ICAvLyBJbmRpY2F0ZSB0aGF0IHRoZSBzdGFyIGhhcyBiZWVuIHJlbW92ZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7ICAvLyBTdGFyIHN0aWxsIGluIGNhbnZhc1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZSgpIHtcclxuICAgICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuc3ByaXRlKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3Qgc3BlZWRGYWN0b3IgPSAwLjE7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFyeUJnIGV4dGVuZHMgRG90Q29tcG9uZW50e1xyXG5cdHJlc2l6ZURlYm91bmNlOiBudW1iZXI7XHJcblxyXG5cdGJ1aWxkZXIoKXtcclxuXHRcdHJldHVybiBkb3QuZGl2KCkuY2xhc3MoXCJzdGFyLWJnLWNhbnZhcy1jb250YWluZXJcIikucmVmKFwiY2FudmFzQ29udGFpbmVyXCIpXHJcblx0fVxyXG5cclxuXHRzdHlsZShjc3Mpe1xyXG5cdFx0Y3NzKHRoaXMuJHJlZnMuY2FudmFzQ29udGFpbmVyKVxyXG5cdFx0XHQucG9zaXRpb24oXCJmaXhlZFwiKVxyXG5cdFx0XHQubGVmdCgwKVxyXG5cdFx0XHQucmlnaHQoMClcclxuXHRcdFx0LnRvcCgwKVxyXG5cdFx0XHQuYm90dG9tKDApXHJcblx0XHRcdC56SW5kZXgoMSk7XHJcblx0fVxyXG5cclxuXHRyZWFkeSgpe1xyXG5cdFx0Ly8gQ3JlYXRlIHRoZSBQaXhpIEFwcGxpY2F0aW9uXHJcblx0XHRjb25zdCBhcHAgPSBuZXcgUElYSS5BcHBsaWNhdGlvbih7XHJcblx0XHRcdHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuXHRcdFx0aGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogMHgwMDAwMDAsXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJHJlZnMuY2FudmFzQ29udGFpbmVyLmFwcGVuZENoaWxkKGFwcC52aWV3IGFzIGFueSk7XHJcblxyXG5cdFx0Y29uc3QgbWlsa3lXYXlDb250YWluZXIgPSBuZXcgUElYSS5QYXJ0aWNsZUNvbnRhaW5lcigpO1xyXG5cdFx0Y29uc3QgbGluZUNvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG5cdFx0Y29uc3Qgc3RhckNvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG5cclxuXHRcdC8vIFN0YXIgZGF0YVxyXG5cdFx0bGV0IHN0YXJzID0gW107XHJcblx0XHJcblx0XHRsZXQgc2hvb3RpbmdTdGFycyA9IFtdO1xyXG5cclxuXHRcdGFwcC5zdGFnZS5hZGRDaGlsZChtaWxreVdheUNvbnRhaW5lcik7XHJcblx0XHRhcHAuc3RhZ2UuYWRkQ2hpbGQobGluZUNvbnRhaW5lcik7XHJcblx0XHRhcHAuc3RhZ2UuYWRkQ2hpbGQoc3RhckNvbnRhaW5lcik7XHJcblxyXG5cdFx0YWRkU3RhcnMoYXBwLnJlbmRlcmVyLCBzdGFyQ29udGFpbmVyLCBtaWxreVdheUNvbnRhaW5lciwgc3RhcnMpO1xyXG5cclxuXHRcdC8vIEdhbWUgbG9vcFxyXG5cdFx0YXBwLnRpY2tlci5hZGQoKGRlbHRhKSA9PiB7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKGRlbHRhKTtcclxuXHJcblx0XHRcdGxpbmVDb250YWluZXIucmVtb3ZlQ2hpbGRyZW4oKTtcclxuXHJcblx0XHRcdC8vIFVwZGF0ZSBzdGFyIHBvc2l0aW9uc1xyXG5cdFx0XHRmb3IgKGxldCBzdGFyIG9mIHN0YXJzKSB7XHJcblx0XHRcdFx0c3Rhci54ICs9IHN0YXIudng7XHJcblx0XHRcdFx0c3Rhci55ICs9IHN0YXIudnk7XHJcblxyXG5cdFx0XHRcdC8vIEtlZXAgc3RhcnMgaW5zaWRlIHRoZSBzY3JlZW4gYm91bmRzXHJcblx0XHRcdFx0aWYgKHN0YXIueCA8IDAgfHwgc3Rhci54ID4gYXBwLnNjcmVlbi53aWR0aCkgc3Rhci52eCA9IC1zdGFyLnZ4O1xyXG5cdFx0XHRcdGlmIChzdGFyLnkgPCAwIHx8IHN0YXIueSA+IGFwcC5zY3JlZW4uaGVpZ2h0KSBzdGFyLnZ5ID0gLXN0YXIudnk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIGRpc3RhbmNlcyBiZXR3ZWVuIHN0YXJzIGFuZCBkcmF3IGxpbmVzXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRmb3IgKGxldCBqID0gaSArIDE7IGogPCBzdGFycy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0Y29uc3QgZHggPSBzdGFyc1tpXS54IC0gc3RhcnNbal0ueDtcclxuXHRcdFx0XHRcdGNvbnN0IGR5ID0gc3RhcnNbaV0ueSAtIHN0YXJzW2pdLnk7XHJcblx0XHRcdFx0XHRjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGRpc3RhbmNlIDwgMzAwKSB7IC8vIDE1MCBjYW4gYmUgYWRqdXN0ZWQgYXMgbmVlZGVkXHJcblx0XHRcdFx0XHRcdGNvbnN0IGxpbmUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG5cdFx0XHRcdFx0XHRjb25zdCBhbHBoYSA9IG1hcExpbmVhcihkaXN0YW5jZSwgNTAsIDE1MCwgMSwgMCk7ICAvLyA1MCBhbmQgMTUwIGFyZSBtaW4gYW5kIG1heCBkaXN0YW5jZXMgdG8gY29uc2lkZXJcclxuXHRcdFx0XHRcdFx0Y29uc3QgdGhpY2tuZXNzID0gbWFwTGluZWFyKGRpc3RhbmNlLCA1MCwgMTUwLCAzLCAxKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGxpbmUubGluZVN0eWxlKHRoaWNrbmVzcywgMHhBQTk5RkYsIGFscGhhKTtcclxuXHRcdFx0XHRcdFx0bGluZS5tb3ZlVG8oc3RhcnNbaV0ueCwgc3RhcnNbaV0ueSk7XHJcblx0XHRcdFx0XHRcdGxpbmUubGluZVRvKHN0YXJzW2pdLngsIHN0YXJzW2pdLnkpO1xyXG5cdFx0XHRcdFx0XHRsaW5lQ29udGFpbmVyLmFkZENoaWxkKGxpbmUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2hvb3Rpbmcgc3RhcnMuXHJcblx0XHRcdHNob290aW5nU3RhcnMgPSBzaG9vdGluZ1N0YXJzLmZpbHRlcihzdGFyID0+IHN0YXIudXBkYXRlKGRlbHRhKSk7XHJcblxyXG5cdFx0XHRsZXQgcHJvYmFiaWxpdHkgPSAoMTAvMzApICogKGRlbHRhLzYwKTtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2cocHJvYmFiaWxpdHkpO1xyXG5cdFx0XHRpZiAoTWF0aC5yYW5kb20oKSA8IHByb2JhYmlsaXR5KSB7XHJcblx0XHRcdFx0c2hvb3RpbmdTdGFycy5wdXNoKG5ldyBTaG9vdGluZ1N0YXIoc3RhckNvbnRhaW5lcikpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKT0+e1xyXG5cdFx0XHRhcHAucmVuZGVyZXIucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYodGhpcy5yZXNpemVEZWJvdW5jZSl7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMucmVzaXplRGVib3VuY2UpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMucmVzaXplRGVib3VuY2UgPSBzZXRUaW1lb3V0KCgpPT57XHJcblx0XHRcdFx0YWRkU3RhcnMoYXBwLnJlbmRlcmVyLCBzdGFyQ29udGFpbmVyLCBtaWxreVdheUNvbnRhaW5lciwgc3RhcnMpO1xyXG5cdFx0XHRcdHRoaXMucmVzaXplRGVib3VuY2UgPSBudWxsO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59IiwiY29uc3QgRVZFTlRfREVUQUlMUyA9IE9iamVjdC5mcmVlemUoe1xyXG5cdGRhdGU6IG5ldyBEYXRlKFwiMjAyNC0wMS0xM1QxNTo0NTowMC4wMDAtMDU6MDBcIilcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFVkVOVF9ERVRBSUxTOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI1N2Y0ZmM2YzM1MjFmMWE2Mzk5MTM1MGI4YWE3NjgxMy5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNjAwN2YzZmI4OTA1YWQyODM1MjBjOGZkYTVjN2I2NzkuanBnXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9