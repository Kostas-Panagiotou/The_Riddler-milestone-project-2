 // Build a constructor to react dynamically with the values for total-time-remaining-timer and flips//
class TheRiddler {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }
    // Add start game function for start the game and restart  also card to check when are matched or dont and add this occupy to wait until the card is matched//
    startGame() {
      this.cardToCheck = null;
      this.totalClicks = 0;
      this.timeRemaining = this.totalTime;
      this.matchedCards = [];
      this.occupy = true;
}

  // flip card + dont flip value and if statement and add total clicks to view on the screen//
flipCard(card) {
    if(this.dontFlipCard(card)) {
       this.totalClicks++;
       this.ticker.innerText = this.totalClicks;
       card.classList.add('visible');  
    }
}
dontFlipCard(card) {
        return true;
        
    }

}
 


 // create a function to call when the html is ready with the cards and the overlays on the screen
 $(document).ready (function() {
    let overlays =Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new TheRiddler(49, cards);
    
    //remove the visisble on html and when you click on screen the overlays goes away and ready to start//                                                                                
    overlays.forEach(overlay  => {
    overlay.addEventListener('click' , () => {
    overlay.classList.remove('visible');
    game.startGame();
   });
});    
   cards.forEach(card => {
   card.addEventListener('click' , () => {
   game.flipCard(card);   
   });
});

 });

