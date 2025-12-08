// Bob a platformer (Capstone Project)
// Syed Saad Hussain
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variables
let level = 1;
let plat = [];
let player;
let canvasW = 1300;
let canvasH = 670;

function setup() {
  createCanvas(canvasW,canvasH);
  plat.push(new platform(0,590,canvasW,200));
  player = new Bob(20 ,25);  
  
if(level === 1){
  plat.push(new platform(30,470,300,50));
  plat.push(new platform(520,400,150,50));
  plat.push(new platform(750,300,100,40));
  plat.push(new platform(1000,200,70,80));
  plat.push(new platform(-10,0,10,canvasH));
 }
if(level === 2){
  plat.push(new platform(50,560,200,50));
  plat.push(new platform(320,500,150,50));
  plat.push(new platform(750,300,100,40));
  plat.push(new platform(1100,200,70,100));

  }

  
}

function draw() {
  background("black");
  player.body();
  player.gravity();
    for(let p of plat){
      p.create();
    }


  
  player.collisionPlatsA();
  player.movement();
  player.wallCollision();
  player.levelChanging();
  }
function changingLevels(){

}
class Bob{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 60;
    this.vy = 0; // velocity y
    this.g = 0.5; // gravity
    this.vx = 0;
    this.speed = 5; //speed for player
    this.jumpP = -10; // jump power
    this.onGround = false;
    this.onWall = false;
    this.wallSide = 0;
    this.pushBack = 10;
    this.jumpA = 2; // jumps avalaible
    this.wallJumpRemaining = this.jumpA;
  }
  body(){
    noStroke();   
    fill("white");
    square(this.x,this.y,this.size,5);
    fill("black")
    square(this.x+10,this.y+10,15,5);
    square(this.x+35,this.y+10,15,5);
    fill("white");
    square(this.x+15,this.y+15,5,2);
    square(this.x+40,this.y+15,5,2);
  }
  movement(){
    // Going right
    if(keyIsDown(RIGHT_ARROW)){
      this.vx=this.speed;
    }
    // Going left
    if(keyIsDown(LEFT_ARROW)){
      this.vx=-this.speed;
    }
    if(keyIsDown(UP_ARROW)){
    //Right wall
    if(this.onWall && !this.onGround && this.wallJumpRemaining > 0){
      if(this.wallSide === 1){
      this.vy = this.jumpP;
      this.vx = this.pushBack;
      this.onWall = false;
      this.onGround = false;
      this.wallJumpRemaining --;
    }
    //left wall
    if(this.wallSide === 2){
      this.vy = this.jumpP;
      this.vx = -this.pushBack;
      this.onWall = false;
      this.onGround = false;
      this.wallJumpRemaining --;
    }
    }
    // if Bob is on the ground
    else if(this.onGround){
      this.vy = this.jumpP;
      this.onGround = false;
      this.onWall = false;
      this.wallJumpRemaining = 2;
    }
    }
    this.vx *= 0.9;
    this.x += this.vx;

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
          this.y + this.size < p.yp + p.h &&
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
wallCollision(){
  this.onWall = false;
  for(let w of plat){
    let vr = this.y + this.size > w.yp && this.y < w.yp+w.h;
    // right side
    if(vr && this.x < w.xp + w.w && this.x > w.xp + w.w - 5){
      this.x = w.xp + w.w;
      this.vx = 0;
      this.onWall = true;
      this.wallSide = 1; // right side
    }
    // left side
    if(vr && this.x + this.size > w.xp && this.x < w.xp ){
      this.x = w.xp - this.size;
      this.vx = 0;
      this.onWall = true;
      this.wallSide = 2; // left
    }
    
  }
}

levelChanging(){
  if(this.x > canvasW){
    level += 1;
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
    fill(28, 27, 27);
    rect(this.xp,this.yp,this.w,this.h);

  }
}
