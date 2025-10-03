// Nested Loops and popping bubbles
// Syed Saad Hussain
// October 10, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let bubbles = [];
let bubblesSize  = 100

function setup() {
  createCanvas(windowWidth, windowHeight);
  populateArray();
  showBubbles();
  
}

function draw() {
  background(220);
  showBubbles();

 
}
function populateArray(){
  // use a nested loop to generate x,y positions for
  // all of our bubbles.
  for(let x = 0; x < width; x += bubblesSize){
    for(let y = 0; y < height; y += bubblesSize){
      let b = {
        x: x,  y: y
      };
      bubbles.push(b);

    }
  }

}
function showBubbles(){
  // transverse the array, and display a bubble
  // each (x, y)
  for (let i = 0; i < bubbles.length; i++){
    let b = bubbles[i];
    circle(b.x,b.y, bubblesSize);
    if(dist(b.x, b.y, mouseX, mouseY) < bubblesSize/2){
      //to delete an item: use .splice()
      // .splice(pos, #ofItemsToDel, [replacementItems]);
      bubbles.splice(i, 1);
    }

  }
}