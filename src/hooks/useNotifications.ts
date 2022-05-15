import { UUID } from 'types/Parts';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';

export interface Action {
  label: string;
  callback: () => void;
}

export interface Notification {
  id: UUID;
  type: NotificationType;
  title: string;
  message: string;
  actions?: Action[];
}

export type UseNotification = Notification[];

const useNotifications = create<
  UseNotification,
  SetState<UseNotification>,
  GetState<UseNotification>,
  Mutate<StoreApi<UseNotification>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => [] as UseNotification));
export default useNotifications;
