<template>
  <div>
    <h1>Вход в систему</h1>
    <b-form ref="loginForm" @submit.prevent="submit">
      <b-form-group
        id="input-group-1"
        label="Имя пользователя"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="userName"
          type="text"
          required
          placeholder="имя пользователя (логин)"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Пароль"
        label-for="input-2"
        description="В случае утраты учетных данных, обратитесь к администратору системы"
      >
        <b-form-input
          id="input-2"
          type="password"
          v-model="password"
          required
          placeholder="пароль"
        ></b-form-input>
      </b-form-group>
       <b-alert variant="danger" :show="errorMessage!==''">
         {{errorMessage}}
         </b-alert>
      <b-button type="submit" variant="primary">Войти</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      userName: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['tryUserLogin']),
    async submit() {
      if (!this.$refs.loginForm.checkValidity()) {
        return;
      }
      const result = await this.tryUserLogin({ username: this.userName, password: this.password });
      if (result.success) {
        this.$router.push('/');
      } else {
        this.errorMessage = result.error.message;
      }
    },
  },

};
</script>
