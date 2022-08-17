import useApp, { Popup } from 'stores/useApp';

export const popupOpen = (popup: Popup) => {
  useApp.setState({ popup });
};
