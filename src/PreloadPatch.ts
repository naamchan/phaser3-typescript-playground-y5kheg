import { preload } from './PhaserExample';

export function preload_patch() {
  //this.load.setBaseURL("https://labs.phaser.io/");
  preload.call(this);
}
