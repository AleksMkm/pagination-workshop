import getRefs from './get-refs';
import ApiService from './api-service';
import markup from './markup';

const refs = getRefs();

const apiService = new ApiService();

fetch('https://rickandmortyapi.com/api/character/?page=2&status=')
  .then(response => response.json())
  .then(console.log);

initializeDefaultInterface();
refs.navContainer.addEventListener('click', onPageChange);
refs.filterContainer.addEventListener('click', onFilterChange);
refs.resetBtn.addEventListener('click', resetInterfaceToDefault);

function initializeDefaultInterface() {
  apiService.fetchCharacters().then(markup.renderCardMarkup);
  apiService.getPaginationData().then(data => {
    markup.generateNavMarkup(data);
    setFirstNavBtnStyle();
  });
}

function resetInterfaceToDefault(e) {
  e.preventDefault();
  apiService.page = 1;
  apiService.status = '';
  initializeDefaultInterface();
}

function setFirstNavBtnStyle() {
  document.querySelector('.nav-btn').classList.add('nav-btn-active');
}

function onPageChange(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') return;
  document.querySelectorAll('.nav-btn').forEach(el => {
    el.classList.remove('nav-btn-active');
  });
  apiService.page = +e.target.dataset.page;
  apiService.fetchCharacters().then(data => {
    markup.renderCardMarkup(data);
    e.target.classList.add('nav-btn-active');
  });
}

function onFilterChange(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') return;
  document.querySelectorAll('.status-btn').forEach(el => {
    el.classList.remove('status-btn-active');
  });
  apiService.page = 1;
  apiService.status = e.target.dataset.status;
  apiService.fetchCharacters().then(data => {
    markup.renderCardMarkup(data);
    e.target.classList.add('status-btn-active');
  });
  apiService.getPaginationData().then(data => {
    markup.generateNavMarkup(data);
    setFirstNavBtnStyle();
  });
}
