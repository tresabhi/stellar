import useSettings from 'stores/settings';
import { getInterfaceMode } from 'utilities/getInterfaceMode';

export const useInterfaceMode = () => {
  const mode = useSettings((state) => state.interface.mode);
  const interfaceMode = getInterfaceMode(mode);

  return interfaceMode;
};
