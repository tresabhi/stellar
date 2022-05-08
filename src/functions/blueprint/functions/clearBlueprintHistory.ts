import versionControlStore from 'stores/versionControl';

export const clearBlueprintHistory = () => {
  versionControlStore.setState({ index: -1, history: [] });
};
