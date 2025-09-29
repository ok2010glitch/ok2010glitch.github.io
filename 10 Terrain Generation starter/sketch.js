// Starter Code for our
// Terrain GEneration
// Saad Hussain
// September 29, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let rectWidth = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function generateTerrain(){
  // USe a loop to generate and draw several
  // rectangles side to side to look like 2D
  // terrain.

    let noiseLevel = 100;
    let noiseScale = 0.02;
  
    // Scale the input coordinate.
    let x = frameCount;
    let nx = noiseScale * x;
  
    // Compute the noise value.
    let y = noiseLevel * noise(nx);
  
    // Draw the line.
    line(x, 0, x, y);
  }

  


 


function draw(){
  // don't need to use draw UNTIL
  // animating the terrain (panning)

  background(220);
  generateTerrain();
}
