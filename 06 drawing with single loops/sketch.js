// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circleLine(height *0.35, 30);
  circleLine(height/2, 50);
  circleLine(height * 0.65, 80);

}
 function cDistance(x1,y1,x2,y2){
  // calculate the starightline distance
  //  between (x1, y1) and (x2, y2)
  let a = abs(x1 - x2);
  let b = abs(y1 - y2)
  let c = sqrt(pow(a,2) + pow(b,2));
  return c.toFixed(1); //keep only 1 decimal place
 }


function gradientbackground(){
  // create a gradient to use a background
  let h = 3; //height of each rectrngle

  //use a loop (doesn't have to be while) to 
  // draw a vrtical stack of rectangles
  let y = 0;
  while (y <= height){
    noStroke();
    let mappedY = map(y,0,height,0,255);
    let flippedY = 255 - mappedY;
    let mappedMouseX = map(mouseX, 0, width,0, 255);
    let mappedMouseY = map(mouseY, 0, height, 0, 255);
    fill(mappedMouseY, flippedY, mappedMouseX);
    rect(0,y,width,h);
    y += h;

  }
}
function circleLine(y, size){
  // use this function to draw a line of circles (loop)
  // y -> number the height at which to draw the line
  // size -> number diameter if the circles
  let xstart = width * 0.1; //  10% postion from the left
  let xend = height * 0.9;  // 90% horizontal pos from left

  for(let x = xstart ; x <= xend ; x = x + size){
    let d = cDistance(x, y, mouseX, mouseY)
    if(d <= size/2){ // if distance is less than radius, IN CIRCLE
      fill("blue");


    }else{
      fill(255)
    }
    circle(x, y, size);
    text(d, x, y)
  }


}
