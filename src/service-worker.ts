import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare var self: ServiceWorkerGlobalScope;

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

const NETWORK_FIRST_PATHS = ['/manifest.json', '/service-worker.js'];
const responsePlugin = new CacheableResponsePlugin({ statuses: [200] });

registerRoute(
  ({ url }) => NETWORK_FIRST_PATHS.includes(url.pathname),
  new NetworkFirst({
    cacheName: 'network-only',
    plugins: [responsePlugin],
  }),
);

registerRoute(
  ({ url }) => !NETWORK_FIRST_PATHS.includes(url.pathname),
  new StaleWhileRevalidate({
    cacheName: 'stale',
    plugins: [responsePlugin],
  }),
);
