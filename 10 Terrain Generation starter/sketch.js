// Starter Code for our
// Terrain GEneration
// Saad Hussain
// September 29, 2025

// Global Variables
let rectWidth = 1;
let time;
let noiseStart = 3;
let noiseSpeed = 0.001;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //for now, generate the terrain once
  generateTerrain();
  rectMode(CORNERS);
  
}

function draw() {
  background(220); // Clear canvas each frame
  time = noiseStart; // Reset time for consistent terrain
  generateTerrain();
  noiseStart += 0.01 // Pan the terrain

// CHanging the width of the terrain
  if(keyIsDown(RIGHT_ARROW)){
    rectWidth = rectWidth + 0.01;
    // if(rectWidth === 20){
    //   rectWidth = 20

    }
  
  else if(keyIsDown(LEFT_ARROW)){
    rectWidth = rectWidth - 0.01;
    // if(rectWidth === 0.05){
    //   rectWidth = 0.05

    }
  
  

  }

function generateTerrain() {
  let HighestY = height;
  let HighestX = -1;
  let totalHeight = 0 // all rectangles total height
  let rectn = 0
  let rectHeight;
  
  
  
  for (let x = 0; x < width; x += rectWidth) {
    let noiseVal = noise(time);
    rectHeight = map(noiseVal, 0, 1, 0.2, height*0.9);
    rectHeight = map(noiseVal, 0, 1, 0, height * 0.9);

    let x2 = x + rectWidth;
    let y2 = height - rectHeight;



    
    

    fill("black");

    rect(x, height, x2, y2);
    time += noiseSpeed;
    

   
    
  
    // for average
    totalHeight += rectHeight;
    rectn ++;
    


  
  if(y2 < HighestY){
    HighestY = y2;
    HighestX = x2 // middle of the rectangle
    
  }
}


  
  let avgHeight = totalHeight /rectn; // dividing the total height of all rects by the total number
  let avgY = height - avgHeight;
  strokeWeight(10);
  stroke("red");
  line(0, avgY, width, avgY);

  stroke("black");
  
  drawflag(HighestX, HighestY);
  
}


function drawflag(x, y){
  // flag pole
  strokeWeight(2);
  fill("black");
  line(x, y, x, y-25);

  // flag
  fill("red");
  triangle(x,y-25,x, y-50, x + 20, y-35);
  
  


}
