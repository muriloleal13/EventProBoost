<template lang="">
  <div>
    <q-input
      :model-value="`${inputDate.from} - ${inputDate.to}`"
      color="secondary"
      :label="label"
      mask="date"
      outlined
      dense
    >
      <template v-slot:append>
        <q-icon
          :name="`bi-${range ? 'calendar-range' : 'calendar'}`"
          class="cursor-pointer"
          size="20px"
        >
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date color="primary" v-model="inputDate" :range="range">
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  label="Fechar"
                  color="accent"
                  flat
                  rounded
                  no-caps
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
import { ref, watch } from 'vue';

export default {
  name: 'InputDateComponent',
  props: {
    date: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    range: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const inputDate = ref(props.date);

    watch(
      () => props.date,
      (newValue) => {
        inputDate.value = newValue;
      }
    );

    watch(inputDate, (newValue) => {
      emit('update:date', newValue);
    });

    return {
      inputDate,
    };
  },
};
</script>
<style lang=""></style>
