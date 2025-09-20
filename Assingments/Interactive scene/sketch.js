// Interactive Scene
// Syed Saad Hussain
// September 16, 2025

// This code will have moving elements such as the protagonist
// GLobal Variables
let gl = 425; // ground level
let topl = 275; // height of the mountain 
let xb = 212 // for the boat
let boatspeed = 2 // You can control the speed of the boat here
let showobject = true;
let bc = "white" // boat's sail color
let suncolor = "yellow"
function setup() {
  createCanvas(540,540);
  
  
}

function draw() {
  
   // 0, 181, 226 -> skyblue but brighter
   // 1, 51, 63 -> darker

  // took some help from chatgpt, the mapping part
  let r = map(mouseY, 0, height, 0, 1);
  let g = map(mouseY, 0, height, 181, 51);
  let b = map(mouseY, 0, height, 226, 63);   
  
  background(r,g,b);
                                  
  
  fill("green")

  noStroke()
  rect(0, gl, 540, 115)
  textSize(16);

// Displays the x coordinate
fill("red")
text(pwinMouseX, 150, 150 );
// displays the y coordinate
fill("blue")
text(pwinMouseY, 50, 50);

sun();
mountains();
lake();
boat();
cloud();




if (mouseY < gl){
  suncolor = "yellow";
} else{
  suncolor = color(246, 241, 213);

}

// Moving the boat right left
if (keyIsDown(RIGHT_ARROW) && (xb + 30) < 540){ // (xb + 30) < 540) --> for restricting the boat from going outside the canvas
  xb += boatspeed;
}
if (keyIsDown(LEFT_ARROW) && xb > 30){
  xb -= boatspeed;
}
if (keyCode === 67){ // pressing letter c will change the colour
  bc = "orange"
}
if (keyCode === 82){ // press r and it will reset the color
  bc = "white"
}



}






function mountains(){
  fill("grey")
  triangle(-5,gl,60,topl,200,gl)
  triangle(50,gl,160,topl-5,280,gl)
  triangle(170,gl,240,topl-8,360,gl)
}
function lake(){
  fill(85, 171, 199)
  rect(0,gl,540,50)
}

function boat(){
  fill(112, 96, 74)
  arc(xb, 410, 60, 40, 0, PI, PIE);
  
  // Mass stick holding the eboat
  rect(xb-2,380, 4,30)
  
  fill(bc)
  // sail of the boat
  triangle(xb-26,400,xb,370,xb+26,400)
}
 

function cloud(){
  fill("white")
  circle(275,138,45);
  circle(305,138,45);
  circle(286,126,45);

}
function sun(){
fill(suncolor)
circle(390,75,75);
}  
  

