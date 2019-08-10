<template>
  <b-container>
    <h1>Список отзывов</h1>
    <ReviewList/>
  </b-container>
</template>

<script>
import ReviewList from '@/components/ReviewList.vue';

export default {
  name: 'Review',
  components: {
    ReviewList,
  },
};
</script>
