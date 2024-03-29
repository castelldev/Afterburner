import TWEEN from '@tweenjs/tween.js'
import { Color, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import OrbitControls from 'three-orbitcontrols'
import afterburner from './afterburner'

// Lights 
const lightTop = new DirectionalLight(0xffffff, 1.5)
const lightBottom = new DirectionalLight(0xffffff, 1.5)
lightTop.position.set(5, 10, -5)
lightBottom.position.set(-5, -10, 5)

// Scene
const scene = new Scene()
scene.background = new Color(0x4285F4)
scene.add(lightTop, lightBottom, afterburner)

// Camera 
const [width, height] = [window.innerWidth, window.innerHeight]
const camera = new PerspectiveCamera(60, width / height, 1, 500)
camera.lookAt(0, 0, 0)
camera.position.set(5, 5, 5)

// Renderer
const canvas = document.querySelector('canvas')
const renderer = new WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(width, height)

new OrbitControls(camera, canvas)
    ; (function animate() {
        window.requestAnimationFrame(animate)
        renderer.render(scene, camera)
        TWEEN.update()
    })()
