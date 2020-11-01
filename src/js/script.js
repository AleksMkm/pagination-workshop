import getRefs from './get-refs';
import ApiService from './api-service';
import markup from './markup';

const refs = getRefs();

const apiService = new ApiService();

fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(console.log);

initializeDefaultInterface();

function initializeDefaultInterface() {
  apiService.fetchCharacters().then(markup.renderCardMarkup);
  apiService.getPaginationData().then(markup.generateNavMarkup);
  setTimeout(setFirstNavBtnStyle, 50);
}

function setFirstNavBtnStyle() {
  document.querySelector('.nav-btn').classList.add('nav-btn-active');
}

refs.navContainer.addEventListener('click', onPageChange);

function onPageChange(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') return;
  document.querySelectorAll('.nav-btn').forEach(el => {
    el.classList.remove('nav-btn-active');
  });
  apiService.page = +e.target.dataset.page;
  apiService.fetchCharacters().then(markup.renderCardMarkup);
  e.target.classList.add('nav-btn-active');
}

console.log(refs.filterContainer);
