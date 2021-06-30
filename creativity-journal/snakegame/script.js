class Food {
    constructor() {
      this.x = floor(random(0, width-celllength));
      this.y = floor(random(0, height-celllength));
    }
  
    update() {
      if (dist(this.x, this.y, snake.x, snake.y) < celllength) {
        this.newLocation();
        snake.grow();
      }
    }
  
    show() {
      fill(255, 0, 0);
      rect(this.x, this.y, celllength, celllength);
    }
  
    newLocation() {
      this.x = floor(random(0, width-celllength));
      this.y = floor(random(0, height-celllength));
    }
  }
  
  class Snake {
    constructor(xx, yy) {
      this.x = xx;
      this.y = yy;
      this.speed = 15;
      this.Xvelocity = this.speed;
      this.Yvelocity = 0;
      this.r = celllength;
      this.tail = [];
      this.dead = false;
    }
  
    show() {
      fill(0, 255, 0);
      noStroke();
      //head
      rect(this.x, this.y, this.r, this.r);
  
      //tail
      for (let i = 0; i < this.tail.length; i++) {
        rect(this.tail[i][0], this.tail[i][1], this.r, this.r);
      }
    }
  
    update() {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i][0] = this.tail[i + 1][0];
        this.tail[i][1] = this.tail[i + 1][1];
      }
  
      //one tail gets head value
      if (this.tail.length > 1) {
        this.tail[this.tail.length - 1][0] = this.x;
        this.tail[this.tail.length - 1][1] = this.y;
      }
  
      this.x += this.Xvelocity;
      this.y += this.Yvelocity;
    }
  
    grow() {
      //temp values
      this.tail.push([width * 2, width * 2]);
      if (this.speed <= this.r - this.speed) {
        this.speed += 1;
      }
    }
  
    move() {
      if (abs(mouseX - this.x) < 70 && this.y - mouseY > 20) {
        this.Xvelocity = 0;
        this.Yvelocity = -this.speed;
      } else if (abs(mouseX - this.x) < 70 && mouseY - this.y > 20) {
        this.Xvelocity = 0;
        this.Yvelocity = this.speed;
      } else if (abs(mouseY - this.y) < 70 && mouseX - this.x > 20) {
        this.Yvelocity = 0;
        this.Xvelocity = this.speed;
      } else if (abs(mouseY - this.y) < 70 && this.x - mouseX > 20) {
        this.Yvelocity = 0;
        this.Xvelocity = -this.speed;
      }
    }
  
    checkDead() {
      if (this.x > width - this.r) {
        this.dead = true;
      }
      if (this.x <= 0) {
        this.dead = true;
      }
      if (this.y < 0) {
        this.dead = true;
      }
      if (this.y > height - this.r) {
        this.dead = true;
      }
  
      //reset size if dead
      if (this.dead) {
        this.speed = 15;
        this.r = celllength;
        this.x = width / 2;
        this.y = height / 2;
        this.dead = false;
        this.tail = [];
      }
    }
  }
  
  let snake, food;
  let celllength;
  let quinestring;
  
  function setup() {
    let cnv = createCanvas(windowWidth*0.7, windowHeight*0.95);
    celllength = windowHeight*0.05;
    background(0);
    snake = new Snake(width / 2, height / 2);
    food = new Food();
    quinestring = quine().replaceAll(/\s/g, "");
    quinestring = quinestring.split("");
  }
  
  function draw() {
      background(0);
      snake.move();
      snake.update();
      snake.show();
      snake.checkDead();
      food.update();
      food.show();
      showQuine();
  }
  
  function quine() {
    return (
      draw.toString() +
      snake.constructor.toString() +
      snake.show.toString() +
      snake.update.toString() +
      snake.grow.toString()
    );
  }
  
  function showQuine() {
    fill(255);
    let index = 0;
    let xcord = 0;
    for (let y = 5; y < height + 20; y += 20) {
      while (xcord < width) {
        text(quinestring[index], xcord, y);
        index += 1;
        if (index == quinestring.length - 1) {
          index = 0;
        }
  
        xcord += 8;
      }
  
      xcord = 0;
    }
  }
  