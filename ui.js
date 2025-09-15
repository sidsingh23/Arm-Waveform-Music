function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function drawWave(waveform) {
  background(0);
  stroke(0, 255, 0);
  noFill();

  beginShape();
  waveform.forEach((y, i) => {
    const x = map(i, 0, waveform.length - 1, 0, width);
    const yPos = y * height;
    vertex(x, yPos);
  });
  endShape();
}
