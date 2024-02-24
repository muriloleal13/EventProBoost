<template>
  <div class="flex items-center justify-center gap-1">
    <q-btn
      class="rounded-lg"
      :color="item.name == selected ? 'accent' : 'white'"
      :text-color="item.name == selected ? 'white' : 'inherit'"
      :label="item.label"
      :icon="item.icon"
      v-for="item in lstFilters"
      :key="item.name"
      :push="item.name == selected"
      unelevated
      stack
      @click="() => handleClick(item.name)"
    />
    <q-btn
      class="rounded-lg"
      :label="$t('createPlan')"
      color="secondary"
      icon="bi-newspaper"
      push
      no-caps
      @click="openDialogForm"
    />
  </div>
</template>
<script>
import { inject, ref } from 'vue';
import { lstFilters } from '../../utils/defaultLists';
import { useQuasar } from 'quasar';
import PlacesForm from '../Places/CustomPlacesFormDialog.vue';

export default {
  name: 'PlacesFilters',
  setup() {
    const $q = useQuasar();
    const bus = inject('bus');
    const selected = ref('');

    const handleClick = (type) => {
      selected.value = type;
      bus.emit('handleClickFilter', type);
    };

    const openDialogForm = () => {
      $q.dialog({
        component: PlacesForm,
      }).onOk(({ data }) => {
        console.log(data);
        bus.emit('addNewEvent', data);
      });
    };

    return {
      lstFilters,
      selected,
      handleClick,
      openDialogForm,
    };
  },
};
</script>
<style lang=""></style>
