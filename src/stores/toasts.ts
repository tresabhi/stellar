import { ReactNode } from 'react';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface ToastProps {
  id: string;
}

export interface Toast {
  id: string;
  node: ReactNode;
}

export type UseToasts = {
  toasts: Toast[];
};

const useToasts = create<UseToasts, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => ({ toasts: [] } as UseToasts)),
);
export default useToasts;
