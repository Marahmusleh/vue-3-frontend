import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  createArticle(user) {
    return axios
      .post(API_URL + 'createArticle', {
        img:user.img,
        title:user.title,
        text:user.text
      })
  }

  getArticle(){
    return axios.get(API_URL + 'getArticle');
  }



}

export default new UserService();
