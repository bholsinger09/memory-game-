/*
 * Create a list that holds all of your cards
 */


var cards = [ 'fa-diamond', 'fa-diamond',
'fa-paper-plane-o','fa-paper-plane-o',
'fa-anchor','fa-anchor',
'fa-bolt','fa-bolt',
'fa-cube','fa-cube',
'fa-bomb','fa-bomb',
'fa-leaf', 'fa-leaf',
'fa-bicycle','fa-bicycle',
            ];
//function that generates the cards in html format
function generateCard(card) {
  /*
  here I am trying to figure out the value of ${card}
  var i = 'fa ${card}';
  console.log (i);
  returns undefined 16 times
  */
 return `<li class="card"><i class= "fa ${card}"></i></li>`;
}





















/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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


//this is where the game fuction to generate the card is created
function startGame() {
   var deck = document.querySelector('.deck');
   var cardHTML = cards.map(function(card){
    return generateCard(card);
  });

  console.log (cardHTML);
  // this shows the html for card - i shows class of ${card}
  // i should have the value of each card example fa-bolt


  //this is where we put the value of the cards into the deck
  deck.innerHTML = cardHTML.join('');
}

startGame();

var allCards = document.querySelectorAll('.card');
var openCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click',function(e) {

   if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
    openCards.push(card);
	  card.classList.add('open','show');

     //check if they match
     var firstCardType = openCards[0].dataset.card;
     console.log(firstCardType);


     //if cards don't match - cards turn back
	   if (openCards.length == 2){

	     setTimeout(function() {

		       openCards.forEach(function(card) {
		         card.classList.remove('open', 'show');
		                              });
                          openCards = [];
                           }, 1000);

		            }
           }

             });
         });
