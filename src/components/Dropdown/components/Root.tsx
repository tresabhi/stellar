import { DropdownMenu, DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import useApp from 'hooks/useApp';
import { FC } from 'react';

export const Root: FC<DropdownMenuProps> = ({ children, ...props }) => {
  const handleOpenChange = (open: boolean) => {
    useApp.setState({ isInteractingWithUI: open });
  };

  return (
    <DropdownMenu {...props} onOpenChange={handleOpenChange}>
      {children}
    </DropdownMenu>
  );
};
