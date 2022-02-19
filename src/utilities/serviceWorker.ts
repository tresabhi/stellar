export const primeWorker = () => {
  if (window.navigator?.serviceWorker) {
    navigator.serviceWorker.register('./service-worker.js');
  }
};
