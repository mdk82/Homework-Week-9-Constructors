const inquirer = require("inquirer");
const word = require("./word.js");
const phrases = require("./phrases.js");


function Hangman() {

    let that = this;

  this.startGame = function() {
      this.guessesLeft = 20;
      this.nextPhrase();
    //   console.log("You have " + this.guessesLeft + " tries to guess the right phrase.");
  };

  this.nextPhrase = function() {
      let random = phrases[Math.floor(Math.random() * phrases.length)];
      this.currentPhrase = new word(random);
      console.log("Guess the 90's movie, you have 20 chances");
      this.userGuess();
  };

  this.userGuess = function() {
      this.letterSelect().then(function() {
        if (that.guessesLeft < 1) {
            console.log("Game over, please play again!");
            console.log("The phrase was " + that.currentPhrase.getSolution() );
            that.playAgain();
        } else if (that.currentPhrase.correct()) {
            console.log("You got the word right!");
            that.guessesLeft = 20;
            that.nextPhrase();
        } else {
            that.userGuess();
        }
      });
  };

  this.letterSelect = function() {
    return inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "Choose a letter",
            validate: function(value) {
                return /[a-z1-9]/gi.test(value);
            }
        }
    ]).then(function(value) {
        let correctGuess = that.currentPhrase.guessLetter(value.choice);
        if (correctGuess) {
            console.log("You choose wisely!");
        } else {
            that.guessesLeft--;
            console.log("Nope! try again!");
        }
    });
};

  this.playAgain = function() {
      inquirer.prompt([
          {
              type: "confirm",
              name: "choice",
              message: "Do you want to play again?"
          }
      ]).then(function(value) {
          if(value.choice) {
              that.startGame();
          }
          else {
              console.log("Play again soon!");
              process.exit();
          }
      });
  };


};

module.exports = Hangman;

let hangman = new Hangman();

// Start the game function //
hangman.startGame();