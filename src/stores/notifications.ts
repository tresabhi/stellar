import { ReactNode } from 'react';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface NotificationsProps {
  id: string;
}

export interface Notification {
  id: string;
  node: ReactNode;
}

export type UseNotifications = {
  notifications: Notification[];
};

const useNotifications = create<UseNotifications, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => ({ notifications: [] } as UseNotifications)),
);
export default useNotifications;
