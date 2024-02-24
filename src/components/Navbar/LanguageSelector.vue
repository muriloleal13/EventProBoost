<template>
  <div class="flex flex-nowrap items-center justify-center gap-2">
    <span class="nav-links">
      <img
        src="../../assets/usaImage.png"
        class="w-[25px] cursor-pointer"
        alt="usa image"
        :title="$t('languageSelector.en')"
        @click="() => changeLocale(localeOptions[0])"
      />
    </span>
    <span class="nav-links">
      <img
        src="../../assets/brazilImage.png"
        class="w-[25px] cursor-pointer"
        alt="brazil image"
        :title="$t('languageSelector.pt')"
        @click="() => changeLocale(localeOptions[1])"
      />
    </span>
    <span class="nav-links">
      <img
        src="../../assets/spainImage.png"
        class="w-[25px] cursor-pointer"
        alt="spain image"
        :title="$t('languageSelector.es')"
        @click="() => changeLocale(localeOptions[2])"
      />
    </span>
  </div>
</template>
<script>
import { useLocaleStore } from 'src/stores/locale';
import { useI18n } from 'vue-i18n';
export default {
  name: 'LanguageSelector',
  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    const lang = useLocaleStore();

    const changeLocale = (value) => {
      locale.value = value;
      lang.storageLocaleSave(value);
    };

    return {
      changeLocale,
      localeOptions: ['en', 'pt', 'es'],
    };
  },
};
</script>
<style lang="scss"></style>
