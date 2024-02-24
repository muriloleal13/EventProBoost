import { onUnmounted, onMounted, ref } from 'vue';
import { useCoordsStore } from 'src/stores/coords';

export function useGeolocation() {
  const coords = ref({
    latitude: -29.685345043931132,
    longitude: -53.803557201898826,
  });
  const isSupported = 'navigator' in window && 'geolocation' in navigator;

  let watcher = null;
  onMounted(() => {
    if (isSupported)
      watcher = navigator.geolocation.watchPosition((position) => {
        coords.value = position.coords;

        const coordStore = useCoordsStore();
        coordStore.storageCoordsSave({
          lat: coords.value.latitude,
          lng: coords.value.longitude,
        });
      });
  });
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher);
  });

  return { coords, isSupported };
}
