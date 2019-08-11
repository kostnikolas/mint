<template>
  <div>
    <b-modal ref="modal"
     @hidden="onModalHidden" :title="title"
     @ok.prevent="handleOk"
     :hide-footer="!allowEdit"
     >
      <b-form ref="sForm" @submit.prevent="formSubmit">
        <b-form-group
          label="Блогер"
          description="Можно оставлять только 1 отзыв на каждого блогера"
        >
          <b-form-input
          v-model="blogger"
          type="text"
          :disabled="!allowEdit"
          required placeholder="id блогера">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Оценка" description="Оценка должна быть от 1 до 5">
          <b-form-input
            v-model="evaluation"
            required
            type="number"
            min="1"
            max="5"
            placeholder="1,2,3,4,5"
            :disabled="!allowEdit"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <b-alert v-if="errorMessage !=='' " show variant="danger">{{errorMessage}}</b-alert>
       <b-alert variant="warning" :show="isGuest">Вы не можете редактировать чужие отзывы</b-alert>
    </b-modal>
  </div>
</template>
<script>
import {
  mapState, mapMutations, mapActions, mapGetters,
} from 'vuex';

export default {
  data() {
    return {
      blogger: '',
      evaluation: 1,
      errorMessage: '',
    };
  },
  computed: {
    ...mapState(['currentReview', 'newReviewMode', 'user']),
    ...mapGetters(['isAuth']),
    title() {
      return this.newReviewMode ? 'Новый отзыв' : 'Редактирование отзыва';
    },
    allowEdit() {
      if (this.isAuth && this.newReviewMode) return true;

      if (this.currentReview === null) return false;
      if (!this.isAuth || this.user.id !== this.currentReview.author.id) return false;
      return true;
    },
    isGuest() {
      if (!this.isAuth || this.newReviewMode || this.currentReview === null) return false;
      if (this.user.id !== this.currentReview.author.id) return true;
      return false;
    },
  },
  watch: {
    currentReview() {
      this.checkShowModal();
    },
    newReviewMode() {
      this.checkShowModal();
    },
  },
  methods: {
    ...mapMutations(['setCurrentReview', 'setNewReviewMode']),
    ...mapActions(['updateReviewRequest', 'createReviewRequest']),
    showModal() {
      this.blogger = this.newReviewMode ? '' : this.currentReview.blogger;
      this.evaluation = this.newReviewMode ? 1 : this.currentReview.evaluation;
      this.$refs.modal.show();
    },
    hideModal() {
      this.$refs.modal.hide();
    },
    checkShowModal() {
      if (this.currentReview !== null || this.newReviewMode) {
        this.showModal();
      } else {
        this.hideModal();
      }
    },
    onModalHidden() {
      this.setCurrentReview(null);
      this.setNewReviewMode(false);
    },
    async handleOk() {
      const formValid = this.$refs.sForm.checkValidity();
      if (!formValid) return;
      const result = this.newReviewMode
        ? await this.createReview()
        : await this.updateReview();
      if (result.success) {
        this.onModalHidden();
      } else {
        const errorData = result.error.response.data;
        if (errorData.non_field_errors) {
          this.errorMessage = errorData.non_field_errors[0];
        } else {
          this.errorMessage = 'Ошибка данных';
        }
      }
    },
    formSubmit() {
    },
    async updateReview() {
      const result = await this.updateReviewRequest({
        id: this.currentReview.id,
        blogger: this.blogger,
        evaluation: this.evaluation,
      });
      return result;
    },
    async createReview() {
      const result = await this.createReviewRequest({
        blogger: this.blogger,
        evaluation: this.evaluation,
      });
      return result;
    },
  },
  mounted() {
    this.checkShowModal();
  },
};
</script>
