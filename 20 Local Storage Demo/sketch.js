// Local storage demo
// Syed Saad Hussain
// October 24, 2025


// Global Variable
let mySquare;
let totalBounces = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  mySquare = new Bouncer(width/2, height/2);
  textSize(30);
}

function draw() {
  background(220);
  mySquare.move();
  mySquare.display();
  text(totalBounces, width/2, height/2)
}

class Bouncer{
  constructor(x,y){
    this.x = x;  this.y = y;
    this.xSpeed = random(-5,5);
    this.ySpeed = random(-5,5);



  }
  // class methods
  display(){
    square(this.x,this.y,11)
  }


  move(){
    //claculate new position
    this.x += this.xSpeed; this.y += this.ySpeed;

    //should we bounce? x first
    if(this.x < 0 || this.x > width){
      this.xSpeed *= -1;
      totalBounces ++;
    }

    if(this.y < 0 || this.y > height){
      this.ySpeed *= -1;
      totalBounces++;
    }
  }
}
