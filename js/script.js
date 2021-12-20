//             GLOBAL VARIABLES
//unordered list where the player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
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

buttonGuess.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});