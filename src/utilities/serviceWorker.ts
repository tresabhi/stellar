import getStellarContext from 'hooks/useStellarContext';

export const primeWorker = () => {
  const stellarContext = getStellarContext();

  if (stellarContext.codeName !== 'dev') {
    window.addEventListener('load', () => {
      if (window.navigator?.serviceWorker) {
        navigator.serviceWorker
          .register(`${process.env.PUBLIC_URL}/service-worker.js`)
          .then((registration) => {
            if (registration.onupdatefound) {
              registration.onupdatefound = () => {
                if (registration.installing) {
                  registration.installing.onstatechange = () => {
                    if (
                      registration.installing?.state === 'installed' &&
                      navigator.serviceWorker.controller
                    ) {
                      // idk lol
                    }
                  };
                }
              };
            }
          });
      }
    });
  }
};
