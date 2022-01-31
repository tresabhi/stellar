import { PrecacheEntry } from 'workbox-precaching';

declare global {
  interface Window {
    __WB_MANIFEST: Array<PrecacheEntry | string>;
  }
}
