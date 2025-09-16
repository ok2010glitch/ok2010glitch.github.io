// Excercise
// Saad HUssain
// September 15, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let cenx;
let ceny;

function setup() {
  createCanvas(1500, 800);
   cenx = width/2;
   ceny = height /2;
}

function draw() {
  background(220);
  drawAlien();
  if(keyIsDown(RIGHT_ARROW)){
    cenx += 5
  }
  else if(keyIsDown(LEFT_ARROW)){
    cenx -= 5
  }




}

function drawAlien(){
  //circle(cenx,ceny,100,);
  noStroke();
  fill("green");
  rect(cenx, ceny, 100, 100, 50, 50, 0, 0);
  rect(cenx+ 90, ceny+100, 10, 40)
  rect(cenx, ceny+100, 10, 40);
  fill("black");
  circle(cenx + 30,ceny + 50, 10);
  circle(cenx + 60,ceny + 50, 10);
  rect(cenx+30, ceny+70, 30, 5, )
}