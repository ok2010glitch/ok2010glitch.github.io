// Bob a platformer (Capstone Project)
// Syed Saad Hussain
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variables
let levels;
let plat = []
let player;
let canvasW = 1510;
let canvasH = 690;

function setup() {
  createCanvas(canvasW,canvasH);
  player = new Bob(650,25);
  plat.push(new platform(0,590,canvasW,200));
  plat.push(new platform(100,470,300,50));
  plat.push(new platform(520,400,150,50));
  plat.push(new platform(1000,50,200,500))

  
}

function draw() {
  background(220);
  player.body();
  player.gravity();
  for(let p of plat){
    p.create();
  }
  player.collisionPlatsA();
  player.movement();
  player.wallJump();

  }

class Bob{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 60;
    this.vy = 0; // velocity y
    this.g = 0.5; // gravity
    this.sx = 4; //speed for player
    this.jumpP = -10; // jump power
    this.onGround = false;
    this.onWall = false;
    this.wallSide = 0;
  }
  body(){
    noStroke();
    fill(0, 150, 255);
    square(this.x,this.y,this.size,5);
    fill("white")
    square(this.x+10,this.y+10,15,5);
    square(this.x+35,this.y+10,15,5);
    fill("black");
    square(this.x+15,this.y+15,5,2);
    square(this.x+40,this.y+15,5,2);
  }
  movement(){
    if(keyIsDown(RIGHT_ARROW)){
      this.x += this.sx;
    }
    if(keyIsDown(LEFT_ARROW)){
      this.x -= this.sx;
    }
    if(keyIsDown(UP_ARROW) && this.onGround){
      this.vy = this.jumpP;
      this.onGround = false;
    }
}
  gravity(){
    this.y += this.vy;
    this.vy += this.g;
    this.onGround = false;

  }
  collisionPlatsA(){
    for(let p of plat){
      if(
        this.x + this.size > p.xp &&
        this.x < p.xp + p.w 
      ){
        if(
          this.y + this.size > p.yp &&
          this.y + this.size < p.yp + 20 &&
          this.vy >= 0
        ){
          this.y = p.yp - this.size;
          this.vy = 0;
          this.onGround = true;
        }
        if(
          this.y < p.yp + p.h &&
          this.y > p.yp && this.vy < 0
        ){
          this.y = p.yp + p.h;
          this.vy = 0;

        }
      }

  }

}
wallJump(){
  for(let w of plat){
    let vr = this.y + this.size > w.yp && this.y < w.yp+w.h;
    // right side
    if(vr && this.x < w.xp + w.w && this.x > w.xp + w.w - 5){
      this.x = w.xp + w.w;
      this.onWall = true;
      this.wallSide = 1; // right side
    }
    // left side
    if(vr && this.x + this.size > w.xp && this.x < w.xp -10){
      this.x = w.xp - this.size;
      this.onWall = true;
      this.wallSide = 2; // left
    }
    if(this.onWall && keyIsDown(UP_ARROW) &&
     this.wallSide === 1){
      this.vy -= 4;
      this.x += 10;
      this.onWall = false;
    }
    if(this.onWall && keyIsDown(UP_ARROW) &&
     this.wallSide === 2){
      this.vy -= 4;
      this.x -= 10;
      this.onWall = false;
    }
  }
}

}

class platform{
  constructor(x,y,w,h){
    this.xp = x;
    this.yp = y;
    this.w = w;
    this.h = h;
  }
  create(){
    fill("black")
    rect(this.xp,this.yp,this.w,this.h);

  }
}
