// Cars! Cars! Cars!
// Syed Saad Hussain
// October 20, 2025

// Global Variables


function setup() {
  createCanvas(900,600);
}

function draw() {
  background(255, 216, 161);
  drawRoad();
}

function drawRoad(){
  fill("black")
  rect(0,100, width, 400 );
  fill("yellow");
  for (i = 0; i < 1000; i = i + 30*2.5){
    rect(i, 300, 50, 10);
  }

}

class vehicle{
  //1. Constructor

}
