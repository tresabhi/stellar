import createKeybind from 'core/functions/createKeybind';
import { FC, InputHTMLAttributes, useRef } from 'react';
import './index.scss';

export const Container: FC = ({ children }) => (
  <div className="properties-explorer">{children}</div>
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
  title: string;
  defaultValue: number | string;
  suffix?: string;
  type?: 'small' | 'long';
}
export const NamedInput: FC<NamedInputProps> = ({
  children,
  title,
  defaultValue,
  suffix,
  type = 'small',
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputKeybind = createKeybind(() => inputRef.current?.blur(), 'Enter');
  let currentValue = defaultValue;

  return (
    <div
      className={`${
        props.className || ''
      } properties-explorer-named-input ${type}`}
    >
      <span className="properties-explorer-named-input-title">{title}</span>
      <input
        {...props}
        ref={inputRef}
        className="properties-explorer-named-input-value"
        defaultValue={`${currentValue}${suffix}`}
        onFocus={() => {
          inputRef.current!.value = `${currentValue}`;
        }}
        onBlur={() => {
          currentValue =
            typeof defaultValue === 'string'
              ? inputRef.current!.value
              : Number(inputRef.current!.value) || defaultValue;
          inputRef.current!.value = `${currentValue}${suffix}`;
        }}
        onKeyDown={inputKeybind}
      />
    </div>
  );
};
