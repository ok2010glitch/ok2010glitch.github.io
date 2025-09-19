// Interactive Scene
// Syed Saad Hussain
// September 16, 2025

// This code will have moving elements such as the protagonist
// GLobal Variables
let g = 425; // ground level
let topl = 275; // height of the mountain 
let xb = 212 // for the boat
let boatspeed = 2 // You can control the speed of the boat here
let showobject = true;
function setup() {
  createCanvas(540,540);
  
  
}

function draw() {
  background("skyblue")
  
  fill("green")

  noStroke()
  rect(0, g, 540, 115)
  textSize(16);

// Displays the x coordinate
fill("red")
text(pwinMouseX, 150, 150 );
// displays the y coordinate
fill("blue")
text(pwinMouseY, 50, 50);


mountains();
lake();
boat();
cloud();



// Sun
fill(255, 196, 0)
circle(390,75,75);


// Moving the boat right left
if (keyIsDown(RIGHT_ARROW) && (xb + 30) < 540){ // (xb + 30) < 540) --> for restricting the boat from going outside the canvas
  xb += boatspeed;
}
if (keyIsDown(LEFT_ARROW) && xb > 30){
  xb -= boatspeed;
}

if(showobject){
  cloud();
  somethingpressed()
}
if (keyIsDown(65)){
  
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
  fill(112, 96, 74)
  arc(xb, 410, 60, 40, 0, PI, PIE);
  
  // Mass stick holding the eboat
  rect(xb-2,380, 4,30)
  
  fill("white")
  // sail of the boat
  triangle(xb-26,400,xb,370,xb+26,400)
}
 

function cloud(){
  fill("white")
  circle(275,138,45);
  circle(305,138,45);
  circle(286,126,45);

}
  
  

