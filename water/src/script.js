import * as THREE from 'three'
import gsap from 'gsap'
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';

let water;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

// const ambientLight = new THREE.AmbientLight(0x1d2430, 1);
// scene.add(ambientLight)

function createOcean() {
    // Water

    const waterGeometry = new THREE.PlaneGeometry( 100, 100 );

    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( 'waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = - Math.PI / 2;
  water.position.y = -2;


    scene.add( water );
}

const tick = () =>
{
    // Render
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

createOcean();
tick()