// final coding challnge practice

let gorillaIdle = [];
let gorillaSwipe = [];
let spiralImages = [];

// (Gorilla Related)
let idleIndex = 0;  let swipeIndex = 0;
let gorillaState = 0; //0-idle  1-swipe
let gorillaX = 200;

// (Spiral Related)
let spiralObjects = [];


async function setup() {
  createCanvas(windowWidth, windowHeight);
  await loadAssets();
}

async function loadAssets(){
  //Circles First
  for(let i=0; i<=15; i++){
    if(i < 10){
      spiralImages.push(loadImage("assets/Circle/circle0"+i+".png"));
    }
    else{
      spiralImages.push(loadImage("assets/Circle/circle"+i+".png"));
    }
  }

  //Gorillas Next
  for(let i = 1; i<=6; i++){
    gorillaIdle.push(loadImage("assets/Gorilla/idle"+i+".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe"+i+".png"));
  }

}

function drawGorilla(){
  //render the gprillaat its postion, choosing 
  //the correct image for animation playback
  if(gorillaState === 0){
    image(gorillaIdle[idleIndex], gorillaX, height/2);
    idleIndex++;
    if(idleIndex > 5) idleIndex = 0;
  }
  else if(gorillaState === 1){ //SWIPE STATE

  }
}

function draw() {
  background(220);
  drawGorilla()
}