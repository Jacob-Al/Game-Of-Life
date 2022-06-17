var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// var fs = require("fs");


app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


function generate(matLen, gr, grEat, grEatEat, everyEat, vir, hunt) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        console.log(x, y);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < grEatEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        console.log(x, y);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < everyEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        console.log(x, y);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < vir; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        console.log(x, y);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    for (let i = 0; i < hunt; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        console.log(x, y);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
        }
    }
    return matrix
}

matrix = generate(50, 25, 25, 20, 10, 10, 10)

io.sockets.emit('send matrix', matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
everythingEaterArr = []
virusArr = []
huntArr = [];

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")
Everythingeater = require("./Everythingeater")
Virus = require("./Virus")
Hunter = require("./Hunter")
LivingCreatures = require("./LivingCreatures")

function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                predatorArr.push(gr)
            }
            else if (matrix[y][x] == 4) {
                let gr = new Everythingeater(x, y)
                everythingEaterArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new Virus(x, y)
                virusArr.push(gr)
            }
            else if (matrix[y][x] == 6) {
                let gr = new Hunter(x, y)
                huntArr.push(gr)
            }
        }
    }

}

io.sockets.emit('send matrix', matrix)

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in everythingEaterArr) {
        everythingEaterArr[i].eat()
    }
    for (let i in virusArr) {
        virusArr[i].eat()
    }
    for (let i in huntArr) {
        huntArr[i].eat()
    }
    console.log("game");
    io.sockets.emit("send matrix", matrix);
}
// setInterval(game, 1000)

io.on('connection', function (socket) {
    createObject(matrix)
})



