import { Physics, Scene } from 'phaser'

export class Actor extends Physics.Arcade.Sprite {
  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string
  ) {
    super(scene, x, y, texture, frame)

    this.scene.add.existing(this)
    scene.physics.add.existing(this)
    this.getBody().setCollideWorldBounds(true)
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body
  }

  protected checkFlip() {
    if (this.body.velocity.x < 0) {
      // this.setFlipX(true);
      this.scaleX = -1
    } else {
      // this.setFlipX(false);

      this.scaleX = 1
    }
  }
}
