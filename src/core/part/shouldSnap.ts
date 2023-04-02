import useApp from 'stores/app';

export interface EventWithCtrlKey {
  ctrlKey: boolean;
}

export default function shouldSnap(event: EventWithCtrlKey) {
  return !(event.ctrlKey || !useApp.getState().editor.snap);
}
