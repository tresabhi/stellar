import {
  DimensionsIcon,
  MoveIcon,
  RotateCounterClockwiseIcon,
} from '@radix-ui/react-icons';
import { ReactComponent as RedoIcon } from 'assets/icons/redo.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/save.svg';
import { ReactComponent as UndoIcon } from 'assets/icons/undo.svg';
import * as Toolbar from 'components/Toolbar';
import { fileSave, versionRedo, versionUndo } from 'core/blueprint';
import useApp, { TransformationToolType } from 'hooks/useApp';
import styles from './index.module.scss';

const ToolbarBottom = () => {
  const tool = (name: TransformationToolType) => () =>
    useApp.setState({ transformationMode: name });
  const mode = useApp((state) => state.transformationMode);

  return (
    <div className={styles['toolbar-bottom']}>
      <div className={styles.cluster}>
        <Toolbar.Container>
          <Toolbar.Button onClick={fileSave}>
            <SaveIcon />
          </Toolbar.Button>
          <Toolbar.Button onClick={versionUndo}>
            <UndoIcon />
          </Toolbar.Button>
          <Toolbar.Button onClick={versionRedo}>
            <RedoIcon />
          </Toolbar.Button>
        </Toolbar.Container>
        <Toolbar.Container>
          <Toolbar.Button
            selected={mode === 'translate'}
            onClick={tool('translate')}
          >
            <MoveIcon />
          </Toolbar.Button>
          <Toolbar.Button selected={mode === 'rotate'} onClick={tool('rotate')}>
            <RotateCounterClockwiseIcon />
          </Toolbar.Button>
          <Toolbar.Button selected={mode === 'scale'} onClick={tool('scale')}>
            <DimensionsIcon />
          </Toolbar.Button>
        </Toolbar.Container>
      </div>
      <div className={`${styles.cluster} ${styles.middle}`}></div>
      <div className={styles.cluster}></div>
    </div>
  );
};
export default ToolbarBottom;
