import { Math, Scene, Time } from 'phaser'
import { Actor } from './Actor'
import Player from './Player'
import { Text } from '../classes/Text'
import FOV from '../utils/FOV'

export class Enemy extends Actor {
  private target: Player
  private AGGRESSION_RADIUS = 100
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

    this.FOV = new FOV(scene, this)
  }

  // Put brains here
  protected preUpdate() {
    this.FOV.draw()

    if (
      Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) < this.AGGRESSION_RADIUS
    ) {
      if (this.targetDetected === false) {
        this.notifiedIcon.text = '?'
        this.notifiedIcon.setVisible(true)
      }
      this.detectionTimer.paused = false
    } else {
      this.stopChasing()
      this.detectionTimer.paused = true
      this.detectionTimer.remove()
      this.detectionTimer = this.scene.time.addEvent({
        delay: 3000,
        callback: this.startChasing,
        callbackScope: this,
        loop: false,
        paused: true,
      })
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
