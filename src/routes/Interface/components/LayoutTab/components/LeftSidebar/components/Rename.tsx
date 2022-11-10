import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button as ButtonPrimitive } from 'components/Button';
import { popupOpen } from 'core/interface';
import { styled, theme } from 'stitches.config';
import { Popup } from 'stores/app';
import useBlueprint from 'stores/blueprint';

const Button = styled(ButtonPrimitive, {
  position: 'absolute',
  bottom: theme.space.marginUnrelatedMajor,
  right: theme.space.marginUnrelatedMajor,
  padding: theme.space.padding,
  borderRadius: theme.radii[4],

  '& > svg': {
    display: 'block',
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  variants: {
    visible: {
      false: {
        display: 'none',
      },
    },

    border: { true: {} },
  },

  defaultVariants: {
    visible: true,
    border: true,
  },
});

export const Rename = () => {
  const visible = useBlueprint((state) => state.selections.length > 0);
  const handleClick = () => popupOpen(Popup.RenameParts);

  return (
    <Button visible={visible} onClick={handleClick}>
      <Pencil1Icon />
    </Button>
  );
};
