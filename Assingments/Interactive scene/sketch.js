// Interactive Scene
// Syed Saad Hussain
// September 16, 2025

// This code will have moving elements such as the protagonist

let g = 425; // ground level
let topl = 275; // height of the mountain 
function setup() {
  createCanvas(540,540);
  
  
}

function draw() {
  background("skyblue")
  
  fill("green")

  noStroke()
  rect(0, g, 540, 115)
  textSize(16);

  // Display pwinMouseX.
fill("red")
text(pwinMouseX, 150, 150 );
 // display pwinMouseY.
fill("blue")
text(pwinMouseY, 50, 50);

mountains()


}
function mountains(){
  fill("grey")
  triangle(-5,g,60,topl,200,g)
  triangle(50,g,160,topl-5,280,g)
  triangle(170,g,240,topl-8,360,g)
}

 

  
  

