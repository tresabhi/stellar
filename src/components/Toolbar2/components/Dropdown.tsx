import { CaretDownIcon } from '@radix-ui/react-icons';
import * as DropdownComponent from 'components/Dropdown';
import { FC, ReactNode } from 'react';
import { css, theme } from 'stitches.config';
import { buttonStyles } from './Button';

export interface DropdownProps {
  icon: ReactNode;
  children: ReactNode;
}

const caretStyles = css({
  width: `${theme.sizes[8]} !important`,
  height: `${theme.sizes[8]} !important`,
});

export const Dropdown: FC<DropdownProps> = ({ icon, children }) => (
  <DropdownComponent.Root>
    <DropdownComponent.Trigger className={buttonStyles()}>
      {icon}
      <CaretDownIcon className={caretStyles()} />
    </DropdownComponent.Trigger>
    <DropdownComponent.Content style={{ color: 'white' }}>
      {children}
    </DropdownComponent.Content>
  </DropdownComponent.Root>
);
