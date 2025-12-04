// IMage Manipulation Excercise
// Saad Hussain
// November 14, 2025
//

let myImage;

function gcolor(){
  // use the single loop stategy
 for(let i = 0; i < pixels.length; i += 4){
<<<<<<< HEAD
  let pixelIndex = (i / 4) % 600;
  if(pixelIndex > 300){
    pixels[i] = 255;
=======
  let pixelIndex = (i /4) % width;
  if(pixelIndex > width/2){
>>>>>>> 4c557d3cbae79287166fa1399eb172c6746f568c
    pixels[i+1] = 0;
  }
}
}

function majorityColor(){
  for(let i = 0; i < pixels.length; i += 4){
    let r = pixels[i];
    let g = pixels[i+1];
    let b = pixels[i+2];
    if(r > g && r > b){
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
    else if(r === b || r === g){
      pixels[i] = 255;
      pixels[i+1] = 0;
      pixels[i+2] = 0;
    }
  }
}

function imgThree(){
  for(let i = 0; i < pixels.length; i +=4){
    let r = pixels[i];
    let g = pixels[i+1];
    let b = pixels[i+2];
    let avg = (r+g+b) / 3
    if(avg >= 205 && avg <= 255){
      pixels[i] = 170;
      pixels[i+1] = 230;
      pixels[i+2] = 220;
    }
    else if(avg >= 155 && avg <= 204){
      pixels[i] = 105;
      pixels[i+1] = 150;
      pixels[i+2] = 210;
    }
    else if(avg >= 105 && avg <= 154){
      pixels[i] = 120;
      pixels[i+1] = 180;
      pixels[i+2] = 60;
    }
    else if(avg >= 55 && avg <= 104){
      pixels[i] = 130;
      pixels[i+1] = 30;
      pixels[i+2] = 130;
    }
    else if(avg >= 0 && avg <= 54){
      pixels[i] = 90;
      pixels[i+1] = 10;
      pixels[i+2] = 50;
    }

  }
}

function ImgFour(){
  for(let y = 0; y < height; y ++){
    for(let x = width/2; x < width; x ++){
      let i = (y* width + x) * 4;
      let mirrorX = width -1 -x;
      let mirrorPixelIndex = (y*width+mirrorX) * 4;

      pixels[mirrorPixelIndex] = pixels[i];
      pixels[mirrorPixelIndex +1] = pixels[i+1];
      pixels[mirrorPixelIndex+2] = pixels[i+2];
      pixels[mirrorPixelIndex+3] = pixels[i+3];
      
    }
  }

}
async function setup() {

  pixelDensity(1);
  myImage = await loadImage("assets/hand.jpg");
  createCanvas(600, 600);

}

function draw() {
  background(220);
  image(myImage,0,0);
  loadPixels(); // populate the pixels array
  // gcolor();
  // majorityColor();
  // imgThree();
  ImgFour();
  
  updatePixels();

}

