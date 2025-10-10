// sketch.js - Working Cricket Game
let batsmanX, batsmanY;
let ballX, ballY, ballSpeedX, ballSpeedY;
let score = 0;
let ballsBowled = 0;
let wickets = 0;
let gameState = "ready"; // ready, bowling, batting, scored, out
let ballInAir = false;
let shotPower = 0;
let timing = 0;
let ballSize = 12;
let batAngle = 0;
let swingProgress = 0;
let lastBallTime = 0;
let ballInterval = 1500;

// Pitch dimensions
let pitch = {
    x: 200,
    y: 300,
    width: 400,
    height: 100
};

function setup() {
    createCanvas(800, 600);
    resetBatsman();
    resetBall();
}

function resetBatsman() {
    batsmanX = 300;
    batsmanY = 450;
}

function resetBall() {
    ballX = 650;
    ballY = 200;
    ballSpeedX = 0;
    ballSpeedY = 0;
    ballInAir = false;
    swingProgress = 0;
}

function bowlBall() {
    if (ballInAir) return;
    
    ballsBowled++;
    ballInAir = true;
    gameState = "bowling";
    
    // Random bowling variations
    let speed = random(5, 8);
    let angleVariation = random(-0.5, 0.5);
    
    // Calculate trajectory towards batsman
    let targetX = batsmanX + random(-20, 20);
    let targetY = batsmanY - 20;
    
    let dx = targetX - ballX;
    let dy = targetY - ballY;
    let distance = dist(ballX, ballY, targetX, targetY);
    
    ballSpeedX = (dx / distance) * speed;
    ballSpeedY = (dy / distance) * speed;
}

function updateBall() {
    if (!ballInAir) return;
    
    // Add gravity
    ballSpeedY += 0.1;
    
    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Check if ball reached batsman
    if (ballX > batsmanX - 50 && ballX < batsmanX + 50 && 
        ballY > batsmanY - 50 && ballY < batsmanY + 50) {
        if (gameState === "bowling") {
            gameState = "batting";
        }
    }
    
    // Check boundaries
    if (ballY > height - 50 || ballX < 50 || ballX > width - 50 || ballY < 50) {
        if (gameState === "bowling") {
            // Missed the ball - check for wicket
            if (ballX > 250 && ballX < 350 && ballY > 430 && ballY < 470) {
                wickets++;
                gameState = "out";
                showMessage("WICKET! Bowled!");
            } else {
                gameState = "ready";
                showMessage("Dot ball");
            }
        }
        resetBall();
    }
}

function playShot() {
    if (gameState !== "batting") return;
    
    // Calculate timing based on ball position
    let distanceToBat = dist(ballX, ballY, batsmanX, batsmanY);
    timing = map(distanceToBat, 0, 80, 1.0, 0.0, true);
    
    // Calculate shot power based on mouse position
    let mouseDist = dist(mouseX, mouseY, batsmanX, batsmanY);
    shotPower = map(mouseDist, 0, 200, 0.5, 1.5, true);
    
    // Calculate hit direction based on mouse angle
    let hitAngle = atan2(mouseY - batsmanY, mouseX - batsmanX);
    
    // Apply force to ball
    let hitStrength = timing * shotPower * 8;
    ballSpeedX = cos(hitAngle) * hitStrength;
    ballSpeedY = sin(hitAngle) * hitStrength;
    
    // Calculate score
    calculateScore(hitAngle, timing, shotPower);
    
    gameState = "scored";
    swingProgress = 1.0;
}

function calculateScore(hitAngle, timing, power) {
    let baseScore = 0;
    let quality = timing * power;
    
    if (quality > 0.8) {
        // Excellent shot - boundary
        baseScore = abs(hitAngle) < PI/4 ? 6 : 4;
        showMessage(`EXCELLENT SHOT! ${baseScore} runs!`);
    } else if (quality > 0.6) {
        // Good shot - runs
        baseScore = floor(random(2, 4));
        showMessage(`Good shot! ${baseScore} runs`);
    } else if (quality > 0.4) {
        // OK shot - single
        baseScore = 1;
        showMessage("Single run");
    } else {
        // Poor shot
        baseScore = 0;
        showMessage("Dot ball");
        
        // Chance of wicket on poor shots
        if (random() < 0.2) {
            wickets++;
            gameState = "out";
            showMessage("WICKET! Caught!");
        }
    }
    
    score += baseScore;
}

function showMessage(msg) {
    console.log(msg);
    // You can add visual message display here
}

function draw() {
    background(34, 139, 34); // Green field
    
    drawPitch();
    drawBatsman();
    drawBall();
    drawUI();
    drawBowlingMachine();
    
    // Game logic
    updateBall();
    updateBatSwing();
    
    // Auto bowl after interval
    if (millis() - lastBallTime > ballInterval && !ballInAir && gameState !== "out") {
        bowlBall();
        lastBallTime = millis();
    }
}

function drawPitch() {
    // Draw pitch
    fill(210, 180, 140); // Light brown
    noStroke();
    rect(pitch.x, pitch.y, pitch.width, pitch.height);
    
    // Draw crease
    stroke(255);
    strokeWeight(2);
    line(pitch.x + 100, pitch.y, pitch.x + 100, pitch.y + pitch.height);
    
    // Draw batting crease
    line(pitch.x + 50, pitch.y + pitch.height - 20, pitch.x + 150, pitch.y + pitch.height - 20);
}

function drawBatsman() {
    push();
    translate(batsmanX, batsmanY);
    
    // Draw batsman body
    fill(255, 200, 150);
    ellipse(0, -20, 30, 40); // Body
    ellipse(0, -60, 25, 25); // Head
    
    // Draw bat with swing animation
    rotate(batAngle);
    fill(101, 67, 33);
    rect(0, -5, 80, 10);
    
    pop();
}

function drawBall() {
    if (ballInAir) {
        fill(255, 0, 0);
        ellipse(ballX, ballY, ballSize * 2);
        
        // Ball trail
        for (let i = 0; i < 5; i++) {
            let trailX = ballX - ballSpeedX * i * 2;
            let trailY = ballY - ballSpeedY * i * 2;
            fill(255, 100, 100, 100 - i * 20);
            ellipse(trailX, trailY, ballSize * (1 - i * 0.2));
        }
    }
}

function drawBowlingMachine() {
    fill(100);
    rect(600, 150, 60, 40);
    
    // Machine barrel
    fill(80);
    rect(600, 165, 40, 10);
}

function drawUI() {
    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT);
    
    text(`Score: ${score}`, 20, 30);
    text(`Balls: ${ballsBowled}`, 20, 50);
    text(`Wickets: ${wickets}`, 20, 70);
    text(`State: ${gameState}`, 20, 90);
    
    // Instructions
    textAlign(CENTER);
    text("Click to bat when ball approaches!", width/2, 30);
    text("Aim with mouse - Better timing = better shots!", width/2, 50);
    
    // Timing indicator
    if (gameState === "batting") {
        drawTimingIndicator();
    }
}

function drawTimingIndicator() {
    let x = width - 100;
    let y = 50;
    let w = 80;
    let h = 20;
    
    // Background
    fill(100);
    rect(x, y, w, h);
    
    // Timing bar
    let timingWidth = w * timing;
    if (timing > 0.7) {
        fill(0, 255, 0); // Green for good timing
    } else if (timing > 0.4) {
        fill(255, 255, 0); // Yellow for OK timing
    } else {
        fill(255, 0, 0); // Red for poor timing
    }
    rect(x, y, timingWidth, h);
    
    // Border
    noFill();
    stroke(255);
    strokeWeight(1);
    rect(x, y, w, h);
    
    fill(255);
    noStroke();
    textSize(12);
    text("Timing", x + w/2, y - 5);
}

function updateBatSwing() {
    if (swingProgress > 0) {
        swingProgress -= 0.1;
        batAngle = sin(swingProgress * PI) * 0.5;
    } else {
        batAngle = 0;
    }
}

function mousePressed() {
    if (gameState === "batting") {
        playShot();
    } else if (!ballInAir) {
        bowlBall();
    }
}

function keyPressed() {
    // Manual controls
    if (key === ' ') {
        if (!ballInAir) {
            bowlBall();
        }
    }
    if (key === 'r') {
        resetBall();
        gameState = "ready";
    }
}