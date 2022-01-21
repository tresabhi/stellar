import {} from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

alert('hello world');
