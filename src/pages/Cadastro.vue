<template>
  <q-form
    @submit.prevent="onSubmit"
    class="flex flex-col items-center justify-center"
  >
    <q-input
      class="w-full"
      color="secondary"
      v-model="register.nome"
      :label="$t('register.fullName')"
      :rules="[(val) => !!val || $t('register.ruleName')]"
      outlined
      dark
    />
    <q-input
      class="w-full"
      color="secondary"
      type="email"
      v-model="register.email"
      :label="$t('email')"
      :rules="[
        (val) => !!val || $t('register.ruleEmail'),
        () => isValidEmail(),
      ]"
      outlined
      dark
    />
    <q-input
      class="w-full"
      color="secondary"
      v-model="register.cpf"
      :label="$t('register.cpf')"
      :rules="[(val) => (val && val.length === 14) || $t('register.ruleCPF')]"
      mask="###.###.###-##"
      outlined
      dark
    />
    <q-input
      class="w-full"
      color="secondary"
      type="tel"
      v-model="register.telefone"
      :label="$t('register.phone')"
      mask="(##) #########"
      :rules="[(val) => (val && val.length === 14) || $t('register.rulePhone')]"
      outlined
      dark
    />
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-3 items-center justify-center w-full"
    >
      <q-input
        v-model="register.senha"
        color="secondary"
        :label="$t('pass')"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          (val) =>
            (val == val && val.length > 8 && containsUppercase(val)) ||
            $t('register.rulePass'),
        ]"
        outlined
        dark
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
        v-model="register.confirmaSenha"
        color="secondary"
        :label="$t('register.confirmPass')"
        :type="isConfPwd ? 'password' : 'text'"
        :rules="[
          (val) => val == register.senha || $t('register.ruleConfirmPass'),
        ]"
        outlined
        dark
      >
        <template v-slot:append>
          <q-icon
            :name="isConfPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isConfPwd = !isConfPwd"
          />
        </template>
      </q-input>
    </div>
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-3 items-center justify-center w-full"
    >
      <q-btn
        flat
        color="accent"
        :label="$t('back')"
        class="q-ml-sm"
        rounded
        no-caps
        @click="$emit('handleFormCard')"
      />
      <q-btn
        color="accent"
        :label="$t('submit')"
        type="submit"
        rounded
        no-caps
      />
    </div>
  </q-form>
</template>
<script>
import { ref } from 'vue';
import * as UserService from 'src/services/UserService';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { triggerSuccess, triggerNegative } from 'src/utils/triggers';
import { useQuasar } from 'quasar';
import axios from 'axios';

export default {
  name: 'CadastroComponent',
  setup() {
    const register = ref({
      nome: '',
      email: '',
      cpf: '',
      nascimento: '',
      senha: '',
      confirmaSenha: '',
      telefone: '()',
    });

    const $q = useQuasar();
    const router = useRouter();
    const { t } = useI18n();
    const isPwd = ref(true);
    const isConfPwd = ref(true);

    const onSubmit = async () => {
      $q.loading.show();
      try {
        const response = await UserService.CadastroUserNovo(register.value);
        triggerSuccess(t('successRegister') + ` - ${response.data}`);
        router.push('/planos');
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
        $q.loading.hide();
      }
    };

    const isValidEmail = () => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return (
        emailPattern.test(register.value.email) || t('register.ruleEmail2')
      );
    };

    return {
      router,
      register,
      isPwd,
      isConfPwd,
      onSubmit,
      isValidEmail,
    };
  },
};
</script>
<style lang="scss">
.img-profile-pic {
  border: 5px solid $primary;
  border-radius: 50%;
}

.border-blue {
  border-left-color: $primary;
}
</style>
