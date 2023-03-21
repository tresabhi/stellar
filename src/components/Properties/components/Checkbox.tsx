import CheckboxPrimitive, { CheckboxProps } from 'components/Checkbox';
import { InputWithLabelProps, InputWrapper } from './InputWrapper';

export function Checkbox({
  label,
  ...props
}: CheckboxProps & InputWithLabelProps) {
  return (
    <InputWrapper horizontal label={label}>
      <CheckboxPrimitive {...props} />
    </InputWrapper>
  );
}
