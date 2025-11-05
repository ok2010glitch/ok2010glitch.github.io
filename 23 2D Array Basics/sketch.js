// 2D Array Basics
// Syed Saad Hussain
// November 3, 2025

// 0 (Black) 255 (white)

let pattern;
pattern = [0,255];

let grid = [[],[]];

let rows;
let cols; 

let squareSize = 60;


function getCurrentX(){
  //determine current col of mouse postition
  let constrainedX = constrain(mouseX, 0, width - 1);
  return floor(constrainedX / squareSize);

}

function getCurrentY(){
  //determine current row of mouse postition
  let constrainedY = constrain(mouseY, 0, height - 1);
  return floor(constrainedY / squareSize);

}


function flip(x,y){
  //takes a tile @ x,y and inverts its value
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}
function setup() {
  createCanvas(windowWidth, windowHeight)
  grid = [
    [random(pattern), random(pattern), random(pattern), random(pattern),random(pattern)],
    [random(pattern), random(pattern), random(pattern), random(pattern),random(pattern)],
    [random(pattern), random(pattern), random(pattern), random(pattern),random(pattern)],
    [random(pattern), random(pattern), random(pattern), random(pattern),random(pattern)],
    [random(pattern), random(pattern), random(pattern), random(pattern),random(pattern)]
  
  ];
  rows = grid.length;
  cols = grid[0].length;
}

function draw() {
  background(200);
  renderGrid();
  Overlay();
  print(getCurrentX(), getCurrentY());

}
function Overlay(){
  let x = getCurrentX();
  let y = getCurrentY();
  fill(255,0,0,100);
  square(x*squareSize ,y*squareSize,squareSize);
  
  
  
}
function renderGrid(){
  // interpret the information in the 2D array
  // a grid of square on the screen to reflect it.
  for(let y = 0; y < rows; y ++){
    for(let x = 0; x < cols; x++){;
    let fillColor = grid[y][x];
    fill(fillColor)
    square(x*squareSize, y*squareSize, squareSize);
    
  }
}
}

function mousePressed(){
  // flip current title
  // upgrade: only do this if the mouse is on the canvas

  let x = getCurrentX();
  let y = getCurrentY();

  //ALWAYS: flip the "focused title"
  if(keyIsDown(SHIFT)){
    flip(x,y);

  }
  else{
    if(x < cols)flip(x,y);
    if(x+1 < cols)flip(x+1,y)
    if(x-1 >= 0)flip(x-1,y);
    if(y+1 < rows)flip(x,y+1);
    if(y -1 >= 0)flip(x,y-1);
  }

  //IF THEY EXIST:
  //fli our NSEW neighbours (cross pattern)
  

}