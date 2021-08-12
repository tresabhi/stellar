import "./style.css"
import * as THREE from "three"
import * as dat from "dat.gui"

//const gui = new dat.GUI()

const canvas = document.getElementById("canvas")

const scene = new THREE.Scene()

const geometry = new THREE.CylinderGeometry(1, 1, 1, 6 * 4)

const material = new THREE.MeshStandardMaterial();
material.flatShading = true;
material.roughness = 0.2;
material.metalness = 0.2;

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Lights

const light = new THREE.DirectionalLight()
light.position.x = -20
light.position.y = 0
light.position.z = 250
light.intensity = 1
scene.add(light)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener("resize", () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const viewSize = 8;
const aspectRatio = sizes.width / sizes.height
var camera = new THREE.OrthographicCamera();
camera.near = 0;
camera.far = 200;
camera.position.set(0, 0, 100);

function updateCamMatrix () {
    camera.left = -15;
    camera.right = 15;
    camera.top = 15 / window.innerWidth * window.innerHeight;
    camera.bottom = -15 / window.innerWidth * window.innerHeight;
    camera.updateProjectionMatrix();
}
updateCamMatrix();

scene.add(camera);

/*const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 8
scene.add(camera)*/


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.render(scene, camera)

function onResize () {
    updateCamMatrix();
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
}

window.addEventListener("resize", onResize)