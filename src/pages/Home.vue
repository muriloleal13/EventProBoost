<template>
  <main class="scroll-smooth">
    <MainSection id="main" />
    <DiscoverSection id="discover" />
    <InfoSection id="info" />
  </main>
</template>
<script>
import MainSection from '../components/Home/MainSection.vue';
import DiscoverSection from '../components/Home/DiscoverSection.vue';
import InfoSection from 'src/components/Home/InfoSection.vue';
import { useGeolocation } from '../utils/useGeolocation';
import { defineComponent, onMounted } from 'vue';
import { inject } from 'vue';

export default defineComponent({
  name: 'HomeComponent',
  components: {
    MainSection,
    DiscoverSection,
    InfoSection,
  },
  setup() {
    const { coords } = useGeolocation();
    const bus = inject('bus');

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    onMounted(() => {
      bus.on('scrollToSection', (sectionId) => scrollToSection(sectionId));
    });

    return {
      coords,
      scrollToSection,
    };
  },
});
</script>
<style lang="scss"></style>
