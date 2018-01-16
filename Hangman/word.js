
let letter = require("./letter");

function Word(word) {
  this.letters = word.split("").map(function(character) {
      return new letter(character);
  });
}

this.getSolution = function() {
    return this.letters.map(function(letter) {
        return letter.getSolution();
    }).join("");
}

this.toString = function() {
    return this.letters.join(" ");
};

this.guessLetter = function(character) {
    let foundLetter = false;
    this.letters.forEach(function(letter) {
        if (letter.guess(character)) {
            foundLetter = true;
        }
    });

    console.log(this);

    return foundLetter;
};

this.correct = function() {
    return this.letters.every(function(letter) {
        return letter.visible;
    });
};

module.exports = Word;