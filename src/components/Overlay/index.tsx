import { popupClose } from 'core/interface';
import { FC, HTMLAttributes, MouseEvent } from 'react';
import { styled, theme } from 'stitches.config';

const Container = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.colors.popupBackground,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 3,

  variants: {
    visible: {
      false: {
        display: 'none',
      },
    },
  },

  defaultVariants: {
    visible: false,
  },
});

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
}

export const Overlay: FC<OverlayProps> = ({
  children,
  visible,
  onClick,
  ...props
}) => {
  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    popupClose();
    if (onClick) onClick(event);
  };
  const handleChildrenClick = (event: MouseEvent) => event.stopPropagation();

  return (
    <Container {...props} visible={visible} onClick={handleContainerClick}>
      <div onClick={handleChildrenClick}>{children}</div>
    </Container>
  );
};
