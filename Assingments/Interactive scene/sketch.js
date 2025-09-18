// Interactive Scene
// Syed Saad Hussain
// September 16, 2025

// This code will have moving elements such as the protagonist

let g = 425; // ground level
let topl = 300; // height of the mountain 
function setup() {
  createCanvas(540,540);
  
  
}

function draw() {
  background("skyblue")
  
  fill("green")

  noStroke()
  rect(windowWidth-1913, windowHeight-200, windowWidth, 500)
  textSize(16);

  // Display pwinMouseX.
fill("red")
text(pwinMouseX, 150, 150 );
 // display pwinMouseY.
 fill("blue")
 //text(pwinMouseY, 50, 50)

 mountains()


}
function mountains(){
  fill("grey")
  triangle(-1,g,60,topl,120,g)
  triangle(50,g,120,topl-5,200,g)
  triangle(170,g,200,topl-8,280,g)
}
   
 

  
  

