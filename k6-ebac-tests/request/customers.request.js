import { check } from 'k6';
import http from 'k6/http';
import Utils from '../utils/utils';

export default class Customers {
  #url = `${Utils.getBaseURL()}/customers`;
  #params(token) {
    return Utils.getAuthorization(token);
  }

  list(token) {
    let request = http.get(this.#url, this.#params(token));
    let checker = { 'listing should return 200': (r) => r && r.status === 200 };
    
    check(request, checker);
  }
  create(token, body) {
    let request = http.post(this.#url, JSON.stringify(body), this.#params(token));
    let checker = { 'create customer should return 201': (r) => r.status === 201 };

    check(request, checker);
  }
}
