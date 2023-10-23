import './css/style.scss';
import {booksList} from './books';

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
