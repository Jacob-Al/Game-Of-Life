var socket = io();

var side = 15;

function setup() {
    frameRate(5);
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}
function drawn(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            else if (matrix[y][x] == 5) {
                fill("#FFA500");
            }
            else if (matrix[y][x] == 6) {
                fill("#A52A2A");
            }

            rect(x * side, y * side, side, side);


        }
    }

}

setInterval(
    function () {
    socket.on('send matrix', drawn)
    },1000)
