import { Math, Scene } from "phaser";
import { Actor } from "./Actor";
import Player from "./Player";
import { Text } from "../classes/Text";

export class Enemy extends Actor {
  private target: Player;
  private AGGRESSION_RADIUS = 100;
  private notifiedIcon: Text;

  // Awareness timer
  private awTimer: number;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture = "king", // Default to "king"
    target: Player
  ) {
    super(scene, x, y, texture);
    this.target = target;

    this.getBody().setSize(30, 30);

    this.notifiedIcon = new Text(this.scene, this.x, this.y - this.height, "!")
      .setFontSize(12)
      .setOrigin(0.5, 0.5);
  }

  // Put brains here
  protected preUpdate() {
    if (
      Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) < this.AGGRESSION_RADIUS
    ) {
      this.notifiedIcon.text = "!";
      this.getBody().setVelocityX(this.target.x - this.x);
      this.getBody().setVelocityY(this.target.y - this.y);
    } else {
      this.notifiedIcon.text = ""; // Hide the text
      this.getBody().setVelocity(0);
    }

    this.notifiedIcon.setPosition(this.x, this.y - this.height);
    this.notifiedIcon.setOrigin(0.5, 0.5);
  }

  setTarget(target: Player) {
    this.target = target;
  }

  private awarenessCountdown(): boolean {
    return true;
  }
}
