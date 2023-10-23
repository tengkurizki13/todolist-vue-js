<script>
// import { RouterLink } from 'vue-router'
// import { mapActions } from 'pinia'
// import { useAuthenticationStore } from '../stores/authentication'


// export default {
//   data(){
//     return{
//       isLogin:localStorage.access_token 
//     }
//   },
//   methods: {
//     ...mapActions(useAuthenticationStore, ['logout']),
//     logoutHandler(){
//       this.isLogin= false
//       this.logout()
//     },
//     changePathToHome(){
//       this.$router.push("/")
//     },
//   }
// }
// </script>
<template>
  <div data-cy="header-background" class="jss8 jss257"><div data-cy="header-title" class="jss9">TO DO LIST APP</div></div>
</template>

<style>
.jss8{
    height: 105px;
    display: flex;
    background: #16ABF8;
    align-items: center;
}
.jss257 {
    margin-bottom: 42px;
}
.jss9 {
    color: #FFFFFF;
    width: 100%;
    margin: auto;
    font-size: 24px;
    max-width: 1000px;
    font-style: normal;
    font-weight: bold;
    text-transform: uppercase;
}
</style>