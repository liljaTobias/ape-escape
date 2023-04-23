import { GameObjects, Geom, Scene, Tilemaps } from 'phaser'
import { Enemy } from '../entities/Enemy'

export default class FOV extends GameObjects.Graphics {
  private raycaster!: Raycaster
  private ray: Raycaster.Ray

  private actor: Enemy

  constructor(scene: Scene, actor: Enemy) {
    super(scene)
    this.actor = actor
    this.scene.add.existing(this)
    this.raycaster = this.scene.raycasterPlugin.createRaycaster({
      debug: {
        enabled: true,
        rays: true,
      },
    })
    this.ray = this.raycaster.createRay({
      origin: { x: this.actor.x, y: this.actor.y },
    })
    this.ray.setConeDeg(60)
    this.ray.autoSlice = true
    this.ray.enablePhysics()
    this.ray.setCollisionRange(100)
    this.raycaster.mapGameObjects(this.scene.wallsLayer, false, {
      collisionTiles: [13, 46, 342, 64],
    })

    this.scene.physics.add.overlap(
      this.ray,
      this.actor.getTarget(),
      this.handleOverlapCollision,
      this.ray.processOverlap.bind(this.ray)
    )
  }

  draw() {
    this.ray.setAngle(this.ray.angle + 0.01)
    this.ray.castCone()
    const visibleTargets = this.ray.overlap(this.actor.getTarget())
    // if (visibleTargets.length > 0) {
    //   console.log('Found playyer', this.scene.physics)
    // }
  }

  handleOverlapCollision(rayFOVCircle, target) {
    console.log(target, rayFOVCircle)
  }
}
