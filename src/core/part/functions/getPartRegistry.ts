import partRegistryStore from 'hooks/usePartRegistry';

export const getPartRegistry = (name: string) =>
  partRegistryStore.getState().get(name);
