import { PopupContainer } from 'components/PopupContainer';
import { isUndefined } from 'lodash';
import { FC } from 'react';
import useApp, { Popup } from 'stores/useApp';
import { InsertPart } from './components/InsertPart';

const PopupMap = new Map<Popup, FC>([[Popup.InsertPart, InsertPart]]);

export const Popups = () => {
  const popup = useApp((state) => state.interface.popup);
  const PopupComponent = !isUndefined(popup) ? PopupMap.get(popup) : undefined;

  return (
    <PopupContainer visible={!isUndefined(popup)}>
      {PopupComponent && <PopupComponent />}
    </PopupContainer>
  );
};
