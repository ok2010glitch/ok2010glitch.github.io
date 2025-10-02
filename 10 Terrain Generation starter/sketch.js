// Starter Code for our
// Terrain GEneration
// Saad Hussain
// September 29, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectWidth = 1;
let time;
let noiseStart = 5;
let noiseSpeed = 0.002;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  time = noiseStart; // Initialize time
}

function draw() {
  background(220); // Clear canvas each frame
  time = noiseStart; // Reset time for consistent terrain
  generateTerrain();
  noiseStart += 0.1; // Pan the terrain
}

function generateTerrain() {
  for (let x = 0; x < width; x += rectWidth) {
    let noiseVal = noise(time);
    let rectHeight = map(noiseVal, 0, 1, 0, height * 0.9); // Optional rounding

    let x2 = x + rectWidth;
    let y2 = height - rectHeight;

    rect(x, height, x2, y2);
    time += noiseSpeed;

  if(keyCode === RIGHT_ARROW){
    rectWidth += 5
    if(rectWidth = 51 ){
      rectWidth = 51;
    }
  }

    
  }
}
