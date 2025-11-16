// Puzzel Game
// Syed Saad Hussain
// November 3, 2025



// 0 (Black) 255 (white)

let isSquare = 1; // starts as a cross

// 1 -> cross
// 0 -> square

let grid = [ // this grid holds the square's position and color
  [0,255,0,0,255],
  [0,255,0,0,255],
  [0,255,0,0,255],
  [0,255,0,0,255],
  [0,255,0,0,255],
]

// 5x5 grid
let rows = grid.length;
let cols = grid[0].length;

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

function randomGrid(){ // generates the grid randomly every start of the game
  for(y = 0; y < rows; y++) {
    for(x = 0; x < cols; x++){
      grid[y][x] = random([0,255])
    }
    

  }

}

function flip(x,y){
  //takes a tile @ x,y and inverts its value
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomGrid();
}

function draw() {
  background(200);
  renderGrid();
  
  //for navigation
  Overlay();

  // When all squares
  //turns white or black
  winState();
}


// Overlay 
function Overlay(){
  let x = getCurrentX();
  let y = getCurrentY();
  fill(14,155,134,100);
  // Only one square
  if((isSquare === 0 || isSquare === 1) && keyIsDown(SHIFT)){
    square(x*squareSize,y*squareSize,squareSize);
  }
  // Square
  else if(isSquare === 0){
    square(x*squareSize,y*squareSize,squareSize);
    if(x+1 < cols)square((x+1)*squareSize, y*squareSize, squareSize);
    if(y+1 < rows)square(x*squareSize,(y+1)*squareSize,squareSize);
    if(y+1 < rows && x + 1 < cols)square((x+1)*squareSize,(y+1)*squareSize,squareSize);
  }
  // Cross
  else if(isSquare === 1){
    square(x*squareSize ,y*squareSize,squareSize);
    if(x+1 < cols)square((x+1)*squareSize, y*squareSize, squareSize);
    if(x>= 0)square((x-1)*squareSize,y*squareSize,squareSize);
    if(y+1 < rows)square(x*squareSize,(y+1)*squareSize,squareSize);
    if(y-1 >= 0)square(x*squareSize,(y-1)*squareSize,squareSize);
   }
}

// toggling between square and cross
function keyPressed(){
  if(isSquare === 0 && key === ' '){ // when space is pressed
    isSquare = 1;
  }
  else if(isSquare === 1 && key === ' '){
    isSquare = 0;
  }
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
  if((isSquare === 0 || isSquare === 1) && keyIsDown(SHIFT)){
    flip(x,y);
  }
  //Square
  else if(isSquare === 0){
    if(x < cols)flip(x,y);
    if(x+1)flip(x+1,y);
    if(y+1)flip(x,y+1);
    if(x+1 && y + 1)flip(x+1,y+1);
  }
  //Cross
  else if(isSquare === 1){
    if(x < cols)flip(x,y);
    if(x+1 < cols)flip(x+1,y)
    if(x-1 >= 0)flip(x-1,y);
    if(y+1 < rows)flip(x,y+1);
    if(y -1 >= 0)flip(x,y-1);
  }

}


// Winning state
function winState(){
  
  allWhite = true; // all squares are white
  allBlack = true; // all squares are black
  
  // Checks whether all are white or black
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      if(grid[y][x] !== 255){ // checks if the squares are not white
        // if not, turn false -> do nothing
        allWhite = false; 
      }
      if(grid[y][x] !== 0){ // check if square are not black
        // if not, turn false -> do nothing
        allBlack = false;
      }
    }
  }
  if(allWhite === true || allBlack === true){
    background(0);
    fill("green");
    textSize(78);
    textAlign(CENTER,CENTER);
    text("YOU WIN!", width/2, height/2);
    return;
  }

}