// Bob a platformer (Capstone Project)
// Syed Saad Hussain
// Date
//
// Extra for Experts:
// - Wall Jumping mechanics
// - Moving platform that carries the player
// - Mulitple spike orientations (ground,ceiling,sideways)
// - Level using system using classes and objects

// Global Variables
let level = 0; // stages of the game 
let plat; // for platforms
let player; // Bob 
let canvasW = 1300; // canvas Width
let canvasH = 670; // canvas Height
let spike;
let enemy;

function setup() {
  createCanvas(canvasW,canvasH);
  player = new Bob(20 , 220); 
  levels(); 
}

function startingScreen(){
  fill("white");
  textSize(60);
  textAlign(CENTER);
  text("Press Space",canvasW/2,canvasH/2);

}

function draw() {
  background("black");
  if(level === 0){
    startingScreen();
    return;
  }

  player.body();
  player.gravity();
  //generates platforms
  for(let p of plat){
    p.movingPlats();
    p.create();
  }
  // Generates spikes
  for(let s of spike){
    s.display()
  }
  //generates enemies
  for(let e of enemy){
    e.display();
    e.move();
  }

  player.collisions();
  player.movement();
  player.wallCollision();
  player.levelChanging();
  player.spikesCollision();
  //--TOOL FOR PLACING PLATFORMS IN THE RIGHT PLACE--
  fill("white");
  textSize(16);
  let roundedX = round(mouseX);
  let roundedY = round(mouseY);
  text("x: " + roundedX + " y: " + roundedY, mouseX + 20, mouseY);
  //----------------//
}

function keyPressed(){
  if(level === 0 && keyCode === 32){
    level = 1;
    levels();
  }
}

function levels(){
  plat = [];
  spike = [];
  enemy = [];
  if(level === 1){
  plat.push(new platform(0,515,550,canvasH-515,0,0));
  plat.push(new platform(830,515,canvasW,canvasH-515,0,0));
  //platform between the hole
  plat.push(new platform(610,390,100,40,0,0));
  //Ceiling
  plat.push(new platform(0,-10,410,210,0));
  //Ceiling
  plat.push(new platform(0,-10,410,200,0,canvasW));
  // Wall at the end of the canvas
  plat.push(new platform(1200, 148, canvasW - 1200, canvasH,0,0));
  //Extension for wall at the end
  plat.push(new platform(1078, 148, 140, 50,0,0));
  // A platform after the platform bewtween the hole
  plat.push(new platform(840,260,90,40,0,0));
  // For having mulitple spikes in one row
  for(let i = 900; i < 1100; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(i,515,i + 30/2,485,i + 30, 515));
  }
}
 if(level === 2){
  //Ceiling
  plat.push(new platform(290,90,110,170,0,0));
  plat.push(new platform(0,-10,400,110,0,0));
  plat.push(new platform(1180,135,canvasW - 1180, canvasH,0,0));
  plat.push(new platform(390,-10,325,25,0,0));
  //spikes on the ceiling
   for(let i = 410; i < 700; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(i,15,i + 30/2,30,i + 30, 15));
  }
  // starting platform
  plat.push(new platform(0,515,200,40,0,0));
  //moving platforms
  plat.push(new platform(320,390,200,40,2,850)); 
  plat.push(new platform(540,120,110,40,1,750));
  // platform after the above moving platform
  plat.push(new platform(920,114,canvasW,40,0,0));
}
if(level === 3){
  //starting Platform
  plat.push(new platform(-10,540,220,40,0,0));
  //Wall under the ceiling
  plat.push(new platform(280,180,80,200,0,0));
  //Ceiling
  plat.push(new platform(-10,-10,500,200,0,0));
  //moving platform after the starting platform
  plat.push(new platform(360,460,60,40,1,600));
  // over the moving platform
  plat.push(new platform(480,290,80,40,0,0));
  // Another moving platform
  plat.push(new platform(745,240,100,40,1.2,900));
  //spikes on the cieling
  for(let i = 360; i < 480; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(i,190,i + 30/2,206,i + 30, 190));
  }
  //ceiling on the far right handside
  plat.push(new platform(1170,175,200,200,0,0));
  plat.push(new platform(1120,-15,canvasW,200,0,0));
  // the platform at the end where bob advances (moving platform)
  plat.push(new platform(1110,480,70,40,1,1280));
  //wall outside of the canvas
  plat.push(new platform(canvasW + 10,canvasH,4,4999,0,0));

}
if(level === 4){
  // starting platform
  plat.push(new platform(-10,490,220,40,0,0));
  // platform after the starting platform standing on the air
  plat.push(new platform(330,230,50,150,0,0));
  // L-shaped platform after the platform in the air
  plat.push(new platform(820,170,40,200,0,0));
  plat.push(new platform(540,170,300,50,0,0));
  plat.push(new platform(540,90,40,100,0,0));
  //spikes on the L-shaped platform
  for(let i = 180; i < 320; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(860,i,890,i + 30/2,860, i+30));
  }
  // red minion
  enemy.push(new enemies(600,130,2,790));
  //moving platform
  plat.push(new platform(1080,150,60,40,1,1280))
  //wall L-shaped after the moving platform
  plat.push(new platform(930,-15,500,30,0,0));
  plat.push(new platform(canvasW-20,-10,20,canvasH-100,0,0));

  plat.push(new platform(1230,canvasH-60,160,40,0,0));
  //wall out of the canvas
  plat.push(new platform(canvasW + 10,canvasH,4,4999,0,0));
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
    this.onGround = false; // checks if Bob is on the ground
    this.onWall = false; // checks if Bob is on wall
    this.wallSide = 0; // 1 -> RIGHT, 2 -> LEFT
    this.pushBack = 5; // Going back while wall jumps
    this.jumpA = 2; // jumps avalaible
    this.airTime = 0; // time when Bob stays in the air
    this.airMax = 20; // maximum time Bob can be in the air
    this.decRate = 0.9; //deceleration rate
    this.timeToRevive; // for having a smooth delay after each revive
    this.dead = false; // death state
  }

  //-------------------------BOB'S DESIGN-----------------------------------
  
  body(){
    noStroke();
    //Body   
    fill("white");
    square(this.x,this.y,this.size,5);
    //Eyes
    fill("black");
    square(this.x + 8, this.y + 9,8,2);
    square(this.x + 24, this.y + 9,8,2);
    // If Bob is goes out of the ground throught the hole
    // Checks if Bob goes out
    if(!this.dead && this.y > canvasH){
      this.dead = true;
      this.timeToRevive = 70;
    }
    // reviver timer starts to count down
    if(this.dead){
      this.timeToRevive--;
      if(this.timeToRevive <= 0){
        this.dead = false;
        this.x = 20;
        this.y = 220;
        this.vx = 0;
        this.vy = 0;
      }
    }
    
  }
// -----------------------------MOVEMENT----------------------------
  
  movement(){
    if(this.airTime > 0){ // this is producing the smooth curve when in the air
      this.airTime --;
      this.airTime *= this.decRate; // making Bob slow down while in the air
    }
    else{
      // Right movement
      if(keyIsDown(RIGHT_ARROW)){
        this.vx = this.speed;
      }
      //Left movement
      if(keyIsDown(LEFT_ARROW)){
        this.vx = -this.speed;
// prevents Bob from leaving the map      
    if(this.x <= 0){
      this.x = 0;
      this.vx = 0;
    }
  }
      
    }
    
    //Jumping logic
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

// ------------------------------------------GRAVITY------------------------------------
  gravity(){
    this.y += this.vy;
    this.vy += this.g;
    if(this.onWall){ // will make the player slow down while coming down
      this.vy = 2; 
    }
    this.onGround = false;
}

//--------------------------COLLISIONS WITH PLATFORMS, SPIKES AND WALLS------------------------------
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
          this.y = p.yp - this.size; //Places bob on the platformer
          this.vy = 0;
          this.onGround = true;
          if(p.vx !== 0){
          this.x += p.vx;
          }
        }
        
        // if hitting the ceiling
        if(
          this.y < p.yp + p.h &&
          this.y > p.yp && this.vy < 0
        ){
          this.y = p.yp + p.h; // Places Bob under the platform
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
    if(vr && this.x < w.xp + w.w && this.x > w.xp + w.w - 10 ){
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

spikesCollision(){
  for(let s of spike){
    // if spikes on the ground
    if(s.y1 > s.y2 && s.x1 !== s.x3){
    if(
      this.x + this.size > s.x1 && // Bob going further from the first point of the spkie
      this.x < s.x3 && // Bob is between the spikes
      this.y + this.size > s.y2 && // Bob is on the spikes
      this.y < s.y1 // Bob falling on the spikes
    ){
      this.x = 20; // reset the player's x position
      this.y = 222; // reset the player's y position
      this.vx = 0;
      this.vy = 0;
    }
  } 
    // if spikes are on the ceiling
    else if(s.y2 > s.y3){
      if(
        this.x + this.size > s.x1 && 
        this.x < s.x3 &&
        this.y < s.y2 &&
        this.y <= s.y1){
          this.x = 20; // reset the player's x position
          this.y = 222; // reset the player's y position
          this.vx = 0;
          this.vy = 0;
      }
    }
    // for side ways spikes pointing to the right
    else if(s.y1 < s.y2 && s.x1 === s.x3){
      if(
        this.y + this.size > s.y1 && 
        this.y + this.size < s.y3 &&
        this.x + this.size > s.x1 &&
        this.x < s.x2
      ){
        this.x = 20;
        this.y = 222;
        this.vx = 0;
        this.vy = 0;
      }
    }
  }
}

enemyCollision(){

}
//--------------------------------------------------------------------------//


//--------------------------------LEVEL CHANGING-----------------------------------------

levelChanging(){
  if(this.x > canvasW){
    level += 1; // add to the levels, changing the levels
    levels();
    this.x = 20;
    this.y = 222;
    this.vy = 0;
  }
}
}

//-----------------------------------------PLATFORM-------------------------------------------

class platform{
  constructor(x,y,w,h,vx,range){
    this.xStart = x; // for moving platforms
    this.xp = x;
    this.yp = y;
    this.w = w; // width of the platform
    this.h = h; // height of the platform
    this.vx = vx; // velocity x
    this.r = range; // range in which the platform can travel
  }

  create(){
    let toppingHieght = 10;
    fill(136, 137, 138);
    rect(this.xp,this.yp,this.w,this.h,5);
    fill(211, 211, 211);
    rect(this.xp,this.yp ,this.w, toppingHieght,5);
  }

  // moving platform back and forth
  movingPlats(){
    this.xp += this.vx;

    if(this.vx === 0){ // if no speed then do nothing
      return;
    }  
    // moving left
      if(this.xp + this.w >= this.r){
      this.xp = this.r - this.w;
      this.vx = -this.vx;

    }
    //moving right
    else if(this.xp <= this.xStart){
      this.xp = this.xStart;
      this.vx = -this.vx;
    }  
  }
}

//--------------------------------------------SPIKES----------------------------------------------

class spikes{
  constructor(x1,y1,x2,y2,x3,y3){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }
  display(){
    strokeWeight(2);
    fill(211, 211, 211);
    triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3);
  }
}

//----------------------------------------------ENIMIES----------------------------------------------

class enemies{
  constructor(x,y,vx,r){
    this.xStart = x;
    this.xe = x;
    this.ye = y;
    this.eSize = 40;
    this.vx = vx;
    this.rg = r; // range in which the enemy/obstacle can travel
  }
  display(){
    noStroke();
    //Body   
    fill("red");
    square(this.xe,this.ye,this.eSize,5);
    //Eyes
    fill("white");
    square(this.xe + 8, this.ye + 9,8,2);
    square(this.xe + 24, this.ye + 9,8,2);
  }
  move(){
    this.xe += this.vx;
    
    // moving left
      if(this.xe + this.eSize >= this.rg){
      this.xe = this.rg - this.eSize;
      this.vx *= -1;

    }
    //moving right
    else if(this.xe <= this.xStart){
      this.xe = this.xStart;
      this.vx *= -1;
    }  

  }
}