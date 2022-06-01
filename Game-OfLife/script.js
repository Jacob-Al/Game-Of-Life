let side = 9;
let xotArr = []; 
let eatArr = []; 
let davachanArr = [];
let bombArr = [];


let matrix = [];

function generate(a, b) {
  for (let i = 0; i < a; i++) {
    matrix.push([]);
    for (let j = 0; j < b; j++) {
      matrix[i].push(Math.round(Math.random() * 3));
    }
  }

}
generate(80, 80); 
for(let i = 0;i < 10;i++){
  let k = Math.round(Math.random() * matrix.length)
  let m = Math.round(Math.random() * matrix.length)
  matrix[k][m] = 4
}

function objectsCreation() {

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 2) {
        eatArr.push(new GrassEater(x, y));
      } else if (matrix[y][x] == 1) {
        xotArr.push(new Grass(x, y));
      } else if (matrix[y][x] == 3) {
        davachanArr.push(new Davachan(x, y));
      }
    }
  }
}
for (var y = 0; y < matrix.length; y++) {
  for (var x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] == 4) {
      bombArr.push(new bomb(x, y));
    }
  }
}
function setup() {

    // noStroke();
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background("grey");
}

    


function draw() {
  // frameRate(30);
  objectsCreation()


  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 2) {
        fill("orange");
      } else if (matrix[y][x] == 0) {
        fill("#acacac");
      } else if (matrix[y][x] == 3){
        fill("red");
      }else if (matrix[y][x] == 4){
        fill("black");
      }
      rect(x * side, y * side, side, side,80);
    }
  }


  for (let i = 0; i < xotArr.length; i++) {
    xotArr[i].mul();
  }

  for (let i = 0; i < eatArr.length; i++) {
    eatArr[i].eat();
  }

  for (let i = 0; i < davachanArr.length; i++) {
    davachanArr[i].eat();
  }
  for (let i = 0; i < bombArr.length; i++) {
    bombArr[i].move();
  }
}
