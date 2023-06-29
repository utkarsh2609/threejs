import * as THREE from 'three'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Lights
const ambientLight = new THREE.AmbientLight(0x1d2430, 1);
scene.add(ambientLight)

/**
 * Clouds
 */
let clouds = [];
const textureLoader = new THREE.TextureLoader();
const cloudTexture = textureLoader.load('images/cloud.png');

const planeGeometry = new THREE.PlaneGeometry(2,2);
const cloudMaterial = new THREE.MeshLambertMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 1,
});

for(let i=0; i<10; i++) {
    let cloud = new THREE.Mesh(planeGeometry, cloudMaterial);
    cloud.scale.x = cloud.scale.y = Math.random() * 4;
    cloud.position.x = (Math.random() * 10) - 5;
    cloud.position.y = (Math.random() * 4) - 3;
    clouds.push(cloud);

}

scene.add(...clouds);

// Lightening and Thunder
const flashLight = new THREE.PointLight(0x7df9ff, 0.5);
// flashLight.position.x = -5;
flashLight.position.z = 1;
scene.add(flashLight)




/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    // Update intensity of flash
    let power = Math.random();
    flashLight.power = power > 0.98 ? Math.random()*10 : 0;
    flashLight.position.x = Math.random() * 10 - 5

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()