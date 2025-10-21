// Cars! Cars! Cars!
// Syed Saad Hussain
// October 20, 2025

// Global Variables
 let myVehicle;
 let customW = 900;
 let customH = 600;

 let westbound = [];
 let eastbound = [];


function setup() {
  createCanvas(customW, customH);

}

function draw() {
  background(255, 216, 161);
  drawRoad();
  myVehicle = new vehicle(customW/2, customH/2);
  myVehicle.cars();
  myVehicle.trucks();
}

function drawRoad(){
  fill("black")
  rect(0,100, width, 400 );
  fill("white");
  for (i = 0; i < 1000; i = i + 30*2.5){
    rect(i, 300, 50, 5);
  }

}

class vehicle{
  //1. Constructor
  constructor(x,y){
    this.x = x; this.y = y;
    this.c = color(random(255));
    this.speed = random(1,5);


  }
  //methods
  cars(){
    fill("white");
    rect(this.x + 1, this.y - 4, 10, 38 );
    rect(this.x + 49, this.y - 4, 10, 38 );
    fill("red");
    rect(this.x, this.y, 60, 30 );
    
    
  }
  trucks(){
    fill("purple");
    rect(this.x, this.y,65,40 );
    rect(this.x + 65.5, this.y +3, 34, 32)



  }
  
  display(){

  }

}
