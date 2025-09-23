// Interactive Scene
// Syed Saad Hussain
// September 16, 2025

// This code will have moving elements such as the protagonist
// GLobal Variables
let gl = 425; // ground level
let topl = 275; // height of the mountain 
let xb = 212; // for the boat
let boatspeed = 2; // You can control the speed of the boat here
let bc = "white"; // boat's sail color
let suncolor = "yellow";
let bgcolor;
let xs = 390;
// position of the sun (x coordinate)
let currentback = 0;
//let cx = 275; // Cloud x coordinate 
function setup() {
  createCanvas(540,540);
  bgcolor = color(0, 181, 226);

  
  
}

function draw() {


  
// 0, 181, 226 -> skyblue but brighter
// 1, 51, 63 -> darker

// took some help from chatgpt, (the mapping part)
// let r = map(mouseY, 0, height, 0, 1);
// let g = map(mouseY, 0, height, 181, 51);
// let b = map(mouseY, 0, height, 226, 63);   
colourChanging();

background(bgcolor);
                                  
  
fill("green")

noStroke()
rect(0, gl, 540, 115)
  




sun();
mountains();
lake();
boat();
cloud();

// text for illustrator's name
textSize(20)
fill("black");
text("Syed Saad Hussain", 350, 520)

// Displays the coordinates on the screen
fill("purple")
textSize(16);
text("X: " + mouseX + "  Y: " + mouseY, mouseX + 20, mouseY);



//ALL MOVEMENTS HERE

// Moving the boat right left
if (keyIsDown(RIGHT_ARROW) && (xb + 30) < 540){ // (xb + 30) < 540) --> for restricting the boat from going outside the canvas
  xb += boatspeed;
}
if (keyIsDown(LEFT_ARROW) && xb > 30){
  xb -= boatspeed;  
}
if (keyCode === 67){ // pressing letter c will change the colour
  bc = "orange";
}
if (keyCode === 82){ // press r and it will reset the color
  bc = "white";
}
// Cloud movement
// if (cx < 540 || cx > 0){
//   cx += 0.7
//   //  Makes the cloud go on an repetitive loop
//   if(cx > 570){
//     cx = -60
//     cx += 0.7

//   }

}






function mousePressed(){
  if(mouseButton === CENTER){
    currentback++;
    if(currentback > 3){  // reset when > 3
      currentback = 0;  
    }
  }
}



function colourChanging(){
  // inspect our state variable, and draw 1 and 4 possible 
  //option, depending on the current variable
  switch(currentback){
    case 0:
      bgcolor = color(47, 175, 181); // bright teal
      suncolor = "yellow";
      fill("yellow");
      circle(xs, 75,75);
      break;
    case 1:
       bgcolor = color(111, 196, 200); // light blue
       suncolor = "yellow";
       fill("yellow");
      circle(xs, 75,75);
      break;
    case 2:
      bgcolor = color(53, 116, 119); // dark blue
      suncolor = color(200, 200, 255);
      fill(53, 116, 119);
      circle(xs + 10, 75, 75);
      break;
    case 3:
      bgcolor = color(29, 66, 67); // Night time
      suncolor = color(200, 200, 255);
      fill(29, 66, 67);
      circle(xs + 10, 75, 75);
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
  fill("blue")
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
  circle(mouseX,138,45);
  circle(mouseX + 30,138,45);
  circle(mouseX + 11,126,45);

}

function sun(){
fill(suncolor)
circle(xs,75,75);
}  
  
