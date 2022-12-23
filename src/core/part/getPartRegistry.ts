import usePartRegistry from 'stores/partRegistry';

export default function getPartRegistry(name: string) {
  return usePartRegistry.getState().get(name);
}
