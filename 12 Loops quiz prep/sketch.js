// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSize = 30


function setup() {
  createCanvas(windowWidth, windowHeight);
}



function grid(){
  //draw grid or something
  strokeWeight(30);
  let x = 0;
  while(x < width){
    let y = 0;
    while(y < height){
      point(x, y);
      y += gridSize;
    }
    x += gridSize
  }

}
function draw() {
  background(220);
  grid();
}