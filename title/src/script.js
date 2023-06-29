import * as THREE from 'three'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();


// Textures
const textureLoader = new THREE.TextureLoader();
const specTexture = textureLoader.load("Ice_001/Ice_001_SPEC.jpg");

/**
 * Text
 */
const fontLoader = new FontLoader();
const title = `Harry Potter`;
const subTitle1 = `and`;
const subTitle2 = `the`;
const subTitle3 = `Portfolio`;
let titleObj = {
  size: 1,
  height: 0.2,
  curveSegments: 1,
  bevelEnabled: true,
  bevelThickness: 0.001,
  bevelSize: 0.001,
  bevelOffset: 0,
  bevelSegments: 1,
};
fontLoader.load("/fonts/Harry_P_Regular.json", (font) => {
  const nameText = new TextGeometry(title, {
    font,
    ...titleObj,
  });
  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: specTexture,
  });
  const text1 = new THREE.Mesh(nameText, textMaterial);

  nameText.computeBoundingBox();
  nameText.center();
  scene.add(text1);
});

  fontLoader.load("/fonts/Lumos_Caps.json", (font) => {
    const nameText = new TextGeometry(subTitle1, {
      font,
      size: 0.15,
      height: 0.01,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 1,
    });
    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: specTexture });
    const text1 = new THREE.Mesh(nameText, textMaterial);
    nameText.computeBoundingBox();
    // nameText.center();
    text1.position.x = 0.5;
    text1.position.y = -0.75;
    scene.add(text1);
  });

  fontLoader.load("/fonts/Lumos_Caps.json", (font) => {
    const nameText = new TextGeometry(subTitle2, {
      font,
      size: 0.15,
      height: 0.01,
      curveSegments: 100,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.001,
      bevelOffset: 0,
      bevelSegments: 1,
    });
    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: specTexture });
    const text1 = new THREE.Mesh(nameText, textMaterial);
    nameText.computeBoundingBox();
    // nameText.center();
    text1.position.x = 0.90;
    text1.position.y = -0.80;
    scene.add(text1);
  });

  fontLoader.load("/fonts/Lumos_Caps.json", (font) => {
    const nameText = new TextGeometry(subTitle3, {
      font,
      size: 0.2,
      height: 0.01,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.0001,
      bevelOffset: 0,
      bevelSegments: 100,
    });
    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: specTexture });
    const text1 = new THREE.Mesh(nameText, textMaterial);
    nameText.computeBoundingBox();
    // nameText.center();
    text1.position.x = 0.4;
    text1.position.y = -1;
    scene.add(text1);
  });

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

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()