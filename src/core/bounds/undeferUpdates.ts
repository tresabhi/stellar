import { DeferUpdatesEventDetail, getDeferUpdates } from './getDeferUpdates';

export const undeferUpdates = () => {
  if (getDeferUpdates()) {
    window.dispatchEvent(
      new CustomEvent<DeferUpdatesEventDetail>('deferupdates', {
        detail: false,
      }),
    );
  }
};
