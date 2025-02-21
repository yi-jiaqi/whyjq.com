let world;
let images = {};
let shapes = {};
const imageKinds = 10;
const doodleCount = 21;
const scale = 0.6;


async function createBodies(n) {
  for (let i = 0; i < n; i++) {
    let pos = { x: random(windowWidth/5, windowWidth*4/5), y: random(windowHeight/5, windowHeight*4/5) };
    let angle = random(TWO_PI);

    let concaveBody = new p2.Body({
      mass: 1,
      position: [pos.x, pos.y],
      angle: angle,
      angularDamping: 1, // Angular damping m
      damping: 1 // Linear damping
    });
    // concaveBody.customProperty = "yourCustomValue";
    if (i < imageKinds) {
      concaveBody.imgNum = images[`png${i + 1}`];
      concaveBody.shapeNum = shapes[`svg${i + 1}`];
    } else {
      concaveBody.imgNum = images[`png${i + 1 - imageKinds}`];
      concaveBody.shapeNum = shapes[`svg${i + 1 - imageKinds}`];
    }
    // console.log(concaveBody.shapeNum)
    concaveBody.exception = false
    // Use Poly-decomp.js to decompose the vertices
    decomp.makeCCW(concaveBody.shapeNum);
    var convexParts = decomp.quickDecomp(concaveBody.shapeNum);
    convexParts.forEach(part => {
      let shape = new p2.Convex({ vertices: part });
      concaveBody.addShape(shape);
    });
    world.addBody(concaveBody);
  }
}

async function preload() {
  for (let i = 1; i <= imageKinds; i++) {
    images[`png${i}`] = loadImage(`/png/${i}.png`);
    let svgText = await readSVGFile(`/svg/${i}.svg`);
    shapes[`svg${i}`] = extractPathData(svgText);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  world = new p2.World({
    gravity: [0, 0]
  });
  // createBoundaries()
  createBodies(doodleCount);


  console.log(world.bodies)
}

function draw() {
  background(220);
  world.step(1.0 / 60);
  drawBodies();
}

function drawBodies() {
  push();
  // translate(width/4, height/4);
  world.bodies.forEach(body => {

    if (body.shapeNum) {
      push();

      translate(body.position[0], body.position[1]);
      rotate(-body.angle);
      if (body.shapes.length > 0) {
        body.shapes.forEach(shape => {
          beginShape();
          shape.vertices.forEach(v => vertex(v[0], v[1]));
          endShape(CLOSE);
        });
      }
      image(body.imgNum, 0, 0)
      pop();
    }
  });
  pop();
}
