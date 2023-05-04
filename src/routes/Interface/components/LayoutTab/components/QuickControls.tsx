import {
  ColumnSpacingIcon,
  ReloadIcon,
  RowSpacingIcon,
} from '@radix-ui/react-icons';
import { ReactComponent as FairingFilled } from 'assets/icons/fairing-filled.svg';
import { ReactComponent as Fairing } from 'assets/icons/fairing.svg';
import Button from 'components/Button';
import mutateSettings from 'core/app/mutateSettings';
import mirrorSelectedHorizontal from 'core/part/mirrorSelectedHorizontal';
import mirrorSelectedVertical from 'core/part/mirrorSelectedVertical';
import rotateSelected from 'core/part/rotateSelected';
import { styled, theme } from 'stitches.config';
import useSettings from 'stores/settings';

const Wrapper = styled('div', {
  bottom: 0,
  boxSizing: 'border-box',
  position: 'absolute',
  right: '50%',
  transform: 'translateX(50%)',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.space.paddingRegular,
});
const Container = styled('div', {
  display: 'flex',
  gap: theme.space.gapUnrelatedRegular,
});
const Action = styled(Button, {
  borderRadius: theme.radii.regular,
  display: 'flex',
  padding: theme.space.paddingRegular,

  defaultVariants: { border: true },
});

export default function QuickControls() {
  const interiorView = useSettings((state) => state.editor.interiorView);

  return (
    <Wrapper>
      <Container>
        <Action
          onClick={() =>
            mutateSettings((draft) => {
              draft.editor.interiorView = !draft.editor.interiorView;
            })
          }
        >
          {interiorView ? <Fairing /> : <FairingFilled />}
        </Action>
      </Container>

      <Container>
        <Action onClick={() => rotateSelected(Math.PI / 2)}>
          <ReloadIcon style={{ transform: 'scaleX(-1)' }} />
        </Action>
        <Action onClick={() => rotateSelected(-Math.PI / 2)}>
          <ReloadIcon />
        </Action>
        <Action onClick={() => mirrorSelectedHorizontal()}>
          <ColumnSpacingIcon />
        </Action>
        <Action onClick={() => mirrorSelectedVertical()}>
          <RowSpacingIcon />
        </Action>
      </Container>
    </Wrapper>
  );
}
