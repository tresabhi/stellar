import { FC, forwardRef, InputHTMLAttributes, useState } from 'react';
import './index.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div {...props} className={`${props.className ?? ''} properties-explorer`}>
    {children}
  </div>
);

export const Group: FC = ({ children }) => (
  <div className="properties-explorer-group">{children}</div>
);

export const Title: FC = ({ children }) => (
  <span className="properties-explorer-title">{children}</span>
);

export const Row: FC = ({ children }) => (
  <div className="properties-explorer-row">{children}</div>
);

interface NamedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: 'small' | 'wide';
}
export const NamedInput = forwardRef<HTMLInputElement, NamedInputProps>(
  ({ label, type = 'small', ...props }, ref) => {
    return (
      <div className={`properties-explorer-named-input ${type}`}>
        <span className="properties-explorer-named-input-title">{label}</span>
        <input
          {...props}
          ref={ref}
          className={`properties-explorer-named-input-value ${props.className}`}
        />
      </div>
    );
  },
);

// TODO: migrate to scss modules

export interface ToggleButtonProps
  extends InputHTMLAttributes<HTMLButtonElement> {
  initialState?: boolean;
}
export const ToggleButton: FC<ToggleButtonProps> = ({
  children,
  initialState = false,
  ...props
}) => {
  return (
    //@ts-ignore
    <button
      {...props}
      className={`${props.className ?? ''} properties-explorer-toggle-button`}
    >
      {children}
    </button>
  );
};

export interface NamedCheckboxProps
  extends InputHTMLAttributes<HTMLButtonElement> {
  label: string;
  initialValue: boolean | 'mixed';
}
export const NamedCheckbox: FC<NamedCheckboxProps> = ({
  label: title,
  initialValue,
  ...props
}) => {
  const [state] = useState(initialValue);

  return (
    <div
      className={`${props.className ?? ''} properties-explorer-named-checkbox`}
    >
      <span className="properties-explorer-named-checkbox-title">{title}</span>
      {/* @ts-ignore */}
      <button {...props} className="properties-explorer-named-checkbox-button">
        {state === 'mixed' ? (
          // TODO: REPLACE THE PLACEHOLDER
          <span>mixed</span>
        ) : state ? (
          <span>true</span>
        ) : (
          <span>false</span>
        )}
      </button>
    </div>
  );
};
