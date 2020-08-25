'use strict';

var cardsContainer = document.getElementById('cards-container'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    currentEl = document.getElementById('current'),
    showBtn = document.getElementById('show'),
    hideBtn = document.getElementById('hide'),
    questionEl = document.getElementById('question'),
    answerEl = document.getElementById('answer'),
    addCardBtn = document.getElementById('add-card'),
    clearBtn = document.getElementById('clear'),
    addContainer = document.getElementById('add-container'); // Keep track of current card

var currentActiveCard = 0; // Store DOM cards

var cardsEl = []; // Store card data

var cardsData = getCardsData(); // const cardsData = [{
//         question: "What must a variable begin with?",
//         answer: "A letter, $ or _"
//     },
//     {
//         question: 'What is a variable',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ];
// Create all cards

function createCards() {
  cardsData.forEach(function (data, index) {
    return createCard(data, index);
  });
} // Create a single card in DOM


function createCard(data, index) {
  var card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = "\n    <div class=\"inner-card\">\n        <div class=\"inner-card-front\">\n            <p>\n                ".concat(data.question, "\n            </p>\n        </div>\n        <div class=\"inner-card-back\">\n            <p>\n                ").concat(data.answer, "\n            </p>\n        </div>\n    </div>\n    ");
  card.addEventListener('click', function () {
    return card.classList.toggle('show-answer');
  }); // Add to DOM cards

  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
} // Show number of cards


function updateCurrentText() {
  currentEl.innerText = "".concat(currentActiveCard + 1, "/").concat(cardsEl.length);
} // Get cards from local storage


function getCardsData() {
  var cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
} // Add cards to local storage


function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards(); // Event listeners
// Next Button

nextBtn.addEventListener('click', function () {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
}); // Previous Button

prevBtn.addEventListener('click', function () {
  cardsEl[currentActiveCard].className = 'card right';
  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
}); // Show add container

showBtn.addEventListener('click', function () {
  return addContainer.classList.add('show');
}); // Hide add container

hideBtn.addEventListener('click', function () {
  return addContainer.classList.remove('show');
}); // Add new card

addCardBtn.addEventListener('click', function () {
  var question = questionEl.value;
  var answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    var newCard = {
      question: question,
      answer: answer
    };
    createCard(newCard);
    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
}); // Clear cards button

clearBtn.addEventListener('click', function () {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});