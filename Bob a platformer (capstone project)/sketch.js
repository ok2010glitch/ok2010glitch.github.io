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
let canvasW = 1300; // canvas Width
let canvasH = 670; // canvas Height

// Generation of platform componenet
let plat; // for platforms
let player; // Bob
let spike;
let enemy;

//menu page elements
let playImg;
let menu;
let moon;
let textF;

// For one time movement one platform
let movingOne = false;

function setup() {
  createCanvas(canvasW,canvasH);
  player = new Bob(20 , 220); 
  levels(); 
}

//loads images
function preload(){
  playImg = loadImage("Assets/play.png");
  textF = loadFont("Assets/BabelStoneModern.ttf");
}

function startingScreen(){
  let bx = canvasW/2; // position for x axis
  let by = canvasH/2; // position for y axis
  let bw = 250;
  let bh = 250;

  // mouse placement
  let hovering =
  mouseX > bx - bw/2 &&
  mouseX < bx + bw/2 &&
  mouseY > by - bh/2 &&
  mouseY < by + bh/2
  
  imageMode(CENTER);
// for hovering effect
  if(hovering){
    tint(255,100);
    image(playImg,bx,by - 10,bw + 20, bh + 20);
  }
  else{
    noTint();
    image(playImg,bx,by - 10,bw,bh);
  }

  textFont(textF);
  textAlign(CENTER);
  textSize(58);
  fill("black");
  text("BOB A PLATFORMER",bx,by - 200);

  let sSz = 10;          // Scale Factor (10x bigger)
  let menuSize = 40 * sSz; // Final size: 400px
  let menuX = 50;        // X position on menu
  let menuY = 250;       // Y position on menu
  
  noStroke();

  // ===== BODY =====
  fill(185, 150, 105); // sand body
  square(menuX, menuY, menuSize, 6 * sSz);

  // ===== HEAD SCARF (turban) =====
  fill(180, 140, 90);
  // Main wrap
  rect(menuX, menuY - (6 * sSz), menuSize, 10 * sSz, 6 * sSz);
  // Top fold
  rect(menuX + (4 * sSz), menuY - (10 * sSz), 32 * sSz, 10 * sSz, 6 * sSz);

  // ===== GOGGLES =====
  fill(60);
  // Left frame
  rect(menuX + (6 * sSz), menuY + (10 * sSz), 12 * sSz, 8 * sSz, 3 * sSz);
  // Right frame
  rect(menuX + (22 * sSz), menuY + (10 * sSz), 12 * sSz, 8 * sSz, 3 * sSz);

  // Goggles glass
  fill(100, 180, 200);
  // Left lens
  rect(menuX + (8 * sSz), menuY + (12 * sSz), 8 * sSz, 4 * sSz, 2 * sSz);
  // Right lens
  rect(menuX + (24 * sSz), menuY + (12 * sSz), 8 * sSz, 4 * sSz, 2 * sSz);

  //Cactus
  fill("green");
  circle(1125,230,50);
  rect(1100,230, 50,320);
  //Left side of cactus
  rect(1000,260,150,40);
  rect(1000,150,40,150,20);
  //right side of cactus
  rect(1150,340,90,30);
  rect(1200,275,40,90,20);



}

function mousePressed(){
  if(level !== 0) return;
  let bx = canvasW/2;
  let by = canvasH/2
  let bw = 200;
  let bh = 200;

  if(
  mouseX > bx - bw/2 &&
  mouseX < bx + bw/2 &&
  mouseY > by - bh/2 &&
  mouseY < by + bh/2
  ){
    level = 1;
    levels();
}
}

function draw() {
  background(244, 197, 79);
  if(level === 0){
    startingScreen();
    //--TOOL FOR PLACING PLATFORMS IN THE RIGHT PLACE--
  fill("white");
  textSize(16);
  let roundedX = round(mouseX);
  let roundedY = round(mouseY);
  text("x: " + roundedX + " y: " + roundedY, mouseX + 20, mouseY);
  //----------------//
    return;
  }


//player Physics
player.gravity();
player.collisions();

player.body();
player.handleDeath();

//generates platforms
  for(let p of plat){
    p.movingPlats();
    p.create();
  }

  dieAgain();  

  // Generates spikes
  for(let s of spike){
    s.display()
  }
  //generates enemies
  for(let e of enemy){
    e.display();
    e.move();
  }

if(player.dead !== true){
 player.movement();
 player.levelChanging();
 player.spikesCollision();
 player.enemyCollision();
}

player.wallCollision();

  //--TOOL FOR PLACING PLATFORMS IN THE RIGHT PLACE--
  fill("white");
  textSize(16);
  let roundedX = round(mouseX);
  let roundedY = round(mouseY);
  text("x: " + roundedX + " y: " + roundedY, mouseX + 20, mouseY);
  //----------------//
}

// One time moving platform
function dieAgain(){
  for(let p of plat){
    if(!player.dead && p.rangeP > 0){
      if(player.x + player.size > p.xp - p.rangeP){
        movingOne = true;
      }
    }
  }
}

function levels(){
  plat = [];
  spike = [];
  enemy = [];
  if(level === 1){
  plat.push(new platform(0,515,550,canvasH-515,0,0,0));
  plat.push(new platform(830,515,canvasW,canvasH-515,0,0,0));
  //platform between the hole
  plat.push(new platform(610,390,100,40,0,0,0));
  //Ceiling
  plat.push(new platform(0,-10,410,210,0,0));
  //Ceiling
  plat.push(new platform(0,-10,410,200,0,canvasW,0));
  // Wall at the end of the canvas
  plat.push(new platform(1200, 148, canvasW - 1200, canvasH,0,0,0));
  //Extension for wall at the end
  plat.push(new platform(1078, 148, 140, 50,0,0,0));
  // A platform after the platform bewtween the hole
  plat.push(new platform(840,260,90,40,0,0,0));
  // For having mulitple spikes in one row
  for(let i = 900; i < 1100; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(i,515,i + 30/2,495,i + 30, 515));
  }
}
 if(level === 2){
  //Ceiling
  plat.push(new platform(290,90,110,170,0,0,0));
  plat.push(new platform(0,-10,400,110,0,0,0));
  plat.push(new platform(1180,135,canvasW - 1180, canvasH,0,0,0));
  plat.push(new platform(390,-10,325,25,0,0,0));
  //spikes on the ceiling
   for(let i = 410; i < 700; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(i,15,i + 30/2,35,i + 30, 15));
  }
  // starting platform
  plat.push(new platform(0,515,200,40,0,0,0));
  //moving platforms
  plat.push(new platform(320,390,200,40,2,850,0,0)); 
  plat.push(new platform(540,120,110,40,1,750,0));
  // platform after the above moving platform
  plat.push(new platform(920,114,canvasW,40,0,0,0));
}
if(level === 3){
  //starting Platform
  plat.push(new platform(-10,540,220,40,0,0,0));
  //Wall under the ceiling
  plat.push(new platform(280,180,80,200,0,0,0));
  //Ceiling
  plat.push(new platform(-10,-10,500,200,0,0,0));
  //moving platform after the starting platform
  plat.push(new platform(360,460,60,40,1,600,0));
  // over the moving platform
  plat.push(new platform(480,290,80,40,0,0,0));
  // Another moving platform
  plat.push(new platform(745,240,100,40,1.2,900,0));
  //spikes on the cieling
  for(let i = 360; i < 480; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(i,190,i + 30/2,210,i + 30, 190));
  }
  //ceiling on the far right handside
  plat.push(new platform(1170,175,200,200,0,0,0));
  plat.push(new platform(1120,-15,canvasW,200,0,0,0));
  // the platform at the end where bob advances (moving platform)
  plat.push(new platform(1110,480,70,40,1,1280));
  //wall outside of the canvas
  plat.push(new platform(canvasW + 10,canvasH,4,4999,0,0));

}
if(level === 4){
  // starting platform
  plat.push(new platform(-10,490,220,40,0,0,0));
  // platform after the starting platform standing on the air
  plat.push(new platform(330,230,50,150,0,0,0));
  // L-shaped platform after the platform in the air
  plat.push(new platform(820,170,40,200,0,0,0));
  plat.push(new platform(540,170,300,50,0,0,0));
  plat.push(new platform(540,90,40,100,0,0,0));
  //spikes on the L-shaped platform
  for(let i = 180; i < 320; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(860,i,880,i + 30/2,860, i+30));
  }
  // red minion
  enemy.push(new enemies(600,130,2,790));
  //moving platform
  plat.push(new platform(1080,150,60,40,1,1220,0));
  //wall L-shaped after the moving platform
  plat.push(new platform(930,-15,500,30,0,0,0));
  plat.push(new platform(canvasW-20,-10,20,canvasH-100,0,0,0));

  plat.push(new platform(1230,canvasH-60,160,40,0,0,0));
  //wall out of the canvas
  plat.push(new platform(canvasW + 10,canvasH,4,4999,0,0,0));
}
if(level === 5){
  //Wall around the map
  plat.push(new platform(1270,-10,40,500,0,0,0));
  //Spikes on the wall 
  for(let i = 30; i < 470; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(1270,i,1250,i + 30/2,1270, i+30));
  }
  //starting platform
  plat.push(new platform(-10,490,220,40,0,0,0));
  //U shaped platform
  plat.push(new platform(400,355,348,45,0,0,0));
  plat.push(new platform(380,180,50,220,0,0,0));
  plat.push(new platform(698,180,50,220,0,0,0));
  for(let i = 435; i < 675; i += 25){ // It is spaced 30 for each spike
    spike.push(new spikes(i,355,i + 30/2,335,i + 30, 355));
  }
  // platform after the u shaped platform
  plat.push(new platform(980,280,90,40,0,0,0));
  //exit platform
  plat.push(new platform(1230,570,40,120,0,0,0));
}
if(level === 6){
  // A solid block to start on
  plat.push(new platform(-10, 400, 150, 300, 0, 0,0));
  // A long ceiling with spikes to prevent high jumping
  plat.push(new platform(150, -10, 900, 110, 0, 0,0));
  for(let i = 150; i < 1050; i += 30){
    spike.push(new spikes(i, 100, i + 15, 130, i + 30, 100));
  }
  // Small, precise platforms that lead upward
  plat.push(new platform(250, 450, 50, 20, 0, 0,0));
  plat.push(new platform(400, 350, 50, 20, 0, 0,0));
  plat.push(new platform(550, 250, 50, 20, 0, 0,0));
  // If you fall off the stairs, you land here.
  for(let i = 150; i < 800; i += 30){
    spike.push(new spikes(i, 670, i + 15, 640, i + 30, 670));
  }
  // This platform moves very fast back and forth. 
  // You must land on it from the top stair to cross the second pit.
  plat.push(new platform(650, 250, 100, 30, 2, 1100,0));
  // Once you cross the bridge, you land on this large floor.
  plat.push(new platform(1000, 500, 300, 200, 0, 0,0));
  // Two enemies walking in sync to create a "gap" you have to run through
  enemy.push(new enemies(1000, 460, 3, 1250));
  // A tall wall right at the exit that requires a wall jump to clear
  plat.push(new platform(1250, 150, 50, 370, 0, 0,0));
}
if(level === 7){
  //wall around the map
  plat.push(new platform(1250,-100,80,600,0,0,0));
  plat.push(new platform(-10,-10,1400,60,0,0,0));
  for(let i = 0; i < 1220; i+= 30){
    spike.push(new spikes(i,50,i + 15,70,i + 30,50));
  }
  for(let i = 50; i < 470; i += 30){ // It is spaced 30 for each spike
    spike.push(new spikes(1250,i,1230,i + 15,1250, i + 30));
  }
  //starting platform
  plat.push(new platform(-10,295,110,305,0,0,0));
  //stairs going down
  plat.push(new platform(275,245,60,20,0,0,0));
  plat.push(new platform(450,330,60,20,0,0,0));
  //Spikes arena after the stairs
  plat.push(new platform(570,460,130,40,0,0,0));
  for(let i = 575; i < 690; i += 30){
    spike.push(new spikes(i, 460, i + 15, 440, i + 30, 460));
  }
  //moving platform after the spikes area
  plat.push(new platform(740,460,100,40,3,950,0));
  //exit platform
  plat.push(new platform(1050,550,265,40,0,0,0));
  enemy.push(new enemies(1060,510,2,canvasW));
}
if(level === 8){
  plat.push(new platform(-10,540,660,400,0,0,0));
  //Moves when player get closer to it(inspiration die again)
  plat.push(new platform(645,540,400,400,0,0,250,0.01));
  // platform coming after the movement of the other platform
  
  
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
    this.timer; // for having a smooth delay after each revive
    this.dead = false; // death state
  }

//-------------------------BOB'S DESIGN-----------------------------------
  
  body(){
  noStroke();

  if(this.dead){
    // Cracked sand effect when dead
    fill(185, 150, 105); // sand color
    this.size = 12
    square(this.x, this.y, this.size, 2);
    square(this.x + 14, this.y, this.size, 2);
    square(this.x + 30, this.y, this.size, 2);
  }
  else{
  // ===== BODY =====
  this.size = 40;
  fill(185, 150, 105); // sand body
  square(this.x, this.y, this.size, 6);

  // ===== HEAD SCARF (turban) =====
  fill(180, 140, 90);
  rect(this.x, this.y - 6, this.size, 10, 6);
  rect(this.x + 4, this.y - 10, 32, 10,6);

  // ===== GOGGLES =====
  fill(60);
  rect(this.x + 6, this.y + 10, 12, 8, 3);
  rect(this.x + 22, this.y + 10, 12, 8, 3);

  // goggles glass
  fill(100, 180, 200);
  //left lens
  rect(this.x + 8, this.y + 12, 8, 4, 2);
  //right lens
  rect(this.x + 24, this.y + 12, 8, 4, 2);
  }
}

handleDeath(){
  if(!this.dead && this.y > canvasH){
      this.dead = true;
      this.timer = 70;
    }
    // reviver timer starts to count down
    if(this.dead){
      this.timer--;
      if(this.timer <= 0){
        this.dead = false;
        this.x = 20;
        this.y = 220;
        this.vx = 0;
        this.vy = 0;
        movingOne = false;
    for(let p of plat){
      if(p.pc !== 0){
        p.reset();
      }
    }
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
    if(keyIsDown(32)){
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
          if(p.vx !== 0){ // makes bob move along with the platform
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
    if(vr && this.x < w.xp + w.w && this.x > w.xp + w.w - 5 ){
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
      this.timer = 70;
      this.dead = true;
    }
  } 
    // if spikes are on the ceiling
    else if(s.y2 > s.y3){
      if(
        this.x + this.size > s.x1 && 
        this.x < s.x3 &&
        this.y < s.y2 &&
        this.y >= s.y1){
          this.timer = 70;
          this.dead = true;
      }
    }
    // for side ways spikes pointing to the right/left
    else if(s.y1 < s.y2 && s.x1 === s.x3){
      if(
        this.y + this.size > s.y1 && 
        this.y + this.size < s.y3 &&
        this.x + this.size > s.x1 &&
        this.x < s.x2
      ){
        this.timer = 70;
        this.dead = true;
      }
    }
  }
}

enemyCollision(){
  for(let e of enemy){
    if(
      this.x + this.size > e.xe &&
      this.x < e.xe + e.eSize &&
      this.y + this.size > e.ye &&
      this.y < e.ye + e.eSize
    ){
      this.timer = 70;
      this.dead = true;
    }
  }

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
  constructor(x,y,w,h,vx,range,pc,rp){
    this.xStart = x; // for moving platforms
    this.xp = x;
    this.yp = y;
    this.w = w; // width of the platform
    this.h = h; // height of the platform
    this.vx = vx; // velocity x
    this.r = range; // range in which the platform can travel
    this.pc = pc // placement movement for one time movement (inspirtation DIE AGAIN);
    this.pcTriggered = false;
    this.rangeP = rp // range of player within the platform will move if >= then move
    this.decRate = 0.8; 
  }

  create(){
    let toppingHieght = 10;
    fill(222, 122, 5);
    rect(this.xp,this.yp,this.w,this.h,5);
    //ground on top
    fill("orange");
    rect(this.xp,this.yp ,this.w, toppingHieght,5);
  }

  // moving platform back and forth
  movingPlats(){
    if(this.vx !== 0){ // if no speed then do nothing
    this.xp += this.vx;
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

//2. DIE AGAIN (ONE TIME PLATFORM MOVEMENT)
//SMOOTHING OUT EFFECT 
  if(this.pc !== 0 && movingOne && !this.pcTriggered){
    //point the moving platform is going
    let targetX = this.xStart + this.pc;

    //distance remaining to cover
    let distanceRemainingX = targetX - this.xp;
    
    //using alomost the same logic as used in Bob (reducing friction)
    //creating a smoothing effect
    let easeAmount = distanceRemainingX * 0.5;

    if(distanceRemainingX > 0.5){
      this.xp += easeAmount
    }
    else{
      //snaps to final position and stops calculations
      this.xp = targetX;
      this.pcTriggered = true;
    }
  }
 }
// reset the die again platform into it's original place
  reset(){
    this.xp = this.xStart;
    this.pcTriggered = false;
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
    fill("black");
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






