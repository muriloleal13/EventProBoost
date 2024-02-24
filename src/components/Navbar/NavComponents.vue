<template>
  <div
    :class="{
      hidden: !showMenu,
      flex: showMenu,
    }"
    class="flex-col lg:flex-row items-center gap-3"
  >
    <ul
      class="flex flex-col lg:flex-row mx-auto items-center justify-center gap-[25px] bg-blur px-[10px] py-[5px] mt-10 lg:mt-0 text-gray-400 lg:rounded-lg lg:border lg:border-gray-400"
    >
      <template v-for="(item, idx) in ['main', 'discover', 'info']" :key="item">
        <li class="cursor-pointer" @click="() => handleScroll(item)">
          <span>{{ $t(`link${idx + 1}`) }}</span>
        </li>
      </template>
    </ul>
    <q-btn
      icon-right="bi-arrow-right-short"
      class="rounded-lg"
      :label="$t('createPlan')"
      padding="xs lg"
      color="accent"
      unelevated
      no-caps
      v-if="userData.id == -1"
      @click="() => handleScroll('discover', true)"
    />
    <div class="flex flex-row gap-3" v-else>
      <LoginInfo />
    </div>
    <q-btn icon="bi-gear-wide-connected" color="accent" round dense flat>
      <q-menu transition-show="flip-right" transition-hide="flip-left">
        <div class="flex flex-nowrap gap-3 p-[15px]">
          <LanguageSelector />
          <q-btn
            @click="changeTheme"
            :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            padding="none"
            :color="userData.id !== -1 ? 'white' : ''"
            dense
            round
            flat
            v-if="!userData || userData.id == -1"
          />
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>
<script>
import LanguageSelector from '../../components/Navbar/LanguageSelector.vue';
import LoginInfo from '../../components/LoginInfo.vue';
import { useThemeStore } from 'src/stores/theme';
import { useTourStore } from 'src/stores/tour';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

export default {
  name: 'NavComponents',
  components: {
    LanguageSelector,
    LoginInfo,
  },
  props: {
    userData: Object,
    showMenu: { type: Boolean, default: true },
  },
  setup() {
    const $q = useQuasar();
    const theme = useThemeStore();
    const tour = useTourStore();
    const router = useRouter();
    const bus = inject('bus');

    const handleScroll = async (sectionId, showCalendar = false) => {
      if (router.currentRoute.value.name !== 'home') router.push('/');
      if ($q.screen.lt.md) bus.emit('handleMenuDrawer');

      if (sectionId == 'discover') bus.emit('handlePlanTrip', showCalendar);

      bus.emit('scrollToSection', sectionId);
    };

    const changeTheme = () => {
      $q.dark.toggle();
      theme.storageThemeSave({ dark: $q.dark.isActive });
    };

    return { tour, handleScroll, changeTheme };
  },
};
</script>
<style lang="scss"></style>
