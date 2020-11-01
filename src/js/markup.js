import getRefs from './get-refs';
import characterCardTpl from '../templates/character-card.hbs';

const refs = getRefs();

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

export default { renderCardMarkup, generateNavMarkup };
