import { Scene, Tilemaps } from "phaser";
import Player from "../entities/Player";

export class Office extends Scene {
  private player!: Player;

  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private groundLayer!: Tilemaps.TilemapLayer;
  private wallsLayer!: Tilemaps.TilemapLayer;

  constructor() {
    super("OfficeScene");
  }

  preload() {
    this.load.image("king", "assets/character.svg");
    this.load.image({
      key: "tiles",
      url: "assets/tilemaps/tiles/office-16-16.png",
    });
    this.load.tilemapTiledJSON("office", "assets/tilemaps/json/office.json");
  }

  create() {
    this.initMap();
    this.player = new Player(this, 100, 100);
    this.physics.add.collider(this.player, this.wallsLayer);
  }

  update(): void {
    this.player.update();
  }

  private initMap() {
    this.map = this.make.tilemap({
      key: "office",
      tileWidth: 16,
      tileHeight: 16,
    });
    this.tileset = this.map.addTilesetImage("office", "tiles");
    this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer("Walls", this.tileset, 0, 0);
    this.wallsLayer.setCollisionByProperty({ collides: true });
    this.physics.world.setBounds(
      0,
      0,
      this.wallsLayer.width,
      this.wallsLayer.height
    );

    this.showDebugWalls();
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }
}
