import { Math, Scene, Time } from 'phaser'
import { Actor } from './Actor'
import Player from './Player'
import { Text } from '../classes/Text'
import FOV from '../utils/FOV'
import { BasicEnemyState } from '../states/EnemyStates'

/**
 * STATES
 * IDLE = 0
 * MOVING = 1
 * CHASING = 2
 * ALERTED = 3
 */

export class Enemy extends Actor {
  private target: Player
  public AGGRESSION_RADIUS = 150
  private notifiedIcon: Text

  // Awareness timer
  private detectionTimer: Time.TimerEvent
  private targetDetected = false

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

    this.getBody().setSize(30, 30)

    this.notifiedIcon = new Text(this.scene, this.x, this.y - this.height, '!')
      .setFontSize(12)
      .setOrigin(0.5, 0.5)
      .setDepth(99)

    this.detectionTimer = this.scene.time.addEvent({
      delay: 3000,
      callback: this.startChasing,
      callbackScope: this,
      loop: false,
      paused: true,
    })

    this.state = BasicEnemyState.IDLE
    this.FOV = new FOV(scene, this)
  }

  // Put brains here
  protected preUpdate() {
    const targetFound = this.FOV.draw()

    switch (this.state) {
      case BasicEnemyState.IDLE:
        this.stopChasing()
        break

      case BasicEnemyState.CHASING:
        this.startChasing()
        break

      default:
        break
    }

    // if (
    //   Math.Distance.BetweenPoints(
    //     { x: this.x, y: this.y },
    //     { x: this.target.x, y: this.target.y }
    //   ) < this.AGGRESSION_RADIUS
    // ) {
    //   if (this.targetDetected === false) {
    //     this.notifiedIcon.text = '?'
    //     this.notifiedIcon.setVisible(true)
    //   }
    //   this.detectionTimer.paused = false
    // } else {
    //   this.stopChasing()
    //   this.detectionTimer.paused = true
    //   this.detectionTimer.remove()
    //   this.detectionTimer = this.scene.time.addEvent({
    //     delay: 3000,
    //     callback: this.startChasing,
    //     callbackScope: this,
    //     loop: false,
    //     paused: true,
    //   })
    // }

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
    this.targetDetected = true
    this.notifiedIcon.text = '!'
    this.notifiedIcon.setVisible(true)
    this.getBody().setVelocityX(this.target.x - this.x)
    this.getBody().setVelocityY(this.target.y - this.y)
  }

  private stopChasing() {
    this.targetDetected = false
    this.notifiedIcon.setVisible(false)
    this.getBody().setVelocity(0)
  }
}
