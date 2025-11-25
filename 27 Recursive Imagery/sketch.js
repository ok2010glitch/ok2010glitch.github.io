// 27 recursive imagery
// Syed Saad Hussain
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function centerCircle(x,y,d){
  // recursively draw concentric circles
  // Base Case... implicit
  if(d > 10){
    //recursive case
    circle(x,y,d);
    centerCircle(x,y,d * 0.9);
  }

  //if we skip the recrisive case, we 
  //unravel one level... base case

}

function  luckySquare(x,y,s){
  if(s > 10){
    push();
    translate(x,y);
    rotate(radians(frameCount));
    square(0,0,s);
    pop();
    luckySquare(x -s/2, y -s/2, s*0.5);
    luckySquare(x -s/2, y +s/2, s*0.5);
    luckySquare(x +s/2, y -s/2, s*0.5);
    luckySquare(x +s/2, y +s/2, s*0.5);
    circle(x,y,s/2)

  }

}

function circleFractal(x,y,d){
  //this better be good
  if(d > 4){
    circle(x,y,d);
    circleFractal(x-d/2 ,y ,d/2);
    circleFractal(x+d/2 ,y ,d/2);
    circleFractal(x,y + d/2,d/2)
  }
}

function draw() {
  rectMode(CENTER);
  noFill();
  background(0);
  stroke(255);
  luckySquare(width/2,height/2,width/2);
//   circleFractal(width/2,height/2,width/2);
}
