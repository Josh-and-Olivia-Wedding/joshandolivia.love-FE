import { IDotCss, dot } from "dothtml";
import PageSection from "./page-section";

import * as THREE from 'three';
import simplex from "../scripts/simplex";

let scene, camera, renderer;
let pillars = [];
let noise = simplex(50);

// 1. Initialization:
function initThreeScene(container: HTMLDivElement) {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 7;
    camera.position.y = 7;
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

	dot.css(renderer.domElement)
		.position("absolute")
		.top(0)
		.left(0)
		.zIndex(1)

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

function onWindowResize(container: HTMLDivElement) {
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

	for(let i = 0; i < pillars.length; i++){
		let p = pillars[i];
		let y = noise(p.position.x, (now - originalNow) / 1000, p.position.z);
		p.position.y = y;
	}

    renderer.render(scene, camera);
}


export default class RsvpSection extends PageSection{

	props = {
		
	}

	builder(){

		return super.builder(
			dot.div(
				dot.div(
					dot.h1("RSVP")
					.p("The wedding is booked for January 13 in Toronto. Invitations have been sent out already and are locked in.<br />To view event details, use the personal link in your invitation.")
				).class("overlay")
			).ref("container").class("section-container")
		);
	}

	style(css: IDotCss){
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
			.backgroundColor(0,0,0,0.5)
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

	ready(): void {
		initThreeScene(this.$refs.container as HTMLDivElement);
		// initThreeScene(document.body as HTMLDivElement);

		window.addEventListener('resize', () => {
			onWindowResize(this.$refs.container as HTMLDivElement);
		});
		
		// Hack because mobile devices misbehave sometimes.
		let lastWidth = (this.$refs.container as HTMLDivElement).offsetWidth;
		setInterval(() => {
			let newWidth = (this.$refs.container as HTMLDivElement).offsetWidth;
			if(newWidth != lastWidth){
				lastWidth = newWidth;
				onWindowResize(this.$refs.container as HTMLDivElement);
			}
		}, 500); // every second

		animate();
	}
}