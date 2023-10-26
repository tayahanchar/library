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

////// Intersection Observer

const options = {
  root: null,
  threshold: 0,
}

const headerObserver = new IntersectionObserver(callBack, options);
const header = document.querySelector('.header');
const welcome = document.querySelector('.welcome');
headerObserver.observe(welcome);


function callBack(entries) {
  if(!entries[0].isIntersecting) {
    header.classList.add('header-fixed');
  } else {
    header.classList.remove('header-fixed');
  }
}


////

const sectionsList = document.querySelectorAll('.section');
const sectionsObserver = new IntersectionObserver(sectionsCallBack, sectionsOptions);

sectionsList.forEach(section => {
  sectionsObserver.observe(section);
  section.classList.add('section-hidden');
});

const sectionsOptions = {
  threshold: 0.3,
};

function sectionsCallBack(entries, observer) {
  if(entries[0].isIntersecting) {
    entries[0].target.classList.remove('section-hidden');
    observer.unobserve(entries[0].target);
  }
}

/// corusel

const rightButton = document.querySelector('.button__right');
const leftButton = document.querySelector('.button__left');
const coruselImgList = document.querySelectorAll('.corusel_item');
const coruselControl = document.querySelector('.corusel-control');
const coruselControls = document.querySelectorAll('.corusel-control__item');

let itemWidth = 475;

if(document.body.clientWidth <=520) {
  itemWidth = 305;
}

let activePage = 0;
let pages;
if(document.body.clientWidth >= 1440) {
  pages = 2;
} else if (document.body.clientWidth < 1440 && document.body.clientWidth > 990 ) {
  pages = 3;
} else if (document.body.clientWidth <= 990) {
  pages = 4;
}


rightButton.addEventListener('click', moveImgesLeft);
leftButton.addEventListener('click', moveImgesRight);

function moveImgesLeft() {
  if(activePage >= pages) {
    activePage = 0;
  } else {
    activePage++;
  }
  addTranform();
  activePageControl();
}

function moveImgesRight() {
  if(activePage === 0) {
    activePage = pages;
  } else {
    activePage--;
  }
  addTranform();
  activePageControl();
}

function addTranform() {
  coruselImgList.forEach(item => {
    item.style.transform = `translateX(-${itemWidth * activePage}px)`;
    item.style.transition = '1s';
  });
}

coruselControl.addEventListener('click', chooseActivePage);

function chooseActivePage(event) {
  if(event.target.classList.contains('corusel-control__item')) {
    activePage = +event.target.dataset.number;

    addTranform();
    activePageControl();
  }
}

function activePageControl() {
  coruselControls.forEach(item => {
    item.classList.remove('corusel-control__item--active');
  });

  coruselControls[activePage].classList.add('corusel-control__item--active');
}
