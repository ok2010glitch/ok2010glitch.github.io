// Bob a platformer (Capstone Project)
// Syed Saad Hussain
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variables
let levels;

let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Bob(700,25);
}

function draw() {
  background(220);
  player.body();
  player.gravity();

  }

class Bob{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vy = 0; // velocity y
    this.g = 0.5; // gravity
    this.sx = 4; //speed for player
    this.jumpP = -5; // jump power
  }
  body(){
    noStroke();
    fill(0, 150, 255);
    square(this.x,this.y,60,5);
    fill("white")
    square(this.x+10,this.y+10,15,5);
    square(this.x+35,this.y+10,15,5);
    fill("black");
    square(this.x+15,this.y+15,5,2);
    square(this.x+40,this.y+15,5,2);
  }
  movement(){
    if(keyIsPressed(RIGHT_ARROW)){
      this.x += this.sx;
    }
    if(keyIsPressed(LEFT_ARROW)){
      this.x -= this.sx;
    }
  }
  gravity(){
    this.y += this.vy;
    this.vy += this.g;

  }
  collisionPlats(){

  }

}

class platformer{
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
  }
}
