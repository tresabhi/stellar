import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

const Trigger = styled(DropdownMenu.Trigger, {
  display: 'flex',
  cursor: 'pointer',

  '& svg': {
    color: theme.colors.textLowContrast,
    width: theme.sizes[10],
    height: theme.sizes[10],
  },

  '&:hover svg': {
    color: theme.colors.textHighContrast,
  },
});
const Content = styled(DropdownMenu.Content, {
  backgroundColor: theme.colors.componentInteractive,
  padding: theme.space.paddingMinor,
  borderRadius: theme.radii.regular,
  maxWidth: theme.sizes.hintMaxWidth,
  boxShadow: theme.shadows.regular,
});
const Arrow = styled(DropdownMenu.Arrow, {
  fill: theme.colors.componentInteractive,
});
const Text = styled('span', {
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[12],
});

export interface HintProps extends DropdownMenu.DropdownMenuProps {
  icon?: ReactNode;
}

export default function Hint({
  children,
  icon = <QuestionMarkCircledIcon />,
  ...props
}: HintProps) {
  return (
    <DropdownMenu.Root {...props}>
      <Trigger>{icon}</Trigger>
      <DropdownMenu.Portal>
        <Content side="right">
          <Arrow />
          <Text>{children}</Text>
        </Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
