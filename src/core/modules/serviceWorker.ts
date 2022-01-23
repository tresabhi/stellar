export const primeWorker = () => {
  if (window.navigator?.serviceWorker) {
    window.addEventListener('load', () =>
      navigator.serviceWorker.register('./service-worker.js'),
    );
  }
};
