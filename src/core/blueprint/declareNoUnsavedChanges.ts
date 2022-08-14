import useApp from 'stores/useApp';

export const declareNoUnsavedChanges = () => {
  useApp.setState({ hasUnsavedChanges: false });
};
