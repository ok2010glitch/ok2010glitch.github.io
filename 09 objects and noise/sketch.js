// objects an noises
// Syed Saad Hussain
// 26 september 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// let ball;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   ball = { //object noatation. Inside the bracket
//            //set up a bunch of
//            //property: value   pairs
//   x: 300, y:400, size: 20,
//   c: color(random(255),random(255),random(255)),
//   timeX: random(100), timeY: random(100),
//   timeOff: 0.02
//   };
// }

// function draw() {
//   //background(220);
//   moveBall(ball);

// }

// function moveBall(b){
//   //b -> Ball typpe object
//   // update position and draw provided ball

//   // generate random:
//   let dx = noise(b.timeX); //0-1
//   dx = map(dx, 0, 1, -5, 5);
//   let dy = noise(b.timeY);
//   dy = map(dy, 0, 1, -5, 5);


//   // advance our noise graph "cursors"
//   b.timeX += b.timeOff; b.timeY += b.timeOff;
//   b.x += dx;  b.y += dy;

//   //render the circle
//   fill(b.c);
//   circle(b.x, b.y, b.size);
// }

let planeX = 0;
let planeY;

function setup() {
  createCanvas(600, 400);
  planeY = height / 2;
}

function draw() {
  background(135, 206, 235); // Sky blue background
  
  // Draw the plane as a simple triangle
  fill(255, 0, 0);
  noStroke();
  // Draw the plane at (planeX, planeY)
  triangle(planeX, planeY, planeX - 40, planeY + 15, planeX - 40, planeY - 15);
  
  // Move the plane to the right
  planeX += 3;
  
  // Reset position to left when it goes off screen
  if (planeX > width + 40) {
    planeX = -40;
  }
}