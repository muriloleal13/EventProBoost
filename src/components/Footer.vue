<template lang="">
  <footer
    class="container flex flex-col w-full h-full mx-auto items-center justify-evenly gap-20 mt-[50px]"
  >
    <div
      class="flex flex-row flex-wrap w-full items-center lg:items-start justify-between lg:justify-start gap-y-5"
    >
      <div
        class="flex flex-col items-center lg:items-start justify-start gap-10 w-full lg:w-2/5"
      >
        <router-link to="/">
          <!-- <img
            src="../assets/logo.png"
            alt="logo projetinho"
            class="object-fill w-[150px] h-[90]"
          /> -->
          <span>LOGO</span>
        </router-link>
        <div class="flex flex-wrap max-w-[350px] text-center lg:text-start">
          {{ $t('footer.desc') }}
        </div>
      </div>
      <div class="flex flex-col items-start justify-start gap-5 w-1/2 lg:w-1/5">
        <b>{{ $t('footer.navigate') }}</b>
        <a class="cursor-pointer" @click="() => handleScroll('about')">{{
          $t('link1')
        }}</a>
        <a class="cursor-pointer" @click="() => handleScroll('solutions')">{{
          $t('link2')
        }}</a>
        <a class="cursor-pointer" @click="() => handleScroll('benefits')">{{
          $t('link3')
        }}</a>
      </div>
      <div class="flex flex-col items-start justify-start gap-5 w-1/2 lg:w-1/5">
        <b>{{ $t('footer.support') }}</b>
        <a href="">{{ $t('footer.terms') }}</a>
        <a href="">{{ $t('footer.policy') }}</a>
        <span class="cursor-default">&nbsp;</span>
      </div>
      <div
        class="flex flex-col items-start justify-center gap-5 w-full lg:w-1/5"
      >
        <div class="flex flex-col items-start gap-5 w-full">
          <b>{{ $t('footer.contact') }}</b>
          <a
            href=""
            class="flex lg:flex-nowrap items-center justify-center gap-3 lg:gap-3"
          >
            <q-icon name="mail" />
            comercial@projetinho.com.br
          </a>
          <a
            href=""
            class="flex lg:flex-nowrap items-center justify-center gap-3 lg:gap-3"
          >
            <q-icon name="call" />
            +55 (51) 99758-7613
          </a>
        </div>
        <div class="flex flex-col gap-2 lg:gap-3 pt-[10px] w-full">
          <b>{{ $t('footer.socials') }}</b>
          <div class="flex gap-7">
            <img
              class="object-contain w-[20px] h-[20px] cursor-pointer"
              :class="$q.dark.isActive ? 'invert' : ''"
              src="../assets/linkedinLogo.png"
              alt="linkedin Logo"
            />
            <img
              class="object-contain w-[20px] h-[20px] cursor-pointer"
              :class="$q.dark.isActive ? 'invert' : ''"
              src="../assets/fbLogo.png"
              alt="facebook Logo"
            />
            <img
              class="object-contain w-[20px] h-[20px] cursor-pointer"
              :class="$q.dark.isActive ? 'invert' : ''"
              src="../assets/instaLogo.png"
              alt="insta Logo"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-row lg:flex-col items-center lg:items-start justify-center gap-x-10 lg:justify-between w-full"
    >
      <h1 class="text-2xl bg-primary rounded-2xl p-3 text-white">
        Powered by MUKKAL
      </h1>
    </div>
    <div
      class="py-[20px] text-xs text-neutral-400 text-center lg:text-start w-full"
    >
      {{ $t('footer.copyright') }}
    </div>
  </footer>
</template>
<script>
import { useRouter } from 'vue-router';
import { inject } from 'vue';
import { getImageURL } from 'src/utils/image';

export default {
  name: 'FooterComponent',
  setup() {
    const router = useRouter();
    const bus = inject('bus');

    const handleScroll = (sectionId) => {
      if (router.currentRoute.value.name !== 'home') {
        router.push('/');
      }
      bus.emit('scrollToSection', sectionId);
    };

    return {
      handleScroll,
      getImageURL,
    };
  },
};
</script>
<style lang=""></style>
