import partRegistryStore from 'stores/partRegistry';

export const getPartRegistry = (name: string) =>
  partRegistryStore.getState().get(name);
