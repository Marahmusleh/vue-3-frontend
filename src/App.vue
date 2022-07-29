<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-light">
      <a href="/" class="navbar-brand">WEBSTARTS</a>
      <div class="navbar-nav mr-auto">
        <li >
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
<div class="card bg-dark text-black" style="width:100%;" >
  <img src="https://www.scholesmarketing.com/hubfs/parallax_home/paint.jpg" style="width:100%; height:550px; border-color:white" class="card-img" alt="...">
  <div class="card-img-overlay">
    <h5 class="card-title" style="text-align:center;  font-size:40px; margin-top:150px;color:#0083A4">Let us paint your inbound marketing success.</h5>
    <p class="card-text" style="text-align:center;  font-family:'Edu VIC WA NT Beginner', cursive;">We help your business optimize inbound marketing efforts by building great websites, programs and marketing infrastructure to generate leads and revenue.</p>
  </div>
</div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
a.nav-link{
  color:black
}
a.navbar-brand{
  color:#0083A4
}
</style>