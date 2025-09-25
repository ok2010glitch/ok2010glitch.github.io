// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let lionR, lionL;
let facingRight = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadAssets();
  imageMode(CENTER);
  noCursor();

}

async function loadAssets(){
  //handle loading all the images
  lionL = await loadImage("Assets/lion-left.png")
  lionR = await loadImage("Assets/lion-right.png")
}

function draw() {
  background(220); 

  // updating the direction
  if(pmouseX < mouseX){
    facing = true;
  }else if(pmouseX > mouseX){
    facingRight = false;
  }

// updating the image
  if(facingRight){

    image(lionR, mouseX, mouseY, lionL.width/2, lionL.height/2);
    
  }else{
    (lionL, mouseX, mouseY, lionL.width/2, lionL.height/2);
  }
}
