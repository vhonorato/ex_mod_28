import { check } from 'k6';
import http from 'k6/http';
import Utils from '../utils/utils';

export default class Login {
  #token;

  access(user, pass) {
    let url = `${Utils.getBaseURL()}/login`;
    let params = { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } };
    let body = JSON.stringify({ username: user, password: pass });
    let request = http.post(url, body, params);
    this.#token = request.json('accessToken');
    let checker = { 'login should return 201': (r) => r.status === 201 };

    check(request, checker);
  }

  getToken() {
    return this.#token;
  }
}
