import { PopupContainer } from 'components/PopupContainer';
import { isNull } from 'lodash';
import { FC } from 'react';
import useApp, { POPUP } from 'stores/useApp';
import { InsertPart } from './components/InsertPart';

const PopupMap = new Map<POPUP, FC>([[POPUP.ADD_PART, InsertPart]]);

export const Popups = () => {
  const popup = useApp((state) => state.popup);
  const PopupComponent = !isNull(popup) ? PopupMap.get(popup) : undefined;

  return (
    <PopupContainer visible={!isNull(popup)}>
      {PopupComponent && <PopupComponent />}
    </PopupContainer>
  );
};
