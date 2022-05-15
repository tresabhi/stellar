import { ReactComponent as RedoIcon } from 'assets/icons/redo.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/save.svg';
import { ReactComponent as UndoIcon } from 'assets/icons/undo.svg';
import * as Toolbar from 'components/Toolbar';
import styles from './index.module.scss';

const ToolbarBottom = () => {
  return (
    <div className={styles['toolbar-bottom']}>
      <div className={styles.left}>
        <Toolbar.Container>
          <Toolbar.Button>
            <SaveIcon />
          </Toolbar.Button>
          <Toolbar.Button>
            <UndoIcon />
          </Toolbar.Button>
          <Toolbar.Button>
            <RedoIcon />
          </Toolbar.Button>
        </Toolbar.Container>
      </div>
      <div className={styles.middle}></div>
      <div className={styles.right}></div>
    </div>
  );
};
export default ToolbarBottom;
