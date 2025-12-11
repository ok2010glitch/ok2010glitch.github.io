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


  player.collisions();
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
  //platform between the hole
  plat.push(new platform(610,390,100,40));
  plat.push(new platform(0,0,410,200));
  // Wall at the end of the canvas
  plat.push(new platform(1200, 148, canvasW - 1200, canvasH));
  //Extension for wall at the end
  plat.push(new platform(1070, 148, 130, 50));
  // A platform after the platform bewtween the hole
  plat.push(new platform(840,260,90,40));
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
    this.wallSide = 0; // 1 -> RIGHT, 2 -> LEFT
    this.pushBack = 5; // Going back while wall jumps
    this.jumpA = 2; // jumps avalaible
    this.airTime = 0; // time when Bob stays in the air
    this.airMax = 20; // maximum time Bob can be in the air
    this.decRate = 0.9; //deceleration rate
    this.timeToRevive; // for having a smooth delay after each revive
    this.dead = false; // checks if bob died or no
  }
  body(){
    noStroke();   
    fill("white");
    square(this.x,this.y,this.size,5);
    fill("black");
    square(this.x + 8, this.y + 9,8,2);
    square(this.x + 24, this.y + 9,8,2);
    // If Bob is goes out of the ground throught the hole
    // Checks if Bob goes out
    if(!this.dead && this.y > canvasH){
      this.dead = true;
      this.timeToRevive = 120;
    }
    // reviver timer starts to count down
    if(this.dead){
      this.timeToRevive--;
      if(this.timeToRevive <= 0){
        this.dead = false;
        this.x = 20;
        this.y = 470;
      }
    }
    
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
    // Bob can't go out of the map from the left side
    if(this.x <= 0){
      this.x = 0;
      this.vx = 0;
    }
    
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
    }
    //left wall side
    if(this.wallSide === 2){
      this.vy = this.jumpP;
      this.vx = -this.pushBack;
      this.onWall = false;
      this.onGround = false;
      this.airTime = this.airMax;
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
    this.vx *= this.decRate; // gives a sliding effect for Bob
    this.x += this.vx;

}

// Gravity
  gravity(){
    this.y += this.vy;
    this.vy += this.g;
    this.onGround = false;

}

//checks through all of the platforms
  collisions(){
    for(let p of plat){
      if(
        this.x + this.size > p.xp &&
        this.x < p.xp + p.w 
      ){
        // if Bob is on the ground
        if(
          this.y + this.size > p.yp &&
          this.y + this.size < p.yp + p.h &&
          this.vy >= 0
        ){
          this.y = p.yp - this.size;
          this.vy = 0;
          this.onGround = true;
        }
        // if hitting the ceiling
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
    if(vr && this.x < w.xp + w.w && this.x > w.xp + w.w ){
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
    level += 1; // add to the levels chaning the levels
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
    this.w = w; // width of the platform
    this.h = h; // height of the platform
  }
  create(){
    let toppingHieght = 10
    fill(136, 137, 138);
    rect(this.xp,this.yp,this.w,this.h);
    rect(this.xp,this.yp ,this.w, toppingHieght);
  }
}

class spikes{

}
