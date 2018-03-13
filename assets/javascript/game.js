
var guessObject = [

    {
        status: "There's so very little human left in you, any more of this torment, and you'll surely crack and go hollow.",
        picFile: "assets\images\hangman-1.jpg",
        estusPic: "assets\images\estus-flask-1.png",
    },

    {
        status: "The light at the end of the tunnel is fading, along with your purpose. Why did you set out on this task in the first place? It's becoming harder and harder to remember.",
        picFile: "assets\images\hangman-2.png",
        estusPic: "assets\images\estus-flask-2.png",
    },

    {
        status: "You have fallen, and fallen again. Do not give into despair and lose sight of your cause, or you may just lose yourself in the process.",
        picFile: "assets\images\hangman-3.png",
        estusPic: "assets\images\estus-flask-3.png",
    },

    {
        status: "You have lost your ember, but the Undead curse and bonfire will see to it that you return, willingly or not.",
        picFile: "assets\images\hangman-4.png",
        estusPic: "assets\images\estus-flask-4.png",
    },

    {
        status: "Your Ember is strong, take care not to lose it Chosen Undead.",
        picFile: "assets\images\hangman-5.jpg",
        estusPic: "assets\images\estus-flask-5.png",
    },
];

var bossNames = ["ASYLUM DEMON", "BELL GARGOYLE", "CAPRA DEMON", "CEASELESS DISCHARGE", "CENTIPEDE DEMON", "CHAOS WITCH QUELAAG", "FOUR KINGS", "GAPING DRAGON",
    "GREAT GREY WOLF SIF", "GWYN LORD OF CINDER", "ORNSTEIN AND SMOUGH", "MOONLIGHT BUTTERFLY", "NITO", "SEATH THE SCALELESS", "TAURUS DEMON", "STRAY DEMON"
];

var guessesLeft = 5;
var wins = 0;
var losses = 0;
var firstRun = true;

var bossName = bossNames[5];
var hangmanString = "";
var missedGuesses = ["", "", "", "", ""];
var guessedIncorrect = 0;
var correctGuesses = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var guessedCorrect = 0;

document.onkeyup = function (event) {

    var userInput = String.fromCharCode(event.which).toUpperCase();
    console.log("Clicked Input: " + userInput);

    var hangmanLetters = document.getElementById("hangman-letters");
    var title = document.getElementById("title");
    var statusPic = document.getElementById("status-pic");
    var estusPic = document.getElementById("estus-pic");
    var missedLetters = document.getElementById("missed-letters");
    var statusText = document.getElementById("status-text");
    var estusText= document.getElementById("estus-text");

    if (firstRun === true) {
        firstRun = false;
        title.innerHTML = "Hangman Edition";

        // Create the intial hangman spaces
        for (var i = 0; i < bossName.length; i++) {
            var hangmanChar = bossName[i];

            if (hangmanChar === ' ') {
                hangmanString = hangmanString + "<br> ";
            }
            else {
                hangmanString = hangmanString + "_ ";
            }
        }
        console.log(hangmanString);
        hangmanLetters.innerHTML = "<h1>" + hangmanString + "</h1>";
    }

    else {
        if (missedGuesses.includes(userInput) ||
            correctGuesses.includes(userInput)) {
            alert("You have already picked this letter");
        }

        else if (userInput === ' ') {
            alert("Spaces are invalid but won't count against you.");
        }

        else if (bossName.includes(userInput)) {
            console.log("You guessed a correct letter");
            correctGuesses[guessedCorrect] = userInput;
            guessedCorrect++;
            hangmanString = formatHangman(bossName, userInput, hangmanString);
            console.log("New hangman string after correct guess: " + hangmanString);
            hangmanLetters.innerHTML = "<h1>" + hangmanString + "</h1>";

            if(hangmanString.indexOf("_")===-1)         /// Win condition is that there are no "_" characters in the hangman string
                console.log("Winner");
        }

        else {                                         // incorrect letter branch
            alert("You guessed an incorrect letter");
            missedGuesses[guessedIncorrect]=userInput;
            guessedIncorrect++;

            var missedLetterString = "Missed Letters: "
            for(var i=0; i<guessedIncorrect; i++){
                missedLetterString =missedLetterString.concat(missedGuesses[i]+" ");
            }

            missedLetters.innerHTML=missedLetterString;  

            if(guessedIncorrect===5){                              
                alert("You lose");
            }

            estusPic.setAttribute("src", guessObject[4-guessedIncorrect]);
            statusPic.setAttribute("src", guessObject[4-guessedIncorrect]);
            statusText.innerHTML = guessObject[4-guessedIncorrect];
            estusText.innerHTML = "Guestus Flasks Remaining: "+(5-guessedIncorrect);

        }
    }
};


function formatHangman(bossName, newChar, currentHangman) {
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

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function checkWin(hangmanString) {
    if (hangmanString.indexOf("_")===-1) {
        return true;
    }
    return false;
}

//function hangmanTransition(statusPic, estusPic, statusText, estusText)
