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

function renderErrorNotification() {
  refs.navContainer.innerHTML = `<div>Opps! No data to match your request! Please enter another name.</div>`;
}

export default {
  renderCardMarkup,
  generateNavMarkup,
  renderErrorNotification,
};
