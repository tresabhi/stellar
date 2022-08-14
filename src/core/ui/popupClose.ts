import useApp from 'hooks/useApp';

export const popupClose = () => {
  useApp.setState({ popup: null });
};
