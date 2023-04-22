import { handleError } from './error.js';

export class HttpClient {
  constructor(options = {}) {
    this.baseURL = options.baseURL || '';
  }

  async fetchJSON(endpoint, options = {}) {
    return await fetch(this.baseURL + endpoint, {
      ...options,
    }).then((res) => {
      if (!res.ok) {
        handleError(res);
      } else {
        return res.json();
      }
    });
  }

  get(endpoint, options = {}) {
    return this.fetchJSON(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  post(endpoint, body, options = {}) {
    return this.fetchJSON(endpoint, {
      ...options,
      body: JSON.stringify(body),
      method: 'POST',
    });
  }

  delete(endpoint, options = {}) {
    return this.fetchJSON(endpoint, {
      parseResponse: false,
      ...options,
      method: 'DELETE',
    });
  }
}
