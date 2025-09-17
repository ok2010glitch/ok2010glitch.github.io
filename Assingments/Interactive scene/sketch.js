// Interactive Scene
// Syed Saad Hussain
// September 16, 2025
//
// This code will have moving elements such as the protagonist

let g = 755; // ground level
let tg = 538; // bottom (y) coordinate of the mountain tops
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
}

function draw() {
  background("skyblue")
  
  fill("green")

  noStroke()
  rect(windowWidth-1913, windowHeight-200, windowWidth, 500)
  textSize(16);

  // Display pwinMouseX.
text(pwinMouseX, 75, 75 );
 // display pwinMouseY.
 text(pwinMouseY, 50, 50)
 mountains()
 mtops()

}
   
 

  
  

function mountains(){
  fill("grey")
  triangle(110,g,280,500,550,g)
  triangle(540,g,700,500,900,g)
  triangle(870,g,1200,450,1500,g)
  
}
function mtops(){
  fill("white")
  triangle(254,tg,280,500,321,tg)
  triangle(676,tg,700,500,730,tg)

}