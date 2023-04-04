import { Scene } from "phaser";
import { Actor } from "./Actor";

const SPEED = 200;

export default class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "king");

    // Add keys to object
    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");

    scene.add.existing(this);
  }

  update(): void {
    this.getBody().setVelocity(0);
    if (this.keyW.isDown) {
      this.body.velocity.y = -SPEED;
    }
    if (this.keyA.isDown) {
      this.body.velocity.x = -SPEED;
    }
    if (this.keyS.isDown) {
      this.body.velocity.y = SPEED;
    }
    if (this.keyD.isDown) {
      this.body.velocity.x = SPEED;
    }
  }
}
