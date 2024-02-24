<template>
  <div
    class="flex flex-col items-center justify-center gap-5 py-[150px]"
    v-if="!submitted"
  >
    <span class="text-xl text-primary">
      Esqueceu sua senha? Informe aqui seu email para redefinir
    </span>
    <q-form
      @submit.prevent="onSubmit"
      class="flex flex-col gap-5 w-full px-[20px] items-center justify-center"
    >
      <q-input
        color="primary"
        v-model="email"
        :label="$t('login.email')"
        class="w-[250px] md:w-[350px]"
        :rules="[
          (val) => !!val || $t('register.ruleEmail'),
          () => isValidEmail(),
        ]"
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-btn
        type="submit"
        color="primary"
        text-color="white"
        :label="$t('submit')"
        :loading="loading"
        no-caps
      />
    </q-form>
  </div>
  <div
    class="flex flex-col items-center justify-center gap-5 py-[150px]"
    v-else
  >
    <span class="text-xl text-primary">
      Sua solicitação foi enviada! Verifique seu email para redefinir sua senha.
    </span>
    <q-btn to="/" label="Voltar para Home" color="primary" />
  </div>
</template>
<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
  setup() {
    const email = ref('');
    const submitted = ref(false);
    const loading = ref(false);
    const { t } = useI18n();

    const onSubmit = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        submitted.value = true;
      }, 3000);
    };

    const isValidEmail = () => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(email.value) || t('register.ruleEmail2');
    };

    return { email, submitted, loading, onSubmit, isValidEmail };
  },
};
</script>
<style lang="scss"></style>
