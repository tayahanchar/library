import './css/style.scss';
import {booksList} from './books';

/// favourites

const seasonsRadioList = document.querySelector('.radio-list');
const booksParent = document.querySelector('.books-list');

shownBooksList(false, true);

seasonsRadioList.addEventListener('click', ((event) => shownBooksList(event, false)));

function shownBooksList(event, firstLoad) {

  if(firstLoad) {
    booksList.winter.map(item => {
      const content = `
      <div class="book">
      <p class="category">Staff Picks</p>
      <p class="book_name">${item.bookName}</p>
      <p class="book_author">${item.bookAuthor}</p>
      <p class="book_description">${item.bookDescription}</p>
      <button class="book_buy">Buy</button>
      <img class="book__img" src="${item.bookImg}" alt="book">
    </div>
    `;

    booksParent.insertAdjacentHTML('beforeend', content);
    })
  } else if(event.target.closest('[data-season]')) {

    const season = event.target.closest('[data-season]').dataset.season;

    document.querySelectorAll(['.book']).forEach(book => book.classList.add('book-off'));

    function addBooks() {
      booksParent.innerHTML = '';
      booksList[season].map(item => {
        const content = `
        <div class="book">
        <p class="category">Staff Picks</p>
        <p class="book_name">${item.bookName}</p>
        <p class="book_author">${item.bookAuthor}</p>
        <p class="book_description">${item.bookDescription}</p>
        <button class="book_buy">Buy</button>
        <img class="book__img" src="${item.bookImg}" alt="book">
      </div>`;

      booksParent.insertAdjacentHTML('beforeend', content);
      })
    }
    setTimeout(addBooks, 1000);
  }
};

//// nav

const headerRight = document.querySelector('.header-right');

headerRight.addEventListener('mouseover', (event) => blurElements(event, 0.3));
headerRight.addEventListener('mouseout', (event) => blurElements(event, 1));

function blurElements(event, opasity) {
  if(event.target.classList.contains('nav-list__link') || event.target.classList.contains('profile')) {
    document.querySelectorAll('.nav-list__link').forEach(item => {
      item.style.opacity = opasity;
      document.querySelector('.profile').style.opacity = opasity;
    })
    event.target.style.opacity = 1;
  }
}