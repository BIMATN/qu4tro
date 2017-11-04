
var wordsList = ["one", "neena", "two", "lou", "three", "jordan",
  "four", "stephen", "five", "adam", "six", "luis"];

var chosenWord = "";

var lettersInChosenWord = [];

var numBlanks = 0;

var blanksAndSuccesses = [];

var wrongGuesses = [];

var letterGuessed = "";

var winCorrect = 0;
var losswrong = 0;
var numGuesses = 9;

function startGame() {
  
  numGuesses = 9;

  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  
  lettersInChosenWord = chosenWord.split("");
 
  numBlanks = lettersInChosenWord.length;
  
  console.log(chosenWord);
  
  blanksAndSuccesses = [];
  
  wrongGuesses = [];
  
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  console.log(blanksAndSuccesses);
  

  document.getElementById("correct").innerHTML = blanksAndSuccesses.join(" ");
  
  document.getElementById("wrong").innerHTML = wrongGuesses.join(" ");
}

function checkLetters(letter) {
  
  var correctWord = false;
  
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
     
      wordInWord = true;
    }
  }
  
  if (wordInWord) {

    for (var j = 0; j < numBlanks; j++) {
      
      if (chosenWord[j] === letter) {
  
        blanksAndSuccesses[j] = letter;
      }
    }
    
    console.log(blanksAndSuccesses);
  }
  
  else {

    wrongGuesses.push(word);
   
    numGuesses--;
  }
}

function roundComplete() {
  
  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

  document.getElementById("attempt").innerHTML = numGuesses;
  =
  document.getElementById("correct").innerHTML = blanksAndSuccesses.join(" ");

  document.getElementById("wrong").innerHTML = wrongGuesses.join(" ");
 
  if (wordsInChosenWord.toString() === blanksAndSuccesses.toString()) {

    winCounter++;
   
    alert("You win!");

    document.getElementById("correct").innerHTML = winCounter;
   
    startGame();
  }

  else if (numGuesses === 0) {
    
    lossCounter++;
  
    alert("incorrect");
   
    document.getElementById("incorrect").innerHTML = lossCounter;
    
    startGame();
  }
}

startGame();

document.onkeyup = function(event) {

  letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

  checkLetters(letterGuessed);
  
  roundComplete();
};