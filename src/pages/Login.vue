<template>
  <div class="flex flex-col items-center justify-center gap-3">
    <q-form
      @submit.prevent="onSubmit"
      class="flex flex-col gap-5 w-full items-center justify-center"
    >
      <q-input
        class="w-full"
        color="secondary"
        v-model="login.email"
        :label="$t('login.email')"
        outlined
        dark
      >
        <template v-slot:prepend>
          <q-icon name="bi-person-fill" />
        </template>
      </q-input>
      <q-input
        class="w-full"
        color="secondary"
        v-model="login.password"
        :label="$t('pass')"
        :type="isPwd ? 'password' : 'text'"
        outlined
        dark
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-checkbox class="w-full" v-model="lembrar" color="secondary" dark>
        {{ $t('login.rememberMe') }}</q-checkbox
      >
      <q-btn
        class="w-full"
        type="submit"
        color="accent"
        text-color="white"
        :label="$t('loginBtn')"
        :loading="loading"
        rounded
        no-caps
      />
      <router-link to="/forgot-pass" class="text-inherit mx-auto underline">
        {{ $t('login.forgotPass') }}
      </router-link>
    </q-form>
    <div class="grid grid-cols-11 items-center">
      <div class="col-span-5 flex items-center">
        <div class="w-full h-[1px] bg-white"></div>
      </div>
      <div class="content flex items-center justify-center text-inherit">
        <span>&nbsp;{{ $t('login.or') }}&nbsp;</span>
      </div>
      <div class="col-span-5 flex items-center">
        <div class="w-full h-[1px] bg-white"></div>
      </div>
    </div>
    <div
      id="g_id_onload"
      data-client_id="234512076978-t8qtjsrb50hqi5hnq600a7phpkitbi06.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="popup"
      data-login_uri="http://localhost:9000/#/"
      data-auto_prompt="false"
    ></div>
    <div
      class="g_id_signin"
      data-type="standard"
      data-shape="pill"
      data-theme="outline"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left"
    ></div>
    <p class="text-inherit mx-auto mt-5">
      {{ $t('login.noAccount') }}
      <a
        class="font-bold text-accent cursor-pointer"
        @click="$emit('handleFormCard')"
        >{{ $t('login.createAcc') }}</a
      >
    </p>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import * as AuthService from 'src/services/AuthService';
import { useAuthStore } from 'src/stores/auth';
import { useUserStore } from 'src/stores/user';
import { triggerNegative } from 'src/utils/triggers';
import axios from 'axios';

export default {
  name: 'LoginComponent',
  setup() {
    const login = reactive({
      email: '',
      password: '',
    });

    const auth = useAuthStore();
    const userStore = useUserStore();
    const isPwd = ref(true);
    const lembrar = ref(false);
    const loading = ref(false);

    onMounted(async () => {
      let scriptTag = document.createElement('script');
      scriptTag.setAttribute('src', 'https://accounts.google.com/gsi/client');
      scriptTag.setAttribute('async', '');
      document.head.appendChild(scriptTag);
    });

    const onSubmit = async () => {
      try {
        loading.value = true;
        const response = await AuthService.Login(login);
        const { accessToken, user } = response.data;
        auth.storageAuthTokenSave({
          accessToken,
        });

        userStore.storageUserSave(user);
        // triggerSuccess(JSON.stringify(response.data));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data.errors) {
            triggerNegative(JSON.stringify(err.response?.data.errors));
            throw JSON.stringify(err.response?.data.errors);
          } else {
            triggerNegative(err.response?.data.error);
            throw err.response?.data.error;
          }
          return;
        } else {
          throw err;
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      login,
      isPwd,
      lembrar,
      loading,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
