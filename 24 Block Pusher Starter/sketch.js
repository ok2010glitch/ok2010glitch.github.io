// Block PUsher Starter
// Syed Saad Hussain
// November 7, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

tiles = []; //0->grass   1->chicken 2->cow  3->star
let level = [
  [0,1,0,3,0],
  [1,0,0,1,0],
  [0,1,1,0,0],
  [0,1,0,0,0],
  [0,0,1,0,0]
];

let playerX = 3;  let playerY = 4;
let rows = level.length;
let cols = level[0].length;
let tile_size = 100;

function setup() {
  createCanvas(tile_size*cols, tile_size*rows);
  loadAssets();
  level[playerY][playerX] = 2;

}

async function loadAssets() {
  //load our four (or more) tile images
  for(let i = 0; i < 4; i++){
    tiles.push(await loadImage("assets/"+i+".png"));

  }
  
}

function draw() {
  renderBoard();
}

function renderBoard(){
  //interpre the data in our 2D array, place
  // images on the canvas.
  for(let x = 0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      let imgIndex = level[y][x];
      let currentImage = tiles[imgIndex];
      image(currentImage, x*tile_size, y*tile_size);
    }
  }
}

function swap(x1,y1,x2,y2){
  //modify th gameboard, switch 2 times
  let temp = level[y1][x1];
  level[y1][x1] = level[y2][x2];
  level[y2][x2] = temp;
}

function keyPressed(){
  // enact a single action per keypress
  if(keyCode === LEFT_ARROW){
    if(playerX > 0){
      if(level[playerY][playerX-1]=== 0){
        swap(playerX, playerY,playerX -1, playerY);
        playerX--;
      }
      else if(level[playerY][playerX-1] === 1){  //chicken
        
    }
    
  }
}
  if(keyCode === RIGHT_ARROW){
    swap(playerX, playerY, playerX +1, playerY);
    playerX++;
}
if(keyCode === UP_ARROW){
  swap(playerX,playerY,playerX,playerY-1)
  playerY--;
}
if(keyCode === DOWN_ARROW){
  swap(playerX,playerY,playerX, playerY+1);
  playerY++;
}


}

