// Working with images
// and random() and noise()
// Saad
// Sep 24, 2025
//

let x1, y1, x2, y2;
let d1, d2;
let noiseTime = 5, noiseSpeed = 0.1;
// "noiseSpeed" controls how connected
// our random noise() values are:
let minSize = 5; 
let maxSize = 200;

let mX, mY; //move x and y

function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = width*0.3; y1 = height*0.3;
  x2 = width*0.7; y2 = height*0.5;
  mY = height*0.3;
  frameRate(1000);

}

function draw() {
  background(220);
  randomCircle();
  noiseCircle();
}

function noiseMove(){
  //use random noise to set the postion of a third circle
  x2 = noise(noiseTIme)
}

function noiseCircle(){
  // draw a fixed circle with randoml
  // changing (but smooth, hopefully!) diameters
  d2 = noise(noiseTime); //yields value between 0-1
  d2 = map(d2, 0,1, minSize, maxSize);
  fill(255,50,150);
  circle(x2, y2, d2);
  noiseTime += noiseSpeed;
}
function randomCircle(){
  //draw a fixed circle with randomly changing diameter
  fill(50, 205, 50);
  d1 = random(5,100);
  circle(x1, y1, d1);
}