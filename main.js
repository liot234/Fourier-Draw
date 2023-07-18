

const width =  window.innerWidth/1.25;
const height =   window.innerHeight/1.25;

let slider;

let DRAW=0;
let notDRAW=1;
let state=-1;


let canvas;
let drawings = [];


function mousePressed() {
    state= DRAW
    drawings = [];
    x = [];
    y = [];
    time = 0;
    path = [];
}
function mouseReleased() {
    state = notDRAW;
    const skip = 1;
    for (let i = 0; i < drawings.length; i += skip) {
      x.push(drawings[i].x);
      y.push(drawings[i].y);
    }
    fourierX = dft(x);
    fourierY = dft(y);
  
    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
}


function setup() {
    createCanvas(width, height);
    
}

let t = 0;
let waveVals = [];  

function epiCycles(x, y, rotation, fourier) {
    for (let i = 0; i < fourier.length; i++) {
      let prevx = x;
      let prevy = y;
      let freq = fourier[i].freq;
      let radius = fourier[i].amp;
      let phase = fourier[i].phase;
      x += radius * cos(freq * time + phase + rotation);
      y += radius * sin(freq * time + phase + rotation);
  
      stroke(255, 100);
      noFill();
      ellipse(prevx, prevy, radius * 2);
      stroke(255);
      line(prevx, prevy, x, y);
    }
    return createVector(x, y);
  }

function draw() {
    background(0);

    if(state == DRAW){
        let point = createVector(mouseX - width / 2, mouseY - height / 2)
        drawings.push(point)
        stroke('rgb(0,128,0)');
        strokeWeight(4);
        noFill();
        beginShape();
        for (let v of drawings) {
          vertex(v.x + width / 2, v.y + height / 2);
        }
        endShape();
    }else if (state == notDRAW) {
        let vx = epiCycles(width / 2, 100, 0, fourierX);
        let vy = epiCycles(100, height / 2, HALF_PI, fourierY);
        let v = createVector(vx.x, vy.y);
        path.unshift(v);
        line(vx.x, vx.y, v.x, v.y);
        line(vy.x, vy.y, v.x, v.y);
    
        beginShape();
        noFill();
        for (let i = 0; i < path.length; i++) {
          vertex(path[i].x, path[i].y);
        }
        endShape();
    
        const dt = TWO_PI / fourierY.length;
        time += dt;
    
        if (time > TWO_PI) {
          time = 0;
          path = [];
        }
    }
    
    
        
       
    

    

    
}