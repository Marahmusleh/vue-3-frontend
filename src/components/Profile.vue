<template>
<center>
<div style="max-width: 540px; margin-top:30px;">
<div class="card" style="width: 18rem;">
  <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{currentUser.username}}</h5>
    <h5 class="card-title">{{currentUser.email}}</h5>
    <p class="card-text">{{currentUser.username}} serves as a strategic advisor to the WEBSTARTS Marketing team.</p>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Create your article</button>
       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New Article</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <Form @submit="createBlog" :validation-schema="schema">
        <div class="form-group">
          <label for="img">Image</label>
          <Field name="img" type="text" class="form-control" />
          <ErrorMessage name="img" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <Field name="title" type="text" class="form-control" />
          <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="text">Text</label>
          <Field name="text" type="text" class="form-control" />
          <ErrorMessage name="text" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">
           Send
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      
    </div>
  </div>
</div>
      <h1>My Articles</h1>
      <br />
      <div class="card mb-3" v-if="this.loggedIn">
<div class="row" >
  <div v-for="element in this.content" 
   class="col-sm-6"
    style="max-width: 600px; margin-top:20px;"
    v-bind:key = "element.id">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="https://c0.wallpaperflare.com/preview/71/610/431/advice-article-background-beverage.jpg" alt="pic" style="width:200px;height:360px" >
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{element.title}}</h5>
        <p class="card-text">{{element.text}}</p>
         <p class="card-text"><small class="text-muted">createdAt: {{ moment(element.createdAt).format("YYYY-MM-DD") }}
                                </small></p>
        <button type="button" @click="(event) => handelModalUpdate(element)" class="btn btn-primary" data-toggle="modal" data-target="#edit" data-whatever="@mdo">Edit</button>
       <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="editlLabel">Edit Article</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <Form @submit="editBlog" id="editBlog" :validation-schema="schema">
        <div class="form-group">
          <label for="img">Image</label>
          <Field name="img" type="text" class="form-control"  />
          <ErrorMessage name="img" class="error-feedback"   />
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <Field name="title" type="text" class="form-control"  />
          <ErrorMessage name="title" class="error-feedback"   />
        </div>
        <div class="form-group">
          <label for="text">Text</label>
          <Field name="text" type="text" class="form-control" />
          <ErrorMessage name="text" class="error-feedback"  />
        </div>
        <div class="form-group">
          <button id="editBlog" class="btn btn-primary btn-block">
           Send
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  </div>
  </div>
</div>
</div>
</center>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from "../services/user.service";
import axios from 'axios';
import moment from "moment";



export default {
  name: 'Profile',
    components: {
    Form,
    Field,
    ErrorMessage,
  },
    data() {
      const schema = yup.object().shape({
      img: yup.string().required("Image is required!"),
      title: yup.string().required("Title is required!"),
      text: yup.string().required("Text is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
      createdArticle: false,
      content: "",
      articleData:"",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
     articlePosted() {
      return this.$store.state.auth.status.articleCreated;
    },
     loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
    created: function () {
    this.moment = moment;
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
   UserService.getUserBoard(this.currentUser.id).then(
      (response) => {
        console.log("marah");
        this.content = response.data.articles[0].article.sort((a, b)=> {
          console.log(a.createdAt, "old time");
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
       
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    createBlog(user) {
      this.loading = true;
      this.createdArticle = false;
      console.log(this.content,"dataa")
      this.$store.dispatch("auth/createArticle", this.currentUser.id , user ).then(
        () => {
        this.createdArticle = true;
        this.$router.go()
        },
        (error) => {
          this.loading = false;
          this.createdArticle=false
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
      editBlog(article) {
      this.loading = true;
      this.createdArticle = false;
      console.log(article,"article")
      const API_URL = 'http://localhost:8080/api/test/updateArticle/';
      axios.put(API_URL + this.articleData.id, {
      img:article.img,
      title:article.title,
      text:article.text
    }).then(
        () => {
        this.createdArticle = true;
        this.$router.go();
        },
        (error) => {
          this.loading = false;
          this.createdArticle=false
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    handelModalUpdate(element){
      this.articleData=element;
    },
    getImage(path) {
    return require(path)
  }
  }
};
</script>