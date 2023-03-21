import * as ToggleGroupPrimitive from 'components/ToggleGroup';
import { InputWithLabelProps, InputWrapper } from './InputWrapper';

export function ToggleGroup({
  label,
  ...props
}: ToggleGroupPrimitive.ToggleGroupSingleProps & InputWithLabelProps) {
  return (
    <InputWrapper label={label}>
      <ToggleGroupPrimitive.Root css={{ width: '100%' }} {...props} />
    </InputWrapper>
  );
}

export const ToggleGroupItem = ToggleGroupPrimitive.Item;
