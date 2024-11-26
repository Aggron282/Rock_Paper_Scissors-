var canvas;
var c;
var innerWidth;
var innerHeight;
var circles = [];
var color_array = [
"#e05b46",
"#389CAF"
]
var mouse = {

  x:null,
  y:null
}

function Setup(){

  canvas = document.querySelector("#intro-canvas");

  canvas.width = window.innerWidth;
  canvas.height =  window.innerHeight;

  innerWidth = canvas.width;
  innerHeight = canvas.height;

  c = canvas.getContext("2d");

}

class Circle {

  constructor(x,y,dx,dy,radius,strokeColor,fill){
    this.x = Math.random() * x;
    this.y = Math.random() * y;
    this.dx = Math.random() * dx;
    this.dy = Math.random() * dy;
    this.radius = Math.random() * radius + 3;
    this.strokeColor = strokeColor;
    this.fill = fill;
    this.minRadius = 2;
    this.maxRadius = this.radius + 3;
    this.originalRadius = this.radius;

  }

  draw(){
    c.beginPath();
    c.strokeStyle = this.strokeColor
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
    c.stroke();
    c.fillStyle = this.fill;
    c.fill();
  }

  update(){

    this.x += this.dx;
    this.y += this.dy;
    console.log(Math.abs(this.y) - Math.abs(mouse.y))
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }

    if(this.y + this.radius > innerHeight  || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    if(Math.abs(this.y-mouse.y) < 50 && Math.abs(this.x - mouse.x) < 50) {

      if(this.radius > this.maxRadius){
          this.radius -= 1;
      }else{
          this.radius += 1;
      }

    }
    else if(this.radius > this.minRadius){
      this.radius -= 1;
    }

    this.draw();

  }

}

function animation(){

  requestAnimationFrame(animation);

  c.clearRect(0,0,innerWidth,innerHeight);

  for(var i = 0; i < circles.length; i++){
    circles[i].update();
  }

}

function init(){

  for(var i = 0; i < 500; i++){
    var random_color_index = Math.floor(Math.random() * color_array.length);
    var random_color = color_array[random_color_index]
    var circle = new Circle(innerWidth,innerHeight,3,3,30,random_color,random_color);
    circles.push(circle);
  }

}

Setup();
animation();

canvas.addEventListener("mousemove",(e)=>{
  mouse.x = e.x;
  mouse.y = e.y;
});

canvas.addEventListener("ondrag",(e)=>{
  mouse.x = e.x;
  mouse.y = e.y;
});

canvas.addEventListener("resize",(e)=>{
  init();
});

init();
