class Cell {
  constructor(xx, yy) {
    this.x = xx;
    this.y = yy;
    this.cellrow = this.x / celllength;
    this.cellcol = this.y / celllength;
    this.northwall = true;
    this.southwall = true;
    this.westwall = true;
    this.eastwall = true;
    this.visited = false;
    this.unvisitedneighbors = true;
    this.dice = [];
    this.highlight = false;
    this.c = colur;
  }

  update() {
    if (this.highlight) {
      this.c = color(0);
    } else {
      this.c = colur;
    }
    if (this.visited) {
      noStroke();
      fill(this.c);
      rect(this.x, this.y, celllength, celllength);
    }
  }

  show() {
    stroke(255);
    strokeWeight(4);
    if (this.northwall == true) {
      line(this.x, this.y, this.x + celllength, this.y);
    }
    if (this.eastwall == true) {
      line(
        this.x + celllength,
        this.y,
        this.x + celllength,
        this.y + celllength
      );
    }
    if (this.southwall == true) {
      line(
        this.x,
        this.y + celllength,
        this.x + celllength,
        this.y + celllength
      );
    }
    if (this.westwall == true) {
      line(this.x, this.y, this.x, this.y + celllength);
    }
  }

  getNeighbors() {
    this.dice = [];
    //check not next to north boundary
    if (dist(this.x, this.y, this.x, 0) > 0) {
      //check north cell to see if visited
      if (cell[this.cellrow][this.cellcol - 1].visited == false) {
        this.dice.push("North");
      }
    }

    //check not next to east boundary
    if (dist(this.x, this.y, col * celllength, this.y) > celllength) {
      //check east neighbor
      if (cell[this.cellrow + 1][this.cellcol].visited == false) {
        this.dice.push("East");
      }
    }

    //check not next to west boundary
    if (dist(this.x, this.y, 0, this.y) > 0) {
      //check west neighbor
      if (cell[this.cellrow - 1][this.cellcol].visited == false) {
        this.dice.push("West");
      }
    }

    //check not next to south boundary
    if (dist(this.x, this.y, this.x, row * celllength) > celllength) {
      //check south neighbor
      if (cell[this.cellrow][this.cellcol + 1].visited == false) {
        this.dice.push("South");
      }
    }

    this.checkNeighbors();

    if (this.unvisitedneighbors) {
      let randomindex = floor(random(0, this.dice.length));
      if (this.dice[randomindex] == "North") {
        return this.removeNorthWall();
      } else if (this.dice[randomindex] == "East") {
        return this.removeEastWall();
      } else if (this.dice[randomindex] == "West") {
        return this.removeWestWall();
      } else if (this.dice[randomindex] == "South") {
        return this.removeSouthWall();
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  removeNorthWall() {
    this.northwall = false;
    cell[this.cellrow][this.cellcol - 1].southwall = false;
    return cell[this.cellrow][this.cellcol - 1];
  }

  removeEastWall() {
    this.eastwall = false;
    cell[this.cellrow + 1][this.cellcol].westwall = false;
    return cell[this.cellrow + 1][this.cellcol];
  }

  removeWestWall() {
    this.westwall = false;
    cell[this.cellrow - 1][this.cellcol].eastwall = false;
    return cell[this.cellrow - 1][this.cellcol];
  }

  removeSouthWall() {
    this.southwall = false;
    cell[this.cellrow][this.cellcol + 1].northwall = false;
    return cell[this.cellrow][this.cellcol + 1];
  }

  checkNeighbors() {
    if (dist(this.x, this.y, this.x, 0) > 0) {
      //check north cell to see if visited
      if (cell[this.cellrow][this.cellcol - 1].visited == false) {
        this.unvisitedneighbors = true;
        return;
      } else {
        this.unvisitedneighbors = false;
      }
    }

    //check not next to east boundary
    if (dist(this.x, this.y, col * celllength, this.y) > celllength) {
      //check east neighbor
      if (cell[this.cellrow + 1][this.cellcol].visited == false) {
        this.unvisitedneighbors = true;
        return;
      } else {
        this.unvisitedneighbors = false;
      }
    }

    //check not next to west boundary
    if (dist(this.x, this.y, 0, this.y) > 0) {
      //check west neighbor
      if (cell[this.cellrow - 1][this.cellcol].visited == false) {
        this.unvisitedneighbors = true;
        return;
      } else {
        this.unvisitedneighbors = false;
      }
    }

    if (dist(this.x, this.y, this.x, row * celllength) > celllength) {
      //check south neighbor
      if (cell[this.cellrow][this.cellcol + 1].visited == false) {
        this.unvisitedneighbors = true;
        return;
      } else {
        this.unvisitedneighbors = false;
      }
    }
  }
}

let col, row;
var cell = [];
var stack = [];
let celllength = 100;
var next, current;
let framerate = 60;
let rerun, inp;
var interval = setInterval(draww, 1000 / framerate);
var colur;
let easybutton, medbutton, hardbutton;

function setup() {
  cvn = createCanvas(roundbyhundred(windowWidth-72), roundbyhundred(windowHeight-300));
  cvn.position((windowWidth-width)/2, 250);
  colur = color(round(random(0, 255)), round(random(0, 255)), round(random(0, 255)));
  inp = select("#framerateinput");
  rerun = select("#runbutton");
  easybutton = select("#easybutton");
  medbutton = select("#medbutton");
  hardbutton = select("#hardbutton");
  NewMaze();
}

 function easy() {
  celllength = 100;
  NewMaze(celllength);
}

function med() {
  celllength = 50;
  NewMaze(celllength);
}

 function hard() {
  celllength = 25;
  NewMaze(celllength);
}

function changeFrameRate() {
   temp = inp.value();
  if (temp === "") {
  } else {
     framerate = temp;
  clearInterval(interval);
  interval = setInterval(draww, 1000 / framerate);
  }

  NewMaze();
}

function roundbyhundred(n) {
  return 100 * Math.floor((n + 50) / 100);
}

function NewMaze() {
  col = width/celllength;
 row = height/celllength;
  colur = color(round(random(0, 255)), round(random(0, 255)), round(random(0, 255)));
   for (let i = 0; i < col; i++) {
    cell[i] = [];
    for (let j = 0; j < row; j++) {
      cell[i][j] = new Cell((i * width) / col, (j * height) / row);
    }
  }
  stack = [];
   current = cell[0][0];
}

function draww() {
  background(220);
  easybutton.mouseClicked(easy);
  medbutton.mouseClicked(med);
  hardbutton.mouseClicked(hard);
  rerun.mouseClicked(changeFrameRate);
  current.visited = true;
  current.highlight = true;
  next = current.getNeighbors();

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      cell[i][j].show();
      cell[i][j].update();
    }
  }

  current.highlight = false;

  if (next != null) {
    next.visited = true;
    stack.push(current);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}
