var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

export var game = new Phaser.Game(config);

export function setMultiplier(multiplier: number) {
  scene.evaluateMultiplier = multiplier;
}

export function setExponent(exponent: number) {
  scene.evaluateExponent = exponent;
}

export function setMultiplier2(multiplier: number) {
  scene.evaluateMultiplier2 = multiplier;
}

export function setExponent2(exponent: number) {
  scene.evaluateExponent2 = exponent;
}

export function setCutoff(cutoff: number) {
  scene.evaluateCutoff = cutoff;
}

export function reset() {
  scene.playTime = 1;
}

let scene: Phaser.Scene;

const normalAltitudeTextColor = '#FFFFFF';
const selectedAltitudeTextColor = '#000000';
const normalAltitudeBackgroundColor = undefined;
const selectedAltitudeBackgroundColor = '#F6B605';

export function preload() {
  this.load.image(
    'altitude_line',
    'https://raw.githubusercontent.com/bagginsgauss/ultimate-meme-repo/master/Images/sad.jpg'
  );
}

function create() {
  scene = this;
  this.lastUpdate = Date.now();
  this.playTime = 1;

  this.evaluateMultiplier = 0.02;
  this.evaluateExponent = 1.8;
  this.evaluateMultiplier2 = 0.02;
  this.evaluateExponent2 = 2;
  this.evaluateCutoff = 6;

  this.altitudeContainer = this.add.container(0, 0);
  const imageHeight = 52;
  const lineStartY = 300 - imageHeight * 7 - 1.5;
  const textStartY = 300 - imageHeight * 7 - 15;
  this.altituteTextList = [];
  this.altituteImageList = [];

  for (let i = 0; i < 15; ++i) {
    const lineY = lineStartY + imageHeight * i;
    const line = this.add.image(740, lineY, 'altitude_line');
    this.altitudeContainer.add(line);
    this.altituteImageList.push(line);

    const textY = textStartY + imageHeight * i;
    const text = this.add
      .text(770, textY, i, {
        fontFamily: 'Orbitron',
        fontSize: 10,
        color: normalAltitudeTextColor,
        backgroundColor: normalAltitudeBackgroundColor,
        align: 'center',
        padding: { left: 5, right: 5, top: 3, bottom: 3 },
      })
      .setOrigin(0.5);
    this.altituteTextList.push(text);
    this.altitudeContainer.add(text);
  }

  this.multiplierText = this.add.text(260, 250, '', {
    fontFamily: 'Aria',
    fontSize: 64,
    color: '#dddddd',
    align: 'center',
  });

  this.timeText = this.add
    .text(0, 600, '', {
      fontFamily: 'Aria',
      fontSize: 32,
      color: '#dddddd',
      align: 'center',
    })
    .setOrigin(0, 1);
}

function update() {
  const now = Date.now();
  const dt = (now - this.lastUpdate) / 1000;
  this.playTime += dt;
  this.lastUpdate = now;

  // const value = evaluate(this.playTime);
  const value = evaluate(1);
  this.multiplierText.setText(value.toFixed(2));
  this.timeText.setText(this.playTime.toFixed(2));

  const altitudeValue = value % 1;
  this.altitudeContainer.y = altitudeValue * 52;

  const centerValue = Math.floor(value);
  const bottomValue = centerValue + 7;

  /*
  const altitudeValue = value % 1;
  this.altitudeContainer.y = altitudeValue * 52;

  const centerValue = Math.floor(value);
  const topValue = centerValue + 7;
  for (
    let altituteTextIndex = 0;
    altituteTextIndex < (this.altituteTextList as []).length;
    ++altituteTextIndex
  ) {
    const altitudeText = this.altituteTextList[altituteTextIndex];
    const lineValue = topValue - altituteTextIndex;

    altitudeText.setText(lineValue > 0 ? lineValue.toFixed(2) : '');
    this.altituteImageList[altituteTextIndex].visible = lineValue > 0;
  }
  */
}

function evaluate(time: number) {
  // const multiplier =
  //   time < scene.evaluateCutoff
  //     ? scene.evaluateMultiplier
  //     : scene.evaluateMultiplier2;
  // const exponent =
  //   time < scene.evaluateCutoff
  //     ? scene.evaluateExponent
  //     : scene.evaluateExponent2;
  // const y = multiplier * Math.pow(time, exponent);
  // return 1 + y;

  const multiplier = lerp(
    scene.evaluateMultiplier,
    scene.evaluateMultiplier2,
    scene.evaluateCutoff,
    time
  );
  const exponent = lerp(
    scene.evaluateExponent,
    scene.evaluateExponent2,
    scene.evaluateCutoff,
    time
  );

  const y = multiplier * Math.pow(time, exponent);
  return 1 + y;
}

function lerp(val1: number, val2: number, max: number, t: number) {
  let ratio1 = 1 - t / max;
  let ratio2 = t / max;

  ratio1 = ratio1 < 0 ? 0 : ratio1;
  ratio2 = ratio2 > 1 ? 1 : ratio2;

  return val1 * ratio1 + val2 * ratio2;
}
