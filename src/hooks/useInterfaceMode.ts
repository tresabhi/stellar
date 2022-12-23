import useSettings from 'stores/settings';
import getInterfaceMode from 'utilities/getInterfaceMode';

export default function useInterfaceMode() {
  const mode = useSettings((state) => state.interface.mode);
  const interfaceMode = getInterfaceMode(mode);

  return interfaceMode;
}
