import { FC } from 'react';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface ToastProps {
  id: string;
  close: () => void;
}

export type Toast = FC<ToastProps>;

export interface ToastData {
  id: string;
  Component: Toast;
}

export type UseToasts = {
  toasts: ToastData[];
};

const useToasts = create<UseToasts, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => ({ toasts: [] } as UseToasts)),
);
export default useToasts;
