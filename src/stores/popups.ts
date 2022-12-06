import { ReactNode } from 'react';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface PopupProps {
  id: string;
}

export interface Popup {
  id: string;
  node: ReactNode;
}

export type UsePopups = {
  popups: Popup[];
};

const usePopups = create<UsePopups, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => ({ popups: [] } as UsePopups)),
);
export default usePopups;
