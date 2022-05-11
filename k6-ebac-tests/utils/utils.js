export default class Utils {
  static getBaseURL() {
    switch (process.env.NODE_ENV) {
      case 'development':
        return `http://localhost:3000/api`;
      case 'production':
        return `http://localhost:3000/api`;
    }
  }
  static getAuthorization(token) {
    return { headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` } };
  }
}
