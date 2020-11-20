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
      
      setTimeout(() => {
    this.shuffleCards();
    this.countDown = this.startCountDown();
    this.occupy = false;
    }, 500);
    
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
}
   hideCards() {
        this.cardsArray.forEach(card => {
        card.classList.remove('visible');
            
    });
}   
    

  // flip card + dont flipcard value and if statement and add total clicks to view on the screen//
flipCard(card) {
    if(this.dontFlipCard(card)) {
       this.totalClicks++;
       this.ticker.innerText = this.totalClicks;
       card.classList.add('visible');  
    }
}
  // create a start countdown function to count the time of remaining time of the game
  // create  a game-over function when the time pass you have a game over screen
  // create also a winner function when you matched all the cards//
 startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            
            if(this.timeRemaining === 0)
            this.gameover();
        },  1000);
    }
 gameover() {
        clearInterval(this.countDown);
        document.getElementById('game-over-text').classList.add('visible');
    }

  winner() {
      clearInterval(this.countDown);
      document.getElementById('win-text').classList.add('visible');
  }

//Fisher–Yates_shuffle Algorithm  shuffle the cards  to end and back to start shuffle the cards through the css style order//
shuffleCards () {
        for(let i = this.cardsArray.length  -1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i+1));
        this.cardsArray[randomIndex].style.order = i;
        this.cardsArray[i].style.order = randomIndex;
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
    let game = new TheRiddler(39, cards);
    
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

