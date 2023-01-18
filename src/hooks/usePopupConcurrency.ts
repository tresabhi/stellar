import mutateApp from 'core/app/mutateApp';
import { useEffect } from 'react';
import useApp from 'stores/app';

export default function usePopupConcurrency() {
  useEffect(() => {
    if (useApp.getState().interface.newPopupsEnabled) {
      const initialIsInteracting = useApp.getState().interface.isInteracting;

      mutateApp((draft) => {
        draft.interface.newPopupsEnabled = false;
        draft.interface.isInteracting = true;
      });

      return () =>
        mutateApp((draft) => {
          draft.interface.newPopupsEnabled = true;
          draft.interface.isInteracting = initialIsInteracting;
        });
    }
    return undefined;
  });
}
