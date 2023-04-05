import { Scene } from "phaser";

export class LoadingScene extends Scene {
  constructor() {
    super("LoadingScene");
  }

  preload() {
    this.load.setBaseURL("assets/");
    this.load.image("king", "sprites/king.png");
    this.load.atlas(
      "a-king",
      "spritesheets/a-king.png",
      "spritesheets/a-king_atlas.json"
    );
  }

  create() {
    this.scene.start("OfficeScene");
  }
}
