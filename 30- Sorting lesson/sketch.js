// Sorting practice
// Syed Saad Hussain
// Jan 7, 2026

let values = [];
const ARRAY_SIZE = 20;

function setup() {
  noCanvas();      populateArray();
}

function draw() {
  background(220);
}

function populateArray(){
  //using a loop, fill our array randomly
  for(let i = 0; i < ARRAY_SIZE; i++){
    values.push(floor(random(1000)));
  }
}