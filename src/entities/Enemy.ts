import { Math, Scene } from "phaser";
import { Actor } from "./Actor";
import Player from "./Player";

export class Enemy extends Actor {
  private target: Player;
  private AGGRESSION_RADIUS = 100;

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
  }

  // Put brains here
  protected preUpdate() {
    if (
      Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) < this.AGGRESSION_RADIUS
    ) {
      this.getBody().setVelocityX(this.target.x - this.x);
      this.getBody().setVelocityY(this.target.y - this.y);
    } else {
      this.getBody().setVelocity(0);
    }
  }

  setTarget(target: Player) {
    this.target = target;
  }
}
