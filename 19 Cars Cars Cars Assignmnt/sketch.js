// Cars! Cars! Cars!
// Syed Saad Hussain
// October 20, 2025

// Global Variables
let e;
let w;
let customW = 900;
let customH = 600;

let westbound = [];
let eastbound = [];


function setup() {
  createCanvas(customW, customH);


  for (i = 0; i < 20; i++) {

    e = new vehicle(customW / 2, random(100, 270), 0);
    eastbound.push(e);

    w = new vehicle(customW/2, random(customH/2 + 5, 465),2);
    westbound.push(w);

  }
}

function draw() {
  randomSeed(1);
  background(255, 216, 161);
  drawRoad();
  for(let e of eastbound){
   e.display();
   e.move(); 
  }
  for(let w of westbound){
    w.display();
    w.move();


  }
  

}

function drawRoad() {
  fill("grey")
  rect(0, 100, width, 400);
  fill("white");
  for (i = 0; i < 1000; i = i + 30 * 2.5) {
    rect(i, 300, 50, 5);
  }

}

class vehicle {
  //1. Constructor
  constructor(x, y, d) {
    this.x = x; this.y = y;
    this.c = color(random(255),random(255),random(255));
    this.speed = random(1, 5);
    this.d = d
    this.type = int(random(0, 2));
  }
  //methods
  display() {

    if (this.type === 1) {
      fill("black");
      rect(this.x + 1, this.y - 4, 10, 38);
      rect(this.x + 49, this.y - 4, 10, 38);
      fill(this.c);
      rect(this.x, this.y, 60, 30);

    }
    // else if(this.type === 5){
    //   rect(this.x, this.y, -65, 40);
    //   rect(this.x - 65.5, this.y + 3, -30, 34)

    // }
    else{
    if(this.d === 0){
      fill(this.c);
      rect(this.x, this.y, 65, 40);
      rect(this.x + 65.5, this.y + 3, 30, 34);      
    }
    if(this.d === 2){
      rect(this.x, this.y, -65, 40);
      rect(this.x - 65.5, this.y + 3, -30, 34);
    }
  }
}
  move() {
    if (this.d === 0) {
      this.x += this.speed;
      if(this.x > customW){
        this.x = 0;
      }
    }
    else if(this.d === 2){
      this.x -= this.speed;
      if(this.x < 0){
        this.x = customW + 15;
      }
    }
  }
}
