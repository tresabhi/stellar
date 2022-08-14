import useApp, { POPUP } from 'hooks/useApp';

export const popupOpen = (popup: POPUP) => {
  useApp.setState({ popup });
};
