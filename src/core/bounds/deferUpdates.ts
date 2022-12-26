import getDeferUpdates, { DeferUpdatesEventDetail } from './getDeferUpdates';

export default function deferUpdates(defer = true) {
  if (getDeferUpdates() !== defer) {
    window.dispatchEvent(
      new CustomEvent<DeferUpdatesEventDetail>('deferupdates', {
        detail: defer,
      }),
    );
  }
}
