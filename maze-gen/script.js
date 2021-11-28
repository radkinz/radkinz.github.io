class Cell {
  constructor (xx, yy) {
    this.x = xx
    this.y = yy
    this.cellrow = this.x / celllength
    this.cellcol = this.y / celllength
    this.northwall = true
    this.southwall = true
    this.westwall = true
    this.eastwall = true
    this.visited = false
    this.unvisitedneighbors = true
    this.dice = []
    this.highlight = false
    this.c = colur
  }

  update () {
    if (this.highlight) {
      this.c = '#000000'
    } else {
      this.c = colur
    }
    if (this.visited) {
      rect(this.x, this.y, celllength, celllength, this.c)
    }
  }

  show () {
    if (this.northwall == true) {
      line(this.x, this.y, this.x + celllength, this.y)
    }
    if (this.eastwall == true) {
      line(
        this.x + celllength,
        this.y,
        this.x + celllength,
        this.y + celllength
      )
    }
    if (this.southwall == true) {
      line(
        this.x,
        this.y + celllength,
        this.x + celllength,
        this.y + celllength
      )
    }
    if (this.westwall == true) {
      line(this.x, this.y, this.x, this.y + celllength)
    }
  }

  getNeighbors () {
    this.dice = []
    //check not next to north boundary
    if (dist(this.x, this.y, this.x, 0) > 0) {
      //check north cell to see if visited
      if (cell[this.cellrow][this.cellcol - 1].visited == false) {
        this.dice.push('North')
      }
    }

    //check not next to east boundary
    if (dist(this.x, this.y, col * celllength, this.y) > celllength) {
      //check east neighbor
      if (cell[this.cellrow + 1][this.cellcol].visited == false) {
        this.dice.push('East')
      }
    }

    //check not next to west boundary
    if (dist(this.x, this.y, 0, this.y) > 0) {
      //check west neighbor
      if (cell[this.cellrow - 1][this.cellcol].visited == false) {
        this.dice.push('West')
      }
    }

    //check not next to south boundary
    if (dist(this.x, this.y, this.x, row * celllength) > celllength) {
      //check south neighbor
      if (cell[this.cellrow][this.cellcol + 1].visited == false) {
        this.dice.push('South')
      }
    }

    this.checkNeighbors()

    if (this.unvisitedneighbors) {
      let randomindex = Math.floor(random(0, this.dice.length))
      if (this.dice[randomindex] == 'North') {
        return this.removeNorthWall()
      } else if (this.dice[randomindex] == 'East') {
        return this.removeEastWall()
      } else if (this.dice[randomindex] == 'West') {
        return this.removeWestWall()
      } else if (this.dice[randomindex] == 'South') {
        return this.removeSouthWall()
      } else {
        return null
      }
    } else {
      return null
    }
  }

  removeNorthWall () {
    this.northwall = false
    cell[this.cellrow][this.cellcol - 1].southwall = false
    return cell[this.cellrow][this.cellcol - 1]
  }

  removeEastWall () {
    this.eastwall = false
    cell[this.cellrow + 1][this.cellcol].westwall = false
    return cell[this.cellrow + 1][this.cellcol]
  }

  removeWestWall () {
    this.westwall = false
    cell[this.cellrow - 1][this.cellcol].eastwall = false
    return cell[this.cellrow - 1][this.cellcol]
  }

  removeSouthWall () {
    this.southwall = false
    cell[this.cellrow][this.cellcol + 1].northwall = false
    return cell[this.cellrow][this.cellcol + 1]
  }

  checkNeighbors () {
    if (dist(this.x, this.y, this.x, 0) > 0) {
      //check north cell to see if visited
      if (cell[this.cellrow][this.cellcol - 1].visited == false) {
        this.unvisitedneighbors = true
        return
      } else {
        this.unvisitedneighbors = false
      }
    }

    //check not next to east boundary
    if (dist(this.x, this.y, col * celllength, this.y) > celllength) {
      //check east neighbor
      if (cell[this.cellrow + 1][this.cellcol].visited == false) {
        this.unvisitedneighbors = true
        return
      } else {
        this.unvisitedneighbors = false
      }
    }

    //check not next to west boundary
    if (dist(this.x, this.y, 0, this.y) > 0) {
      //check west neighbor
      if (cell[this.cellrow - 1][this.cellcol].visited == false) {
        this.unvisitedneighbors = true
        return
      } else {
        this.unvisitedneighbors = false
      }
    }

    if (dist(this.x, this.y, this.x, row * celllength) > celllength) {
      //check south neighbor
      if (cell[this.cellrow][this.cellcol + 1].visited == false) {
        this.unvisitedneighbors = true
        return
      } else {
        this.unvisitedneighbors = false
      }
    }
  }
}

let col, row
var cell = []
var stack = []
let celllength = 100
var next
var current
let framerate = 60
let rerun, inp
var interval
var colur
let easybutton, medbutton, hardbutton

var canvas = document.getElementById('Canvas')
canvas.width = roundbyhundred(window.innerWidth - 72)
canvas.height = roundbyhundred(window.innerHeight - 300)
var width = canvas.width
var height = canvas.height
var ctx = canvas.getContext('2d')

function setup () {
  colur = Math.floor(Math.random() * 16777215).toString(16)
  inp = $('#framerateinput')
  NewMaze()
}

//if button clicked
$('#runbutton').click(function(){
  changeFrameRate();
});

$('#easybutton').click(function(){
  easy();
});

$('#medbutton').click(function(){
  med();
});

$('#hardbutton').click(function(){
  hard();
});

function easy () {
  celllength = 100
  changeFrameRate()
  clearInterval(interval)
  NewMaze(celllength)
}

function med () {
  celllength = 50;
  changeFrameRate()
  clearInterval(interval)
  NewMaze(celllength)
}

function hard () {
  celllength = 25
  changeFrameRate()
  clearInterval(interval)
  NewMaze(celllength)
}

function changeFrameRate () {
  temp = parseInt($("#framerateinput").val());
  if (temp !== '') {
    framerate = temp
    clearInterval(interval)
  }

  NewMaze()
}

function roundbyhundred (n) {
  return 100 * Math.floor((n + 50) / 100)
}

function NewMaze () {
  col = width / celllength
  row = height / celllength
  colur = randColor();
  for (let i = 0; i < col; i++) {
    cell[i] = []
    for (let j = 0; j < row; j++) {
      cell[i][j] = new Cell((i * width) / col, (j * height) / row)
    }
  }
  stack = []
  current = cell[0][0]

  interval = setInterval(draww, 1000 / framerate)
}

function draww () {
  //clear background
  rect(0, 0, canvas.width, canvas.height, '#DCDCDC')

  current.visited = true
  current.highlight = true
  next = current.getNeighbors()

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      cell[i][j].show()
      cell[i][j].update()
    }
  }

  current.highlight = false

  if (next != null) {
    next.visited = true
    stack.push(current)
    current = next
  } else if (stack.length > 0) {
    current = stack.pop()
  }
}

function random (min, max) {
  return min + Math.random() * (max - min)
}

function rect (x, y, w, h, color) {
  var ctx = canvas.getContext('2d')
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
  ctx.rect(x, y, w, h)
}

function dist (x1, y1, x2, y2) {
  let y = x2 - x1
  let x = y2 - y1

  return Math.sqrt(x * x + y * y)
}

function line (x1, y1, x2, y2) {
  var ctx = canvas.getContext('2d')
  ctx.beginPath()
  ctx.strokeStyle = '#FFF';
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

function randColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

//start program
setup()
