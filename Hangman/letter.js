
function Letter(character) {
    this.visible = !/[a-z1-9]/i.test(character);

    this.character = character;
};

this.toString = function() {
    if(this.visible === true) {
        return this.character;
    }
    return "_";
};

this.getSolution = function() {
    return this.character;
};

this.guess = function(letterGuess) {
    if(letterGuess.toUpperCase() === this.character.toUpperCase()) {
        this.visible = true;
        return true;
    }
        return false;
};

module.exports = Letter;