const BASE_URL = 'https://rickandmortyapi.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this._page = 1;
    this._status = '';
  }

  fetchCharacters() {
    const url = `${BASE_URL}/character/?page=${this._page}&status=${this._status}`;

    return this.fetchData(url).then(({ results }) => {
      return results;
    });
  }

  getPaginationData() {
    const url = `${BASE_URL}/character/?status=${this._status}`;

    return this.fetchData(url).then(({ info }) => {
      return info.pages;
    });
  }

  fetchData(url) {
    return fetch(url).then(response => response.json());
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }
}
