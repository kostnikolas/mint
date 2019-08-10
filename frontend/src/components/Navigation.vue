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
            <b-nav-item href='#' @click="activateNewReviewMode">
              <font-awesome-icon icon="plus" /> Добавить отзыв
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content">
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLeaf, faThList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { mapActions } from 'vuex';

library.add(faLeaf, faThList, faPlus);

export default {
  methods:{
    ...mapActions(['activateNewReviewMode'])
  }
};
</script>
