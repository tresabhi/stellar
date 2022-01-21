import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

const NETWORK_FIRST_PATHS = ['/manifest.json'];

precacheAndRoute(self.__WB_MANIFEST);

// TODO: probably sort strategies based on request types

// The latest files if possible
registerRoute(
  ({ url }) => NETWORK_FIRST_PATHS.includes(url.pathname),
  new NetworkFirst({
    cacheName: 'network-first',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  }),
);

// Use cached, but update to latest is possible
registerRoute(
  ({ url }) => !NETWORK_FIRST_PATHS.includes(url.pathname),
  new StaleWhileRevalidate({
    cacheName: 'stale',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  }),
);
