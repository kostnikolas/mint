import Vue from 'vue';
import Vuex from 'vuex';
import * as api from './api';

Vue.use(Vuex);

const store = new Vuex.Store(
  {
    state: {
      reviews: null,
      searchText: '',
      currentReview: null,
      newReviewMode: false,
    },
    mutations: {
      setSearchText(state, text) {
        state.searchText = text;
      },
      setReviewItems(state, items) {
        Vue.set(state, 'reviews', items);
      },
      setCurrentReview(state, currentReview) {
        Vue.set(state, 'currentReview', currentReview);
      },
      setNewReviewMode(state, status) {
        state.newReviewMode = status;
      },
    },
    actions: {
      reviewItemsRequest: async (context) => {
        const items = await api.getReviewItems(context.state.searchText);
        context.commit('setReviewItems', items);
      },
      searchReviewItems: async (context, text) => {
        context.commit('setSearchText', text);
        context.dispatch('reviewItemsRequest');
      },
      activateNewReviewMode: ({ commit }) => {
        commit('setCurrentReview', null);
        commit('setNewReviewMode', true);
      },
      loadCurrentReview: async (context, id) => {
        const review = await api.loadReviewDetail(id);
        if (review === null) return;
        context.commit('setNewReviewMode', false);
        context.commit('setCurrentReview', review);
      },
      updateReviewRequest: async (context, { id, blogger, evaluation }) => {
        const result = await api.updateReview(id, blogger, evaluation);
        if (result.success) {
          context.dispatch('reviewItemsRequest');
        }
        return result;
      },
      createReviewRequest: async (context, { blogger, evaluation }) => {
        const result = await api.createReview(blogger, evaluation);
        if (result.success) {
          context.dispatch('reviewItemsRequest');
        }
        return result;
      },
    },
  },
);

export default store;
