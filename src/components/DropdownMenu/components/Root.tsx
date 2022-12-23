import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import mutateApp from 'core/app/mutateApp';

export function Root({
  onOpenChange,
  ...props
}: DropdownMenuPrimitive.DropdownMenuProps) {
  const handleOpenChange = (open: boolean) => {
    mutateApp((draft) => {
      draft.interface.isInteracting = open;
    });

    if (onOpenChange) onOpenChange(open);
  };

  return (
    <DropdownMenuPrimitive.Root {...props} onOpenChange={handleOpenChange} />
  );
}
