// Bob a platformer (Capstone Project)
// Syed Saad Hussain
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variables
let levels;

let player;
let c = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Bob(25,25);
  push();
}

function draw() {
  background(220);
  for(let player of c ){
    player.movement();
    player.body();
  }
}

class Bob{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vy = 0; // velocity y
    this.g = 0.5; // gravity
    this.speed = 4;
    this.jumpP = -5; // jump power
  }
  body(){
    fill("blue");
    square(this.x,this.y,40,20);
  }
  movement(){
    if(keyIsPressed(RIGHT_ARROW)){
      this.x += this.speed;
    }
    if(keyIsPressed(LEFT_ARROW)){
      this.x -= this.speed;
    }
  }

}
