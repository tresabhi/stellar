import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { mutateApp } from 'core/app';
import { FC } from 'react';

export const Root: FC<DropdownMenuPrimitive.DropdownMenuProps> = ({
  onOpenChange,
  ...props
}) => {
  const handleOpenChange = (open: boolean) => {
    mutateApp((draft) => {
      draft.interface.isInteracting = open;
    });
    onOpenChange && onOpenChange(open);
  };

  return (
    <DropdownMenuPrimitive.Root {...props} onOpenChange={handleOpenChange} />
  );
};
