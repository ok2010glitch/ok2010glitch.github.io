// TU-95 Bomber Simulation
// Complex implementation with detailed mechanical components

let planeX, planeY;
let planeSpeed = 2;
let propRotation = 0;
let gearRotation = 0;
let backgroundOffset = 0;
let clouds = [];
let terrain = [];
let engineDetails = [];
let wingFlapAngle = 0;
let wingFlapDirection = 1;
let bombBayOpen = false;
let bombBayAngle = 0;
let altitude = 300;
let targetAltitude = 300;
let isClimbing = false;
let isDescending = false;
let cockpitLights = false;
let navigationLights = false;
let enginePower = 100;
let fuelLevel = 100;
let missionTime = 0;
let waypoints = [];
let currentWaypoint = 0;
let hudElements = [];

function setup() {
  createCanvas(1200, 700);
  
  // Initialize plane position
  planeX = 200;
  planeY = height / 2;
  
  // Generate clouds
  for (let i = 0; i < 15; i++) {
    clouds.push({
      x: random(width),
      y: random(height * 0.7),
      size: random(50, 150),
      speed: random(0.2, 0.8)
    });
  }
  
  // Generate terrain
  generateTerrain();
  
  // Initialize engine details
  initializeEngineDetails();
  
  // Initialize waypoints
  initializeWaypoints();
  
  // Initialize HUD elements
  initializeHUD();
}

function draw() {
  // Update mission time
  missionTime += deltaTime / 1000;
  
  // Update background
  updateBackground();
  
  // Draw sky gradient
  drawSky();
  
  // Draw terrain
  drawTerrain();
  
  // Draw clouds
  drawClouds();
  
  // Update and draw plane
  updatePlane();
  drawPlane();
  
  // Draw HUD
  drawHUD();
  
  // Update fuel consumption
  updateFuel();
  
  // Check waypoint progress
  checkWaypoints();
}

function updateBackground() {
  backgroundOffset += planeSpeed / 2;
  if (backgroundOffset > width) {
    backgroundOffset = 0;
  }
}

function drawSky() {
  // Sky gradient
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(30, 30, 80), color(135, 206, 235), inter);
    stroke(c);
    line(0, i, width, i);
  }
  
  // Sun
  fill(255, 255, 200, 150);
  noStroke();
  ellipse(width - 100, 100, 80, 80);
}

function generateTerrain() {
  let terrainHeight = height * 0.7;
  let detail = 5;
  
  for (let x = 0; x < width + 100; x += detail) {
    let y = terrainHeight + noise(x * 0.01) * 100;
    terrain.push({x: x, y: y});
  }
}

function drawTerrain() {
  // Draw terrain
  fill(50, 120, 50);
  noStroke();
  beginShape();
  vertex(-10, height);
  for (let point of terrain) {
    vertex(point.x - backgroundOffset % (width + 100), point.y);
  }
  vertex(width + 10, height);
  endShape(CLOSE);
  
  // Add some terrain details
  fill(40, 100, 40);
  for (let i = 0; i < terrain.length; i += 10) {
    let x = terrain[i].x - backgroundOffset % (width + 100);
    let y = terrain[i].y;
    if (x >= 0 && x <= width) {
      // Draw trees
      let treeHeight = random(10, 30);
      rect(x, y - treeHeight, 3, treeHeight);
      fill(30, 80, 30);
      ellipse(x + 1.5, y - treeHeight - 5, 15, 15);
      fill(40, 100, 40);
    }
  }
}

function drawClouds() {
  fill(255, 255, 255, 200);
  noStroke();
  
  for (let cloud of clouds) {
    let cloudX = (cloud.x - backgroundOffset * cloud.speed) % (width + 200);
    if (cloudX < -100) cloudX += width + 200;
    
    // Draw cloud with multiple circles for a fluffier look
    ellipse(cloudX, cloud.y, cloud.size, cloud.size * 0.6);
    ellipse(cloudX - cloud.size * 0.3, cloud.y, cloud.size * 0.7, cloud.size * 0.5);
    ellipse(cloudX + cloud.size * 0.3, cloud.y, cloud.size * 0.7, cloud.size * 0.5);
    ellipse(cloudX, cloud.y - cloud.size * 0.2, cloud.size * 0.8, cloud.size * 0.5);
  }
}

function updatePlane() {
  // Move plane
  planeX += planeSpeed;
  if (planeX > width + 300) {
    planeX = -300;
    currentWaypoint = 0;
  }
  
  // Update propeller rotation
  propRotation += 0.5 * (enginePower / 100);
  
  // Update gear rotation
  gearRotation += 0.1;
  
  // Update wing flaps
  wingFlapAngle += 0.02 * wingFlapDirection;
  if (wingFlapAngle > 0.3 || wingFlapAngle < -0.3) {
    wingFlapDirection *= -1;
  }
  
  // Update bomb bay
  if (bombBayOpen && bombBayAngle < PI/4) {
    bombBayAngle += 0.02;
  } else if (!bombBayOpen && bombBayAngle > 0) {
    bombBayAngle -= 0.02;
  }
  
  // Update altitude
  if (isClimbing && altitude < targetAltitude) {
    altitude += 0.5;
    planeY -= 0.5;
  } else if (isDescending && altitude > targetAltitude) {
    altitude -= 0.5;
    planeY += 0.5;
  }
  
  // Update engine details
  updateEngineDetails();
}

function drawPlane() {
  push();
  translate(planeX, planeY);
  
  // Draw main fuselage
  drawFuselage();
  
  // Draw wings
  drawWings();
  
  // Draw tail
  drawTail();
  
  // Draw engines and propellers
  drawEngines();
  
  // Draw landing gear
  drawLandingGear();
  
  // Draw cockpit
  drawCockpit();
  
  // Draw details
  drawPlaneDetails();
  
  pop();
}

function drawFuselage() {
  // Main fuselage body
  fill(100, 100, 100);
  stroke(80, 80, 80);
  strokeWeight(2);
  
  // Fuselage shape
  beginShape();
  vertex(-100, 0);
  bezierVertex(-80, -15, -40, -20, 0, -20);
  bezierVertex(40, -20, 80, -15, 100, 0);
  bezierVertex(80, 15, 40, 20, 0, 20);
  bezierVertex(-40, 20, -80, 15, -100, 0);
  endShape(CLOSE);
  
  // Fuselage details
  stroke(120, 120, 120);
  strokeWeight(1);
  line(-90, 0, 90, 0); // Center line
  
  // Windows
  fill(180, 220, 255);
  for (let i = -80; i < 80; i += 20) {
    ellipse(i, -8, 8, 6);
  }
  
  // Bomb bay
  if (bombBayOpen) {
    fill(60, 60, 60);
    beginShape();
    vertex(-30, 5);
    vertex(30, 5);
    vertex(25, 15);
    vertex(-25, 15);
    endShape(CLOSE);
  }
}

function drawWings() {
  // Main wings
  fill(90, 90, 90, 200);
  noStroke();
  
  // Left wing
  beginShape();
  vertex(-60, 0);
  vertex(-200, -5);
  vertex(-200, 5);
  vertex(-60, 0);
  endShape();
  
  // Right wing
  beginShape();
  vertex(60, 0);
  vertex(200, -5);
  vertex(200, 5);
  vertex(60, 0);
  endShape();
  
  // Wing flaps
  fill(80, 80, 80);
  // Left flap
  push();
  translate(-150, 0);
  rotate(wingFlapAngle);
  rect(-5, -2, 10, 30);
  pop();
  
  // Right flap
  push();
  translate(150, 0);
  rotate(-wingFlapAngle);
  rect(-5, -2, 10, 30);
  pop();
  
  // Wing details
  stroke(70, 70, 70);
  strokeWeight(1);
  line(-60, 0, -200, 0);
  line(60, 0, 200, 0);
}

function drawTail() {
  // Vertical stabilizer
  fill(90, 90, 90);
  beginShape();
  vertex(80, 0);
  vertex(95, -50);
  vertex(85, -50);
  vertex(80, 0);
  endShape(CLOSE);
  
  // Horizontal stabilizers
  // Left
  beginShape();
  vertex(70, 5);
  vertex(40, 5);
  vertex(20, 15);
  vertex(70, 15);
  endShape(CLOSE);
  
  // Right
  beginShape();
  vertex(70, -5);
  vertex(40, -5);
  vertex(20, -15);
  vertex(70, -15);
  endShape(CLOSE);
}

function drawEngines() {
  // Four engines - two on each wing
  let enginePositions = [
    { x: -140, y: -5 },
    { x: -100, y: -5 },
    { x: 100, y: -5 },
    { x: 140, y: -5 }
  ];
  
  for (let i = 0; i < enginePositions.length; i++) {
    let pos = enginePositions[i];
    
    push();
    translate(pos.x, pos.y);
    
    // Engine nacelle
    fill(80, 80, 80);
    stroke(60, 60, 60);
    strokeWeight(2);
    ellipse(0, 0, 30, 25);
    
    // Propeller spinner
    fill(70, 70, 70);
    ellipse(0, 0, 15, 15);
    
    // Propeller blades
    push();
    rotate(propRotation + i * HALF_PI);
    fill(60, 60, 60);
    
    for (let j = 0; j < 4; j++) {
      push();
      rotate(j * HALF_PI);
      rect(0, -2, 40, 4);
      pop();
    }
    
    pop();
    
    // Engine exhaust
    fill(40, 40, 40);
    ellipse(12, 0, 10, 8);
    
    // Engine details
    drawEngineDetails(i);
    
    pop();
  }
}

function initializeEngineDetails() {
  for (let i = 0; i < 4; i++) {
    engineDetails.push({
      pistonOffset: random(0, TWO_PI),
      valveRotation: random(0, TWO_PI),
      fanRotation: random(0, TWO_PI),
      temperature: 100 + random(50)
    });
  }
}

function updateEngineDetails() {
  for (let i = 0; i < engineDetails.length; i++) {
    let detail = engineDetails[i];
    detail.pistonOffset += 0.1 * (enginePower / 100);
    detail.valveRotation += 0.05 * (enginePower / 100);
    detail.fanRotation += 0.2 * (enginePower / 100);
    detail.temperature = 100 + (enginePower / 2) + random(10);
  }
}

function drawEngineDetails(engineIndex) {
  let detail = engineDetails[engineIndex];
  
  // Draw engine internals (simplified)
  push();
  
  // Cylinders
  stroke(50, 50, 50);
  strokeWeight(1);
  for (let i = 0; i < 3; i++) {
    let angle = i * TWO_PI/3 + detail.pistonOffset;
    let x = cos(angle) * 8;
    let y = sin(angle) * 8;
    
    line(x, y, x * 1.5, y * 1.5);
    fill(70, 70, 70);
    ellipse(x * 1.5, y * 1.5, 6, 6);
  }
  
  // Cooling fans
  push();
  rotate(detail.fanRotation);
  stroke(100, 100, 100);
  for (let i = 0; i < 8; i++) {
    push();
    rotate(i * PI/4);
    line(0, 0, 10, 0);
    pop();
  }
  pop();
  
  // Valves
  push();
  rotate(detail.valveRotation);
  fill(90, 90, 90);
  for (let i = 0; i < 6; i++) {
    push();
    rotate(i * PI/3);
    rect(5, -1, 8, 2);
    pop();
  }
  pop();
  
  // Temperature indicator (color based on temp)
  let tempColor = color(
    map(detail.temperature, 100, 200, 0, 255),
    map(detail.temperature, 100, 200, 255, 0),
    0
  );
  fill(tempColor);
  noStroke();
  ellipse(-8, -8, 5, 5);
  
  pop();
}

function drawLandingGear() {
  // Only draw if landing gear is down (simplified)
  if (altitude < 50) {
    // Main gears
    fill(70, 70, 70);
    stroke(50, 50, 50);
    strokeWeight(2);
    
    // Left gear
    push();
    translate(-60, 15);
    rotate(sin(gearRotation) * 0.1);
    
    // Strut
    rect(-3, 0, 6, 30);
    
    // Wheel
    fill(40, 40, 40);
    ellipse(0, 35, 20, 20);
    
    // Wheel details
    fill(30, 30, 30);
    ellipse(0, 35, 10, 10);
    
    // Spokes
    stroke(50, 50, 50);
    for (let i = 0; i < 8; i++) {
      push();
      rotate(i * PI/4 + gearRotation);
      line(0, 35, 0, 25);
      pop();
    }
    
    pop();
    
    // Right gear
    push();
    translate(60, 15);
    rotate(sin(gearRotation + PI) * 0.1);
    
    // Strut
    rect(-3, 0, 6, 30);
    
    // Wheel
    fill(40, 40, 40);
    ellipse(0, 35, 20, 20);
    
    // Wheel details
    fill(30, 30, 30);
    ellipse(0, 35, 10, 10);
    
    // Spokes
    stroke(50, 50, 50);
    for (let i = 0; i < 8; i++) {
      push();
      rotate(i * PI/4 + gearRotation);
      line(0, 35, 0, 25);
      pop();
    }
    
    pop();
  }
}

function drawCockpit() {
  // Cockpit glass
  fill(180, 220, 255, 150);
  stroke(150, 190, 255);
  strokeWeight(2);
  
  beginShape();
  vertex(-40, -15);
  bezierVertex(-20, -18, 20, -18, 40, -15);
  vertex(35, -5);
  vertex(-35, -5);
  endShape(CLOSE);
  
  // Cockpit interior
  if (cockpitLights) {
    fill(200, 200, 100, 100);
    rect(-30, -12, 60, 7);
  }
  
  // Pilot figures (simplified)
  fill(30, 30, 30);
  ellipse(-10, -8, 6, 6);
  ellipse(10, -8, 6, 6);
}

function drawPlaneDetails() {
  // Antennas
  stroke(80, 80, 80);
  strokeWeight(1);
  line(85, -15, 85, -25);
  line(-85, -10, -85, -20);
  
  // Navigation lights
  if (navigationLights) {
    fill(255, 0, 0);
    ellipse(-95, 0, 4, 4);
    fill(0, 255, 0);
    ellipse(95, 0, 4, 4);
  }
  
  // Air intakes
  fill(60, 60, 60);
  ellipse(-120, -2, 8, 5);
  ellipse(-80, -2, 8, 5);
  ellipse(80, -2, 8, 5);
  ellipse(120, -2, 8, 5);
  
  // Panel lines
  stroke(70, 70, 70);
  strokeWeight(1);
  for (let i = -90; i <= 90; i += 30) {
    line(i, -10, i, 10);
  }
}

function initializeWaypoints() {
  waypoints = [
    { x: 300, y: height / 2, reached: false },
    { x: 600, y: height / 2 - 100, reached: false },
    { x: 900, y: height / 2, reached: false },
    { x: 1200, y: height / 2 + 100, reached: false }
  ];
}

function checkWaypoints() {
  for (let i = 0; i < waypoints.length; i++) {
    let wp = waypoints[i];
    if (!wp.reached && dist(planeX, planeY, wp.x, wp.y) < 50) {
      wp.reached = true;
      currentWaypoint = i + 1;
      
      // Set next altitude target
      if (i < waypoints.length - 1) {
        targetAltitude = height - waypoints[i + 1].y;
        isClimbing = targetAltitude > altitude;
        isDescending = targetAltitude < altitude;
      }
    }
  }
}

function initializeHUD() {
  hudElements = [
    { type: "altimeter", x: 50, y: 50 },
    { type: "speed", x: 50, y: 100 },
    { type: "compass", x: width - 150, y: 50 },
    { type: "engine", x: width - 150, y: 150 },
    { type: "fuel", x: 50, y: 150 },
    { type: "waypoint", x: width / 2, y: 50 }
  ];
}

function drawHUD() {
  // HUD background
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 200, 180);
  rect(width - 210, 10, 200, 180);
  rect(width / 2 - 100, 10, 200, 60);
  
  // HUD text
  fill(0, 255, 0);
  textSize(12);
  textAlign(LEFT, TOP);
  
  // Altitude
  text("ALT: " + nf(altitude, 3, 0) + " m", 20, 20);
  
  // Speed
  text("SPD: " + nf(planeSpeed * 50, 3, 0) + " km/h", 20, 40);
  
  // Fuel
  text("FUEL: " + nf(fuelLevel, 2, 1) + " %", 20, 60);
  
  // Engine power
  text("ENG: " + nf(enginePower, 2, 0) + " %", 20, 80);
  
  // Mission time
  let minutes = floor(missionTime / 60);
  let seconds = floor(missionTime % 60);
  text("TIME: " + nf(minutes, 2, 0) + ":" + nf(seconds, 2, 0), 20, 100);
  
  // Waypoint info
  textAlign(CENTER, TOP);
  text("WP: " + currentWaypoint + " / " + waypoints.length, width / 2, 20);
  
  // Compass
  textAlign(RIGHT, TOP);
  text("HDG: " + nf((planeX / 10) % 360, 3, 0) + "°", width - 20, 20);
  
  // Engine status
  textAlign(RIGHT, TOP);
  text("ENGINE STATUS", width - 20, 60);
  for (let i = 0; i < 4; i++) {
    let status = engineDetails[i].temperature > 180 ? "HOT" : "OK";
    let statusColor = engineDetails[i].temperature > 180 ? color(255, 0, 0) : color(0, 255, 0);
    fill(statusColor);
    text("ENG " + (i + 1) + ": " + status, width - 20, 80 + i * 15);
  }
  
  // Draw artificial horizon
  drawArtificialHorizon();
}

function drawArtificialHorizon() {
  push();
  translate(width - 100, 120);
  
  // Horizon circle
  stroke(0, 255, 0);
  strokeWeight(1);
  noFill();
  ellipse(0, 0, 60, 60);
  
  // Horizon line
  let horizonTilt = map(planeY, height / 2 - 100, height / 2 + 100, -20, 20);
  line(-30, horizonTilt, 30, horizonTilt);
  
  // Pitch lines
  for (let i = -2; i <= 2; i++) {
    let y = horizonTilt + i * 10;
    if (y > -25 && y < 25) {
      line(-15, y, 15, y);
      if (i !== 0) {
        textAlign(CENTER, CENTER);
        text(abs(i * 10), 0, y);
      }
    }
  }
  
  // Aircraft symbol
  fill(0, 255, 0);
  triangle(-5, -2, 5, -2, 0, 5);
  
  pop();
}

function updateFuel() {
  fuelLevel -= 0.01 * (enginePower / 100);
  if (fuelLevel < 0) fuelLevel = 0;
  
  // Reduce engine power if fuel is low
  if (fuelLevel < 10) {
    enginePower = max(enginePower - 0.1, 10);
  }
}

function keyPressed() {
  // Control plane with keyboard
  if (keyCode === UP_ARROW) {
    targetAltitude = max(targetAltitude - 50, 100);
    isClimbing = true;
    isDescending = false;
  } else if (keyCode === DOWN_ARROW) {
    targetAltitude = min(targetAltitude + 50, 500);
    isClimbing = false;
    isDescending = true;
  } else if (key === ' ') {
    bombBayOpen = !bombBayOpen;
  } else if (key === 'l' || key === 'L') {
    cockpitLights = !cockpitLights;
  } else if (key === 'n' || key === 'N') {
    navigationLights = !navigationLights;
  } else if (key === '+') {
    enginePower = min(enginePower + 5, 120);
  } else if (key === '-') {
    enginePower = max(enginePower - 5, 50);
  }
}

function mousePressed() {
  // Refuel when clicking
  fuelLevel = 100;
}