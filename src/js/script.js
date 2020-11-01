import getRefs from './get-refs';
import ApiService from './api-service';
import markup from './markup';

const refs = getRefs();
const apiService = new ApiService();

initializeInterface();
refs.navContainer.addEventListener('click', onPageChange);
refs.filterContainer.addEventListener('click', onFilterChange);
refs.resetBtn.addEventListener('click', resetInterfaceToDefault);
refs.searchForm.addEventListener('submit', onSearch);

function initializeInterface() {
  apiService
    .fetchCharacters()
    .then(markup.renderCardMarkup)
    .catch(data => {
      apiService.name = '';
      markup.renderErrorNotification();
    });
  apiService
    .getPaginationData()
    .then(data => {
      markup.generateNavMarkup(data);
      setFirstNavBtnStyle();
    })
    .catch(data => {
      apiService.name = '';
      markup.renderErrorNotification();
    });
}

function resetInterfaceToDefault(e) {
  e.preventDefault();
  apiService.page = 1;
  apiService.status = '';
  apiService.name = '';
  refs.searchResultEl.textContent = '';
  document.querySelectorAll('.status-btn').forEach(el => {
    el.classList.remove('status-btn-active');
  });
  initializeInterface();
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
  apiService
    .fetchCharacters()
    .then(data => {
      markup.renderCardMarkup(data);
      e.target.classList.add('nav-btn-active');
    })
    .catch(data => {
      console.log('Houston, we have a problem!');
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
  apiService
    .fetchCharacters()
    .then(data => {
      markup.renderCardMarkup(data);
      e.target.classList.add('status-btn-active');
    })
    .catch(data => {
      console.log('Houston, we have a problem!');
    });
  apiService
    .getPaginationData()
    .then(data => {
      markup.generateNavMarkup(data);
      setFirstNavBtnStyle();
    })
    .catch(data => {
      console.log('Houston, we have a problem!');
    });
}

function onSearch(e) {
  e.preventDefault();
  apiService.page = 1;
  apiService.name = e.currentTarget.elements.query.value;
  if (apiService.name === '') {
    return alert('Please type a name');
  }
  refs.searchResultEl.textContent = e.currentTarget.elements.query.value;
  e.currentTarget.elements.query.value = '';
  initializeInterface();
}
