import { isNull } from 'lodash';
import { isMobile } from 'react-device-detect';
import useSettings, { InterfaceMode } from 'stores/settings';

export const getInterfaceMode = (
  mode: InterfaceMode | null = useSettings.getState().interface.mode,
) => {
  if (isNull(mode)) {
    return isMobile ? InterfaceMode.Compact : InterfaceMode.Comfortable;
  }
  return mode;
};
