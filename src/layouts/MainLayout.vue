<template>
  <q-layout view="hHh lpR fFf">
    <Navbar
      :class="[
        'navbar',
        {
          'navbar-hidden': navbarHidden,
        },
        {
          'bg-gradient-to-r from-[#840170] to-[#0004cc]': !(
            $route.name == 'home'
          ),
        },
        { 'bg-transparent': $route.name == 'home' },
      ]"
      v-if="
        ($route.name === 'map' && $q.screen.gt.md) ||
        ['home', 'forgotpass', 'places'].includes($route.name)
      "
    />

    <q-separator />

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      elevated
      class="bg-primary"
    >
      <NavComponents :userData="userData" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <FooterComponent v-if="canShowFooter" />
    <BottomComponent v-if="this.$route.name === 'map' && $q.screen.lt.lg" />
  </q-layout>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import FooterComponent from '../components/Footer.vue';
import BottomComponent from '../components/BottomComponent.vue';
import NavComponents from '../components/Navbar/NavComponents.vue';

import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
import { useQuasar } from 'quasar';
import { useThemeStore } from 'src/stores/theme';
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from 'src/stores/user';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Navbar,
    FooterComponent,
    BottomComponent,
    NavComponents,
  },
  setup() {
    const $q = useQuasar();
    const bus = inject('bus');
    const theme = useThemeStore();
    const leftDrawerOpen = ref(false);
    const route = useRoute();

    const user = useUserStore();
    const { userData } = storeToRefs(user);

    const navbarHidden = ref(false);
    const lastScrollTop = ref(0);

    const canShowFooter = computed(() => {
      return !['map', 'forgotpass', 'places'].includes(route.name);
    });

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.value) {
        navbarHidden.value = true;
      } else {
        navbarHidden.value = false;
      }

      lastScrollTop.value = scrollTop;
    };

    onMounted(() => {
      if (theme.storeThemeDataGetter.dark && !$q.dark.isActive) {
        $q.dark.toggle();
      }

      console.log(route.name);
      if (route.name == 'home') window.addEventListener('scroll', handleScroll);
      bus.on(
        'handleMenuDrawer',
        () => (leftDrawerOpen.value = !leftDrawerOpen.value)
      );
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      userData,
      navbarHidden,
      leftDrawerOpen,
      canShowFooter,
    };
  },
});
</script>
<style lang="scss">
.nav-fixed {
  background-attachment: fixed;
}
</style>
