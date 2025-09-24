// Interactive Scene
// Syed Saad Hussain
// September 16, 2025

// This code will have moving elements such as the protagonist
// GLobal Variables
let gl = 425; // ground level
let topl = 275; // height of the mountain 
let xb = 212; // for the boat
let boatspeed = 2.5; // You can control the speed of the boat here
let suncolor = "yellow";
let bgcolor;
let xs = 390; // x coordinate of the sun


// position of the sun (x coordinate)
let currentback = 0;
let iscrescent = false;
//let cx = 275; // Cloud x coordinate 
function setup() {
  createCanvas(540,540);
  bgcolor = color(0, 181, 226);

  
  
}

function draw() {


colourChanging();

background(bgcolor);
                                  
  
fill("green");
noStroke();
rect(0, gl, 540, 115);
  

// All natural elements
sun();
mountains();
lake();
boat();
// crescent
if(iscrescent === true){ // checks whether it's true or false according ot the background
  fill(17, 18, 1);
  circle(xs + 5, 75, 75);
} else{
  iscrescent = false;
}

if(currentback === 2){
  // checks if the current back value is 2
  // waxing crescent
  fill(26, 33, 54);
  circle(xs + 20, 75, 75);
}

cloud();


// text for illustrator's name
textSize(20);
fill("black");
text("Syed Saad Hussain", 350, 520)

// Displays the coordinates on the screen
// fill("purple")
// textSize(16);
// text("X: " + mouseX + "  Y: " + mouseY, mouseX + 20, mouseY);



//ALL MOVEMENTS HERE

// Moving the boat right left
if (keyIsDown(RIGHT_ARROW) && (xb + 30) < 540){ // (xb + 30) < 540) --> for restricting the boat from going outside the canvas
  xb += boatspeed;
}
if (keyIsDown(LEFT_ARROW) && xb > 30){
  xb -= boatspeed;  
}

}






function mousePressed(){
  if(mouseButton === CENTER){
    currentback++;
    // infinite loop 
    if(currentback > 3){  // reset when > 3
      currentback = 0;  
    }
  }
}

// CURRENT BACK FOR BACKGROUND
function colourChanging(){
  // inspect our state variable, and draw 1 and 4 possible 
  //option, depending on the current variable
  switch(currentback){ 
    case 0:
      bgcolor = color(47, 175, 181); // bright teal
      suncolor = "yellow";
      iscrescent = false;
      break;
    case 1:
       bgcolor = color(111, 196, 200); // light blue
       suncolor = "yellow";
       iscrescent = false;
      break;
    case 2:
      bgcolor = color(26, 33, 54); // dark blue
      suncolor = color(200, 200, 255);
      iscrescent = false;
      break;
    case 3:
      bgcolor = color(17, 18, 17); // Night time
      suncolor = color(200, 200, 255);
      iscrescent = true;
      break;
    default:
      bgcolor = color(0, 181, 226);
      break;
}
}



function mountains(){
  fill("grey")
  triangle(-5,gl,60,topl,200,gl)
  triangle(50,gl,160,topl-5,280,gl)
  triangle(170,gl,240,topl-8,360,gl)
}



function lake(){
  fill("blue");
  rect(0,gl,540,50);
}

function boat(){
  // Boat's body
  fill(112, 96, 74);
  arc(xb, 410, 60, 40, 0, PI, PIE);
  
  // Mass stick holding the eboat
  rect(xb-2,380, 4,30);
  
  // sail of the boat
   fill("white");
   triangle(xb-26,400,xb,370,xb+26,400);
}
 
function cloud(){
  fill("white")
  circle(mouseX,138,45); // mouseX is for the movement of the cloud
  circle(mouseX + 30,138,45);
  circle(mouseX + 11,126,45);

}

function sun(){
fill(suncolor);
circle(xs,75,75);
}  
  
