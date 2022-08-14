import useApp from 'stores/useApp';

export const popupClose = () => {
  useApp.setState({ popup: null });
};
