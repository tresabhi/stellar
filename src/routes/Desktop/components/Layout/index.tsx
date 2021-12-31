import EditingCanvas from 'components/EditingCanvas';
import blueprintState from 'core/stores/blueprintState';
import { FC, InputHTMLAttributes } from 'react';
import Explorer from './components/Explorer';
import './index.scss';

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={`${props.className} layout-tab`}>
      <Explorer />
      <EditingCanvas
        center={blueprintState((state) => state.center)}
        offset={blueprintState((state) => state.offset)}
        parts={blueprintState((state) => state.parts)}
      />
    </div>
  );
};

export default Layout;
