import { Checkbox, CheckboxProps, CheckboxRef } from 'components/Checkbox';
import { FC, MouseEvent, useRef } from 'react';
import { styled, theme } from 'stitches.config';

export interface CheckboxWithLabelProps extends CheckboxProps {
  children: string;
}

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.space.gapRelatedMajor,
  cursor: 'pointer',
});

const Label = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[12],
});

export const CheckboxWithLabel: FC<CheckboxWithLabelProps> = ({
  children,
  onClick,
  ...props
}) => {
  const checkbox = useRef<CheckboxRef>(null);
  const handleContainerClick = () =>
    (checkbox.current as HTMLButtonElement | null)?.click();
  const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (onClick) onClick(event);
  };

  return (
    <Container onClick={handleContainerClick}>
      <Checkbox {...props} onClick={handleTriggerClick} ref={checkbox} />
      <Label>{children}</Label>
    </Container>
  );
};
