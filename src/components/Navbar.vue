<template>
  <nav
    class="fixed w-full py-3 z-[10]"
    :class="[
      {
        'navbar-hidden': navbarHidden,
      },
    ]"
  >
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link to="/">
          <!-- <img
            src="../assets/logo.png"
            alt="logo projetinho"
            class="object-fill w-[150px] h-[90]"
          /> -->
          <span class="text-info">LOGO</span>
        </router-link>
        <div
          class="cursor-pointer text-2xl leading-none p-1 border border-solid border-transparent rounded bg-transparent flex lg:hidden items-center justify-center outline-none focus:outline-none"
          type="button"
          @click="toggleNav"
        >
          <q-icon
            name="menu"
            :color="userData.id != -1 ? 'white' : 'primary'"
          />
        </div>
      </div>
      <NavComponents :userData="userData" :showMenu="showMenu" />
    </div>
  </nav>
</template>
<script>
import NavComponents from '../components/Navbar/NavComponents.vue';
import { defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user';
import { useQuasar } from 'quasar';
import { inject } from 'vue';

export default defineComponent({
  name: 'NavbarComponent',
  components: {
    NavComponents,
  },
  props: {
    navbarHidden: Boolean,
  },
  setup() {
    const user = useUserStore();
    const $q = useQuasar();
    const bus = inject('bus');

    const { userData } = storeToRefs(user);

    const showMenu = ref($q.screen.gt.sm);

    const toggleNav = () => {
      showMenu.value = false;
      bus.emit('handleMenuDrawer');
    };

    return {
      userData,
      showMenu,
      toggleNav,
    };
  },
});
</script>
<style lang="scss">
.navbar {
  transition: transform 0.3s ease-in-out;
}
.navbar-hidden {
  transform: translateY(-100%);
}
</style>
