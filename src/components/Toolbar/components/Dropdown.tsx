import { CaretDownIcon } from '@radix-ui/react-icons';
import { FC, ReactNode, useRef } from 'react';
import { styled, theme } from 'stitches.config';
import { Button, ButtonProps } from './Button';

export interface DropdownProps extends ButtonProps {
  icon: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

const PADDING_FROM_EDGE = 8;

const Content = styled('div', {
  zIndex: 2,
  position: 'absolute',
  top: '100%',
  paddingTop: theme.sizes[8],
});

const Trigger = styled(Button, {
  display: 'flex',
  gap: theme.sizes[4],
  position: 'relative',

  [`&:not(:focus-within) ${Content}`]: {
    display: 'none',
  },
});

const Children = styled('div', {
  width: theme.sizes.dropdownWidth,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.sizes[8],
  gap: theme.sizes[8],
  borderRadius: theme.radii[4],
  border: theme.borderStyles.componentInteractive,
  backgroundColor: theme.colors.componentBackground,
});

const Caret = styled(CaretDownIcon, {
  width: `${theme.sizes[8]} !important`,
  height: `${theme.sizes[8]} !important`,
});

/**
 * TODO: implement this arrow because I can't spend another living minute
 * trying to figure out why it has padding
 */
// const DropdownArrow = styled(DropdownArrowIcon, {
//   color: theme.colors.componentInteractiveBorder,
//   width: '8px',
//   height: '4px',
// });

export const Dropdown: FC<DropdownProps> = ({ icon, children, ...props }) => {
  const childrenElement = useRef<HTMLDivElement>(null!);

  const handleFocus = () => {
    const boundingClientRect = childrenElement.current.getBoundingClientRect();
    console.log(boundingClientRect);

    if (boundingClientRect.x + boundingClientRect.width + PADDING_FROM_EDGE > document.body.clientWidth) {
      childrenElement.current.style.transform = `translate(${
        (document.body.clientWidth - (boundingClientRect.x + boundingClientRect.width) - PADDING_FROM_EDGE) / 16
      }rem)`;
    }
    if (boundingClientRect.x - PADDING_FROM_EDGE < 0) {
      childrenElement.current.style.transform = `translate(${(-boundingClientRect.x + PADDING_FROM_EDGE) / 16}rem)`;
    }
  };

  return (
    <Trigger onFocus={handleFocus} {...props}>
      {icon}
      <Caret />
      <Content>
        {/* <DropdownArrow /> */}
        <Children ref={childrenElement}>{children}</Children>
      </Content>
    </Trigger>
  );
};
