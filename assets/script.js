const timerSeconds = 60;
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
    // Add a timeout when is shuffle the cards and a timer//
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
		}, 1000);
		this.hideCards();
		this.timer.innerText = this.timeRemaining;
		this.ticker.innerText = this.totalClicks;
	}
	hideCards() {
		this.cardsArray.forEach(card => {
			card.classList.remove('visible');
		});
	}


	// create a start countdown function to count the time of remaining time of the game
	// create  a game-over function when the time pass you have a game over screen
	// create also a winner function when you matched all the cards//
	startCountDown() {
		return setInterval(() => {
			this.timeRemaining--;
			this.timer.innerText = this.timeRemaining;
			if (this.timeRemaining === 0)
				this.gameover();
		}, 1000);
	}
	gameover() {
		clearInterval(this.countDown);
		document.getElementById('game-over-text').classList.add('visible');
	}
	winner() {
		clearInterval(this.countDown);
		document.getElementById('win-text').classList.add('visible');
	}

      // flip card + cant flipcard variable and if statement when you can not flip card and else statement when is card to check//
	flipCard(card) {
		if (this.canFlipCard(card)) {
			this.totalClicks++;
			this.ticker.innerText = this.totalClicks;
			card.classList.add('visible');

			if (this.cardToCheck)
				this.checkForCardMatch(card);
			else
				this.cardToCheck = card;
		}
	}
         // cant flip function if this is occupy wait until is ready and if this matched cards and  the cards is the card to check//
	canFlipCard(card) {
		return !this.occupy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
	}
          // checking the match for the cards with the if method and this get card type is the card to check  else function the card is a mismatch and finally this card is null//
	checkForCardMatch(card) {
		if (this.getCardType(card) === this.getCardType(this.cardToCheck))
			this.cardMatch(card, this.cardToCheck);

		else
			this.cardMisMatch(card, this.cardToCheck);

		this.cardToCheck = null;

	}

       // card matching  and push method with card1 and card2 adding classlist also add the matched class//
       // and if is the matched cards this is a winner//
	cardMatch(card1, card2) {
		this.matchedCards.push(card1);
		this.matchedCards.push(card2);
		card1.classList.add('matched');
		card2.classList.add('matched');

		if (this.matchedCards.length === this.cardsArray.length)
			this.winner();

	}
     // when you have a miss match of the card1 and card 2 wait for the player to see the cards before flips again to normal this sets with the timeout and miliseconds//
	cardMisMatch(card1, card2) {
		this.occupy = true;
		setTimeout(() => {
			card1.classList.remove('visible');
			card2.classList.remove('visible');
			this.occupy = false;
		}, 1000);

	}

        // interact with the html value of the front of the cards and return//
	getCardType(card) {
		return card.getElementsByClassName('card-value')[0].src;
	}


	//Fisher–Yates_shuffle Algorithm  shuffle the cards  to end and back to start shuffle the cards through the css style order//
	shuffleCards() {
		for (let i = this.cardsArray.length - 1; i > 0; i--) {
			let randomIndex = Math.floor(Math.random() * (i + 1));
			this.cardsArray[randomIndex].style.order = i;
			this.cardsArray[i].style.order = randomIndex;
		}
	}
}
// create a function to call when the html is ready with the cards and the overlays on the screen
$(document).ready(function () {
	let overlays = Array.from(document.getElementsByClassName('overlay-text'));
	let cards = Array.from(document.getElementsByClassName('card'));
	let game = new TheRiddler(timerSeconds, cards);
	//remove the visisble on html and when you click on screen the overlays goes away and ready to start//                                                                                
	overlays.forEach(overlay => {
		overlay.addEventListener('click', () => {
			overlay.classList.remove('visible');
			game.startGame();
		});
	});
	cards.forEach(card => {
		card.addEventListener('click', () => {
			game.flipCard(card);
		});
	});
});
