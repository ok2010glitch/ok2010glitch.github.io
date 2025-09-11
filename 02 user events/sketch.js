// user events + day 1 challenge
// Syed Saad HUssain
// September 11, 2025


// global variables here..
 let circlecolor = false;
 // declaration     initialization


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  challenge();  //coordinats system challengea



  
}

function Keypressed(){
  // this is spcial EVENt function, gets
  // automatically called anytime a keyword
  // button is pressed
  print("key was pressed");
  circle =!circlecolor;

  // how to tell which key was pressed
}
function challenge(){
  // draw 5 hollow circles, in 4 corners and
  // center positin, 50 px in diameter each
  nofill();

  if(cicrlecolor == true){ //circlecolor === true
    fill(255,0,0)
  }

  //5 circles
  circle(0,0,50);
  circle(width,0,50);
  circle(0,height,50);
  circle(width,height,50);
  circle(width * 0.5, height * 0.5,50);
}
