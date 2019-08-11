<template>
  <div>
    <h1>Регистрация</h1>
    <b-form ref="loginForm" @submit.prevent="submit">
      <b-form-group
        label="Логин"
      >
        <b-form-input
          v-model="userName"
          type="text"
          required
          placeholder="имя пользователя (логин)"
        />
        <b-alert variant="danger" :show="userNameError!==''">
         {{userNameError}}
         </b-alert>
      </b-form-group>
      <b-form-group
        label="Email"
      >
        <b-form-input
          v-model="email"
          type="email"
          required
          placeholder="почта"
        />
        <b-alert variant="danger" :show="emailError!==''">
         {{emailError}}
         </b-alert>
      </b-form-group>
      <b-form-group
        label="Имя (опционально)"
      >
        <b-form-input
          v-model="firstName"
          type="text"

          placeholder="Имя"
        />
      </b-form-group>
      <b-form-group
        label="Фамилия (опционально)"
      >
        <b-form-input
          v-model="lastName"
          type="text"

          placeholder="Фамилия"
        />
      </b-form-group>
      <b-form-group
        label="Пароль"
        description="минимум 8 символов"
      >
        <b-form-input
          type="password"
          v-model="password"
          required
          placeholder="пароль"
        />
        <b-alert variant="danger" :show="passwordError!==''">
         {{passwordError}}
         </b-alert>
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
      email: '',
      firstName: '',
      lastName: '',
      errorMessage: '',
      userNameError: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    ...mapActions(['userSignup']),
    async submit() {
      if (!this.$refs.loginForm.checkValidity()) {
        return;
      }
      const result = await this.userSignup({
        username: this.userName,
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      });
      if (result.success) {
        this.$router.push('/');
      } else {
        const errorData = result.error.response.data;
        this.userNameError = errorData.username ? errorData.username[0] : '';
        this.emailError = errorData.email ? errorData.email[0] : '';
        this.passwordError = errorData.password ? errorData.password[0] : '';
        this.errorMessage = result.error.message;
      }
    },
  },

};
</script>
