// Perlin Noise Assignment
// Saad Hussain
// September 29, 2025

// Global Variables
let rectWidth = 1;
let time;
let noiseStart = 1; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  //for now, generate the terrain once
  generateTerrain();
  rectMode(CORNERS);
  
}

function draw() {
  background(220);
  time = noiseStart; // Reset time for consistent terrain
  generateTerrain();
  noiseStart += 0.01 // Pan the terrain

// Changing the width of the terrain
  if(keyIsDown(RIGHT_ARROW)){
    rectWidth = rectWidth + 0.01;
     if(rectWidth === 20){
       rectWidth = 20;

    }
  }
  
  else if(keyIsDown(LEFT_ARROW)){
    rectWidth = rectWidth - 0.01;
     if(rectWidth === 0.05){
       rectWidth = 0.05;

    }
  }
}
  

function generateTerrain() {
  let HighestY = height;
  let HighestX = 0;
  let totalHeight = 0 // all rectangles total height
  let rectn = 0 // number of rectangle in the canvas
  let rectHeight;
  
  
  
  for (let x = 0; x < width; x += rectWidth) {
    let noiseVal = noise(time);
    rectHeight = map(noiseVal, 0, 1, 0.2, height*0.9);
    rectHeight = map(noiseVal, 0, 1, 0, height * 0.9);

    let x2 = x + rectWidth;
    let y2 = height - rectHeight;



    fill("black");

    rect(x, height, x2, y2);
    
    time += 0.001// incrementing the noise creating smoother terrain
    

    // for average
    totalHeight += rectHeight;
    rectn ++;
    
  if(y2 < HighestY){ // find the highest point of the rectangle
    HighestY = y2;
    HighestX = x2; 
    
  }
}


  let avgHeight = totalHeight /rectn; // dividing the total height of all rects by the total number
  let avgY = height - avgHeight;
  strokeWeight(5);
  stroke("red");
  line(0, avgY, width, avgY);

  // color for flag
  stroke("black");
  drawflag(HighestX, HighestY);
  
}


function drawflag(x, y){
  // flag pole
  strokeWeight(10);
  fill("black");
  line(x, y, x, y-50);

  // flag
  fill("red");
  triangle(x,y-50,x, y-75, x + 20, y-63.5);
}
