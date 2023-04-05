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

    this.getBody().setSize(30, 30);

    this.initAnimations();
  }

  update(): void {
    this.getBody().setVelocity(0);
    if (this.keyW.isDown) {
      this.body.velocity.y = -SPEED;
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.keyA.isDown) {
      this.body.velocity.x = -SPEED;
      this.checkFlip();
      this.getBody().setOffset(48, 15);
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.keyS.isDown) {
      this.body.velocity.y = SPEED;
      !this.anims.isPlaying && this.anims.play("run", true);
    }
    if (this.keyD.isDown) {
      this.body.velocity.x = SPEED;
      this.checkFlip();
      this.getBody().setOffset(15, 15);
      !this.anims.isPlaying && this.anims.play("run", true);
    }

    // Mouse
    // const mouseX = this.scene.input.mousePointer.worldX;
    // const mouseY = this.scene.input.mousePointer.worldY;
    // this.rotation = Math.Angle.Between(
    //   this.getBody().x,
    //   this.getBody().y,
    //   mouseX,
    //   mouseY
    // );
  }

  private initAnimations() {
    this.scene.anims.create({
      key: "run",
      frames: this.scene.anims.generateFrameNames("a-king", {
        prefix: "run-",
        end: 7,
      }),
      frameRate: 8,
    });
  }
}
