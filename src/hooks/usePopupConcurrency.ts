import mutateApp from 'core/app/mutateApp';
import { useEffect } from 'react';
import useApp from 'stores/app';

export default function usePopupConcurrency() {
  useEffect(() => {
    if (useApp.getState().interface.newPopupsEnabled) {
      mutateApp((draft) => {
        draft.interface.newPopupsEnabled = false;
      });

      return () => mutateApp((draft) => {
        draft.interface.newPopupsEnabled = true;
      });
    }
    return undefined;
  });
}
