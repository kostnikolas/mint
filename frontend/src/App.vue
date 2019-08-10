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
import Navigation from './components/Navigation.vue';
import {mapActions} from 'vuex';
export default {
  components: {
    Navigation,
  },
  methods:{
    ...mapActions(['reviewItemsRequest'])
  },
  mounted(){
    console.log('mounted')
    this.reviewItemsRequest();
  },
};
</script>
