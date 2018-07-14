/*
 * Create a list that holds all of your cards
 */

var cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-bomb",
  "fa-bomb",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle"
];

//function that generates the cards in html format
function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class= "fa ${card}"></i></li>`;
}

var allCards;
var openCards = [];
// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");
//declaring stars variable
const stars = document.querySelectorAll(".fa-star");

// declare matchedCards
let matchedCard = document.getElementsByClassName("match");

// close modal
let closePop = document.querySelector(".close");

// declare modal
let modal = document.getElementById("mainPopup");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// toggles open and show class to display cards
// toggles open and show class to display cards

document.body.onload = startGame();

function matched() {
  //first card
  openCards[0].classList.add("match");
  openCards[0].classList.add("open");
  openCards[0].classList.add("show");
  //second card
  openCards[1].classList.add("match");
  openCards[1].classList.add("open");
  openCards[1].classList.add("show");

  openCards = [];
}

function unmatched() {
  openCards[0].classList.add("unmatched");
  openCards[1].classList.add("unmatched");
  setTimeout(function() {
    openCards.forEach(function(card) {
      card.classList.remove("open", "show", "unmatched");
    });

    openCards = [];
  }, 1000);
}

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //start timer on first click
  /*
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  } */

  // setting rates based on moves
  if (moves > 8 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 13) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}



var timer = document.querySelector(".timer");
var interval;
//here is where I set the time to 0
let second = 0,
  minute = 0,
  hour = 0;

function clearTimer() {

  clearInterval(interval);
  timer.innerHTML = minute + "mins " + second + "secs";

}


function startTimer() {


  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    } else {
      clearTimer();
    }
  }, 1000);
}



function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // show congratulations modal
    modal.classList.add("show");

    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    //closeicon on modal

    closeModal();
  }
}

function closeModal() {
  closePop.addEventListener("click", function(e) {
    modal.classList.remove("show");
    startGame();
  });
}

function playAgain() {
  modal.classList.remove("show");
  startGame();
}

function useCards() {
  startTimer(); //this starts the timer when page is first loaded
  allCards.forEach(function cardFlip(card) {
    card.addEventListener("click", function(e) {
      if (card.classList.contains("open")) {
        return;
      }
      if (!card.classList.contains("open") && openCards.length < 2) {
        openCards.push(card);
        card.classList.add("open", "show");
        console.log("card clicked");

      }
      if (openCards.length == 2 && card.classList.contains("open")) {
        console.log("move incremented");

        moveCounter();
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          //if match flip card
          matched();
        } else {
          //if no match - card flips back
          unmatched();
        }
      }

      congratulations();
    });
  });
}
useCards();

//this is where the game fuction to generate the card is created
function startGame() {
  var deck = document.querySelector(".deck");
  var cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  //this is where we put the value of the cards into the deck
  deck.innerHTML = cardHTML.join("");
  allCards = document.querySelectorAll(".card");
  //setting the amount of moves to 0
  moves = 0;
  counter.innerHTML = moves;
  //reset rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }

  useCards();

}