<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-container>
        <b-navbar-brand to="/">
          <font-awesome-icon icon="leaf" /> Mint
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">
              <font-awesome-icon icon="th-list" /> Отзывы
            </b-nav-item>
            <b-nav-item
            to='/'
            @click="activateNewReviewMode"
            :disabled="!isAuth"
            :title="isAuth ? 'Добавить' : 'Требуется вход в систему'"
            >
              <font-awesome-icon icon="plus" /> Добавить отзыв
            </b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
            <UserInfoMenu v-if="isAuth"/>
            <UserLogRegMenu v-else />
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLeaf, faThList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { mapActions, mapGetters } from 'vuex';
import UserInfoMenu from './UserInfoMenu.vue';
import UserLogRegMenu from './UserLogRegMenu.vue';

library.add(faLeaf, faThList, faPlus);

export default {
  components: {
    UserInfoMenu, UserLogRegMenu,
  },
  methods: {
    ...mapActions(['activateNewReviewMode']),
  },
  computed: {
    ...mapGetters(['isAuth']),
  },
};
</script>
