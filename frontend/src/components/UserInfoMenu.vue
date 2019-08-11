<template>
<b-navbar-nav class="ml-auto">
  <b-nav-item-dropdown right>
    <template slot="button-content">
      <em>{{user.username}}</em>
    </template>
    <b-dropdown-item href="#" @click="userLogout">Выход</b-dropdown-item>
  </b-nav-item-dropdown>
</b-navbar-nav>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['userLogout']),
  },

};
</script>
