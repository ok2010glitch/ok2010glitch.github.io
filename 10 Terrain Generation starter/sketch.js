// Starter Code for our
// Terrain GEneration
// Saad Hussain
// September 29, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let rectWidth = 1;
let time = 0
let pantime = 1



function setup() {
  createCanvas(windowWidth, windowHeight);
  //for now, generate the terrain once
  generateTerrain();
  
}

function generateTerrain(){
  // Use a loop to generate and draw several
  // rectangles side to side to look like 2D 
  // terrain.
  rectMode(CORNERS);

  for(let x = 0; x < width; x+=rectWidth){
    // generate a random height.
    // NOTE!! change this from random() to noise()
    let noiseVal = noise(time);
    let rectHeight = map(noiseVal, 0, 1, height*0.2, height*0.9);

    // calculate the upper-right corner of rect
    let x2 = x + rectWidth;
    let y2 = height - rectHeight;

    rect(x, height, x2, y2);

    time += 0.01

  }

  rectMode(CORNER);  //revert to default
}

function draw() {
  // don't need to use draw UNTIL
  // animating the terrain (panning)
  
  //background(220);
  //generateTerrain();
}