// Starter Code for our
// Terrain GEneration
// Saad Hussain
// September 29, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let rectWidth = 0.5;
let noiseStart = 1;
let noiseSpeed = 0.002;
let time;
let avgh;




function setup() {
  createCanvas(windowWidth, windowHeight);
  //for now, generate the terrain once
  generateTerrain();
  rectMode(CORNERS);
  
}
function draw() {
  time = noiseStart;
  
  // don't need to use draw UNTIL
  // animating the terrain (panning)
  noiseStart += 0.01;
  background(220);
  generateTerrain();
  
  if(keyIsDown (RIGHT_ARROW) ){
    rectWidth += 0.01
    if(rectWidth === 20){
      rectWidth = 20;
    }
    
    }
  else if(keyIsDown (LEFT_ARROW) ){
    rectWidth -= 0.01
    if(rectWidth === 0.05)
       rectWidth = 0.05;
    
    }
}

function generateTerrain(){

  let HighestY = height;
  let HighestX = 0;
  
  

  // Use a loop to generate and draw several
  // rectangles side to side to look like 2D 
  // terrain.
  

  for(let x = 0; x < width; x+=rectWidth){
    // generate a random height.
    // NOTE!! change this from random() to noise()
    let noiseVal = noise(time);
    let rectHeight = map(noiseVal, 0, 1, 0.2, height*0.9);

    // calculate the upper-right corner of rect
    let x2 = x + rectWidth;
    let y2 = height - rectHeight;

    if(y2 < HighestY){
      HighestY = y2;
      HighestX = x2;
    }

    
    

    fill("black");


    rect(x, height, x2, y2);

    time += noiseSpeed;
    
  

  }
  

  drawflag(HighestX, HighestY);


  
}

function drawflag(x, y){

  //flag pole

  strokeWeight(3);
  fill("black");
  line(x, y, x, y-50)
  // circle on flagpole
  fill("red")
  circle(x, y-50, 25)

}

function KeyPressed(){
  if(keyCode === RIGHT_ARROW ){
    rectWidth += 0.05
    
    }
  }

function calcAvg(){

  
}