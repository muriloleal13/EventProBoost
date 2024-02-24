<template>
  <section class="bg-[#041020] rounded-t-3xl h-full relative">
    <q-img
      src="../../assets/info-lens-1.png"
      class="absolute top-1/3 left-0 w-[140px] h-[325px] blur-xl"
    />
    <q-img
      src="../../assets/info-lens-2.png"
      class="absolute top-1/4 right-0 w-[140px] h-[325px] blur-xl"
    />
    <div
      class="container flex flex-col gap-5 items-center justify-center mx-auto w-full mt-[100px] p-8"
    >
      <!-- <template v-for="item in [1, 2, 3]" :key="item">
        {{ `../../assets/info-img-${item}.png` }}
        <q-img
          :src="`../../assets/info-img-${item}.png`"
          class="w-[140px] h-[325px]"
        />
      </template> -->
      <div class="flex lg:flex-nowrap items-start justify-center gap-[75px]">
        <q-img
          src="../../assets/info-img-1.png"
          class="w-[140px] h-[325px] -translate-y-1/4"
        />
        <q-img
          src="../../assets/info-img-2.png"
          class="w-[140px] h-[325px] -translate-y-1/2"
        />
        <q-img
          src="../../assets/info-img-3.png"
          class="w-[140px] h-[325px] -translate-y-1/4"
        />
      </div>
      <div class="lg:w-2/5">
        <span
          class="text-3xl lg:text-5xl text-center text-white !font-thin w-full"
          >{{ $t('info.mainText') }}
          <span class="text-bold">{{ $t('info.highlightText') }}</span>
        </span>
      </div>
      <div class="flex items-center justify-center gap-5 w-full">
        <q-card
          class="bg-[#0B1728] card-blur flex flex-col items-start justify-start gap-5 rounded-2xl text-white w-[350px] h-[300px] p-5"
          v-for="(item, idx) in ['security', 'tips_and_updates', 'hub']"
          :key="item"
        >
          <div
            class="bg-accent flex items-center justify-center !rounded-2xl w-[65px] h-[65px]"
          >
            <q-icon :name="item" color="white" size="30px" />
          </div>
          <span class="text-xl">{{ $t(`info.titleCard${idx + 1}`) }}</span>
          <span class="text-md text-gray-400">
            {{ $t(`info.textCard${idx + 1}`) }}
          </span>
        </q-card>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'InfoSection',
  setup() {
    return {};
  },
};
</script>
<style lang="scss">
.card-blur {
  backdrop-filter: blur(2px);
}
</style>
