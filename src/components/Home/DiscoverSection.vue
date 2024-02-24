<template>
  <section
    class="container w-full h-full mx-auto flex items-start justify-center relative"
  >
    <div
      class="lg:absolute top-0 left-0 right-0 mx-auto lg:-translate-y-2/3 flex items-center justify-center z-[5]"
    >
      <div
        class="w-2/3 flex flex-col gap-3 rounded-lg text-center px-10 py-7 z-[10] shadow relative"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      >
        <h3 class="text-2xl text-primary">Qual evento voce deseja buscar?</h3>
        <h5 class="text-sm">Digite abaixo o nome do evento a ser buscado</h5>
        <div class="flex lg:flex-nowrap items-center justify-center gap-3">
          <q-input
            class="grow"
            color="secondary"
            v-model="search"
            :label="$t('searchText')"
            dense
            rounded
            outlined
          >
          </q-input>
          <div>
            <q-btn
              color="accent"
              padding="xs lg"
              :label="$t('findTrip')"
              push
              no-caps
              @click="handleClickSearch"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-[100px] pb-[50px]">
      <PlacesGrid :showFilters="true" />
    </div>
  </section>
</template>
<script>
import { ref } from 'vue';
import { inject } from 'vue';
import PlacesGrid from '../Places/PlacesGrid.vue';

export default {
  name: 'DiscoverSection',
  components: { PlacesGrid },
  setup() {
    const bus = inject('bus');
    const search = ref('');

    const handleClickSearch = () => {
      bus.emit('handleSearch', search.value);
    };

    return {
      search,
      handleClickSearch,
    };
  },
};
</script>
<style lang="scss"></style>
