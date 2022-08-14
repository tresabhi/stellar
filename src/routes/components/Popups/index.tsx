import { PopupContainer } from 'components/PopupContainer';
import useApp, { POPUP } from 'stores/useApp';
import { isNull } from 'lodash';
import { FC } from 'react';
import { AddPart } from './components/AddPart';

const PopupMap = new Map<POPUP, FC>([[POPUP.ADD_PART, AddPart]]);

export const Popups = () => {
  const popup = useApp((state) => state.popup);
  const PopupComponent = !isNull(popup) ? PopupMap.get(popup) : undefined;

  return <PopupContainer visible={!isNull(popup)}>{PopupComponent && <PopupComponent />}</PopupContainer>;
};
