import versionControlStore from 'stores/versionControl';

export const clearVersionControl = () => {
  versionControlStore.setState({ index: -1, history: [] });
};
