// STYLES
import './style.css';

// DEPENDENCIES
import 'phaser';

// PATCHES
import { preload_patch } from './src/PreloadPatch';

// RUN MAIN
import {
  game,
  setMultiplier,
  setExponent,
  reset,
  setMultiplier2,
  setExponent2,
  setCutoff,
} from './src/PhaserExample';

document
  .getElementById('multiplierInput')
  .addEventListener('input', (e) => setMultiplier(e.target.value));

document
  .getElementById('exponentInput')
  .addEventListener('input', (e) => setExponent(e.target.value));

document
  .getElementById('multiplierInput2')
  .addEventListener('input', (e) => setMultiplier2(e.target.value));

document
  .getElementById('exponentInput2')
  .addEventListener('input', (e) => setExponent2(e.target.value));

document
  .getElementById('cutoffRange')
  .addEventListener('input', (e) => setCutoff(e.target.value));

document.getElementById('resetButton').addEventListener('click', () => reset());

game.config.sceneConfig.preload = preload_patch;

window.focus();
