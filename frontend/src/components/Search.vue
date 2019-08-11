<template>
  <b-form @submit.prevent="submit">
    <b-row>
    <b-col cols="8">
      <b-input-group class="mt-3">
       <b-input-group-prepend is-text>
         <font-awesome-icon icon="search" />
       </b-input-group-prepend>
      <b-form-input
        v-model="searchText"
        placeholder="Поиск..."
      />
      <b-input-group-append>
        <b-button variant="info" @click="clearText">
          <font-awesome-icon icon="times-circle" />
        </b-button>
      </b-input-group-append>
     </b-input-group>
     </b-col>
    <b-col>
      <b-input-group class="mt-3">
       <b-input-group-prepend is-text>
         <font-awesome-icon icon="filter" />
       </b-input-group-prepend>
      <b-form-input
        v-model="filter"
        placeholder="оценка..."
      />
      <b-input-group-append>
        <b-button variant="info" @click="clearFilter">
          <font-awesome-icon icon="times-circle" />
        </b-button>
      </b-input-group-append>
     </b-input-group>
     </b-col>
    </b-row>
    <input type="submit" hidden />
  </b-form>
</template>

<script>
import { mapActions } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

library.add(faTimesCircle, faSearch, faFilter);
export default {
  data: () => (
    {
      searchText: '',
      filter: '',
    }),
  methods: {
    ...mapActions(['searchReviewItems']),
    clearText() {
      this.searchText = '';
      this.submit();
    },
    clearFilter() {
      this.filter = '';
      this.submit();
    },
    submit() {
      this.searchReviewItems({ text: this.searchText, filter: this.filter });
    },
  },
};
</script>
