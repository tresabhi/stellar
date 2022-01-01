import EditingCanvas from 'components/CanvasRenderer';
import blueprintState from 'core/stores/blueprintState';
import { FC, InputHTMLAttributes } from 'react';
import Explorer from './components/Explorer';
import './index.scss';

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  const blueprint = blueprintState((state) => state);

  return (
    <div {...props} className={`${props.className} layout-tab`}>
      <Explorer />
      <EditingCanvas data={blueprint} />
    </div>
  );
};

export default Layout;
