<template>
  <section class="main-section h-screen flex items-center text-white">
    <div
      class="container h-full flex flex-col lg:grid lg:grid-cols-5 gap-3 lg:gap-5 mx-auto"
    >
      <div class="lg:col-span-3 w-full h-1/4 lg:h-full mt-10 lg:mt-0 relative">
        <div
          class="absolute inset-0 flex items-start justify-center lg:p-8 text-left flex-col gap-5"
          v-motion
          :initial="{
            opacity: 0,
            y: 100,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 600,
            },
          }"
        >
          <span class="welcome uppercase text-xs lg:text-xl font-semibold"
            >👋 {{ $t('home.welcome') }}
          </span>
          <h3 class="main-text text-lg lg:text-5xl !font-extrabold">
            <span>EventPro Boost: </span>
            {{ $t('home.productDesc') }}
            <span>
              {{ $t('home.productDescHighlighted') }}
            </span>
          </h3>
          <span class="desc-text text-xs lg:text-2xl !font-thin">{{
            $t('home.smallDesc')
          }}</span>
          <div class="flex flex-nowrap items-center justify-start gap-3">
            <q-btn
              class="rounded-lg font-light"
              color="secondary"
              padding="xs lg"
              :label="$t('findTrip')"
              icon-right="bi-arrow-right-short"
              :size="$q.screen.lt.md ? 'md' : 'lg'"
              unelevated
              glossy
              no-caps
              @click="() => handleScroll(false)"
            />
            <q-btn
              class="rounded-lg font-light"
              text-color="secondary"
              padding="xs lg"
              :label="$t('createPlan')"
              :size="$q.screen.lt.md ? 'md' : 'lg'"
              unelevated
              no-caps
              @click="() => handleScroll(true)"
            />
          </div>
        </div>
      </div>
      <div class="lg:col-span-2 relative">
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="bg-blur w-full lg:w-3/4 p-3 lg:p-8 rounded-2xl text-white border border-gray-400 text-center flex flex-col gap-2 shadow"
          >
            <Login @handleFormCard="handleFormCard" v-if="showLogin" />
            <Cadastro @handleFormCard="handleFormCard" v-else />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { useUserStore } from 'src/stores/user';
import Login from 'src/pages/Login.vue';
import Cadastro from 'src/pages/Cadastro.vue';
import { ref } from 'vue';
import { inject } from 'vue';

export default {
  name: 'MainSection',
  components: {
    Login,
    Cadastro,
  },
  setup() {
    const bus = inject('bus');
    const user = useUserStore();
    const email = ref('');
    const showLogin = ref(true);

    const handleFormCard = () => {
      showLogin.value = !showLogin.value;
    };

    const handleScroll = async (showCalendar = false) => {
      bus.emit('handlePlanTrip', showCalendar);
      bus.emit('scrollToSection', 'discover');
    };

    return { user, email, showLogin, handleFormCard, handleScroll };
  },
};
</script>
<style lang="scss">
.main-section {
  background-image: url('../../assets/hero-background.png');
  background-size: cover;
  background-position: center center;
  position: relative;
}
.main-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../../assets/gradient.png');
  background-size: cover;
  background-position: center;
  mix-blend-mode: multiply;
}
.welcome {
  line-height: 150%;
  letter-spacing: 0.8px;
}
.main-text {
  font-weight: 600;
  line-height: 135%;
}
.desc-text {
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
}
</style>
