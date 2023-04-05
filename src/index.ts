import Phaser from "phaser";
import config from "./config";
import { LoadingScene, Office } from "./scenes";

new Phaser.Game(
  Object.assign(config, {
    scene: [LoadingScene, Office],
  })
);
