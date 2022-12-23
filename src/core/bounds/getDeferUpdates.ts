export type DeferUpdatesEventDetail = boolean;

let deferUpdates = false;

window.addEventListener('deferupdates', ((
  event: CustomEvent<DeferUpdatesEventDetail>,
) => {
  deferUpdates = event.detail;
}) as EventListener);

export default function getDeferUpdates() {
  return deferUpdates;
}
