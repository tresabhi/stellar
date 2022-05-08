import useApp from 'hooks/useApp';

export const declareNoUnsavedChanges = () => {
  useApp.setState({ hasUnsavedChanges: false });
};
