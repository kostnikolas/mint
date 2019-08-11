<template>
  <b-container class="bv-example-row" fluid>
    <b-row>
      <b-col>
        <Navigation />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';
import Navigation from './components/Navigation.vue';

export default {
  components: {
    Navigation,
  },
  methods: {
    ...mapActions(['reviewItemsRequest', 'getUserInfoRequest']),
  },
  mounted() {
    this.reviewItemsRequest();
    this.getUserInfoRequest();
  },
};
</script>
