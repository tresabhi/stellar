import { LayersIcon } from '@radix-ui/react-icons';
import { Button as ButtonPrimitive } from 'components/Button';
import { mutateSettings } from 'core/app';
import { styled, theme } from 'stitches.config';
import useSettings from 'stores/useSettings';

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
  const selectMultiple = useSettings((state) => state.editor.selectMultiple);
  const handleClick = () =>
    mutateSettings((draft) => {
      draft.editor.selectMultiple = !draft.editor.selectMultiple;
    });

  return (
    <Button color={selectMultiple ? 'accent' : undefined} onClick={handleClick}>
      <LayersIcon />
    </Button>
  );
};
