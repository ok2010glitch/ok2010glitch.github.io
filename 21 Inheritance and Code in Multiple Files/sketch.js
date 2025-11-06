// Inheritance and Code in Multiple Files
// Syed Saa Hussain
// October 30, 2025


let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0 ; i < 200; i++){
    objects.push(new AnimatedObject(random(width), random(height)));
    objects.push(new CircleObject(random(width), random(height)))


  }
}

function draw() {
  background(220);
  for (let o of objects){
    o.move();
    o.display();
  }
}

// PArent Class ("Super Class")
// --- if all in one file, should occur first -----
class AnimatedObject{
  constructor(x,y){
  this.x = x;
  this.y = y;
  this.size = 6;
  this.color = color(random(255), random(255), random(255));

  }

  move(){
    this.x += random(-2,2);
    this.y += random(-2,2);
  }

  display(){
    fill(this.color);

    circle(this.x, this.y, this.size);
  }


}
//

// child Class #1 - Circle
class CircleObject extends AnimatedObject{
  constructor(x,y){
    super(x,y);
    // we can also add-on to what was in the parent class
    this.size = random(20,40);
  }

  // no mention of move().. it will be same as parent's move()
  
  display(){// function override; copies overtop of paremt version
    if(dist(this.x, this.y, mouseX, mouseY) < this.size/2){
      fill(0,255,0);
    }
    else fill(255);

    circle(this.x, this.y, this.size);
  }
}

