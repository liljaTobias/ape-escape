import { GameObjects, Geom, Scene, Tilemaps } from 'phaser'
import { Enemy } from '../entities/Enemy'
import { BasicEnemyState } from '../states/EnemyStates'
import { Actor } from '../entities/Actor'

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
    this.ray.setCollisionRange(this.actor.AGGRESSION_RADIUS)
    this.raycaster.mapGameObjects(this.scene.wallsLayer, false, {
      collisionTiles: [13, 46, 342, 64],
    })
  }

  draw() {
    this.ray.setOrigin(this.actor.x, this.actor.y)
    // this.ray.setAngle(this.ray.angle + 0.01)
    this.ray.castCone()
    const visibleTargets = this.ray.overlap(this.actor.getTarget()) as Actor[]
    if (visibleTargets.length > 0) {
      this.actor.setState(BasicEnemyState.CHASING)
      const angle = Phaser.Math.Angle.Between(
        this.ray.origin.x,
        this.ray.origin.y,
        visibleTargets[0].x,
        visibleTargets[0].y
      )
      console.log(visibleTargets[0])
      this.ray.setAngle(angle)
    } else {
      this.actor.setState(BasicEnemyState.IDLE)
    }
  }
}
