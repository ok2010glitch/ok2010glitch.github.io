// Interactive Scene
// Syed Saad Hussain
// September 16, 2025
//
// This code will have moving elements such as the protagonist



// - describe what you did to take this project "above and beyond"
let c1,c2;
let n = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  c1 = color("orange")
  c2 = color("yellow")
  
}

function draw() {
   
  let lerpedColor = lerpColor(c1, c2, n);// Chatgpt
  // new term learned in js lerpcolor

  fill(lerpedColor);
  background(lerpedColor);

  
  
  }
