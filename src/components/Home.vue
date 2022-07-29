<template >
<div>
<br />
<br />
<div class="row">
  <div class="col-sm-4">
    <div  class="card text-center"  style="width: 18rem;">
    <img style="width:300px;" src="https://www.scholesmarketing.com/hs-fs/hubfs/template/images/creative.png?width=400&height=400&name=creative.png" alt="...">
      <div class="card-body">
        <h5 class="card-title" style="text-align:center; color:#0083A4;">Website Design</h5>
        <p class="card-text" style="text-align:center;">Make your website a uniquely designed, lead generating tool that converts qualified prospects</p>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div  class="card text-center"  style="width: 18rem;">
    <img style="width:300px;" src="https://www.scholesmarketing.com/hs-fs/hubfs/template/images/inbound.png?width=600&height=600&name=inbound.png" alt="...">
      <div class="card-body">
        <h5 class="card-title" style="text-align:center; color:#93C24C;">Inbound Marketing</h5>
        <p class="card-text" style="text-align:center;">Attract the right prospects and guide them through the journey to becoming happy customers</p>
      </div>
    </div>
  </div>
    <div class="col-sm-4">
    <div  class="card text-center"  style="width: 18rem;">
    <img style="width:300px;" src="https://www.scholesmarketing.com/hs-fs/hubfs/template/images/analytics.png?width=600&height=600&name=analytics.png" alt="...">
      <div class="card-body">
        <h5 class="card-title" style="text-align:center; color:#F48920;">Demand Generation</h5>
        <p class="card-text" style="text-align:center;">Build and execute the perfect blend of marketing campaigns that attract and engage leads</p>
      </div>
    </div>
  </div>
  <br />
  <br />
  <div class="card text-center" style="border:white;margin-left:30%;margin-bottom:20px" >
      <h5 class="card-title" style="text-align:center;  font-size:40px; margin-top:100px; color:#0083A4">The Latest from Our Blog</h5>
</div>
    <div class="col-sm-4" >
    <div  class="card text-center"  style="width: 18rem;">
    <img style="width:287px;" src="../assets/blog1.jpeg" alt="...">
      <div class="card-body">
        <h5 class="card-title" style="text-align:center; color:#0083A4;">WebStarts Marketing Has a New Leader</h5>
        <p class="card-text" style="text-align:center;">I founded WebStarts Marketing sixteen years ago. It was a risky move for me at the time, taking a leap out of the corporate world and starting with zero customers. And, ... Read More</p>
      </div>
    </div>
  </div>
      <div class="col-sm-4">
    <div  class="card text-center"  style="width: 18rem;">
    <img style="width:287px;" src="../assets/blog2.jpeg" alt="...">
      <div class="card-body">
        <h5 class="card-title" style="text-align:center; color:#0083A4;">Nine Tricks for Beating Writer’s Block</h5>
        <p class="card-text" style="text-align:center;">Modern marketing requires a constant stream of fresh content: blog posts, white papers, case studies, landing pages. It’s never ending. And all of that content begins from ... Read More</p>
      </div>
    </div>
  </div>
      <div class="col-sm-4">
    <div  class="card text-center"  style="width: 18rem;">
    <img style="width:287px;" src="../assets/blog3.jpeg" alt="...">
      <div class="card-body">
        <h5 class="card-title" style="text-align:center; color:#0083A4;">Creating a Customer Journey Map</h5>
        <p class="card-text" style="text-align:center;">Understanding the modern customer journey is far from a straightforward task. New technologies, a complex social media landscape and changing buyer preferences ... Read More</p>
      </div>
    </div>
  </div>

      <Form @submit="handleLogin" style="text-align:center;margin-top:40px;margin-left:40%">
     <div class="form-group">
      <center>
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Create your Article</span>
          </button>
                </center>
        </div>
      </Form>
</div>
</div>
</template>

<script>
import { Form } from "vee-validate";


export default {
  name: "Home",
   components: {
    Form
  },
  data() {
    return {
      loading: false,
      content: "",
    };
  },
  
   methods: {
    handleLogin() {
      this.loading = true;

          this.$router.push("/profile");

    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

</style>