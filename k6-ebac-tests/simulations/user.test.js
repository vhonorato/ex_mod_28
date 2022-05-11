import { group } from 'k6';
import Login from '../request/login.request';
import Products from '../request/products.request';
import Customers from '../request/customers.request';
import data from '../data/users.json';
import dataCustomer from '../data/customers.json';
import dataProduct from '../data/products.json';

export const options = {
    stages: [
      { duration: '10s', target: 10 },
      { duration: '5s', target: 50 },
      { duration: '10s', target: 10 },
      { duration: '5s', target: 0 }
    ],
    thresholds: {
      http_req_duration: ['p(99) < 1000']
    }
  }

export default function () {
  let login = new Login();
  let products = new Products();
  let customers = new Customers();

  group('login and get token', () => {
    login.access(data.userOK.user, data.userOK.pass);
  });
  group('products', () => {
    products.list(login.getToken());
    products.create(login.getToken(), dataProduct);
  });
  group('customers', () => {
    customers.list(login.getToken());
    customers.create(login.getToken(), dataCustomer);
  });
}
