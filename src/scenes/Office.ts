import { Scene, Tilemaps } from 'phaser'
import Player from '../entities/Player'
import { Enemy } from '../entities/Enemy'

import PhaserRaycaster from 'phaser-raycaster'

export class Office extends Scene {
  private player!: Player

  private enemies!: Enemy[]

  private map!: Tilemaps.Tilemap
  private tileset!: Tilemaps.Tileset
  private groundLayer!: Tilemaps.TilemapLayer
  private wallsLayer!: Tilemaps.TilemapLayer

  phaserRaycaster!: PhaserRaycaster

  constructor() {
    super('OfficeScene')
  }

  preload() {
    this.load.image('king', 'assets/character.svg')
    this.load.image({
      key: 'tiles',
      url: 'assets/tilemaps/tiles/office-16-16.png',
    })
    this.load.tilemapTiledJSON('office', 'assets/tilemaps/json/office.json')
  }

  create() {
    this.initMap()
    this.player = new Player(this, 100, 100)
    this.physics.add.collider(this.player, this.wallsLayer)
    this.initEnemies()
    this.initCamera()
  }

  update(): void {
    this.player.update()
  }

  private initMap() {
    this.map = this.make.tilemap({
      key: 'office',
      tileWidth: 16,
      tileHeight: 16,
    })
    this.tileset = this.map.addTilesetImage('office', 'tiles')
    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0)
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0)
    this.wallsLayer.setCollisionByProperty({ collides: true })
    this.physics.world.setBounds(
      0,
      0,
      this.wallsLayer.width,
      this.wallsLayer.height
    )

    this.wallsLayer.depth = 1

    this.showDebugWalls()
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7)
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(243, 234, 48, 255),
    })
  }

  private initCamera() {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height)
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09)
    this.cameras.main.setZoom(2)
  }

  private initEnemies() {
    const enemyPoints = this.map.filterObjects(
      'Enemies',
      (obj) => obj.name === 'Enemy'
    )

    this.enemies = enemyPoints.map(
      (enemyPoint) =>
        new Enemy(this, enemyPoint.x!, enemyPoint.y!, 'king', this.player)
    )

    this.physics.add.collider(this.enemies, this.wallsLayer)
    this.physics.add.collider(this.enemies, this.enemies)
    this.physics.add.collider(this.player, this.enemies)
  }
}
