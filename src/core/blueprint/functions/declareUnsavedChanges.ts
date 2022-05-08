import appStore from 'stores/app';

export const declareUnsavedChanges = () => {
  appStore.setState({ hasUnsavedChanges: true });
};
