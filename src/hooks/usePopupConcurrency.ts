import { setPopupsEnabled } from 'core/interface';
import { useEffect } from 'react';

export const usePopupConcurrency = () => {
  useEffect(() => {
    setPopupsEnabled(false);

    return () => setPopupsEnabled(true);
  });
};
