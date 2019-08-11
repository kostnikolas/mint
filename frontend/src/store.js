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
      user: null,
      filter: '',
    },
    getters: {
      isAuth(state) {
        return state.user !== null;
      },
    },
    mutations: {
      setSearchText(state, text) {
        state.searchText = text;
      },
      setFilter(state, filter) {
        state.filter = filter;
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
      setUserInfo(state, userInfo) {
        Vue.set(state, 'user', userInfo);
      },
    },
    actions: {
      reviewItemsRequest: async (context) => {
        const items = await api.getReviewItems(context.state.searchText, context.state.filter);
        context.commit('setReviewItems', items);
      },
      searchReviewItems: async (context, { text, filter }) => {
        context.commit('setSearchText', text);
        context.commit('setFilter', filter);
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
      getUserInfoRequest: async ({ commit }) => {
        const result = await api.getUserInfo();
        commit('setUserInfo', result);
      },
      tryUserLogin: async (context, { username, password }) => {
        const result = await api.loginUser(username, password);
        if (result.success) {
          context.dispatch('getUserInfoRequest');
        }
        return result;
      },
      userLogout: async ({ dispatch }) => {
        await api.logoutUser();
        dispatch('getUserInfoRequest');
      },
      userSignup: async ({ dispatch }, {
        username, email, password, firstName, lastName,
      }) => {
        const result = await api.signupUser(username, email, password, firstName, lastName);
        if (result.success) {
          await dispatch('tryUserLogin', { username, password });
          dispatch('getUserInfoRequest');
        }
        return result;
      },
    },
  },
);

export default store;
