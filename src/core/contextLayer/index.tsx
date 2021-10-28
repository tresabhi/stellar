import * as ContextMenu from 'components/ContextMenu';
import { listing } from 'components/ContextMenu/types/root';
import {
  Dispatch,
  FunctionComponent,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import './index.scss';

export default class contextLayer {
  contexts: Array<listing>;
  setContexts: Dispatch<SetStateAction<Array<listing>>>;
  component: FunctionComponent;

  constructor(contexts: Array<listing>) {
    (() => {
      [this.contexts, this.setContexts] = useState(contexts);

      const contextMenus = contexts.map((contextMenu) => {
        return <ContextMenu.Container data={contextMenu} />;
      });

      const componentRef = useRef<HTMLDivElement>(null);
      const handleOnClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.target === componentRef.current) this.setContexts([]);
      };

      this.component = () => {
        return (
          <div
            ref={componentRef}
            onClick={handleOnClick}
            className={`
              contexts-container
              ${this.contexts.length > 0 ? 'active' : 'inactive'}
            `}
          >
            {contextMenus}
          </div>
        );
      };
    })();
  }

  newContext(context: listing, x: number, y: number) {
    this.contexts.push(context);
  }
}
