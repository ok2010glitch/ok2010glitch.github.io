// Interactive Scene
// Syed Saad Hussain
// September 16, 2025

// This code will have moving elements such as the protagonist
// GLobal Variables
let g = 425; // ground level
let topl = 275; // height of the mountain 
let xb = 212 // for the boat
let boatspeed = 3 // You can control the speed of the boat here
let x = 540
function setup() {
  createCanvas(x,540);
  
  
}

function draw() {
  background("skyblue")
  
  fill("green")

  noStroke()
  rect(0, g, 540, 115)
  textSize(16);

  // Display pwinMouseX.
fill("red")
text(pwinMouseX, 150, 150 );
 // display pwinMouseY.
fill("blue")
text(pwinMouseY, 50, 50);

mountains();
lake();
boat();
if (keyIsDown(RIGHT_ARROW) && x - 30){
  xb += boatspeed;
}
if (keyIsDown(LEFT_ARROW) && x > 30){
  xb -= boatspeed;
}
}
function mountains(){
  fill("grey")
  triangle(-5,g,60,topl,200,g)
  triangle(50,g,160,topl-5,280,g)
  triangle(170,g,240,topl-8,360,g)
}
function lake(){
  fill(85, 171, 199)
  rect(0,g,540,50)
}

function boat(){
  // This is Saad's boat
  fill("brown")
  arc(xb, 410, 60, 40, 0, PI, PIE);
  
  // Mass stick holding th eboat
  rect(xb-2,380, 4,30)
  
  fill("white")
  // sail of the boat
  triangle(xb-26,400,xb,370,xb+26,400)
}
 

  
  

