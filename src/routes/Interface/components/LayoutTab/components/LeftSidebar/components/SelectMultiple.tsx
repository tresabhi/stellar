import { LayersIcon } from '@radix-ui/react-icons';
import { Button as ButtonPrimitive } from 'components/Button';
import { mutateApp } from 'core/app';
import { styled, theme } from 'stitches.config';
import useApp from 'stores/useApp';

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

  defaultVariants: {
    border: true,
  },
});

export const SelectMultiple = () => {
  const selectMultiple = useApp((state) => state.editor.selectMultiple);
  const handleClick = () =>
    mutateApp((draft) => {
      draft.editor.selectMultiple = !draft.editor.selectMultiple;
    });

  return (
    <Button color={selectMultiple ? 'accent' : undefined} onClick={handleClick}>
      <LayersIcon />
    </Button>
  );
};
