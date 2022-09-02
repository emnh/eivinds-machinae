const PIXI = require('pixi.js');

// Write me a PIXI program to draw a circle

const app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const painters = [];

const MovePainter = function (options) {
  let x = options.startx;
  let y = options.starty;
  const vx = options.vx;
  const vy = options.vy;

  const lifetime = 1.0;

  return function (graphics, delta) {
    const ox = x;
    const oy = y;
    if (delta <= lifetime) {
      x += vx * delta;
      y += vy * delta;
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
    startx: 50,
    starty: 50,
    vx: 2,
    vy: 2,
  })
);

const graphics = new PIXI.Graphics();

// add it to the stage
app.stage.addChild(graphics);

const startTime = performance.now();

app.ticker.add((delta) => {
  for (let i = 0; i < painters.length; i++) {
    const elapsed = (performance.now() - startTime) / 1000.0;
    // console.log(graphics);
    painters[i](graphics, elapsed);
  }
});

// render the stage container
app.render();
