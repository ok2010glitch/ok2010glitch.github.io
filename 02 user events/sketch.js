// user events + day 1 challenge
// Syed Saad HUssain
// September 11, 2025


// GLOBAL VARIABLES HERE...
// can only work wiht "simple" data in this
// section of the code. No system variables are
// vaiable until in setup(), ... after canvas is made 
 let circleColor =  false;
 let currentColor = "yellow";


let y = 300;
let x;
let tSize = 50;


//  declaration    initialization

function setup() {
  createCanvas(400, 400);
  x = width/2;
  
}

function draw() {
  background(220);
  challenge();  //coordinate system challenge
  rect(x,300,60,30)
  mouseReport();
}
function mouseReport(){
  // inspect some of the built-ins (system variables)
  // for working with the mouse
  fill(0);
  let src = mouseX + ", " + mouseY + ", " + mouseIsPressed;
  textSize(tSize);
  text(src, mouseX, mouseY);



}
function movement(){
  //check for keyborad presses each frame
  // and move the rectangle accordingly
  

  if (keyIsDown(UP_ARROW)) y + 5;
  if (keyIsDown(DOWN_ARROW)) y - 5;
  if (keyIsDown(LEFT_ARROW)) x - 5;
  if (keyIsDown(RIGHT_ARROW)) x + 5;



  
}
movement()






































function keyPressed(){
  // this is special EVENT function, gets
  // automatically called anytime a keyboard
  // button is pressed.




  print("key was pressed");
  if(key == "g") currentcolor = "green";
  else if (keycode === CONTROL) currentColor = "blue";
  circleColor = !circleColor;
  
  // how to tell WHICH key was pressed???

}
keyPressed()

function challenge(){
  // draw 5 hollow circles, in 4 corners and 
  // center position,  50px in diameter each
  noFill();

  if(circleColor){  //circleColor === true
    fill(currentColor);
  }
  //5 circles
  circle(0,0,50); 
  circle(width,0,50);
  circle(0,height,50);
  circle(width,height,50);
  circle(width * 0.5,height * 0.5,50);
}
