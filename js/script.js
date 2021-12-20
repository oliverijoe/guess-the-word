//             GLOBAL VARIABLES
//unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//button with the text "Guess!" in it
const buttonGuess = document.querySelector(".guess");
//text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
//empty paragraph where the word in progess will appear
const wordInProgress = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display
const remainingLetters = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display
const numOfGuesses = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//hidden button that will appear prompting the player to play again
const buttonPlayAgain = document.querySelector(".play-again")
//Starting word w/o API connected
const word = "magnolia";
//Array containing all the letters guessed
const guessedLetters = [];

//Display symbols as placeholder for the chosen word's letters
const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};

placeHolder(word);

// The "Guess" Button
buttonGuess.addEventListener("click", function (e) {
    e.preventDefault();

    //empty message element
    message.innerText = "";
    //Taking what has been entered
    const guess = letterInput.value;

    //Making sure it is a single letter
    const goodGuess = validateGuess(guess);
    
    if (goodGuess) {
        makeGuess(guess);
    }
    
    letterInput.value = "";
});

// Function to validate that a guess is, in fact, a letter from A to Z
const validateGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        // Value is not a letter
        message.innerText = "You did not guess a letter. Try guessing a letter.";
    } else if (input.length > 1) {
        // Value is more than one letter
        message.innerText = "Please enter one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        // Value is not a letter
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // A letter has been validated
        return input;
    }
};

// Capturing the input 
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed this letter. Try another.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};
