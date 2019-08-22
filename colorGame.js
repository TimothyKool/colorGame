var numSquares = 6;
var colors = [];
var status = 1;
var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var modeButtons2 = document.querySelectorAll(".mode2");
var hexButton = document.querySelector("#hexcode");

init();

function init() {
    //mode buttons event listeners
    setupDifficultyButtons();
    setupModeButtons();
    setupSquares();
    if(status == 1) {
        reset();
    }
    else {
        resetHex();
    }
}

function setupDifficultyButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            //Same as an if else statement
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            if(status == 1) {
                reset();
            }
            else {
                resetHex();
            }
            setupSquares();
        });
    }
}

function setupModeButtons() {
    for(var i = 0; i < modeButtons2.length; i++) {
        modeButtons2[i].addEventListener("click", function() {
            modeButtons2[0].classList.remove("selected2");
            modeButtons2[1].classList.remove("selected2");
            this.classList.add("selected2");
            //Decide game mode
            if(this.textContent === "RGB") {
                reset();
            }
            else {
                resetHex();
            }
            setupSquares();
        })
    }
}

function setupSquares() {
    for(var i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener("click", function() {
            //grab color of clicked square
            if(status == 1) {
                var clickedColor = this.style.backgroundColor;
            }
            else {
                var clickedColor = rgb2hex(this.style.backgroundColor);
            }
            //compare colors
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
   
function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function reset() {
    status = 1;
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    //change colors of squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

function resetHex() {
    status = 0;
    colors = generateRandomHex(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
    if(status == 1) {
        reset();
    }
    else {
        resetHex();
    }
})

function changeColors(color) {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    var arr = [];
    for(var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomHex(num) {
    var arr = [];
    for(var i = 0; i < num; i++) {
        arr.push(randomHex());
    }
    return arr;
}

function randomHex() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}