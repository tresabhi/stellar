import useClipboard from 'hooks/useClipboard';
import {
  FC, HTMLAttributes, MouseEvent, ReactNode,
} from 'react';
import { styled, theme } from 'stitches.config';
import { Label as LabelPrimitive } from './Label';
import { Row as RowPrimitive } from './Row';

export interface ValueProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactNode;
}

const Row = styled(RowPrimitive, {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Label = styled(LabelPrimitive, {
  flex: 1,
  userSelect: 'all',
});

const DisplayValue = styled('span', {
  flex: 3,
  textAlign: 'right',
  color: theme.colors.textHighContrast,
  fontFamily: theme.fonts.mono,
  fontSize: theme.fontSizes[12],
  userSelect: 'all',
});

export const Value: FC<ValueProps> = ({ label, children, ...props }) => {
  const { copy } = useClipboard();

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    copy((event.target as HTMLSpanElement).innerText);
  };

  return (
    <Row {...props}>
      <Label onClick={handleClick}>{label}</Label>
      <DisplayValue onClick={handleClick}>{children}</DisplayValue>
    </Row>
  );
};
