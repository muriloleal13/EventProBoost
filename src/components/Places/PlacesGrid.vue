<template>
  <div class="flex flex-col items-start justify-center gap-5 w-full">
    <PlacesFilters v-if="showFilters" />
    <q-tab-panels
      v-model="tab"
      animated
      class="flex flex-col items-center justify-center gap-3 w-full"
    >
      <template
        v-for="filter in lstFilters.map((item) => item.name)"
        :key="filter"
      >
        <q-tab-panel class="flex flex-col gap-5" :name="filter" animated>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="`height: ${$q.screen.lt.md ? '48' : '43'}vh`"
          >
            <div class="flex items-start justify-center gap-3 pr-[15px]">
              <template v-for="item in eventsArrayShow(filter)" :key="item.id">
                <q-card class="w-[250px] md:w-[300px] h-full" flat bordered>
                  <q-img :src="item.image" class="h-[165px]" />
                  <q-card-section>
                    <q-btn
                      fab
                      color="accent"
                      icon="bi-hand-thumbs-up-fill"
                      class="absolute"
                      style="top: 0; right: 12px; transform: translateY(-50%)"
                    />
                    <div class="row no-wrap items-center">
                      <div class="col text-h6 max-w-[120px]">
                        <div class="truncate">
                          {{ item.name }}
                          <q-tooltip anchor="top middle" self="bottom middle">
                            {{ item.name }}
                          </q-tooltip>
                        </div>
                      </div>
                      <div
                        class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                      >
                        <q-icon name="bi-geo-alt" />
                        {{ item.distance }}&nbsp;km
                      </div>
                    </div>
                    <div>
                      <q-rating
                        :model-value="getCapacity(item)"
                        icon="bi-person-fill"
                        color="primary"
                        readonly
                      />
                      <q-tooltip anchor="top middle" self="bottom middle">
                        {{
                          `${item.participants}/${item.capacity} participantes`
                        }}
                      </q-tooltip>
                    </div>
                    <div
                      class="flex flex-nowrap items-center justify-start w-full gap-0 h-[35px]"
                    >
                      <template v-if="item.price == '0'">
                        <q-chip
                          rounded
                          color="positive"
                          text-color="black"
                          outline
                          icon="bi-piggy-bank"
                          label="Gratis"
                        />
                      </template>
                      <template v-else>
                        <div>
                          <q-chip
                            rounded
                            color="positive"
                            text-color="black"
                            outline
                            label="$"
                            v-for="it in Array.from(
                              { length: getPrice(item.price) },
                              (_, index) => index
                            )"
                            :key="it"
                            dense
                          />
                          <q-tooltip anchor="top middle" self="bottom middle">
                            {{ `R$ ${item.price}` }}
                          </q-tooltip>
                        </div>
                      </template>
                    </div>
                    <div class="text-caption text-grey max-w-[275px] h-[15px]">
                      <div class="truncate">
                        {{ getKeywordsItem(item.keywords) }}
                        <q-tooltip anchor="top middle" self="bottom middle">
                          {{ getKeywordsItem(item.keywords) }}
                        </q-tooltip>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-card-actions
                    class="flex flex-nowrap items-center justify-between"
                  >
                    <q-btn
                      color="secondary"
                      icon="bi-lightning-fill"
                      :label="
                        item.participants >= item.capacity
                          ? 'Lotado'
                          : !item.checkIn
                          ? 'Participar'
                          : 'Participando'
                      "
                      rounded
                      outline
                      @click="
                        item.participants++;
                        item.checkIn = true;
                      "
                      :disabled="
                        item.checkIn || item.participants >= item.capacity
                      "
                    />
                    <span>{{ getDaysRemaining(item.date.from) }}</span>
                  </q-card-actions>
                </q-card>
              </template>
            </div>
          </q-scroll-area>
          <div class="flex flex-col items-center justify-center gap-3">
            <div class="flex items-center justify-center w-full">
              <q-pagination
                v-model="current"
                color="accent"
                :max="
                  Math.ceil(
                    getLengthFilteredPlaces(filter) / ($q.screen.gt.sm ? 4 : 1)
                  )
                "
                :max-pages="6"
                :boundary-numbers="false"
              />
            </div>
            <span class="text-accent whitespace-nowrap">
              {{ getLengthFilteredPlaces(filter) }} lugares encontrados</span
            >
          </div>
        </q-tab-panel>
      </template>
    </q-tab-panels>
  </div>
</template>
<script>
import PlacesFilters from '../Places/PlacesFilters.vue';
import { computed, inject, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { thumbStyle, barStyle } from 'src/utils/scrollStyle';
import { lstFilters, lstEvents } from '../../utils/defaultLists';

export default {
  name: 'GridPlacesComponent',
  components: {
    PlacesFilters,
  },
  props: {
    showFilters: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const $q = useQuasar();
    const bus = inject('bus');
    const tab = ref('all');
    const current = ref(1);
    const searchText = ref(null);
    const clickParticipar = ref(false);

    const eventsArray = ref(lstEvents);

    const eventsArrayShow = computed(() => {
      const placesPage = $q.screen.gt.sm ? 4 : 1;
      return (filter) =>
        eventsArray.value
          .filter(
            (item) =>
              (searchText.value &&
                item.name
                  .toLowerCase()
                  .includes(searchText.value.toLowerCase())) ||
              item.keywords.includes(filter) ||
              filter == 'all' ||
              (filter == 'nearby' && item.distance < 30)
          )
          .slice(
            (current.value - 1) * placesPage,
            (current.value - 1) * placesPage + placesPage
          );
    });

    const getCapacity = computed(() => {
      return (item) => (item.participants / item.capacity) * 5;
    });

    const getPrice = computed(() => {
      return (price) => (price / 500) * 5 + 1;
    });

    const daysRemaining = (date) => {
      const today = new Date();
      const targetDate = new Date(date);
      const differenceInTime = targetDate.getTime() - today.getTime();
      return Math.floor(differenceInTime / (1000 * 3600 * 24));
    };

    const getDaysRemaining = computed(() => {
      return (date) => {
        const diffDays = daysRemaining(date);
        if (diffDays === 0) {
          return 'Hoje';
        } else if (diffDays === 1) {
          return 'Amanhã';
        } else if (diffDays > 1 && diffDays <= 7) {
          return `Em ${diffDays} dias`;
        } else {
          const differenceInMonths = Math.floor(diffDays / 30);
          return `Em ${differenceInMonths} ${
            differenceInMonths > 1 ? 'meses' : 'mês'
          }`;
        }
      };
    });

    const handleClickFilter = (filter) => {
      current.value = 1;
      tab.value = filter;
    };

    const getLengthFilteredPlaces = computed(() => {
      return (filter) =>
        eventsArray.value.filter(
          (item) => item.keywords.includes(filter) || filter == 'all'
        ).length;
    });

    const getKeywordsItem = (keywords) => {
      return lstFilters
        .filter((item) => keywords.includes(item.name))
        .map((item) => item.label)
        .join(', ');
    };

    onMounted(() => {
      bus.on('handleClickFilter', (type) => handleClickFilter(type));
      bus.on('handleSearch', (search) => (searchText.value = search));
      bus.on('addNewEvent', (data) => {
        let keywords = data.keywords.map((item) => item.value);
        if (data.free) keywords.push(['free']);
        if (daysRemaining() < 15) keywords.push(['nearby']);
        eventsArray.value.push({
          ...data,
          id: `event_${eventsArray.value.length.toString().padStart(2, '0')}`,
          distance: Math.floor(Math.random() * 90) + 1,
          keywords: keywords,
          participants: 0,
          image:
            'https://thelawgivers.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg',
        });
      });
    });

    return {
      lstFilters,
      eventsArray,
      eventsArrayShow,
      getDaysRemaining,
      getCapacity,
      getPrice,
      clickParticipar,
      tab,
      current,
      getLengthFilteredPlaces,
      handleClickFilter,
      getKeywordsItem,
      thumbStyle,
      barStyle,
      targetRating: ref('#target-rating'),
      targetPrice: ref('#target-price'),
    };
  },
};
</script>
<style lang=""></style>
