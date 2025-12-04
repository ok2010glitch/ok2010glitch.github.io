// p5 Party

let shared = {painting: [], invert: false};
let c;
const colors = [
  "#03fc88",
  "#03fc88",
  "#03fc88",
  "#03fc88",
  "#03fc88"
  
]

function pickColor(){
  return random(colors);
}

function renderPaint(){
  for(let p of shared.painting){
    fill(p[2]);
    circle(p[0],p[1],90);
  }
}


function mousePressed(){
  shared.painting.push([mouseX,mouseY,c]);
  c = pickColor();
}

function preload(){
  partyConnect("wss://demoserver.p5party.org", "cs30party33")
  shared = partyLoadShared("shared", shared);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(220);
  //renderPaint();
}
