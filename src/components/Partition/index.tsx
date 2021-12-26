import { FC } from 'react';
import './index.scss';

export const Container: FC = ({ children }) => (
  <div className="partition">{children}</div>
);

export const Option: FC = ({ children }) => (
  <span className="partition-option">{children}</span>
);

export const Separator: FC = () => <div className="separator" />;
