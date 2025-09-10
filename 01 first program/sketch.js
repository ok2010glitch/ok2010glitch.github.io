// Coordinates system
// Syed Saad HUssain
// September 10, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() { // runs ONCE at the start
  createCanvas(windowWidth, windowHeight);
  print(windowWidth, windowHeight, width, height);
} //windowwidth: current bower width
  //width;  canvas width

function draw() { // runs OVER and OVER
                  //targeting 60 frames per second
  background(220);// draws a big solid rectangle(kinda grey)
  fill (0,255,0);
  circle(mouseX, mouseY,30); // 
}
function drawtwocirlces(){ //[ALT][SHFT][F] -> Autoformat
  // draw the cirlces one at a fixed location
  // and one at the mouse location

  fill(0,255,0)//colors are abit like
  // picking up a marker, or 
  // filling a paintbrush wiht paint...
  // R G B
  circle(mouseX,mouseY,30);

  fill(255,0,255);
  circle(width/2,height/2, 100)



}
drawtwocicles()