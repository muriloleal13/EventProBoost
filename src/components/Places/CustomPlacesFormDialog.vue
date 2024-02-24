<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin w-full !rounded-2xl"
      :class="$q.dark.isActive && 'background'"
    >
      <q-card-section class="bg-primary text-white">
        <h3 class="text-2xl font-bold">{{ $t('createPlan') }}</h3>
      </q-card-section>
      <q-separator />
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 45vh"
      >
        <q-card-section class="flex flex-col gap-3 w-full">
          <q-input
            v-model="form.name"
            color="secondary"
            label="Nome do Evento"
            outlined
            dense
          />
          <InputDate
            :date="form.date"
            :label="`Data do Evento`"
            :range="true"
            @update:date="form.date = $event"
          />
          <q-input
            v-model="form.location"
            color="secondary"
            label="Local"
            outlined
            dense
          />
          <q-select
            v-model="form.keywords"
            color="secondary"
            label="Tipo"
            :options="optionsKeywords"
            multiple
            use-chips
            outlined
            dense
          />
          <q-input
            v-model="form.desc"
            color="secondary"
            label="Descrição"
            outlined
            dense
            type="textarea"
            autogrow
          />
          <div
            class="flex flex-nowrap items-center justify-center gap-3 w-full"
          >
            <q-input
              class="w-full"
              v-model="form.price"
              color="secondary"
              label="Valor Ingresso"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              outlined
              dense
              :disable="form.free"
            />
            <q-toggle
              color="accent"
              v-model="form.free"
              label="Gratuito"
              @click="if (form.free) form.price = 0;"
              dense
            />
          </div>
          <q-input
            v-model="form.capacity"
            color="secondary"
            label="Capacidade"
            outlined
            dense
            type="number"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="$t('cancel')"
            color="accent"
            @click="onCancelClick"
            rounded
            flat
          />
          <q-btn label="Salvar" color="accent" @click="submitForm" rounded />
        </q-card-actions>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import InputDate from '../InputeDate.vue';
import { lstFilters } from '../../utils/defaultLists';
import { thumbStyle, barStyle } from 'src/utils/scrollStyle';

export default {
  name: 'CustomPlacesFormDialog',
  components: { InputDate },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const form = ref({
      name: '',
      date: { from: '', to: '' },
      location: '',
      keywords: [],
      desc: '',
      price: 0,
      free: false,
      capacity: 0,
    });

    const optionsKeywords = ref([
      ...lstFilters
        .filter((item) => !['all', 'nearby', 'free'].includes(item.name))
        .map((item) => {
          return { label: item.label, value: item.name };
        }),
    ]);

    const submitForm = () => {
      onDialogOK({ data: form.value });
    };

    return {
      dialogRef,
      form,
      optionsKeywords,
      submitForm,
      onDialogHide,
      onCancelClick: onDialogCancel,
      thumbStyle,
      barStyle,
    };
  },
};
</script>

<style lang="scss"></style>
