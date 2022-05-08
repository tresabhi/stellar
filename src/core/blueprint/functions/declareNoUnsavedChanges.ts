import appStore from 'stores/app';

export const declareNoUnsavedChanges = () => {
  appStore.setState({ hasUnsavedChanges: false });
};
