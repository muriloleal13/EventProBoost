<template>
  <div class="flex flex-row flex-nowrap gap-3">
    <q-btn icon="notifications" :color="colorStyle" padding="none" dense flat>
      <q-badge color="warning" floating rounded />
      <q-menu transition-show="flip-right" transition-hide="flip-left">
        <q-list style="min-width: 100px">
          <q-item v-for="item in [1, 2, 3]" :key="item">
            <q-item-section
              class="flex flex-row items-center justify-center gap-3"
            >
              <q-skeleton type="circle" size="30px" />
              <q-skeleton class="w-[90px]" height="10px" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn
      :class="$q.screen.lt.lg ? 'px-0' : ''"
      :text-color="colorStyle"
      :label="!dense ? userData.name : ''"
      dense
      flat
      no-caps
    >
      <q-menu transition-show="flip-right" transition-hide="flip-left">
        <div class="flex flex-row flex-nowrap p-[10px]">
          <div class="flex flex-col items-center justify-center w-[92px]">
            <div class="text-bold text-center">
              {{ $t('navbar.settings') }}
            </div>
            <div class="py-[5px]">
              <q-btn
                @click="changeTheme"
                :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
                dense
                round
                flat
                v-if="userData?.id != -1"
              />
            </div>
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="flex flex-col items-center justify-evenly w-[92px]">
            <div class="text-center">
              {{ userData.name }}
            </div>

            <q-btn
              color="primary"
              :label="$t('navbar.logout')"
              padding="xs lg"
              unelevated
              rounded
              dense
              @click="onClickLogout"
              v-close-popup
              no-caps
            />
          </div>
        </div>
      </q-menu>
      <q-icon name="expand_more" v-if="!dense" />
      <q-avatar size="30px" :color="colorStyle" :text-color="textStyle">
        {{
          userData.name
            .split(' ')
            .map((n) => n[0])
            .join('')
        }}
      </q-avatar>
    </q-btn>
  </div>
</template>
<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user';
import { useThemeStore } from 'src/stores/theme';
import { useQuasar } from 'quasar';
import * as AuthService from 'src/services/AuthService';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginInfo',
  props: {
    colorStyle: {
      type: String,
      default: 'white',
    },
    textStyle: {
      type: String,
      default: 'primary',
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const user = useUserStore();
    const { userData } = storeToRefs(user);

    const $q = useQuasar();
    const theme = useThemeStore();
    const router = useRouter();

    const onClickLogout = () => {
      AuthService.signOut();
      router.push('/login');
    };

    const changeTheme = () => {
      $q.dark.toggle();
      theme.storageThemeSave({ dark: $q.dark.isActive });
    };

    return { userData, onClickLogout, changeTheme };
  },
};
</script>
<style lang=""></style>
