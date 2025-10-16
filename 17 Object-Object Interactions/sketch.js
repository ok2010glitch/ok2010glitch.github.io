// Object-Object Interaction
// Syed Saad Hussain
// October 16, 2025

//Global Variables
let nodes = [];
let reach = 150;


function setup() {
  createCanvas(windowWidth, windowHeight);
  t = new csNode(10,10);

}

function mousePressed(){
  //create one node per mousePress
  nodes.push(new csNode(mouseX,mouseY));
  //[csNode,csNode, csNode]
  //    0      1       2 
}

function draw() {
  background(220);
  
  //loop by item is good when we don't
  //plan on deleting objects from array
  for(let n of nodes){
    n.move();
    n.display();
    n.connect(nodes);

  }
}
1
class csNode{
  //1.Constructor
  constructor(x,y){
    // propertires realted to position/display
    this.x = x; this.y = y; this.size = 20;
    this.c = color(random(255), random(255), random(255));

    //properties related to movement
    this.xTime = random(10); this.yTime = random(10);
    this.timeShift = 0.01; this.maxSpeed = 5;


  }

  //2.Class methods
  display(){ // draw our csNode as a circle on canvas
    fill(this.c);
    noStroke();
    circle(this.x,this.y, this.size);

  }
  move(){
    //use perlin noise for x/y movement
    let xSpeed = noise(this.xTime); //0 -`
    xSpeed = map(xSpeed, 0, 1, -this.maxSpeed, this.maxSpeed)
    this.xTime += this.timeShift
    
    this.x += xSpeed;
    if(this.x < 0) this.x = width;
    else if(this.x > width) this.x = 0;


    let ySpeed = noise(this.yTime);
    ySpeed = map(ySpeed, 0, 1, -this.maxSpeed, this.maxSpeed);
    this.yTime += this.timeShift;

    this.y += ySpeed;
    if(this.y < 0) this.y = width;
    else if(this.y > height) this.y = 0;
  }


  connect(nodeArray){
    //check if the current point is close to any other
    // points. If so, join witha a line.
    stroke(this.c);
    for(let n of nodeArray){
      //this.x this.y
      if(n !== this){
        let d = dist(this.x, this.y, n.x, n.y);
        if(d < reach){
          line(this.x, this.y, n.x, n.y);
        }
      }
    }

  }
}
