// Cars! Cars! Cars!
// Syed Saad Hussain
// October 20, 2025

// Goal is to make a traffic simulation with alot of different types
// of Vehicles 

// Global Variables
let e;
let w;
let traffic;

let customW = 900; // Canvas Width
let customH = 600; // Canvas Height

let westbound = [];
let eastbound = [];

function setup() {
  createCanvas(customW, customH);
  for (i = 0; i < 20; i++) { // Intially cars start with 20
    e = new vehicle(random(0,customW), random(100, customH/2 - 40), 0);
    eastbound.push(e);

    w = new vehicle(random(0,customW), random(customH/2 + 10, 460),2);
    westbound.push(w);
  }
  traffic = new trafficLight(500,50)

}

function draw() {
  noStroke();
  //randomSeed(1);
  background(255, 216, 161);
  // Road
  drawRoad();
  // Cars generator
  for(let e of eastbound){
    e.action();
  }
  for(let w of westbound){
   w.action();
}
traffic.update();
}

// Road
function drawRoad() {
  fill("grey")
  rect(0, 100, width, 400);
  fill("white");
  for (i = 0; i < 1000; i = i + 30 * 2.5) {
    rect(i, 300, 50, 5);
  }

}

// Traffic Light
function keyPressed(){
  if(key === ' '){ // When Space Pressed
    traffic.turnRed();
       
  }

}


// Adding Cars
function mousePressed(){
  if(keyIsDown(SHIFT)){ // For West
    w = new vehicle(random(0,customW), random(customH/2 + 10, 460),2);
    w.speed = 4; // resetting the speed
    westbound.push(w); 
    

  }else{ // For East
    e = new vehicle(random(0,customW), random(100, customH/2 - 40), 0);
    e.speed = 4; 
    eastbound.push(e);
    
    
  }
}


class vehicle {
  //1. Constructor
  constructor(x, y, d) {
    this.x = x; this.y = y;
    this.speed = 4;
    this.d = d; // 0 = East ; 2 = West
    this.type = int(random(0, 2));
    this.c = color(random(255),random(255),random(255));
  }
  
  //2. Function Method
 display() {
    // Cars
    if (this.type === 0){
      fill("black");
      rect(this.x + 1, this.y - 4, 10, 38);
      rect(this.x + 49, this.y - 4, 10, 38);
      fill(this.c);
      rect(this.x, this.y, 60, 30);
    }

    else {
      // Trucks
      // (Eastbound)
      if(this.d === 0){
        fill(this.c);
        rect(this.x, this.y, 65, 40);
        rect(this.x + 65.5, this.y + 3, 30, 34);      
      }
      //(West Bound)
      if(this.d === 2){
        fill(this.c);
        rect(this.x, this.y, -65, 40);
        rect(this.x - 65.5, this.y + 3, -30, 34);
      }

    }
  }
  speedUp(){
    if( this.speed < 15){
      this.speed += 0.05;
    }
  }
  SpeedDown(){
    if(this.speed > 1){
      this.speed -= 0.05;
    }
  }
  changeColor(){
    this.c = color(random(255),random(255),random(255));
  }

  move() {
    // Traffic Light condition
    if(traffic.state === "red"){
      return; // Does nothing, but makes all cars stop
    }
    if (this.d === 0) {
      this.x += this.speed;
      if(this.x > customW){
        this.x = 0;
      }
    }
    else if(this.d === 2){
      this.x -= this.speed;
      if(this.x < 0){
        this.x = customW + 20;
      }
      
    }
  }



// MAIN CALLING FUNCTION     

action(){
  this.display();
  this.move();
  
  // 1% of everything happening
  
  if(random(100) < 1){ // speed up
    this.speedUp();
  }
  if(random(100) < 1){ // speed down
    this.SpeedDown();
  }
  if(random(100) < 1){ // changing color
    this.changeColor();
  }
}
}



class trafficLight{
  //1. constructor
  constructor(x,y){
    this.x = x; this.y = y;
    this.state = "green";
    this.time = 0; 

  }
  //2. Function Method
  display(){
    if(this.state === "green"){
      fill("green");
    }
    else{
      fill("red")// turn's red
    }
    circle(this.x + 25, this.y + 10, 55);


  }
turnRed(){
  if(this.state === "green"){
    this.state = "red";
    this.time = 120; // meaning 2 seconds
  }
}
// Updates every time it occurs
update(){
  if(this.state === "red"){
    this.time --; // timer for traffic
    if(this.time <= 0){
      this.state = "green";
    }
  }
  this.display();
}
}