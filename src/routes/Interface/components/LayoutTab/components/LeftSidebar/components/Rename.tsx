import { Pencil1Icon } from '@radix-ui/react-icons';
import ButtonPrimitive from 'components/Button';
import prompt from 'core/interface/prompt';
import RenamePartsPrompt from 'routes/components/RenamePartsPrompt';
import { styled, theme } from 'stitches.config';
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

export default function Rename() {
  const visible = useBlueprint((state) => state.selections.length > 0);
  const handleClick = () => prompt(RenamePartsPrompt);

  return (
    <Button visible={visible} onClick={handleClick}>
      <Pencil1Icon />
    </Button>
  );
}
