import { DotComponent, dot } from "dothtml";
import * as PIXI from "pixi.js";
import simplex from "../scripts/simplex";

let rNoise = simplex(50);
let gNoise = simplex(50);
let bNoise = simplex(50);
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
class Star extends PIXI.Polygon
{
    /**
     * @param x - Center X position of the star
     * @param y - Center Y position of the star
     * @param points - The number of points of the star, must be > 1
     * @param radius - The outer radius of the star
     * @param innerRadius - The inner radius between points, default half `radius`
     * @param rotation - The rotation of the star in radians, where 0 is vertical
     */
    constructor(x: number, y: number, points: number, radius: number, innerRadius?: number, rotation = 0)
    {
        innerRadius = innerRadius || radius / 2;

        const startAngle = (-1 * Math.PI / 2) + rotation;
        const len = points * 2;
        const delta = Math.PI*2 / len;
        const polygon = [];

        for (let i = 0; i < len; i++)
        {
            const r = i % 2 ? innerRadius : radius;
            const angle = (i * delta) + startAngle;

            polygon.push(
                x + (r * Math.cos(angle)),
                y + (r * Math.sin(angle))
            );
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
function drawStar(this2: PIXI.Graphics,
    x: number,
    y: number,
    points: number,
    radius: number,
    innerRadius: number,
    rotation = 0): PIXI.Graphics
{
    return this2.drawPolygon(new Star(x, y, points, radius, innerRadius, rotation) as PIXI.Polygon);
}

function addStars(renderer, starContainer: PIXI.Container, milkyWayContainer: PIXI.ParticleContainer, stars: Array<PIXI.Graphics>){

	// Remove existing stars.

	for (let i = 0; i < stars.length; i++) {
		let star = stars[i];
		starContainer.removeChild(star);
	}

	milkyWayContainer.removeChildren();

	// Add milky way.

	// Create a graphics object and draw a circle
	let bgStarGfx = new PIXI.Graphics();
	bgStarGfx.beginFill(0xFFFFFF);  // White color for the star
	bgStarGfx.drawCircle(0,0,3);  // Draw a circle of radius 5 at position (5, 5)
	bgStarGfx.endFill();

	// Generate a texture from the graphics object
	const starTexture = renderer.generateTexture(bgStarGfx);

	let nBgStars = Math.min(10000, 10000 * (window.innerWidth * window.innerHeight / 3489280));
	for(let i = 0; i < nBgStars; i++) {
		let star = new PIXI.Sprite(starTexture);
		star.x = Math.random() * window.innerWidth;
		star.y = Math.random() * window.innerHeight;
		star.alpha = Math.random() * 0.8;  // for some variation in brightness
		star.scale.set(0.334 + Math.random() * 0.666);  // random scaling for size variation
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
		drawStar(star,0,0,
			Math.floor(4 + Math.random() * 3),
			outer,
			inner,
			Math.random()*2*Math.PI);
		star.endFill();
		star.x = Math.random() * window.innerWidth;
		star.y = Math.random() * window.innerHeight;
		
		// Velocity for random motion
		(star as any).vx = (Math.random() - 0.5) * 2 * speedFactor;  // Random value between -1 and 1
		(star as any).vy = (Math.random() - 0.5) * 2 * speedFactor;

		starContainer.addChild(star);
		stars.push(star);
	}
}

class ShootingStar {
	sprite: PIXI.Graphics;
	speed: number;
	direction: number;
	stage: any;
	rSpeed = (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1);

    constructor(stage: PIXI.Container) {
		this.stage = stage;
		this.direction = Math.random() * Math.PI * 2;

		let w = window.innerWidth;
		let h = window.innerHeight;
		let d = Math.sqrt(w*w+h*h);

        this.sprite = new PIXI.Graphics();
        this.sprite.beginFill(generateStarColor());
		drawStar(this.sprite, 0, 0, 5, 8, 4, Math.random() * 2 * Math.PI);
        this.sprite.endFill();
        this.speed = Math.random() * 12 + 20;
        this.sprite.x = w / 2 - Math.sin(this.direction) * d / 2;
        this.sprite.y = h / 2 - Math.cos(this.direction) * d / 2;
        stage.addChild(this.sprite);  // Assuming you've already defined starContainer
    }

    update(dt) {
        this.sprite.x += Math.cos(this.direction) * this.speed * dt;
        this.sprite.y += Math.sin(this.direction) * this.speed * dt;
		this.sprite.rotation += this.rSpeed * dt;
		let w = window.innerWidth / 2;
		let h = window.innerHeight / 2;
		let cx = this.sprite.x - w;
		let cy = this.sprite.y - h;
		let cd2 = cx*cx+cy*cy;
        if (cd2 > (h*h+w*w)) {
            this.remove();
            return false;  // Indicate that the star has been removed
        }
        return true;  // Star still in canvas
    }

    remove() {
        this.stage.removeChild(this.sprite);
    }
}

const speedFactor = 0.1;

export default class StaryBg extends DotComponent{
	resizeDebounce: number;

	builder(){
		return dot.div().class("star-bg-canvas-container").ref("canvasContainer")
	}

	style(css){
		css(this.$refs.canvasContainer)
			.position("fixed")
			.left(0)
			.right(0)
			.top(0)
			.bottom(0)
			.zIndex(1);
	}

	ready(){
		// Create the Pixi Application
		const app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x000000,
		});
		this.$refs.canvasContainer.appendChild(app.view as any);

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
				if (star.x < 0 || star.x > app.screen.width) star.vx = -star.vx;
				if (star.y < 0 || star.y > app.screen.height) star.vy = -star.vy;
			}

			// Check distances between stars and draw lines
			for (let i = 0; i < stars.length; i++) {
				for (let j = i + 1; j < stars.length; j++) {
					const dx = stars[i].x - stars[j].x;
					const dy = stars[i].y - stars[j].y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 300) { // 150 can be adjusted as needed
						const line = new PIXI.Graphics();
						const alpha = mapLinear(distance, 50, 150, 1, 0);  // 50 and 150 are min and max distances to consider
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

			let probability = (10/30) * (delta/60);
			// console.log(probability);
			if (Math.random() < probability) {
				shootingStars.push(new ShootingStar(starContainer));
			}
		});

		window.addEventListener("resize", ()=>{
			app.renderer.resize(window.innerWidth, window.innerHeight);
			
			if(this.resizeDebounce){
				clearTimeout(this.resizeDebounce);
			}
			this.resizeDebounce = setTimeout(()=>{
				addStars(app.renderer, starContainer, milkyWayContainer, stars);
				this.resizeDebounce = null;
			}, 100);
		});
	}
}