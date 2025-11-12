// Image Manipulation
// Syed Saad Hussain
// November 12, 2025
// Working with images, translation b/w 2D and 1D indices



let pilot;

function setup() {
  loadAssets();
  createCanvas(891, 892);
  pixelDensity(1);
}

async function loadAssets(){
  pilot = await loadImage("Assets/aviator.png");

}

function setPixelOneD(pos,r,g,b){
  // pos-> 1D location in pixels array (red componenet)
  //r,g,b -> new colors for that pixel
  pixels[pos] = r;
  pixels[pos+1] = g;
  pixels[pos+2] = b;

}
function setPixel(x,y,r,g,b){
  //x,y -> pixel location
  // rgb -> new pixel color
  let index = (width*y + x) * 4;
  setPixelOneD(index,r,g,b);

}
function draw() {
  image(pilot,0,0);
  loadPixels(); /// fills the "canvas" pixel array
  greyScale();
  updatePixels();
}

function getAvg(x,y){
  //retun the avg intensity of pixel(x,y);
  let index = (width*y + x) * 4;
  let r = pixels[i];
  let g = pixels[i + 1];
  let b = pixels[i + 2];
  return (r+g+b)/3;
  
}

function greyScale(){
  // use the average value of eah pixel 
  for(let x = 0; x < width; x ++){
    for(let y = 0; y < height; y ++){
      let avg = getAvg(x,y);
      setPixel(x,y,avg,avg,avg);

    }
  }
  
}

function boost(){
  // brighteen filter
  let boost = map(mouseX,onabort,width,-100,100);
  for(let i = 0; i < pixels.length; i += 4){
    let r = pixels[i] + boost;
    let g = pixels[i+1] + boost;
    let b = pixels[i+2] + boost;
    setPixelOneD(i, r, g, b);
  }
}