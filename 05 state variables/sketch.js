// State Variables and Real Time
// Syed Saad HUssain
// 18 September 2025
//
// Global Variables
let shapestate = 0; //0-circle 1-square 2-Trinagle 3-Transistion
let startTime, elapsedTime;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // targeting 60 fps
  background(220);

  drawshape();
  //print("frame: " + frameCount)
  manageTimer();


}

function manageTimer(){
  //print(millis());
  elapsedTime = millis()
  text(elapsedTime/1000, width*0.3, height*0.75);

}
function keyPressed(){
  // auctomatically called on any keyboard button press
  // state var: 0 -> 1    1-> 2
  //            2 -> 3   (for 2 seconds) -> 0
  if (shapestate < 3){
    shapestate++;
    if(shapestate===3){
      startTime
    }

  }

}



function drawshape(){
  // inspect our state variable, and draw 1 and 4 possible 
  //option, depending on the current variable
  switch(shapestate){
    case 0:
      circle(width/2, height/2, 150);
      break;
    case 1:
      square(width/2,height/2,150);
      break;
    case 2:
      let x = width/2; let y = height/2;
      triangle(x-50, y+50, x+50, y+50, x, y-25);
      break;
    case 3:
      for(let i = 0; i < 20; i++){
        let x = random(width*0.4, width*0.6);
        let y = random(width*0.4, width*0.6);
        line(x,y, x+ 25, y);
      }
  }
  }

