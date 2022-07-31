import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {

 async getUserBoard(id) {
   const data= await axios.get(API_URL + 'user' +'/' + id , { headers: authHeader() });
   console.log(data,"userDAta");
   return data
  }

  createArticle(id,user) {
    return axios
      .post(API_URL + 'createArticle' + '/' + id, {
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
