import { setPopupsEnabled } from 'core/interface';
import { useEffect } from 'react';

export default function usePopupConcurrency() {
  useEffect(() => {
    setPopupsEnabled(false);

    return () => setPopupsEnabled(true);
  });
}
