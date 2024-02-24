<template>
  <div class="grid grid-cols-3 w-screen h-screen p-8 bg-[#f2f1f1] shadow">
    <div class="flex flex-col items-start justify-start pt-10 gap-8">
      <span class="text-primary text-xl">Modelo de Viagem</span>
      <q-btn-toggle
        size="md"
        v-model="type"
        no-caps
        rounded
        unelevated
        color="primary"
        text-color="white"
        toggle-color="white"
        toggle-text-color="primary"
        :options="[
          { label: 'Lazer', value: 'lazer' },
          { label: 'Flash', value: 'flash' },
          { label: 'Negocios', value: 'business' },
        ]"
      />
      <q-separator class="px-8 mx-auto w-full" />
      <span class="text-primary text-xl">Localidade</span>
      <div class="flex flex-nowrap gap-3 w-full">
        <q-select
          class="w-full"
          color="accent"
          rounded
          outlined
          v-model="city"
          :options="cityOpt"
          label="Cidade"
        />
        <q-select
          class="w-full"
          color="accent"
          rounded
          outlined
          v-model="place"
          :options="placeOpt"
          label="Bairro"
        />
      </div>
      <q-separator class="px-8 mx-auto w-full" />
      <span class="text-primary text-xl">Media de Preco</span>
      <PlacesFilters />
    </div>
    <div>
      <PlacesGrid :showFilters="false" class="col-span-2 !h-screen p-8" />
    </div>
  </div>
</template>
<script>
import PlacesFilters from '../components/Places/PlacesFilters.vue';
import PlacesGrid from 'src/components/Places/PlacesGrid.vue';
import { ref } from 'vue';

const cityOpt = [
  { label: 'Rio de Janeiro', value: 'rj' },
  { label: 'Sao Paulo', value: 'sp' },
  { label: 'Rio Grande do Sul', value: 'rs' },
];

const placeOpt = [
  { label: 'Copacabana', value: 'cpb' },
  { label: 'Leblon', value: 'lbl' },
  { label: 'Aterro do Flamengo', value: 'atr_flm' },
];

export default {
  name: 'PlaceComponent',
  components: {
    PlacesFilters,
    PlacesGrid,
  },
  setup() {
    const type = ref('lazer');
    const city = ref(cityOpt[0]);
    const place = ref(placeOpt[0]);

    return {
      type,
      city,
      place,
      cityOpt,
      placeOpt,
    };
  },
};
</script>
<style lang=""></style>
