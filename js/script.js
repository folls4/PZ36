'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const cardForm = document.querySelector('#card-form');
  const cardInput = document.querySelector('#card-input');
  const cardList = document.querySelector('#card-list');
  const cardCounter = document.querySelector('#card-counter');
  const formMessage = document.querySelector('#form-message');
  function updateCounter() {
    const count = cardList.querySelectorAll('.item-card').length;
    cardCounter.textContent = `Карточек: ${count}`;
  }
    function createCard(title) {
    const card = document.createElement('li');
    card.className = 'item-card';
    card.setAttribute('data-card', '');

    const titleElement = document.createElement('span');
    titleElement.className = 'card-title';
    titleElement.textContent = title;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.setAttribute('aria-label', 'Удалить карточку');
    deleteButton.textContent = '×';

    card.append(titleElement, deleteButton);
    return card;
  }
  cardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = cardInput.value.trim();

    if (!title) {
      formMessage.textContent = 'Введите название карточки.';
      cardInput.focus();
      return;
    }
    cardList.append(createCard(title));
    cardInput.value = '';
    formMessage.textContent = '';
    updateCounter();
    cardInput.focus();
  });
  cardList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.delete-button');
    if (deleteButton && cardList.contains(deleteButton)) {
      const card = deleteButton.closest('.item-card');
      if (card && cardList.contains(card)) {
        card.remove();
        updateCounter();
      }
      return;
    }
    const card = event.target.closest('.item-card');
    if (card && cardList.contains(card)) {
      card.classList.toggle('is-active');
    }
  });
  updateCounter();
});
