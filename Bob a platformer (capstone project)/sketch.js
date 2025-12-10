// Bob a platformer (Capstone Project)
// Syed Saad Hussain
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variables
let level = 1;
let plat;
let player;
let canvasW = 1300;
let canvasH = 670;

function setup() {
  createCanvas(canvasW,canvasH);
  changingLevels();
  player = new Bob(20 ,470);  
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
  //--FOR PLACING THE PLATFORMS--
  fill("white");
  textSize(16);
  let roundedX = round(mouseX);
  let roundedY = round(mouseY);
  text("X: " + roundedX + "   Y: " + roundedY, mouseX + 20, mouseY);
  //----------------
  }
function changingLevels(){
  plat = [];
  if(level === 1){
  plat.push(new platform(0,515,550,canvasH-515));
  plat.push(new platform(830,515,canvasW,canvasH-515));
  plat.push(new platform(610,390,100,35));
  plat.push(new platform(-10,0,10,canvasH));
  plat.push(new platform(0,0,410,200));
 }
 if(level === 2){
  plat.push(new platform(50,450,200,50));
  plat.push(new platform(320,500,150,50));
  plat.push(new platform(750,300,100,40));
  plat.push(new platform(1100,200,70,100));

  }
}
class Bob{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 40;
    this.vy = 0; // velocity y
    this.g = 0.5; // gravity
    this.vx = 0; // velocity x
    this.speed = 5; //speed for player
    this.jumpP = -10; // jump power
    this.onGround = false; // true -> on Ground, false 
    this.onWall = false;
    this.wallSide = 0;
    this.pushBack = 5;
    this.jumpA = 2; // jumps avalaible
    this.airTime = 0;
    this.airMax = 20; // maximum time bob can be in the air
    this.decRate = 0.9; //deceleration rate 
    // this.wallJumpRemaining = this.jumpA;
  }
  body(){
    noStroke();   
    fill("white");
    square(this.x,this.y,this.size,5);
    fill("black");
    square(this.x + 8, this.y + 9,8,2);
    square(this.x + 24, this.y + 9,8,2);

  }
  movement(){
    // Going right
    if(this.airTime > 0){
      this.airTime --;
      this.airTime *= this.decRate;
    }
    else{
      if(keyIsDown(RIGHT_ARROW)){
        this.vx = this.speed;
      }
      if(keyIsDown(LEFT_ARROW)){
        this.vx = -this.speed;
      }
      
    }
    if(keyIsDown(UP_ARROW)){
    //Right wall side
    if(this.onWall && !this.onGround){
      if(this.wallSide === 1){
      this.vy = this.jumpP;
      this.vx = this.pushBack;
      this.onWall = false;
      this.onGround = false;
      this.airTime = this.airMax;
      // this.wallJumpRemaining --;
    }
    //left wall side
    if(this.wallSide === 2){
      this.vy = this.jumpP;
      this.vx = -this.pushBack;
      this.onWall = false;
      this.onGround = false;
      this.airTime = this.airMax;
      // this.wallJumpRemaining --;
    }
    }
    // if Bob is on the ground
    else if(this.onGround){
      this.vy = this.jumpP;
      this.onGround = false;
      this.onWall = false;
      // this.wallJumpRemaining = 2;
    }
    }
    this.vx *= this.decRate;
    this.x += this.vx;

}

// Gravity
  gravity(){
    this.y += this.vy;
    this.vy += this.g;
    this.onGround = false;

}

  // When Bob is on the ground
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
// When Bob is colliding or touching the wall
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
    changingLevels();
    this.x = 20;
    this.y = 25;
    this.vy = 0;
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
    let toppingHieght = 10
    fill(136, 137, 138);
    rect(this.xp,this.yp,this.w,this.h);
    rect(this.xp,this.yp ,this.w, toppingHieght)
  }
}
