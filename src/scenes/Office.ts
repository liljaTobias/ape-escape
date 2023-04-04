import { Scene } from "phaser";
import Player from "../entities/Player";

export default class Office extends Scene {
  private player!: Player;
  constructor() {
    super("OfficeScne");
  }

  preload() {
    this.load.image("king", "assets/character.svg");
  }

  create() {
    this.player = new Player(this, 100, 100);
  }

  update(): void {
    this.player.update();
  }
}
