<template>
  <div>
    <Search />
    <b-table
    hover
    :fields="fields"
    :items="items"
    @row-clicked="(item)=>onRowСlicked(item)"
    responsive="sm">
    </b-table>
    <ReviewEditor/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Search from './Search.vue';
import ReviewEditor from './ReviewEditor.vue';

export default {
  name: 'ReviewList',
  components: {
    Search, ReviewEditor,
  },
  data() {
    return {
      fields: {
        author: {
          label: 'Автор',
        },
        blogger: {
          label: 'Блоггер',
          sortable: true,
        },
        evaluation: {
          label: 'Оценка',
          sortable: true,
        },
      },
    };
  },
  computed: {
    ...mapState(['reviews']),
    items() {
      if (this.reviews === null) {
        return [];
      }
      return this.reviews.map(value => ({
        author: value.author.username,
        blogger: value.blogger,
        evaluation: value.evaluation,
        id: value.id,
      }));
    },
  },
  methods: {
    ...mapActions(['loadCurrentReview']),
    onRowСlicked(item) {
      this.loadCurrentReview(item.id);
    },
  },
};
</script>
