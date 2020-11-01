const BASE_URL = 'https://rickandmortyapi.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this._page = 1;
  }

  fetchCharacters() {
    const url = `${BASE_URL}/character/?page=${this._page}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return results;
      });
  }

  getPaginationData() {
    const url = `${BASE_URL}/character`;

    return fetch(url)
      .then(response => response.json())
      .then(({ info }) => {
        return info.pages;
      });
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }
}
