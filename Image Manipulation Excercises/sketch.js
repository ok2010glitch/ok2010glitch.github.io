// IMage Manipulation Excercise
// Saad Hussain
// November 14, 2025
//

let myImage;

function split(){
  // use the single loop stategy
 for(let i = 0; i < pixels.length; i+= 4){
  let acctP = (i /4) % width
  if(acctP > width/2){
    pixels[i+1] = 0;
  }


}
}
async function setup() {

  pixelDensity(1);
  myImage = await loadImage("assets/race.jpg");
  createCanvas(600,600);

}

function draw() {
  background(220);
  image(myImage,0,0);
  loadPixels(); // populate the pixels array
  split()

  updatePixels();
}

