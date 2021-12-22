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

let word = "magnolia";
//Array containing all the letters guessed
let guessedLetters = [];
//variable containing the remaining guesses
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHolder(word);
};

// Starting the game!
getWord();

//Display symbols as placeholder for the chosen word's letters
const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeHolderLetters.push("●");
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};


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
        showGuessedLetters();
        numOfGuessesRem(guess);
        updateWordInProgress(guessedLetters);
    }
};

// Function to show the guessed letters
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkWin();
};

// Function to count guesses remaining
const numOfGuessesRem = function (guess) {
    upperWord = word.toUpperCase();

    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `The game is over. The myster word was <span class="highlight">${upperWord}</span>!`;
        startOver();
    } else if (remainingGuesses === 1) {
        numOfGuesses.innerText = `${remainingGuesses} guess`;
    } else {
        numOfGuesses.innerText = `${remainingGuesses} guesses`;
    }
};

// Function to check if the player has won
const checkWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    } 
};

const startOver = function () {
    buttonGuess.classList.add("hide");
    remainingLetters.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    buttonPlayAgain.classList.remove("hide");
};

buttonPlayAgain.addEventListener("click", function () {
    // reset all original value
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    numOfGuesses.innerText = `${remainingGuesses} guesses`;

    getWord();

    buttonPlayAgain.classList.add("hide");
    buttonGuess.classList.remove("hide");
    remainingLetters.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});