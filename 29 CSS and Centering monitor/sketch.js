// 29 CSS and centering monitoring
// Syed Saad Hussain
// December 5, 2025
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(1360, 800, WEBGL);
}

function draw() {
  background(0);
  orbitControl();
  lights();
  angle = map(mouseX,0,width,-120,120);

  fill(100,255,100);
  for(let i = 0; i< 360; i+=45){
    push();
    rotateY(radians(i));
    drawBox(100);
    pop();
  }
  drawBox(100);
}

let angle = 10;
function drawBox(size){
  if(size > 3){

    rotateZ(radians(angle));

    translate(size * 1.5, 0);
    box(size);

    drawBox(size * 0.8);
  }
}
