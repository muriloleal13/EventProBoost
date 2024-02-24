<template lang="">
  <footer
    class="flex flex-row flex-nowrap w-screen h-[8vh] items-center justify-center gap-1 rounded-t-lg"
    :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-dark'"
  >
    <template
      v-for="(item, idx) in [
        { name: 'settings_suggest', type: 'opt', text: 'Opções' },
        { name: 'share_location', type: 'map', text: 'Mapa' },
      ]"
      :key="item.name"
    >
      <template v-if="idx == 1"><q-separator vertical /></template>
      <div
        class="flex-grow flex items-center justify-center gap-2"
        @click="handleClick"
      >
        <q-icon
          :name="item.name"
          size="20px"
          class="border-2 text-white rounded-full p-[2px]"
          :class="selected == item.type ? 'bg-primary' : 'bg-gray-600'"
        />
        <h3
          class="text-xl font-bold"
          :class="selected == item.type ? 'text-primary' : 'text-gray-600'"
        >
          {{ item.text }}
        </h3>
      </div>
    </template>
  </footer>
</template>
<script>
import { onMounted, ref } from 'vue';
import { inject } from 'vue';

export default {
  name: 'BottomComponent',
  setup() {
    const bus = inject('bus');
    const selected = ref('map');

    const handleClick = () => {
      bus.emit('setMobileMenu');
    };

    onMounted(() => {
      bus.on('toggleMobileMenu', (type) => (selected.value = type));
    });

    return { selected, handleClick };
  },
};
</script>
<style lang=""></style>
