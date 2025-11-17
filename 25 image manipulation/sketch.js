// Image Manipulation
// Syed Saad Hussain
// November 12, 2025
// Working with images, translation b/w 2D and 1D indices



let pilot;


function setup() {
  laodAsstes();
  createCanvas(891, 892);
  pixelDensity(1);
}


async function laodAsstes(){
  pilot = await createVideo("Assets/bball.mp4");
  pilot.hide();
  pilot.loop();
}


function setPixelColor(pos, r, g, b){
  // given → 1D location in pixel array
  // r,g,b new colors for that pixel
  pixels[pos] = r;
  pixels[pos+1] = g;
  pixels[pos+2] = b
}


function setPixel(x, y, r, g, b){
  // x,y → pixel location
  // r,g,b → new pixel color
  let index = (width*y + x) * 4;
  setPixelColor(index, r, g, b);
}

let started = false;

function mousePressed(){
  started = true;
  resizeCanvas(pilot.width,pilot.height,false);
}

function draw() {
  image(pilot, 0, 0);
  loadPixels();
  // setPixelColor(8, 0, 255, 0);
  // setPixel(10, 10, 0, 0, 255);
  // boost();
  // grayScale();
  background(0)
  textImage();
  updatePixels();
}


function textImage(){
  // render an Iamge using characters
  fill(255);
  for(let x = 0; x < width; x+=10){
    for(let y = 0; y < height; y+=10){
      let avg = getAvg(x, y);
      if(avg > 220)  text("&", x, y);
      else if(avg > 180) text("O", x, y);
      else if(avg > 140) text("/", x, y);
      else if(avg > 100) text("=", x, y);
      else if(avg > 40) text(",", x, y);
    }
  }
}


function getAvg(x, y){
  // return the average pixel density of gray
  let i = (width*y + x) * 4;
  let r = pixels[i];
  let g = pixels[i+1];
  let b = pixels[i+2];
  return (r+g+b)/3;
}


function grayScale(){
  // use the average value of each pixel to turn gray
  for(let x = 0; x < width; x++){
    for(let y = 0; y< height; y++){
      let avg = getAvg(x, y);
      setPixel(x, y, avg, avg, avg)
    }
  }
}


function boost(){
  // brighteen filter
  let boost = map(mouseX, 0, width, -100, 100);
  for(let i = 0; i < pixels.length; i+=4){
    let r = pixels[i]  + boost;
    let g = pixels[i+1] + boost;
    let b = pixels[i+2] + boost;
    setPixelColor(i, r, g, b);
  }
}
