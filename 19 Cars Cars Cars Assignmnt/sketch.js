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
<<<<<<< HEAD
    e = new vehicle(random(0,customW), random(100, customH/2 - 40), 0);
    eastbound.push(e);

    w = new vehicle(random(0,customW), random(customH/2 + 10, 460),2);
    westbound.push(w);
  }
  traffic = new trafficLight(500,50)

=======
    e = new vehicle(random(0,customW), random(customH - 495, customH/2 - 40), 0);
    eastbound.push(e);

    w = new vehicle(random(0,customW), random(customH/2 + 5, customH - 160),2);
    westbound.push(w);
  }
  traffic = new trafficLight(500,50)
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
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

<<<<<<< HEAD
=======

>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
// Road
function drawRoad() {
  fill("grey")
  rect(0, customH - 500, width, 400);
  fill("white");
  for (i = 0; i < 1000; i = i + 30 * 2.5) { // division lines of the road
    rect(i, customH - 300, 50, 5);
  }

}

<<<<<<< HEAD
// Traffic Light
function keyPressed(){
  if(key === ' '){ // When Space Pressed
=======
// Toggle Trafic Light controls
function keyPressed(){
  if(key === ' '){ // When space is pressed
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
    traffic.turnRed();
       
  }

}

<<<<<<< HEAD

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
    
=======
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
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
    
  }
}

// Trucks and Cars
class vehicle {
  //1. Constructor
  constructor(x, y, d) {
    this.x = x; this.y = y;
    this.speed = 4;
<<<<<<< HEAD
    this.d = d; // 0 = East ; 2 = West
    this.type = int(random(0, 2));
=======
    this.d = d;
    this.type = int(random(0, 2)); // chooses randomly between cars
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
    this.c = color(random(255),random(255),random(255));
  }
  
  //2. Function Method
<<<<<<< HEAD
 display() {
    // Cars
=======

  display() {
    /// cars
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
    if (this.type === 0){
      fill("black");
      rect(this.x + 1, this.y - 4, 10, 38);
      rect(this.x + 49, this.y - 4, 10, 38);
      fill(this.c);
      rect(this.x, this.y, 60, 30);
    }
    // Trucks
    else {
<<<<<<< HEAD
      // Trucks
      // (Eastbound)
      if(this.d === 0){
=======
      // Eastbound
      if(this.d === 0){ 
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
        fill(this.c);
        rect(this.x, this.y, 65, 40);
        rect(this.x + 65.5, this.y + 3, 30, 34);      
      }
<<<<<<< HEAD
      //(West Bound)
=======
      //West Bound
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
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



<<<<<<< HEAD
// MAIN CALLING FUNCTION     

=======
// Main Calling Function     
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
action(){
  this.display();
  // For moving in an opposite direction
  this.move();
<<<<<<< HEAD
  
  // 1% of everything happening
  
  if(random(100) < 1){ // speed up
=======
  // One precent chnace everything occring
  if(random(100) < 1){
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
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

<<<<<<< HEAD


=======
// Traffic Light
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
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
<<<<<<< HEAD
    circle(this.x + 25, this.y + 10, 55);
=======
    circle(this.x + 25, this.y + 10, 45) // Traffic light's circle
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc


  }
// when space is pressed
turnRed(){
  if(this.state === "green"){
    this.state = "red";
    this.time = 120; // meaning 2 seconds
  }
}
<<<<<<< HEAD
// Updates every time it occurs
=======
// updates every time
>>>>>>> 6b9d8b468491db0678aeb3f53a3579139f34d5fc
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