// FInd the smallest circle
// Syed Saad HUssain
// October 1, 2025

let NUM_CIRCLE = 40;


function setup() {
  createCanvas(windowWidth, windowHeight);
  drawCircles();
}

function draw() {
  //background(220);
  drawCircles();

}

function drawCircles(){
  // draw some random circles
  noFill();
  let smallestDiameter = Infinity;
  let smallestX = -1;
  let smallestY = -1;

  for(let i = 0; i < NUM_CIRCLE; i++){
    let x = random(0, width);
    let y = random(0, height);
    let d = random(20,100);

    if(d < smallestDiameter){
      smallestDiameter = d;
      smallestX = x;
      smallestY = y;
    }

    circle(x, y, d);
  }
  // at this point we have access to the smallest circle 
  fill("purple");
  circle(smallestX, smallestY, smallestDiameter)
}