import { mutateToasts } from 'core/app/mutateToasts';
import { memo } from 'react';
import useToasts from 'stores/useToasts';
import { Viewport } from './Viewport';

export const All = () => {
  const toasts = useToasts();

  const toastsKeyed = toasts.toasts.map(({ Component, id }) => {
    const close = () => {
      mutateToasts((draft) => {
        const index = draft.toasts.findIndex((toast) => toast.id === id);
        draft.toasts.splice(index, 1);
      });
    };
    const MemoComponent = memo(
      Component,
      ({ id: prevId }, { id: nextId }) => prevId === nextId,
    );

    return <MemoComponent key={`toast-${id}`} id={id} close={close} />;
  });

  return <Viewport>{toastsKeyed}</Viewport>;
};
