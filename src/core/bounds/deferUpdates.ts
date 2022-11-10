import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

export type DeferUpdatesEventDetail = boolean;

/**
 * 1 extra millisecond to avoid rendering unnecessarily when arrow keys are
 * held down
 */
export const BOUND_UPDATES_DEFER_TIME = 501;

let areUpdatesDefered = false;

const dispatch = () => {
  window.dispatchEvent(
    new CustomEvent<DeferUpdatesEventDetail>('deferupdates', {
      detail: areUpdatesDefered,
    }),
  );
};

const allowUpdates = fallingEdgeDebounce(() => {
  areUpdatesDefered = false;
  dispatch();
}, BOUND_UPDATES_DEFER_TIME);

export const deferUpdates = () => {
  if (!areUpdatesDefered) {
    areUpdatesDefered = true;
    dispatch();
  }

  allowUpdates();
};
