import { isMobile } from 'react-device-detect';
import useSettings from 'stores/settings';

export default function useTouchscreenMode() {
  const touchscreenMode = useSettings(
    (state) => state.interface.touchscreenMode,
  );

  return touchscreenMode === null ? isMobile : touchscreenMode;
}
