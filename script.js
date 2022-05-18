'use strict';
// Selecting elements
const score0el = document.querySelector('#score--0');
const score1el = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, scores, activePlayer, playing;
//starting condtitons
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0el.textContent = '0';
  score1el.textContent = '0';
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//rooling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generaate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2 display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //* check for roll 1 if true switch player
    if (dice !== 1) {
      // addd dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player

      /*   document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active'); */
      /*  document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');*/
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // add cuurent score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //sheck if score >=100
    //finish the game
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');

      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //else shwitch to next player
    else switchPlayer();
  }
});

btnNew.addEventListener('click', init);
