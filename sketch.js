let song, fft;
let particles = [];
let started = false;

function preload() {
  song = loadSound(
    'track.mp3',
    function () { setSongTitle('Levitating'); },
    function () {
      song = loadSound('levitating.mp3', function () { setSongTitle('Levitating'); }, function () {});
    }
  );
}

function setSongTitle(name) {
  var el = document.getElementById('song-title');
  if (el) el.textContent = name || '';
}

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style('z-index', '-1');

  fft = new p5.FFT();
  if (song && song.isLoaded()) {
    fft.setInput(song);
    setSongTitle('Levitating');
  }

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  background(15, 15, 20);

  const playBtn = document.getElementById('play');
  const fallbackAudio = document.getElementById('audio-fallback');
  var isMobile = ('ontouchstart' in window) || (window.innerWidth <= 768);

  function tryPlay() {
    if (song && song.isPlaying()) {
      song.pause();
      playBtn.textContent = 'listen';
      return;
    }
    if (fallbackAudio && !fallbackAudio.paused) {
      fallbackAudio.pause();
      playBtn.textContent = 'listen';
      return;
    }
    if (!isMobile && song && song.isLoaded()) {
      try {
        if (typeof getAudioContext !== 'undefined' && getAudioContext().state === 'suspended') {
          getAudioContext().resume();
        }
      } catch (e) {}
      song.loop();
      started = true;
      playBtn.textContent = 'pause';
      return;
    }
    if (fallbackAudio) {
      fallbackAudio.volume = 1;
      var p = fallbackAudio.play();
      if (p && p.then) {
        p.then(function () {
          started = true;
          playBtn.textContent = 'pause';
        }).catch(function () {
          playBtn.textContent = 'Tap to play';
        });
      } else {
        started = true;
        playBtn.textContent = 'pause';
      }
      return;
    }
    if (song && song.isLoaded()) {
      song.loop();
      started = true;
      playBtn.textContent = 'pause';
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', tryPlay);
    playBtn.addEventListener('touchend', function (e) {
      e.preventDefault();
      tryPlay();
    }, { passive: false });
  }
}

function draw() {
  background(15, 15, 20, 40);

  for (let p of particles) {
    p.update();
    p.show();
  }

  if (started) {
    let bass = fft.getEnergy("bass");
    let lift = map(bass, 0, 255, 0, 4);
    for (let p of particles) {
      p.y -= lift;
    }

    let size = map(bass, 0, 255, 40, 180);
    noFill();
    stroke(28, 28, 28, 80);
    strokeWeight(1);
    ellipse(width / 2, height / 2, size);
  }
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
