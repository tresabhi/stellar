import createKeybind from 'core/functions/createKeybind';
import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import './index.scss';

const MIXED_SYMBOL = '~';

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
  initialValue: number | string;
  mixed?: boolean;
  suffix?: string;
  type?: 'small' | 'wide';
  min?: number;
  max?: number;
}
export const NamedInput: FC<NamedInputProps> = ({
  children,
  title,
  initialValue,
  mixed,
  suffix,
  type = 'small',
  min,
  max,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputKeybind = createKeybind('Enter', () => inputRef.current?.blur());
  let currentValue = initialValue;

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
        defaultValue={mixed ? MIXED_SYMBOL : `${currentValue}${suffix}`}
        onFocus={() => {
          if (mixed) {
            inputRef.current!.value = '';
          } else {
            inputRef.current!.value = `${currentValue}`;
          }
        }}
        onBlur={() => {
          const isTypeNum = typeof initialValue === 'number';
          const isInputNum = Number(inputRef.current!.value);

          // if it's an invalid number input, make it mixed again
          if (mixed && isTypeNum && !isInputNum) {
            inputRef.current!.value = MIXED_SYMBOL;
          } else {
            mixed = false;

            currentValue = !isTypeNum
              ? inputRef.current!.value
              : isInputNum || initialValue;

            if (typeof currentValue === 'number') {
              if (min) currentValue = Math.max(min, currentValue);
              if (max) currentValue = Math.min(max, currentValue);
            }

            inputRef.current!.value = `${currentValue}${suffix}`;
          }
        }}
        onKeyDown={inputKeybind}
      />
    </div>
  );
};

export interface NamedCheckboxProps
  extends InputHTMLAttributes<HTMLButtonElement> {
  title: string;
  initialValue: boolean | 'mixed';
}
export const NamedCheckbox: FC<NamedCheckboxProps> = ({
  title,
  initialValue,
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  return (
    <div
      className={`${props.className || ''} properties-explorer-named-checkbox`}
    >
      <span className="properties-explorer-named-checkbox-title">{title}</span>
      {/* @ts-ignore */}
      <button {...props} className="properties-explorer-named-checkbox-button">
        {currentValue === 'mixed' ? (
          // TODO: REPLACE THE PLACEHOLDER
          <span>mixed</span>
        ) : currentValue ? (
          <span>true</span>
        ) : (
          <span>false</span>
        )}
      </button>
    </div>
  );
};
