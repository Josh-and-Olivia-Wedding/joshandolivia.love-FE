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

/***/ "./src/assets/images/joke/raw-tofu.png":
/*!*********************************************!*\
  !*** ./src/assets/images/joke/raw-tofu.png ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "f004111d1594f4455f2e591544465c27.png");

/***/ }),

/***/ "./src/assets/images/joke/soylent-green.png":
/*!**************************************************!*\
  !*** ./src/assets/images/joke/soylent-green.png ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "548013d959e191b9b2f2b48ac29f99fb.png");

/***/ }),

/***/ "./src/assets/images/joke/sticks-and-twigs.png":
/*!*****************************************************!*\
  !*** ./src/assets/images/joke/sticks-and-twigs.png ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "10a285a172b9952750ed282f13badd4c.png");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zcmNfYS5jYjFiNjQ4NjNiZWI4Y2M0ZDM1Yy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQWUscUJBQXVCLHVCQUF1Qjs7Ozs7Ozs7Ozs7Ozs7QUNBN0QsaUVBQWUscUJBQXVCLHVCQUF1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBN0QsOEZBQTRDO0FBQzVDLHFHQUFnQztBQUNoQyw2R0FBeUM7QUFFekMsSUFBSSxNQUFNLEdBQUcscUJBQU8sRUFBQyxFQUFFLENBQUMsQ0FBQztBQUN6QixJQUFJLE1BQU0sR0FBRyxxQkFBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLElBQUksTUFBTSxHQUFHLHFCQUFPLEVBQUMsRUFBRSxDQUFDLENBQUM7QUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUU1QixTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUNwQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsU0FBUyxpQkFBaUI7SUFDdEIscUNBQXFDO0lBQ3JDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUV6RSxzREFBc0Q7SUFDdEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFcEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNaLFFB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LElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsZ0RBQWdEO0lBQ2xGLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRTtRQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDO1FBQ2hCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsT0FBTyxLQUFLLENBQUMsQ0FBRSwwQ0FBMEM7U0FDNUQ7UUFDRCxPQUFPLElBQUksQ0FBQyxDQUFFLHVCQUF1QjtJQUN6QyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0o7QUFFRCxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFFeEIsTUFBcUIsT0FBUSxTQUFRLHNCQUFZO0lBR2hELE9BQU87UUFDTixPQUFPLGFBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7SUFDMUUsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHO1FBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO2FBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUM7YUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNQLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDUixHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ04sTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxLQUFLO1FBQ0osOEJBQThCO1FBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNoQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFVBQVU7WUFDeEIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQzFCLGVBQWUsRUFBRSxRQUFRO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBVyxDQUFDLENBQUM7UUFFeEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZELE1BQU0sYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNDLE1BQU0sYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTNDLFlBQVk7UUFDWixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFZixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFFdkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVsQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFaEUsWUFBWTtRQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDeEIsc0JBQXNCO1lBRXRCLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUUvQix3QkFBd0I7WUFDeEIsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUVsQixzQ0FBc0M7Z0JBQ3RDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUs7b0JBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ2hFLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU07b0JBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDakU7WUFFRCwrQ0FBK0M7WUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDMUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBRTlDLElBQUksUUFBUSxHQUFHLEdBQUcsRUFBRSxFQUFFLGdDQUFnQzt3QkFDckQsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ2pDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxtREFBbUQ7d0JBQ3RHLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBRXJELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDN0I7aUJBQ0Q7YUFDRDtZQUVELGtCQUFrQjtZQUNsQixhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUVqRSxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2Qyw0QkFBNEI7WUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsV0FBVyxFQUFFO2dCQUNoQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRSxFQUFFO1lBQ3JDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTNELElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBQztnQkFDdEIsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNsQztZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUUsRUFBRTtnQkFDcEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUM1QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQW5HRCw2QkFtR0M7Ozs7Ozs7Ozs7Ozs7QUM3VEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsK0JBQStCLENBQUM7Q0FDL0MsQ0FBQyxDQUFDO0FBRUgscUJBQWUsYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNKN0IsaUVBQWUscUJBQXVCLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUNBL0UsaUVBQWUscUJBQXVCLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUNBL0UsaUVBQWUscUJBQXVCLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUNBL0UsaUVBQWUscUJBQXVCLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUNBL0UsaUVBQWUscUJBQXVCLHlDQUF5QyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvZm9udHMvUHJlY2lvdXMudHRmIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvZm9udHMvZmFyYWRpbGEudHRmIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9jb21wb25lbnRzL3N0YXJ5LWJnLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9ldmVudC1kZXRhaWxzLnRzIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvaW1hZ2VzL2pva2UvcmF3LXRvZnUucG5nIiwid2VicGFjazovL3dlZGRpbmctd2Vic2l0ZS8uL3NyYy9hc3NldHMvaW1hZ2VzL2pva2Uvc295bGVudC1ncmVlbi5wbmciLCJ3ZWJwYWNrOi8vd2VkZGluZy13ZWJzaXRlLy4vc3JjL2Fzc2V0cy9pbWFnZXMvam9rZS9zdGlja3MtYW5kLXR3aWdzLnBuZyIsIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvYXNzZXRzL2ltYWdlcy9tYWluLWltYWdlLmpwZyIsIndlYnBhY2s6Ly93ZWRkaW5nLXdlYnNpdGUvLi9zcmMvYXNzZXRzL2ltYWdlcy9zbWFsbC1waWMuanBnIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9QcmVjaW91cy50dGZcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvZmFyYWRpbGEudHRmXCI7IiwiaW1wb3J0IHsgRG90Q29tcG9uZW50LCBkb3QgfSBmcm9tIFwiZG90aHRtbFwiO1xyXG5pbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XHJcbmltcG9ydCBzaW1wbGV4IGZyb20gXCIuLi9zY3JpcHRzL3NpbXBsZXhcIjtcclxuXHJcbmxldCByTm9pc2UgPSBzaW1wbGV4KDUwKTtcclxubGV0IGdOb2lzZSA9IHNpbXBsZXgoNTApO1xyXG5sZXQgYk5vaXNlID0gc2ltcGxleCg1MCk7XHJcbmxldCBub3cgPSBEYXRlLm5vdygpIC8gMTAwMDtcclxuXHJcbmZ1bmN0aW9uIG1hcExpbmVhcih2YWx1ZSwgYTEsIGEyLCBiMSwgYjIpIHtcclxuICAgIHJldHVybiBiMSArICh2YWx1ZSAtIGExKSAqIChiMiAtIGIxKSAvIChhMiAtIGExKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVTdGFyQ29sb3IoKSB7XHJcbiAgICAvLyBSYW5kb20gdmFsdWUgYmV0d2VlbiAweEMwIGFuZCAweEZGXHJcbiAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgweEZGIC0gMHhDMCArIDEpKSArIDB4QzA7XHJcblxyXG4gICAgLy8gUmFuZG9tbHkgZGVjaWRlIHdoaWNoIGNoYW5uZWwgZ2V0cyB0aGUgcmFuZG9tIHZhbHVlXHJcbiAgICBjb25zdCByYW5kb21DaGFubmVsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XHJcblxyXG4gICAgbGV0IHIsIGcsIGI7XHJcbiAgICBzd2l0Y2ggKHJhbmRvbUNoYW5uZWwpIHtcclxuICAgICAgICBjYXNlIDA6IC8vIFJlZCBnZXRzIHRoZSByYW5kb20gdmFsdWVcclxuICAgICAgICAgICAgciA9IHJhbmRvbVZhbHVlO1xyXG4gICAgICAgICAgICBnID0gMHhGRjtcclxuICAgICAgICAgICAgYiA9IDB4RkY7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTogLy8gR3JlZW4gZ2V0cyB0aGUgcmFuZG9tIHZhbHVlXHJcbiAgICAgICAgICAgIHIgPSAweEZGO1xyXG4gICAgICAgICAgICBnID0gcmFuZG9tVmFsdWU7XHJcbiAgICAgICAgICAgIGIgPSAweEZGO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6IC8vIEJsdWUgZ2V0cyB0aGUgcmFuZG9tIHZhbHVlXHJcbiAgICAgICAgICAgIHIgPSAweEZGO1xyXG4gICAgICAgICAgICBnID0gMHhGRjtcclxuICAgICAgICAgICAgYiA9IHJhbmRvbVZhbHVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21iaW5lIHIsIGcsIGFuZCBiIGludG8gYSBzaW5nbGUgaW50ZWdlclxyXG4gICAgcmV0dXJuIChyIDw8IDE2KSArIChnIDw8IDgpICsgYjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERyYXcgYSBzdGFyIHNoYXBlIHdpdGggYW4gYXJiaXRyYXJ5IG51bWJlciBvZiBwb2ludHMuXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmNsYXNzIFN0YXIgZXh0ZW5kcyBQSVhJLlBvbHlnb25cclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0geCAtIENlbnRlciBYIHBvc2l0aW9uIG9mIHRoZSBzdGFyXHJcbiAgICAgKiBAcGFyYW0geSAtIENlbnRlciBZIHBvc2l0aW9uIG9mIHRoZSBzdGFyXHJcbiAgICAgKiBAcGFyYW0gcG9pbnRzIC0gVGhlIG51bWJlciBvZiBwb2ludHMgb2YgdGhlIHN0YXIsIG11c3QgYmUgPiAxXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIC0gVGhlIG91dGVyIHJhZGl1cyBvZiB0aGUgc3RhclxyXG4gICAgICogQHBhcmFtIGlubmVyUmFkaXVzIC0gVGhlIGlubmVyIHJhZGl1cyBiZXR3ZWVuIHBvaW50cywgZGVmYXVsdCBoYWxmIGByYWRpdXNgXHJcbiAgICAgKiBAcGFyYW0gcm90YXRpb24gLSBUaGUgcm90YXRpb24gb2YgdGhlIHN0YXIgaW4gcmFkaWFucywgd2hlcmUgMCBpcyB2ZXJ0aWNhbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgcG9pbnRzOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBpbm5lclJhZGl1cz86IG51bWJlciwgcm90YXRpb24gPSAwKVxyXG4gICAge1xyXG4gICAgICAgIGlubmVyUmFkaXVzID0gaW5uZXJSYWRpdXMgfHwgcmFkaXVzIC8gMjtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhcnRBbmdsZSA9ICgtMSAqIE1hdGguUEkgLyAyKSArIHJvdGF0aW9uO1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IHBvaW50cyAqIDI7XHJcbiAgICAgICAgY29uc3QgZGVsdGEgPSBNYXRoLlBJKjIgLyBsZW47XHJcbiAgICAgICAgY29uc3QgcG9seWdvbiA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgciA9IGkgJSAyID8gaW5uZXJSYWRpdXMgOiByYWRpdXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gKGkgKiBkZWx0YSkgKyBzdGFydEFuZ2xlO1xyXG5cclxuICAgICAgICAgICAgcG9seWdvbi5wdXNoKFxyXG4gICAgICAgICAgICAgICAgeCArIChyICogTWF0aC5jb3MoYW5nbGUpKSxcclxuICAgICAgICAgICAgICAgIHkgKyAociAqIE1hdGguc2luKGFuZ2xlKSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyKHBvbHlnb24pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRHJhdyBhIHN0YXIgc2hhcGUgd2l0aCBhbiBhcmJpdHJhcnkgbnVtYmVyIG9mIHBvaW50cy5cclxuICpcclxuICogX05vdGU6IE9ubHkgYXZhaWxhYmxlIHdpdGggKipAcGl4aS9ncmFwaGljcy1leHRyYXMqKi5fXHJcbiAqIEBtZXRob2QgUElYSS5HcmFwaGljcyNkcmF3U3RhclxyXG4gKiBAcGFyYW0gdGhpc1xyXG4gKiBAcGFyYW0geCAtIENlbnRlciBYIHBvc2l0aW9uIG9mIHRoZSBzdGFyXHJcbiAqIEBwYXJhbSB5IC0gQ2VudGVyIFkgcG9zaXRpb24gb2YgdGhlIHN0YXJcclxuICogQHBhcmFtIHBvaW50cyAtIFRoZSBudW1iZXIgb2YgcG9pbnRzIG9mIHRoZSBzdGFyLCBtdXN0IGJlID4gMVxyXG4gKiBAcGFyYW0gcmFkaXVzIC0gVGhlIG91dGVyIHJhZGl1cyBvZiB0aGUgc3RhclxyXG4gKiBAcGFyYW0gaW5uZXJSYWRpdXMgLSBUaGUgaW5uZXIgcmFkaXVzIGJldHdlZW4gcG9pbnRzLCBkZWZhdWx0IGhhbGYgYHJhZGl1c2BcclxuICogQHBhcmFtIHJvdGF0aW9uIC0gVGhlIHJvdGF0aW9uIG9mIHRoZSBzdGFyIGluIHJhZGlhbnMsIHdoZXJlIDAgaXMgdmVydGljYWxcclxuICogQHJldHVybnMgLSBUaGlzIEdyYXBoaWNzIG9iamVjdC4gR29vZCBmb3IgY2hhaW5pbmcgbWV0aG9kIGNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiBkcmF3U3Rhcih0aGlzMjogUElYSS5HcmFwaGljcyxcclxuICAgIHg6IG51bWJlcixcclxuICAgIHk6IG51bWJlcixcclxuICAgIHBvaW50czogbnVtYmVyLFxyXG4gICAgcmFkaXVzOiBudW1iZXIsXHJcbiAgICBpbm5lclJhZGl1czogbnVtYmVyLFxyXG4gICAgcm90YXRpb24gPSAwKTogUElYSS5HcmFwaGljc1xyXG57XHJcbiAgICByZXR1cm4gdGhpczIuZHJhd1BvbHlnb24obmV3IFN0YXIoeCwgeSwgcG9pbnRzLCByYWRpdXMsIGlubmVyUmFkaXVzLCByb3RhdGlvbikgYXMgUElYSS5Qb2x5Z29uKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3RhcnMocmVuZGVyZXIsIHN0YXJDb250YWluZXI6IFBJWEkuQ29udGFpbmVyLCBtaWxreVdheUNvbnRhaW5lcjogUElYSS5QYXJ0aWNsZUNvbnRhaW5lciwgc3RhcnM6IEFycmF5PFBJWEkuR3JhcGhpY3M+KXtcclxuXHJcblx0Ly8gUmVtb3ZlIGV4aXN0aW5nIHN0YXJzLlxyXG5cclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQgc3RhciA9IHN0YXJzW2ldO1xyXG5cdFx0c3RhckNvbnRhaW5lci5yZW1vdmVDaGlsZChzdGFyKTtcclxuXHR9XHJcblxyXG5cdG1pbGt5V2F5Q29udGFpbmVyLnJlbW92ZUNoaWxkcmVuKCk7XHJcblxyXG5cdC8vIEFkZCBtaWxreSB3YXkuXHJcblxyXG5cdC8vIENyZWF0ZSBhIGdyYXBoaWNzIG9iamVjdCBhbmQgZHJhdyBhIGNpcmNsZVxyXG5cdGxldCBiZ1N0YXJHZnggPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG5cdGJnU3RhckdmeC5iZWdpbkZpbGwoMHhGRkZGRkYpOyAgLy8gV2hpdGUgY29sb3IgZm9yIHRoZSBzdGFyXHJcblx0YmdTdGFyR2Z4LmRyYXdDaXJjbGUoMCwwLDMpOyAgLy8gRHJhdyBhIGNpcmNsZSBvZiByYWRpdXMgNSBhdCBwb3NpdGlvbiAoNSwgNSlcclxuXHRiZ1N0YXJHZnguZW5kRmlsbCgpO1xyXG5cclxuXHQvLyBHZW5lcmF0ZSBhIHRleHR1cmUgZnJvbSB0aGUgZ3JhcGhpY3Mgb2JqZWN0XHJcblx0Y29uc3Qgc3RhclRleHR1cmUgPSByZW5kZXJlci5nZW5lcmF0ZVRleHR1cmUoYmdTdGFyR2Z4KTtcclxuXHJcblx0bGV0IG5CZ1N0YXJzID0gTWF0aC5taW4oMTAwMDAsIDEwMDAwICogKHdpbmRvdy5pbm5lcldpZHRoICogd2luZG93LmlubmVySGVpZ2h0IC8gMzQ4OTI4MCkpO1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCBuQmdTdGFyczsgaSsrKSB7XHJcblx0XHRsZXQgc3RhciA9IG5ldyBQSVhJLlNwcml0ZShzdGFyVGV4dHVyZSk7XHJcblx0XHRzdGFyLnggPSBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGg7XHJcblx0XHRzdGFyLnkgPSBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVySGVpZ2h0O1xyXG5cdFx0c3Rhci5hbHBoYSA9IE1hdGgucmFuZG9tKCkgKiAwLjg7ICAvLyBmb3Igc29tZSB2YXJpYXRpb24gaW4gYnJpZ2h0bmVzc1xyXG5cdFx0c3Rhci5zY2FsZS5zZXQoMC4zMzQgKyBNYXRoLnJhbmRvbSgpICogMC42NjYpOyAgLy8gcmFuZG9tIHNjYWxpbmcgZm9yIHNpemUgdmFyaWF0aW9uXHJcblx0XHRzdGFyLnRpbnQgPSBnZW5lcmF0ZVN0YXJDb2xvcigpO1xyXG5cclxuXHRcdG1pbGt5V2F5Q29udGFpbmVyLmFkZENoaWxkKHN0YXIpO1xyXG5cdH1cclxuXHJcblx0c3RhcnMubGVuZ3RoID0gMDtcclxuXHJcblx0Ly8gTnVtYmVyIG9mIHN0YXJzXHJcblx0bGV0IG51bVN0YXJzID0gTWF0aC5taW4oMTAwLCBNYXRoLmZsb29yKDEwMCAqICh3aW5kb3cuaW5uZXJXaWR0aCAqIHdpbmRvdy5pbm5lckhlaWdodCAvIDM0ODkyODApKSk7XHJcblxyXG5cdC8vIENyZWF0ZSBzdGFyc1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbnVtU3RhcnM7IGkrKykge1xyXG5cdFx0bGV0IHN0YXIgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG5cdFx0c3Rhci5iZWdpbkZpbGwoZ2VuZXJhdGVTdGFyQ29sb3IoKSk7XHJcblx0XHQvLyBzdGFyLmRyYXdDaXJjbGUoMCwgMCwgMSk7ICAvLyAoeCwgeSwgcmFkaXVzKVxyXG5cdFx0bGV0IGlubmVyID0gMiArIE1hdGgucmFuZG9tKCkgKiAyO1xyXG5cdFx0bGV0IG91dGVyID0gaW5uZXIgKyAyICsgTWF0aC5yYW5kb20oKSAqIDI7XHJcblx0XHRkcmF3U3RhcihzdGFyLDAsMCxcclxuXHRcdFx0TWF0aC5mbG9vcig0ICsgTWF0aC5yYW5kb20oKSAqIDMpLFxyXG5cdFx0XHRvdXRlcixcclxuXHRcdFx0aW5uZXIsXHJcblx0XHRcdE1hdGgucmFuZG9tKCkqMipNYXRoLlBJKTtcclxuXHRcdHN0YXIuZW5kRmlsbCgpO1xyXG5cdFx0c3Rhci54ID0gTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cdFx0c3Rhci55ID0gTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHRcdFxyXG5cdFx0Ly8gVmVsb2NpdHkgZm9yIHJhbmRvbSBtb3Rpb25cclxuXHRcdChzdGFyIGFzIGFueSkudnggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyICogc3BlZWRGYWN0b3I7ICAvLyBSYW5kb20gdmFsdWUgYmV0d2VlbiAtMSBhbmQgMVxyXG5cdFx0KHN0YXIgYXMgYW55KS52eSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBzcGVlZEZhY3RvcjtcclxuXHJcblx0XHRzdGFyQ29udGFpbmVyLmFkZENoaWxkKHN0YXIpO1xyXG5cdFx0c3RhcnMucHVzaChzdGFyKTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNob290aW5nU3RhciB7XHJcblx0c3ByaXRlOiBQSVhJLkdyYXBoaWNzO1xyXG5cdHNwZWVkOiBudW1iZXI7XHJcblx0ZGlyZWN0aW9uOiBudW1iZXI7XHJcblx0c3RhZ2U6IGFueTtcclxuXHRyU3BlZWQgPSAoMC4zICsgTWF0aC5yYW5kb20oKSAqIDAuNSkgKiAoTWF0aC5yYW5kb20oKSA+IDAuNSA/IDEgOiAtMSk7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhZ2U6IFBJWEkuQ29udGFpbmVyKSB7XHJcblx0XHR0aGlzLnN0YWdlID0gc3RhZ2U7XHJcblx0XHR0aGlzLmRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcclxuXHJcblx0XHRsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cdFx0bGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblx0XHRsZXQgZCA9IE1hdGguc3FydCh3KncraCpoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlLmJlZ2luRmlsbChnZW5lcmF0ZVN0YXJDb2xvcigpKTtcclxuXHRcdGRyYXdTdGFyKHRoaXMuc3ByaXRlLCAwLCAwLCA1LCA4LCA0LCBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEkpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlLmVuZEZpbGwoKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDEyICsgMjA7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUueCA9IHcgLyAyIC0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogZCAvIDI7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUueSA9IGggLyAyIC0gTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogZCAvIDI7XHJcbiAgICAgICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5zcHJpdGUpOyAgLy8gQXNzdW1pbmcgeW91J3ZlIGFscmVhZHkgZGVmaW5lZCBzdGFyQ29udGFpbmVyXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUueCArPSBNYXRoLmNvcyh0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUueSArPSBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XHJcblx0XHR0aGlzLnNwcml0ZS5yb3RhdGlvbiArPSB0aGlzLnJTcGVlZCAqIGR0O1xyXG5cdFx0bGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XHJcblx0XHRsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XHJcblx0XHRsZXQgY3ggPSB0aGlzLnNwcml0ZS54IC0gdztcclxuXHRcdGxldCBjeSA9IHRoaXMuc3ByaXRlLnkgLSBoO1xyXG5cdFx0bGV0IGNkMiA9IGN4KmN4K2N5KmN5O1xyXG4gICAgICAgIGlmIChjZDIgPiAoaCpoK3cqdykpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAgLy8gSW5kaWNhdGUgdGhhdCB0aGUgc3RhciBoYXMgYmVlbiByZW1vdmVkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlOyAgLy8gU3RhciBzdGlsbCBpbiBjYW52YXNcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLnNwcml0ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHNwZWVkRmFjdG9yID0gMC4xO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnlCZyBleHRlbmRzIERvdENvbXBvbmVudHtcclxuXHRyZXNpemVEZWJvdW5jZTogbnVtYmVyO1xyXG5cclxuXHRidWlsZGVyKCl7XHJcblx0XHRyZXR1cm4gZG90LmRpdigpLmNsYXNzKFwic3Rhci1iZy1jYW52YXMtY29udGFpbmVyXCIpLnJlZihcImNhbnZhc0NvbnRhaW5lclwiKVxyXG5cdH1cclxuXHJcblx0c3R5bGUoY3NzKXtcclxuXHRcdGNzcyh0aGlzLiRyZWZzLmNhbnZhc0NvbnRhaW5lcilcclxuXHRcdFx0LnBvc2l0aW9uKFwiZml4ZWRcIilcclxuXHRcdFx0LmxlZnQoMClcclxuXHRcdFx0LnJpZ2h0KDApXHJcblx0XHRcdC50b3AoMClcclxuXHRcdFx0LmJvdHRvbSgwKVxyXG5cdFx0XHQuekluZGV4KDEpO1xyXG5cdH1cclxuXHJcblx0cmVhZHkoKXtcclxuXHRcdC8vIENyZWF0ZSB0aGUgUGl4aSBBcHBsaWNhdGlvblxyXG5cdFx0Y29uc3QgYXBwID0gbmV3IFBJWEkuQXBwbGljYXRpb24oe1xyXG5cdFx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXHJcblx0XHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IDB4MDAwMDAwLFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRyZWZzLmNhbnZhc0NvbnRhaW5lci5hcHBlbmRDaGlsZChhcHAudmlldyBhcyBhbnkpO1xyXG5cclxuXHRcdGNvbnN0IG1pbGt5V2F5Q29udGFpbmVyID0gbmV3IFBJWEkuUGFydGljbGVDb250YWluZXIoKTtcclxuXHRcdGNvbnN0IGxpbmVDb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHRcdGNvbnN0IHN0YXJDb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHJcblx0XHQvLyBTdGFyIGRhdGFcclxuXHRcdGxldCBzdGFycyA9IFtdO1xyXG5cdFxyXG5cdFx0bGV0IHNob290aW5nU3RhcnMgPSBbXTtcclxuXHJcblx0XHRhcHAuc3RhZ2UuYWRkQ2hpbGQobWlsa3lXYXlDb250YWluZXIpO1xyXG5cdFx0YXBwLnN0YWdlLmFkZENoaWxkKGxpbmVDb250YWluZXIpO1xyXG5cdFx0YXBwLnN0YWdlLmFkZENoaWxkKHN0YXJDb250YWluZXIpO1xyXG5cclxuXHRcdGFkZFN0YXJzKGFwcC5yZW5kZXJlciwgc3RhckNvbnRhaW5lciwgbWlsa3lXYXlDb250YWluZXIsIHN0YXJzKTtcclxuXHJcblx0XHQvLyBHYW1lIGxvb3BcclxuXHRcdGFwcC50aWNrZXIuYWRkKChkZWx0YSkgPT4ge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhkZWx0YSk7XHJcblxyXG5cdFx0XHRsaW5lQ29udGFpbmVyLnJlbW92ZUNoaWxkcmVuKCk7XHJcblxyXG5cdFx0XHQvLyBVcGRhdGUgc3RhciBwb3NpdGlvbnNcclxuXHRcdFx0Zm9yIChsZXQgc3RhciBvZiBzdGFycykge1xyXG5cdFx0XHRcdHN0YXIueCArPSBzdGFyLnZ4O1xyXG5cdFx0XHRcdHN0YXIueSArPSBzdGFyLnZ5O1xyXG5cclxuXHRcdFx0XHQvLyBLZWVwIHN0YXJzIGluc2lkZSB0aGUgc2NyZWVuIGJvdW5kc1xyXG5cdFx0XHRcdGlmIChzdGFyLnggPCAwIHx8IHN0YXIueCA+IGFwcC5zY3JlZW4ud2lkdGgpIHN0YXIudnggPSAtc3Rhci52eDtcclxuXHRcdFx0XHRpZiAoc3Rhci55IDwgMCB8fCBzdGFyLnkgPiBhcHAuc2NyZWVuLmhlaWdodCkgc3Rhci52eSA9IC1zdGFyLnZ5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDaGVjayBkaXN0YW5jZXMgYmV0d2VlbiBzdGFycyBhbmQgZHJhdyBsaW5lc1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0Zm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgc3RhcnMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdGNvbnN0IGR4ID0gc3RhcnNbaV0ueCAtIHN0YXJzW2pdLng7XHJcblx0XHRcdFx0XHRjb25zdCBkeSA9IHN0YXJzW2ldLnkgLSBzdGFyc1tqXS55O1xyXG5cdFx0XHRcdFx0Y29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChkaXN0YW5jZSA8IDMwMCkgeyAvLyAxNTAgY2FuIGJlIGFkanVzdGVkIGFzIG5lZWRlZFxyXG5cdFx0XHRcdFx0XHRjb25zdCBsaW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgYWxwaGEgPSBtYXBMaW5lYXIoZGlzdGFuY2UsIDUwLCAxNTAsIDEsIDApOyAgLy8gNTAgYW5kIDE1MCBhcmUgbWluIGFuZCBtYXggZGlzdGFuY2VzIHRvIGNvbnNpZGVyXHJcblx0XHRcdFx0XHRcdGNvbnN0IHRoaWNrbmVzcyA9IG1hcExpbmVhcihkaXN0YW5jZSwgNTAsIDE1MCwgMywgMSk7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRsaW5lLmxpbmVTdHlsZSh0aGlja25lc3MsIDB4QUE5OUZGLCBhbHBoYSk7XHJcblx0XHRcdFx0XHRcdGxpbmUubW92ZVRvKHN0YXJzW2ldLngsIHN0YXJzW2ldLnkpO1xyXG5cdFx0XHRcdFx0XHRsaW5lLmxpbmVUbyhzdGFyc1tqXS54LCBzdGFyc1tqXS55KTtcclxuXHRcdFx0XHRcdFx0bGluZUNvbnRhaW5lci5hZGRDaGlsZChsaW5lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNob290aW5nIHN0YXJzLlxyXG5cdFx0XHRzaG9vdGluZ1N0YXJzID0gc2hvb3RpbmdTdGFycy5maWx0ZXIoc3RhciA9PiBzdGFyLnVwZGF0ZShkZWx0YSkpO1xyXG5cclxuXHRcdFx0bGV0IHByb2JhYmlsaXR5ID0gKDEwLzMwKSAqIChkZWx0YS82MCk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKHByb2JhYmlsaXR5KTtcclxuXHRcdFx0aWYgKE1hdGgucmFuZG9tKCkgPCBwcm9iYWJpbGl0eSkge1xyXG5cdFx0XHRcdHNob290aW5nU3RhcnMucHVzaChuZXcgU2hvb3RpbmdTdGFyKHN0YXJDb250YWluZXIpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCk9PntcclxuXHRcdFx0YXBwLnJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuXHRcdFx0XHJcblx0XHRcdGlmKHRoaXMucmVzaXplRGVib3VuY2Upe1xyXG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZURlYm91bmNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnJlc2l6ZURlYm91bmNlID0gc2V0VGltZW91dCgoKT0+e1xyXG5cdFx0XHRcdGFkZFN0YXJzKGFwcC5yZW5kZXJlciwgc3RhckNvbnRhaW5lciwgbWlsa3lXYXlDb250YWluZXIsIHN0YXJzKTtcclxuXHRcdFx0XHR0aGlzLnJlc2l6ZURlYm91bmNlID0gbnVsbDtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSIsImNvbnN0IEVWRU5UX0RFVEFJTFMgPSBPYmplY3QuZnJlZXplKHtcclxuXHRkYXRlOiBuZXcgRGF0ZShcIjIwMjQtMDEtMTNUMTU6NDU6MDAuMDAwLTA1OjAwXCIpXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRVZFTlRfREVUQUlMUzsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZjAwNDExMWQxNTk0ZjQ0NTVmMmU1OTE1NDQ0NjVjMjcucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjU0ODAxM2Q5NTllMTkxYjliMmYyYjQ4YWMyOWY5OWZiLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIxMGEyODVhMTcyYjk5NTI3NTBlZDI4MmYxM2JhZGQ0Yy5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNTdmNGZjNmMzNTIxZjFhNjM5OTEzNTBiOGFhNzY4MTMuanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjYwMDdmM2ZiODkwNWFkMjgzNTIwYzhmZGE1YzdiNjc5LmpwZ1wiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==