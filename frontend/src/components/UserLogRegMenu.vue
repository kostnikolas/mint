<template>
  <b-navbar-nav class="ml-auto">
     <b-nav-item :to="{name: 'login'}">
       <font-awesome-icon icon="sign-in-alt" /> Вход</b-nav-item>
      <b-nav-item :to="{name: 'signup'}">
        <font-awesome-icon icon="user-plus" /> Регистрация</b-nav-item>
  </b-navbar-nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faSignInAlt, faUserPlus);
export default {

};
</script>
