import useApp, { POPUP } from 'stores/useApp';

export const popupOpen = (popup: POPUP) => {
  useApp.setState({ popup });
};
