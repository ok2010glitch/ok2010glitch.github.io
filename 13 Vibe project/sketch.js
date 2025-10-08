// Plane Cockpit Simulator
// A complex flight simulator with interactive cockpit controls and external view

let plane = {
  // Flight parameters
  altitude: 1000,
  airspeed: 250,
  heading: 0,
  pitch: 0,
  roll: 0,
  verticalSpeed: 0,
  
  // Engine parameters
  engine1: { thrust: 0, temp: 80, rpm: 0, fuel: 100 },
  engine2: { thrust: 0, temp: 80, rpm: 0, fuel: 100 },
  engine3: { thrust: 0, temp: 80, rpm: 0, fuel: 100 },
  engine4: { thrust: 0, temp: 80, rpm: 0, fuel: 100 },
  
  // Systems
  flaps: 0,
  gear: false,
  brakes: false,
  spoilers: false,
  autopilot: false,
  lights: { landing: false, navigation: false, strobe: false },
  
  // Navigation
  nav1: { freq: 108.00, course: 0 },
  nav2: { freq: 110.00, course: 0 },
  adf: { freq: 300 },
  gps: { lat: 40.7128, lon: -74.0060, track: 0 },
  
  // Fuel
  fuelTotal: 1000,
  fuelFlow: 0,
  
  // Electrical
  battery: true,
  generators: [true, true, true, true],
  busVoltage: 28,
  
  // Position
  x: 0,
  y: 0,
  z: 0
};

let controls = {
  yoke: { x: 0, y: 0 },
  throttle: [0, 0, 0, 0],
  mixture: [1, 1, 1, 1],
  prop: [1, 1, 1, 1]
};

let instruments = {
  pfd: { visible: true },
  nd: { visible: true },
  engine: { visible: true },
  systems: { visible: false },
  radio: { visible: false },
  externalView: { visible: true }
};

let canvas;
let bgImage;
let lastUpdate = 0;
const UPDATE_INTERVAL = 50;

// Terrain and environment
let terrain = [];
let clouds = [];
let stars = [];
let timeOfDay = 0; // 0 = day, 1 = night

function preload() {
  // We'll create the background dynamically
}

function setup() {
  canvas = createCanvas(1200, 800);
  
  // Initialize engine parameters
  for (let i = 0; i < 4; i++) {
    controls.throttle[i] = 0.3;
    controls.mixture[i] = 0.8;
    controls.prop[i] = 0.7;
  }
  
  // Set initial navigation frequencies
  plane.nav1.freq = 108.00;
  plane.nav2.freq = 110.00;
  plane.adf.freq = 300;
  
  // Generate environment
  generateTerrain();
  generateClouds();
  generateStars();
  
  textFont('Courier New');
}

function generateTerrain() {
  terrain = [];
  // Create a simple grid of terrain points
  for (let x = -20; x <= 20; x++) {
    for (let z = -20; z <= 20; z++) {
      let elevation = noise(x * 0.2, z * 0.2) * 100;
      terrain.push({ x: x * 100, z: z * 100, y: elevation });
    }
  }
}

function generateClouds() {
  clouds = [];
  for (let i = 0; i < 20; i++) {
    clouds.push({
      x: random(-2000, 2000),
      y: random(500, 2000),
      z: random(-2000, 2000),
      size: random(50, 150),
      speed: random(0.1, 0.5)
    });
  }
}

function generateStars() {
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(-width, width),
      y: random(-height, height),
      size: random(1, 3),
      brightness: random(100, 255)
    });
  }
}

function draw() {
  // Update physics at fixed intervals
  if (millis() - lastUpdate > UPDATE_INTERVAL) {
    updateFlightDynamics();
    updateEngineParameters();
    updateSystems();
    updatePosition();
    updateEnvironment();
    lastUpdate = millis();
  }
  
  // Clear the canvas
  background(30, 30, 40);
  
  // Draw external view if enabled - DRAW THIS FIRST
  if (instruments.externalView.visible) {
    drawExternalView();
  } else {
    // Draw cockpit background only when in cockpit view
    drawCockpitBackground();
  }
  
  // Draw primary flight display
  if (instruments.pfd.visible && !instruments.externalView.visible) drawPFD();
  
  // Draw navigation display
  if (instruments.nd.visible && !instruments.externalView.visible) drawND();
  
  // Draw engine instruments
  if (instruments.engine.visible && !instruments.externalView.visible) drawEngineInstruments();
  
  // Draw systems panel
  if (instruments.systems.visible && !instruments.externalView.visible) drawSystemsPanel();
  
  // Draw radio panel
  if (instruments.radio.visible && !instruments.externalView.visible) drawRadioPanel();
  
  // Draw control indicators
  if (!instruments.externalView.visible) drawControlIndicators();
  
  // Draw HUD (always visible)
  drawHUD();
  
  // Draw view toggle button (always visible)
  drawViewToggle();
  
  // Draw debug info
  drawDebugInfo();
}

function drawExternalView() {
  push();
  
  // Set up the view
  translate(width / 2, height / 2);
  
  // Apply aircraft rotation - this makes the world move with the plane
  rotateX(radians(-plane.pitch)); // Negative for natural movement
  rotateZ(radians(plane.roll));
  
  // Draw the environment
  drawSky();
  drawGround();
  drawClouds();
  drawHorizon();
  
  // Draw cockpit frame overlay
  drawCockpitFrame();
  
  pop();
}

function drawSky() {
  // Sky color based on altitude and time
  let skyColor;
  if (plane.altitude < 5000) {
    // Daytime colors
    let blend = map(plane.altitude, 0, 5000, 0, 1);
    skyColor = lerpColor(color(135, 206, 235), color(100, 150, 255), blend);
  } else {
    // High altitude - darker blue
    skyColor = color(0, 0, 80);
  }
  
  // Draw sky
  fill(skyColor);
  noStroke();
  rect(-width, -height, width * 3, height * 3);
  
  // Draw stars if at high altitude or night
  if (plane.altitude > 8000 || timeOfDay > 0.7) {
    drawStars();
  }
  
  // Draw sun
  fill(255, 255 - timeOfDay * 200, 0);
  noStroke();
  ellipse(300, -200, 80, 80);
}

function drawStars() {
  fill(255);
  noStroke();
  for (let star of stars) {
    let alpha = timeOfDay > 0.7 ? star.brightness : star.brightness * (timeOfDay - 0.5) * 2;
    fill(255, 255, 255, alpha);
    ellipse(star.x, star.y, star.size, star.size);
  }
}

function drawGround() {
  // Ground appearance based on altitude
  let groundColor;
  if (plane.altitude < 1000) {
    groundColor = color(34, 139, 34); // Green - close to ground
  } else {
    groundColor = color(101, 67, 33); // Brown - far away
  }
  
  // Draw ground plane
  fill(groundColor);
  noStroke();
  
  // Draw a simple ground first
  rect(-width * 2, 0, width * 4, height * 2);
  
  // Draw terrain details when low
  if (plane.altitude < 2000) {
    drawTerrainDetails();
  }
}

function drawTerrainDetails() {
  // Draw some terrain features
  fill(139, 69, 19);
  for (let i = 0; i < 50; i++) {
    let x = random(-width, width);
    let size = random(5, 20);
    let y = random(10, 100);
    rect(x, y, size, size);
  }
  
  // Draw runways when very low
  if (plane.altitude < 500) {
    drawRunways();
  }
}

function drawRunways() {
  stroke(200);
  strokeWeight(8);
  line(-400, 150, 400, 150);
  stroke(255);
  strokeWeight(4);
  line(-400, 150, 400, 150);
  
  // Runway markings
  stroke(255);
  strokeWeight(2);
  for (let i = -350; i <= 350; i += 100) {
    line(i, 140, i, 160);
  }
}

function drawClouds() {
  fill(255, 255, 255, 200);
  noStroke();
  
  for (let cloud of clouds) {
    // Simple cloud drawing
    let scale = map(plane.altitude, 0, 10000, 2, 0.5);
    let x = cloud.x * 0.001;
    let y = (cloud.y - plane.altitude) * 0.001;
    
    // Draw cloud as overlapping circles
    for (let j = 0; j < 3; j++) {
      let offsetX = random(-cloud.size * 0.3, cloud.size * 0.3);
      let offsetY = random(-cloud.size * 0.2, cloud.size * 0.2);
      ellipse(x + offsetX, y + offsetY, cloud.size * scale, cloud.size * scale * 0.6);
    }
  }
}

function drawHorizon() {
  // Horizon line
  stroke(255);
  strokeWeight(3);
  line(-width, 0, width, 0);
  
  // Pitch ladder
  stroke(255, 200);
  strokeWeight(1);
  for (let i = -8; i <= 8; i++) {
    if (i !== 0) {
      let y = i * 30;
      line(-40, y, 40, y);
      if (abs(i) % 2 === 0) {
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text(abs(i * 10) + "°", -50, y);
        text(abs(i * 10) + "°", 50, y);
      }
    }
  }
}

function drawCockpitFrame() {
  // Draw cockpit window frame
  push();
  resetMatrix();
  
  // Main window frame (transparent center)
  fill(0, 0, 0, 0);
  stroke(80);
  strokeWeight(25);
  rect(0, 0, width, height);
  
  // Window struts
  stroke(70);
  strokeWeight(15);
  line(width/2, 100, width/2, height); // Center column
  line(0, height/2, width, height/2);  // Horizontal strut
  
  // Instrument panel (bottom)
  fill(20, 20, 25, 220);
  noStroke();
  rect(0, height * 0.6, width, height * 0.4);
  
  // Side panels
  fill(35, 35, 40, 220);
  rect(0, 0, 120, height);
  rect(width - 120, 0, 120, height);
  
  // Glare shield (top)
  fill(15, 15, 20, 220);
  rect(0, 0, width, 120);
  
  // Add some cockpit details
  fill(100);
  rect(width/2 - 200, height * 0.6, 400, 20); // Main panel edge
  
  pop();
}

function drawCockpitBackground() {
  // Draw cockpit background
  background(20, 20, 25);
  
  // Main panels
  fill(25, 25, 30);
  noStroke();
  rect(0, 0, width, 80); // Top panel
  
  // Instrument panel areas
  fill(40, 40, 45);
  rect(50, 100, 500, 300);  // PFD
  rect(650, 100, 500, 300); // ND
  rect(50, 450, 350, 300);  // Engine
  rect(450, 450, 350, 300); // Systems
  rect(850, 450, 300, 300); // Radio
  
  // Center console
  fill(30, 30, 35);
  rect(width/2 - 150, 200, 300, 600);
}

function drawViewToggle() {
  // Draw button to toggle between views
  let buttonColor = instruments.externalView.visible ? color(0, 150, 0) : color(150, 0, 0);
  fill(buttonColor);
  stroke(255);
  strokeWeight(2);
  rect(width - 120, 20, 100, 30, 5);
  
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text(instruments.externalView.visible ? "COCKPIT VIEW" : "EXTERNAL VIEW", width - 70, 35);
}

function drawDebugInfo() {
  // Draw debug information
  fill(255);
  textAlign(LEFT, TOP);
  textSize(12);
  text(`External View: ${instruments.externalView.visible ? "ON" : "OFF"}`, 20, 20);
  text(`Pitch: ${plane.pitch.toFixed(1)}°`, 20, 40);
  text(`Roll: ${plane.roll.toFixed(1)}°`, 20, 60);
  text(`Altitude: ${Math.round(plane.altitude)} ft`, 20, 80);
}

function updateEnvironment() {
  // Update cloud positions
  for (let cloud of clouds) {
    cloud.x += cloud.speed;
    if (cloud.x > 3000) cloud.x = -3000;
  }
  
  // Update time of day (simple cycle)
  timeOfDay = (sin(millis() * 0.0001) + 1) * 0.5;
}

function updatePosition() {
  // Update aircraft position based on heading and speed
  let headingRad = radians(plane.heading);
  plane.x += sin(headingRad) * plane.airspeed * 0.0005;
  plane.z += cos(headingRad) * plane.airspeed * 0.0005;
}

// [Keep all the previous PFD, ND, Engine, Systems, Radio drawing functions exactly as they were]
// [Keep all the updateFlightDynamics, updateEngineParameters, updateSystems functions]
// [Keep all the keyPressed, keyReleased, mousePressed, mouseDragged functions]

// For brevity, I'm including just the essential updated functions. The instrument drawing functions 
// remain exactly the same as in the previous working version.

function updateFlightDynamics() {
  // Update pitch and roll based on yoke input
  plane.pitch += controls.yoke.y * 0.5;
  plane.roll += controls.yoke.x * 0.8;
  
  // Limit pitch and roll
  plane.pitch = constrain(plane.pitch, -90, 90);
  plane.roll = constrain(plane.roll, -90, 90);
  
  // Update heading based on roll and speed
  plane.heading += plane.roll * plane.airspeed / 5000;
  if (plane.heading >= 360) plane.heading -= 360;
  if (plane.heading < 0) plane.heading += 360;
  
  // Update altitude based on pitch and speed
  plane.verticalSpeed = plane.pitch * plane.airspeed / 100;
  plane.altitude += plane.verticalSpeed / 60;
  
  // Ensure altitude doesn't go below 0
  plane.altitude = max(plane.altitude, 0);
  
  // Update airspeed based on thrust and configuration
  let totalThrust = 0;
  for (let i = 0; i < 4; i++) {
    totalThrust += controls.throttle[i];
  }
  
  let drag = 0.01 * plane.airspeed;
  if (plane.gear) drag += 0.02;
  if (plane.flaps > 0) drag += plane.flaps * 0.03;
  if (plane.spoilers) drag += 0.05;
  
  let acceleration = (totalThrust / 4) - drag;
  plane.airspeed += acceleration;
  plane.airspeed = max(plane.airspeed, 0);
}

function updateEngineParameters() {
  for (let i = 1; i <= 4; i++) {
    let engine = plane[`engine${i}`];
    let throttle = controls.throttle[i-1];
    
    engine.rpm = throttle * 100;
    engine.temp = 80 + (throttle * 60);
    engine.temp = constrain(engine.temp, 80, 140);
    engine.thrust = throttle * (1 - plane.airspeed / 600);
  }
  
  plane.fuelFlow = 0;
  for (let i = 1; i <= 4; i++) {
    let engine = plane[`engine${i}`];
    plane.fuelFlow += engine.rpm / 10;
  }
  
  plane.fuelTotal -= plane.fuelFlow / 3600;
  plane.fuelTotal = max(plane.fuelTotal, 0);
}

function updateSystems() {
  let activeGenerators = plane.generators.filter(g => g).length;
  plane.busVoltage = plane.battery ? 24 : 0;
  plane.busVoltage += activeGenerators * 14;
  plane.busVoltage = min(plane.busVoltage, 28);
  
  if (plane.busVoltage < 18) {
    plane.autopilot = false;
  }
}

function mousePressed() {
  // Toggle external view when clicking the button
  if (mouseX > width - 120 && mouseX < width - 20 && 
      mouseY > 20 && mouseY < 50) {
    instruments.externalView.visible = !instruments.externalView.visible;
    return false;
  }
}

function keyPressed() {
  // Toggle external view with 'v' key
  if (key === 'v' || key === 'V') {
    instruments.externalView.visible = !instruments.externalView.visible;
  }
  
  // Toggle instrument panels (only in cockpit view)
  if (!instruments.externalView.visible) {
    if (key === '1') instruments.pfd.visible = !instruments.pfd.visible;
    if (key === '2') instruments.nd.visible = !instruments.nd.visible;
    if (key === '3') instruments.engine.visible = !instruments.engine.visible;
    if (key === '4') instruments.systems.visible = !instruments.systems.visible;
    if (key === '5') instruments.radio.visible = !instruments.radio.visible;
  }
  
  // Flight controls
  if (key === 'g' || key === 'G') plane.gear = !plane.gear;
  if (key === 'b' || key === 'B') plane.brakes = !plane.brakes;
  if (key === 's' || key === 'S') plane.spoilers = !plane.spoilers;
  if (key === 'a' || key === 'A') plane.autopilot = !plane.autopilot;
  
  // Flaps control
  if (key === 'f' || key === 'F') plane.flaps = min(plane.flaps + 0.1, 1);
  if (key === 'c' || key === 'C') plane.flaps = max(plane.flaps - 0.1, 0);
  
  // Engine controls
  if (key === 'q' || key === 'Q') {
    for (let i = 0; i < 4; i++) {
      controls.throttle[i] = max(controls.throttle[i] - 0.1, 0);
    }
  }
  if (key === 'e' || key === 'E') {
    for (let i = 0; i < 4; i++) {
      controls.throttle[i] = min(controls.throttle[i] + 0.1, 1);
    }
  }
  
  // Yoke controls
  if (keyCode === LEFT_ARROW) controls.yoke.x = -1;
  if (keyCode === RIGHT_ARROW) controls.yoke.x = 1;
  if (keyCode === UP_ARROW) controls.yoke.y = -1;
  if (keyCode === DOWN_ARROW) controls.yoke.y = 1;
  
  // Reset flight
  if (key === 'r' || key === 'R') {
    plane.altitude = 1000;
    plane.airspeed = 250;
    plane.heading = 0;
    plane.pitch = 0;
    plane.roll = 0;
    plane.verticalSpeed = 0;
  }
  
  return false;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) controls.yoke.x = 0;
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) controls.yoke.y = 0;
}

function mouseDragged() {
  // Throttle control
  for (let i = 0; i < 4; i++) {
    let x = 100 + i * 80;
    let y = 750;
    if (mouseX > x - 20 && mouseX < x + 20 && mouseY > y - 150 && mouseY < y + 20) {
      let throttlePos = map(mouseY, y - 150, y, 1, 0);
      controls.throttle[i] = constrain(throttlePos, 0, 1);
    }
  }
}