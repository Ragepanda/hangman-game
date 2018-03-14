
var guessObject = [

    {
        status: "There's so very little human left in you. With any more of this torment, and you'll surely crack and go hollow.",
        statusPic: "assets/images/hangman-1.jpg",
        estusPic: "assets/images/estus-flask-1.png",
    },

    {
        status: "With each death more of yourself fades away. You struggle to remember why it is that you fight.",
        statusPic: "assets/images/hangman-2.png",
        estusPic: "assets/images/estus-flask-2.png",
    },

    {
        status: "You aren't sure how many times you've died now, the prospect of staying dead is becoming appealing.",
        statusPic: "assets/images/hangman-3.png",
        estusPic: "assets/images/estus-flask-3.png",
    },

    {
        status: "You have died lost your ember, but the Undead Curse and Bonfire will see to it that you return, willingly or not.",
        statusPic: "assets/images/hangman-4.png",
        estusPic: "assets/images/estus-flask-4.png",
    },

    {
        status: "Your ember is strong, take care not to lose it and become ashen.",
        statusPic: "assets/images/hangman-5.jpg",
        estusPic: "assets/images/estus-flask-5.png",
    },
];

var bossNames = ["ASYLUM DEMON", "BELL GARGOYLE", "CAPRA DEMON", "CEASELESS DISCHARGE", "CENTIPEDE DEMON", "CHAOS WITCH QUELAAG", "FOUR KINGS", "GAPING DRAGON",
    "GREAT GREY WOLF SIF", "GWYN LORD OF CINDER", "ORNSTEIN AND SMOUGH", "MOONLIGHT BUTTERFLY", "NITO", "SEATH THE SCALELESS", "TAURUS DEMON", "STRAY DEMON", "CROSSBREED PRISCILLA",
    "DARK SUN GWYNDOLIN", "ARTORIAS THE ABYSSWALKER", "MANUS FATHER OF THE ABYSS"
];

var wins = 0;
var losses = 0;
var firstRun = true;
var guessesLeft = 5;
var bossName = bossNames[Math.floor(Math.random() * bossNames.length)];
var hangmanString = "";
var missedGuesses = ["", "", "", "", ""];
var guessedIncorrect = 0;
var correctLetters = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var correctGuesses = 0;
var isWin;
var hangmanLetters = document.getElementById("hangman-letters");
var title = document.getElementById("title");
var statusPic = document.getElementById("status-pic");
var estusPic = document.getElementById("estus-pic");
var missedLetters = document.getElementById("missed-letters");
var statusText = document.getElementById("status-text");
var estusText = document.getElementById("estus-text");
var winText = document.getElementById("wins");
var lossText = document.getElementById("losses");

document.onkeyup = function (event) {

    var userInput = String.fromCharCode(event.which).toUpperCase();
    console.log("Clicked Input: " + userInput);


    if (firstRun === true) {                                     // A logic branch for handling the transition from Pressing a key to starting
        firstRun = false;
        title.innerHTML = "Hangman Edition";

        // Create the intial hangman spaces for hangman String
        initializeHangmanText();

        console.log(hangmanString);
        hangmanLetters.innerHTML = hangmanString;
    }

    else {                                                        // Logic branch for all other key-up inputs
        if (missedGuesses.includes(userInput) ||
            correctLetters.includes(userInput)) {
        }

        else if (userInput === ' ' 
            ||userInput === ''
            || userInput === ''
            || userInput === ''
            || userInput === '') {
            alert("Spaces are invalid but won't count against you.");
        }

        else if (bossName.includes(userInput)) {                    // Logic branch for correct letter choice
            console.log("You guessed a correct letter");
            correctLetters[correctGuesses] = userInput;
            correctGuesses++;
            hangmanString = formatHangman(bossName, userInput, hangmanString);
            console.log("New hangman string after correct guess: " + hangmanString);
            hangmanLetters.innerHTML = hangmanString;

            if (hangmanString.indexOf("_") === -1) {        /// Win condition is that there are no "_" characters in the hangman string
                wins++;
                isWin = true;
                reset();
            }
        }

        else {                                         // incorrect letter branch
            missedGuesses[guessedIncorrect] = userInput;
            guessedIncorrect++;
            guessesLeft--;

            var missedLetterString = "Missed Letters: ";
            for (var i = 0; i < guessedIncorrect; i++) {
                missedLetterString = missedLetterString.concat(missedGuesses[i] + " ");
            }

            missedLetters.innerHTML = missedLetterString;

            if (guessesLeft > 0) {
                estusPic.setAttribute("src", guessObject[guessesLeft - 1].estusPic);
                statusPic.setAttribute("src", guessObject[guessesLeft - 1].statusPic);
                statusText.innerHTML = guessObject[guessesLeft - 1].status;
                estusText.innerHTML = "Guestus Flasks Remaining: " + (guessesLeft - 1);
            }

            if (guessedIncorrect === 5) {
                losses++;
                isWin = false;
                reset();
            }
        }
    }
};

function reset() {
    bossName = bossNames[Math.floor(Math.random() * bossNames.length)];
    hangmanString = "";
    missedGuesses = ["", "", "", "", ""];
    guessedIncorrect = 0;
    correctLetters = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    correctGuesses = 0;
    guessesLeft = 5;

    estusPic.setAttribute("src", guessObject[4].estusPic);
    statusPic.setAttribute("src", guessObject[4].statusPic);
    statusText.innerHTML = guessObject[4].status;
    estusText.innerHTML = "Guestus Flasks Remaining: 4";
    console.log("Misesed Letters set before");
    missedLetters.innerHTML = "Missed Letters: ";
    console.log("Missed letter after");
    initializeHangmanText();

    if (isWin)
        winText.innerHTML = "Wins: " + wins;
    else
        lossText.innerHTML = "Loses: " + losses;



    hangmanLetters.innerHTML = hangmanString;
}

function formatHangman(bossName, newChar, currentHangman) { // Helper function for manipulating displayed hangman string.
    var space = 0;
    for (var i = 0; i < bossName.length; i++) {
        if (bossName[i] === " ") {
            console.log("space added");
            space = space + 3;  // Accounts for &nsbp required for html to show blank between words.
        }

        else if (newChar === bossName[i]) {
            console.log("Inserting at index: " + (i * 2 + space))
            currentHangman = setCharAt(currentHangman, ((i * 2) + space), bossName[i]);
        }
    }
    return currentHangman;
}

function initializeHangmanText() {                // Function that formats the hangmanString global variable into an appropriate set of spaces and underscores
    for (var i = 0; i < bossName.length; i++) {
        var hangmanChar = bossName[i];

        if (hangmanChar === ' ') {
            hangmanString = hangmanString + "<br> ";
        }
        else {
            hangmanString = hangmanString + "_ ";
        }
    }
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function checkWin(hangmanString) {                   // Win condition is that there are no underscores left on the hangman board
    if (hangmanString.indexOf("_") === -1) {
        return true;
    }
    return false;
}



//function hangmanTransition(statusPic, estusPic, statusText, estusText)
