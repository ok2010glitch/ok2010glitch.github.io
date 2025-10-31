// Cars! Cars! Cars!
// Syed Saad Hussain
// October 20, 2025

// Global Variables
let e;
let w;
let traffic;

let customW = 900; //my custom width for canvas
let customH = 600;// my custom height for canvas

let westbound = [];
let eastbound = [];

function setup() {
  createCanvas(customW, customH);
  for (i = 0; i < 20; i++) { // Intially cars start with 20
    e = new vehicle(random(0,customW), random(customH - 495, customH/2 - 40), 0);
    eastbound.push(e);

    w = new vehicle(random(0,customW), random(customH/2 + 5, customH - 160),2);
    westbound.push(w);
  }
  traffic = new trafficLight(500,50)
}


function draw() {
  noStroke();
  //randomSeed(1);
  background(255, 216, 161);
  drawRoad();
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
  rect(0, customH - 500, width, 400);
  fill("white");
  for (i = 0; i < 1000; i = i + 30 * 2.5) { // division lines of the road
    rect(i, customH - 300, 50, 5);
  }

}

// Toggle Trafic Light controls
function keyPressed(){
  if(key === ' '){ // When space is pressed
    traffic.turnRed();
       
  }

}

// Adding Cars
function mousePressed(){
  // add cars for westbound
  if(keyIsDown(SHIFT)){ 
    w = new vehicle(random(0,customW), random(customH/2 + 5, 460),2);
    w.speed = 4; // resetting the speed after every stop
    westbound.push(w);
  }
  // adding cars for eastbound
  else{ 
    e = new vehicle(random(0,customW), random(95, customH/2 - 40), 0);
    e.speed = 4; // resetting the speed
    eastbound.push(e);
    
  }
}

// Trucks and Cars
class vehicle {
  //1. Constructor
  constructor(x, y, d) {
    this.x = x; this.y = y;
    this.speed = 4;
    this.d = d;
    this.type = int(random(0, 2)); // chooses randomly between cars
    this.c = color(random(255),random(255),random(255));
  }
  //2. Function Method

  display() {
    /// cars
    if (this.type === 0){
      fill("black");
      rect(this.x + 1, this.y - 4, 10, 38);
      rect(this.x + 49, this.y - 4, 10, 38);
      fill(this.c);
      rect(this.x, this.y, 60, 30);
    }
    // Trucks
    else {
      // Eastbound
      if(this.d === 0){ 
        fill(this.c);
        rect(this.x, this.y, 65, 40);
        rect(this.x + 65.5, this.y + 3, 30, 34);      
      }
      //West Bound
      if(this.d === 2){
        fill(this.c);
        rect(this.x, this.y, -65, 40);
        rect(this.x - 65.5, this.y + 3, -30, 34);
      }

    }
  }
  // Speed Up
  speedUp(){
    if( this.speed < 15){
      this.speed += 0.05;
    }
  }
  // Speed Down
  SpeedDown(){
    if(this.speed > 1){
      this.speed -= 0.05;
    }
  }
  changeColor(){
    this.c = color(random(255),random(255),random(255));
  }

  move() {
    if(traffic.state === "red"){
      return;
    }
    if (this.d === 0) {
      this.x += this.speed;
      if(this.x > customW){
        this.x = 0
      }
    }
    else if(this.d === 2){
      this.x -= this.speed;
      if(this.x < 0){
        this.x = customW + 20
      }
      
    }
  }



// Main Calling Function     
action(){
  this.display();
  // For moving in an opposite direction
  this.move();
  // One precent chnace everything occring
  if(random(100) < 1){
    this.speedUp();
  }
  if(random(100) < 1){
    this.SpeedDown();
  }
  if(random(100) < 1){
    this.changeColor();
  }
}
}

// Traffic Light
class trafficLight{
  //1. constructor
  constructor(x,y){
    this.x = x; this.y = y;
    this.state = "green"
    this.time = 0; 

  }

  display(){
    if(this.state === "green"){
      fill("green");
    }
    else{
      fill("red")
    }
    circle(this.x + 25, this.y + 10, 45) // Traffic light's circle


  }
// when space is pressed
turnRed(){
  if(this.state === "green"){
    this.state = "red";
    this.time = 120; // meaning 2 seconds
  }
}
// updates every time
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