const PIXI = require('pixi.js');

// Write me a PIXI program to draw a circle

const app = new PIXI.Application(400, 400, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const painters = [];

const MovePainter = function (options) {
  const sx = options.startx;
  const sy = options.starty;
  const vx = options.vx;
  const vy = options.vy;
  let x = sx;
  let y = sy;

  const lifetime = 1.0;
  let first = true;

  return function (graphics, time, delta) {
    const ox = x;
    const oy = y;
    if (delta <= lifetime) {
      // x = sx + vx * delta;
      // y = sy + vy * delta;
      x = sx + 100.0 * Math.cos(10 * time * vx * Math.PI) + 100 * time * vx;
      y = sy + 100.0 * Math.sin(10 * time * vy * Math.PI) + 100 * time * vy;
      if (first) {
        first = false;
        return;
      }
    }

    graphics.lineStyle(1, 0xffffff, 1);
    graphics.beginFill(0xff0000, 0.5);
    graphics.moveTo(ox, oy);
    graphics.lineTo(x, y);
    graphics.endFill();
  };
};

painters.push(
  MovePainter({
    startx: 100,
    starty: 100,
    vx: 1,
    vy: 2,
  })
);
painters.push(
  MovePainter({
    startx: 100,
    starty: 100,
    vx: 3,
    vy: 2,
  })
);

const graphics = new PIXI.Graphics();

// add it to the stage
app.stage.addChild(graphics);

const startTime = performance.now();

// app.ticker.add((delta) => {
const delta = 0.001;
for (let time = 0.0; time < 1.0; time += delta) {
  for (let i = 0; i < painters.length; i++) {
    // const elapsed = (performance.now() - startTime) / 1000.0;
    // console.log(graphics);
    painters[i](graphics, time, delta);
  }
}

// render the stage container
app.render();
