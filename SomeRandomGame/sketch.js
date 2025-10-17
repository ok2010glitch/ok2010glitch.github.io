// Game
// Syed Saad
// 10/17/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let myBall;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myBall = new target(mouseX,mouseY)
}

function draw() {
  background(220);
  myBall.display();
}



class target{
  // contructor
  constructor(){
    this.x = mouseX
    this.y = mouseY
    this.size = 40;
  }

  // class methods
  display(){
    circle(this.x, this.y, this.size )
  }
}
