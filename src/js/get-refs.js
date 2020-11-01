export default function getRefs() {
  return {
    cardContainer: document.querySelector('.js-card-container'),
    navContainer: document.querySelector('.js-nav-container'),
    filterContainer: document.querySelector('#filter'),
    resetBtn: document.querySelector('.reset-btn'),
    searchForm: document.querySelector('.js-search-form'),
  };
}
