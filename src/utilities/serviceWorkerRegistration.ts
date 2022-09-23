import { notify } from 'core/interface';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void; // TODO: investigate if this is fired on new content
};

export function registerServiceWorker(config?: Config) {
  if (
    import.meta.env.PROD &&
    'serviceWorker' in navigator &&
    import.meta.url
  ) {
    const publicUrl = new URL(import.meta.url, window.location.href);
    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener('load', () => {
      const swUrl = `${import.meta.url}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA',
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // TODO: also alert the user
              console.log(
                'New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.',
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    });
}

// TODO: include this in the settings?
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

export const primeServiceWorker = () =>
  registerServiceWorker({
    onUpdate: () => {
      notify(
        'Stellar has upgraded to a newer version!',
        'Please refresh the page to see the latest changes.',
        {
          type: 'success',
          persistent: true,
        },
      );
    },
  });
