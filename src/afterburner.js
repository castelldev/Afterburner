import TWEEN from '@tweenjs/tween.js'
import { BoxBufferGeometry, BoxGeometry, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, Spherical, TorusBufferGeometry } from 'three'
class flapAssembly {
    constructor() {
        const baseGeometry = new BoxGeometry(0.5, 0.1, 0.75)
        const material = new MeshStandardMaterial()

        const base = new Mesh(baseGeometry, material)
        base.position.z = 0.75 / 2

        // Base
        baseGeometry.vertices[1].x = 0.35
        baseGeometry.vertices[3].x = 0.35
        baseGeometry.vertices[0].y = 0.035
        baseGeometry.vertices[2].y = -0.035

        baseGeometry.vertices[4].x = -0.35
        baseGeometry.vertices[6].x = -0.35
        baseGeometry.vertices[5].y =.035
        baseGeometry.vertices[7].y =-.035

        const flapGeometry = new BoxGeometry(0.5, 0.055, 1.5)
        // Flap Tips 
        flapGeometry.vertices[0].x = 0.1
        flapGeometry.vertices[2].x = 0.1
        flapGeometry.vertices[0].y = 0.01
        flapGeometry.vertices[2].y = -0.01

        flapGeometry.vertices[5].x = -0.1
        flapGeometry.vertices[7].x = -0.1
        flapGeometry.vertices[5].y = 0.01
        flapGeometry.vertices[7].y = -0.01

        const flap = new Group
        const pivot = new Mesh(
            new BoxBufferGeometry(.01, .01, .01),
            material
        )
        const component = new Mesh(flapGeometry, material)
        component.position.z = 1.45
        flap.add(pivot, component)
        pivot.position.z = 0.75

        new TWEEN.Tween(base.rotation)
            .to({ x: 0.2 }, 1000)
            .easing(TWEEN.Easing.Back.InOut)
            .repeat(Infinity)
            .repeatDelay(2000)
            .yoyo(true)
            .start()

        new TWEEN.Tween(flap.rotation)
            .to({ x: 0.1 }, 1000)
            .easing(TWEEN.Easing.Back.InOut)
            .repeat(Infinity)
            .repeatDelay(2000)
            .yoyo(true)
            .start()

        this.group = new Group
        this.group.add(base, flap)
        return this.group
    }
}

class afterburner {
    constructor() {
        const geometry = new TorusBufferGeometry(1, 0.01, 21, 32)
        const material = new MeshBasicMaterial({ transparent: true, opacity: 0 })
        const circle = new Mesh(geometry, material)

        const spherical = new Spherical()
        spherical.radius = 1
        spherical.theta = (3 * Math.PI) / 2

        const flaps = []
        for (let i = 0, length = 2 * Math.PI; i <= length; i += Math.PI / 8) {
            const flap = new flapAssembly
            spherical.phi = i
            flap.rotation.z = i
            flap.position.setFromSpherical(spherical)
            flaps.push(flap)
        }

        this.group = new Group
        this.group.add(circle, ...flaps)
        this.group.position.set(2, 2, 1)
        new TWEEN.Tween(this.group.rotation)
            .to({ y: 2 * Math.PI }, 6 * 10 * 1000)
            .repeat(Infinity)
            .start()
            
        return this.group
    }
}
export default new afterburner