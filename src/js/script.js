import getRefs from './get-refs';
import ApiService from './api-service';
import characterCardTpl from '../templates/character-card.hbs';

const refs = getRefs();

const apiService = new ApiService();

fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(console.log);

apiService.fetchCharacters().then(renderCardMarkup);
apiService.getPaginationData().then(generateNavMarkup);

function renderCardMarkup(data) {
  const markup = characterCardTpl(data);
  refs.cardContainer.innerHTML = markup;
}

function generateNavMarkup(num) {
  let markup = '';
  for (let i = 1; i <= num; i += 1) {
    markup += `<a class="nav-btn" data-page="${i}">${i}</a>`;
  }
  refs.navContainer.innerHTML = markup;
}

refs.navContainer.addEventListener('click', onPageChange);

function onPageChange(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') return;
  apiService.page = +e.target.dataset.page;
  apiService.fetchCharacters().then(renderCardMarkup);
}
