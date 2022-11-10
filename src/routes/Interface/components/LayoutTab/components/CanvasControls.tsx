import {
  CursorArrowIcon,
  DoubleArrowDownIcon,
  LayersIcon,
  LightningBoltIcon,
} from '@radix-ui/react-icons';
import { Button as ButtonPrimitive } from 'components/Button';
import { mutateApp, mutateSettings } from 'core/app';
import { useState } from 'react';
import { styled, theme } from 'stitches.config';
import useApp from 'stores/app';
import useSettings from 'stores/settings';

const Button = styled(ButtonPrimitive, {
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

const Container = styled('div', {
  position: 'absolute',
  bottom: theme.space.marginUnrelatedMajor,
  right: theme.space.marginUnrelatedMajor,
  display: 'flex',
  alignItems: 'end',
  gap: theme.space.gapUnrelated,
});

const Cluster = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapUnrelated,
});

const SubCluster = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelated,
});

export const CanvasControls = () => {
  const [selectionControls, setSelectionControls] = useState(false);
  const selectMultiple = useSettings((state) => state.editor.selectMultiple);
  const selectDeep = useSettings((state) => state.editor.selectDeep);
  const zenMode = useApp((state) => state.interface.zenMode);

  const handleZenClick = () => {
    mutateApp((draft) => {
      draft.interface.zenMode = !draft.interface.zenMode;
    });
  };
  const handleSelectionControlsClick = () => {
    setSelectionControls((state) => !state);
  };
  const handleSelectMultipleClick = () => {
    setSelectionControls(false);
    mutateSettings((draft) => {
      draft.editor.selectMultiple = !draft.editor.selectMultiple;
    });
  };
  const handleSelectDeepClick = () => {
    setSelectionControls(false);
    mutateSettings((draft) => {
      draft.editor.selectDeep = !draft.editor.selectDeep;
    });
  };

  return (
    <Container>
      <Button color={zenMode ? 'accent' : undefined} onClick={handleZenClick}>
        <LightningBoltIcon />
      </Button>

      <Cluster>
        {selectionControls && (
          <SubCluster>
            <Button
              color={selectMultiple ? 'accent' : undefined}
              onClick={handleSelectMultipleClick}
            >
              <LayersIcon />
            </Button>
            <Button
              color={selectDeep ? 'accent' : undefined}
              onClick={handleSelectDeepClick}
            >
              <DoubleArrowDownIcon />
            </Button>
          </SubCluster>
        )}

        <Button
          color={selectionControls ? 'accent' : undefined}
          onClick={handleSelectionControlsClick}
        >
          <CursorArrowIcon />
        </Button>
      </Cluster>
    </Container>
  );
};
