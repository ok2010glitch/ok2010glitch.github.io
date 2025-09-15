// Project Title
// Saad Hussian
// September 15, 2025

//key KeyCode -> return boolean

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  checkMUlti();

}

function checkMUlti(){
  strokeWeight(mouseX / 10);
  stroke(255,255,255);
  
  // check for multipl keypresses (3 simultaneous)
  let a = keyIsDown(65);
  let b = keyIsDown(66);
  let c = keyIsDown(67);
  textSize(40);
  text("a:"+ a + "\tb:" + b + "\tc:" + c, 100, 300);


}