let particles = [];

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style('z-index', '-1');

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  background(15, 15, 20);
}

function draw() {
  background(15, 15, 20, 40);

  for (let p of particles) {
    p.update();
    p.show();
  }

  let pulse = map(sin(frameCount * 0.03), -1, 1, 0.6, 2.4);
  for (let p of particles) {
    p.y -= pulse;
  }

  let size = map(sin(frameCount * 0.03), -1, 1, 45, 165);
  noFill();
  stroke(28, 28, 28, 80);
  strokeWeight(1);
  ellipse(width / 2, height / 2, size);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.speed = random(0.1, 0.4);
    this.alpha = random(40, 120);
  }

  update() {
    this.y -= this.speed;
    if (this.y < -10) this.y = height + 10;
  }

  show() {
    noStroke();
    fill(180, 180, 200, this.alpha);
    circle(this.x, this.y, this.size);
  }
}
