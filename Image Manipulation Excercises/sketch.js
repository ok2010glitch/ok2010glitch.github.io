// IMage Manipulation Excercise
// Saad Hussain
// November 14, 2025
//

let myImage;

function split(){
  // use the single loop stategy
 for(let i = 0; i < pixels.length; i += 4){
  let pixelIndex = (i / 4) % 600;
  if(pixelIndex > 300){
    pixels[i] = 255;
    pixels[i+1] = 0;
    pixels[i+2] = 255;
  }


}
}

function majorityColor(){
  for(let i = 0; i < pixels.length; i += 4){
    let r = pixels[i];
    let g = pixels[i+1];
    let b = pixels[i+2];
    if(r > g   && r > b){
      pixels[i] = 255;
      pixels[i+1] = 0;
      pixels[i+2] = 0;
    }
    else if(g > r && g > b){
      pixels[i] = 0;
      pixels[i+1] = 255;
      pixels[i+2] = 0;
    }
    else if(b > r && b > g){
      pixels[i] = 0;
      pixels[i+1] = 0;
      pixels[i+2] = 255;
    }
  }
}
async function setup() {

  pixelDensity(1);
  myImage = await loadImage("assets/race.jpg");
  createCanvas(600, 600);

}

function draw() {
  background(220);
  image(myImage,0,0);
  loadPixels(); // populate the pixels array
  split();
  // majorityColor();
  
  updatePixels();

}

