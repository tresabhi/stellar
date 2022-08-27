import { Overlay } from 'components/Overlay';
import { FC } from 'react';
import useApp, { Popup } from 'stores/useApp';
import { InsertPart } from './components/InsertPart';
import { RenameParts } from './components/RenameParts';

const PopupMap = new Map<Popup, FC>([
  [Popup.InsertPart, InsertPart],
  [Popup.RenameParts, RenameParts],
]);

export const Popups = () => {
  const popup = useApp((state) => state.interface.popup);
  const PopupComponent = popup === Popup.None ? undefined : PopupMap.get(popup);

  return (
    <Overlay visible={popup !== Popup.None}>
      {PopupComponent && <PopupComponent />}
    </Overlay>
  );
};
