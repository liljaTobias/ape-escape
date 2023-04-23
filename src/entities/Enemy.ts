import { Math, Scene, Time } from 'phaser'
import { Actor } from './Actor'
import Player from './Player'
import { Text } from '../classes/Text'
import FOV from '../utils/FOV'
import { BasicEnemyState } from '../states/EnemyStates'
import { Office } from '../scenes'

/**
 * **STATES**
 * IDLE = 0
 * MOVING = 1
 * CHASING = 2
 * ALERTED = 3
 */

export class Enemy extends Actor {
  private target: Player
  public AGGRESSION_RADIUS = 150
  private notifiedIcon: Text
  private originalPosition: Phaser.Math.Vector2

  private FOV: FOV

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture = 'king', // Default to "king"
    target: Player
  ) {
    super(scene, x, y, texture)
    this.target = target
    this.originalPosition = new Phaser.Math.Vector2(x, y)

    this.getBody().setSize(30, 30)

    this.notifiedIcon = new Text(this.scene, this.x, this.y - this.height, '!')
      .setFontSize(12)
      .setOrigin(0.5, 0.5)
      .setDepth(99)

    this.state = BasicEnemyState.IDLE
    this.FOV = new FOV(scene as Office, this)
  }

  // Put brains here
  protected preUpdate() {
    const targetFound = this.FOV.draw()

    if (targetFound) {
      this.setState(BasicEnemyState.CHASING)
    } else if (this.state !== BasicEnemyState.IDLE) {
      this.setState(BasicEnemyState.RETURNING)
    }

    switch (this.state) {
      case BasicEnemyState.IDLE:
        this.stopChasing()
        break

      case BasicEnemyState.CHASING:
        this.startChasing()
        break

      case BasicEnemyState.RETURNING:
        if (
          this.x === this.originalPosition.x &&
          this.y === this.originalPosition.y
        ) {
          this.setState(BasicEnemyState.IDLE)
        }
        this.returnToOriginalPosition()

        break

      default:
        break
    }

    this.notifiedIcon.setPosition(this.x, this.y - this.height)
    this.notifiedIcon.setOrigin(0.5, 0.5)
  }

  setTarget(target: Player) {
    this.target = target
  }

  getTarget() {
    return this.target
  }

  private startChasing() {
    this.notifiedIcon.text = '!'
    this.notifiedIcon.setVisible(true)
    this.getBody().setVelocityX(this.target.x - this.x)
    this.getBody().setVelocityY(this.target.y - this.y)
  }

  private stopChasing() {
    this.notifiedIcon.setVisible(false)
    this.getBody().setVelocity(0)
  }

  private returnToOriginalPosition() {
    this.getBody().setVelocity(
      this.originalPosition.x - this.x,
      this.originalPosition.y - this.y
    )
    // this.scene.physics.moveTo(
    //   this,
    //   this.originalPosition.x,
    //   this.originalPosition.y
    // )
  }
}
