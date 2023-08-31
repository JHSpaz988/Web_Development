function genRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function changeImage(imageNumber) {
    var randomNumber = genRandomNumber();
    var img = document.getElementsByClassName("img" + imageNumber);
    img[0].setAttribute("src", "images/dice" + randomNumber + ".png");
    return randomNumber
}

function determineWinner(randomNumber1, randomNumber2) {
    if (randomNumber1 > randomNumber2) {
        var winner = "Player 1 wins!";
    } else if (randomNumber1 < randomNumber2) {
        var winner = "Player 2 wins!";
    } else {
        var winner = "It's a draw.";
    }
    return winner
}
// var randomNumber1 = genRandomNumber(), randomNumber2 = genRandomNumber();


// var img1 = document.getElementsByClassName("img1");
// img1[0].setAttribute("src", 'images/dice' + randomNumber1 + '.png');

// var img2 = document.getElementsByClassName("img2");
// img2[0].setAttribute("src", 'images/dice' + randomNumber2 + '.png');
var randomNumber1 = changeImage(1);
var randomNumber2 = changeImage(2);

var winner = determineWinner();

document.querySelector("h1").innerText = winner;
 