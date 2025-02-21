// import svg1 from './svg/1.svg';

// var pathSVG1 = extractPathData(svg1)
// var vertice1 = pathDataToPolys(pathSVG1, { tolerance: 1, decimals: 1 })
// console.log("vertice1:", vertice1)
// createBodies(pathSVG1, 30);


let world;
const scale = 0.6;

async function createBodies(vertices, n) {
  for (let i = 0; i < n; i++) {
    let pos = { x: random(0, windowWidth), y: random(0, windowHeight) };
    let angle = random(TWO_PI);

    let concaveBody = new p2.Body({
      mass: 1,
      position: [pos.x, pos.y],
      angle: angle,
      angularDamping: 0.1, // Angular damping
      damping: 0.1 // Linear damping
    });

    // Use Poly-decomp.js to decompose the vertices
    decomp.makeCCW(vertices);
    var convexParts = decomp.quickDecomp(vertices);
    convexParts.forEach(part => {
      let shape = new p2.Convex({ vertices: part });
      concaveBody.addShape(shape);
    });
    world.addBody(concaveBody);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  world = new p2.World({
    gravity: [0, 0]
  });
  // createBoundaries()
  // Example vertices for a concave polygon
  let vertices = [
    [-50, -50],
    [50, -50],
    [50, 50],
    [0, 100],
    [0, 0]
  ];
  vertices = vertices.map(v => [v[0], v[1]]);

  createBodies(vertices, 25);
}

function draw() {
  background(220);
  world.step(1.0 / 60);
  drawBodies();
}

function drawBodies() {
  push();
  // translate(width / 2, height / 2);

  world.bodies.forEach(body => {
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
    pop();
  });
  pop();
}