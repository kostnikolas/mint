<template>
  <div>
    <b-modal ref="modal" @hidden="onModalHidden" :title="title" @ok.prevent="handleOk">
      <b-form ref="sForm" @submit.prevent="formSubmit">
        <b-form-group
          label="Блогер"
          description="Можно оставлять только 1 отзыв на каждого блогера"
        >
          <b-form-input v-model="blogger" type="text" required placeholder="id блогера"></b-form-input>
        </b-form-group>

        <b-form-group label="Оценка" description="Оценка должна быть от 1 до 5">
          <b-form-input
            v-model="evaluation"
            required
            type="number"
            min="1"
            max="5"
            placeholder="1,2,3,4,5"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <b-alert v-if="errorMessage !=='' " show variant="danger">{{errorMessage}}</b-alert>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      blogger: "",
      evaluation: 1,
      errorMessage: ""
    };
  },
  computed: {
    ...mapState(["currentReview", "newReviewMode"]),
    title() {
      return this.newReviewMode ? "Новый отзыв" : "Редактирование отзыва";
    }
  },
  watch: {
    currentReview: function() {
      this.checkShowModal();
    },
    newReviewMode: function() {
      this.checkShowModal();
    }
  },
  methods: {
    ...mapMutations(["setCurrentReview", "setNewReviewMode"]),
    ...mapActions(["updateReviewRequest", "createReviewRequest"]),
    showModal() {
      this.blogger = this.newReviewMode ? "" : this.currentReview.blogger;
      this.evaluation = this.newReviewMode ? 1 : this.currentReview.evaluation;
      this.$refs["modal"].show();
    },
    hideModal() {
      this.$refs["modal"].hide();
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
    handleOk: async function(bvModalEvt) {
      const formValid = this.$refs["sForm"].checkValidity();
      if (!formValid) return;
      const result = this.newReviewMode
        ? await this.createReview()
        : await this.updateReview();
      if (result.success) {
        this.onModalHidden();
      } else {
        this.errorMessage = result.error.message;
      }
    },
    formSubmit() {
      console.log("formSubmit");
    },
    updateReview: async function() {
      const result = await this.updateReviewRequest({
        id: this.currentReview.id,
        blogger: this.blogger,
        evaluation: this.evaluation
      });
      console.log('updateReview', result);
      return result;
    },
    createReview: async function() {
      const result = await this.createReviewRequest({
        blogger: this.blogger,
        evaluation: this.evaluation
      });
      console.log('createReview', result);
      return result;
    }
  },
  mounted() {
    this.checkShowModal();
  }
};
</script>

