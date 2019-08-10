<template>
  <b-form @submit.prevent="submit">
    <label class="sr-only" for="search-input">Поиск...</label>
    <b-input
      id="search-input"
      v-model="searchText"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Поиск..."
    ></b-input>

    <input type="submit" hidden />
  </b-form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  data: () => (
    {
      searchText: "",
    
  }),
  methods: {
    ...mapActions(['searchReviewItems']),

    submit() {
      this.searchReviewItems(this.searchText);
    }
  }
};
</script>
