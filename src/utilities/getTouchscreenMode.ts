import { isMobile } from 'react-device-detect';
import useSettings from 'stores/settings';

export default function getTouchscreenMode() {
  const { touchscreenMode } = useSettings.getState().interface;

  return touchscreenMode === null ? isMobile : touchscreenMode;
}
