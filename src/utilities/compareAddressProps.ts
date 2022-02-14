import { isEqual } from 'lodash';
import { ReactivePartComponentProps } from 'types/Parts';

export default function compareAddressProps(
  prevProps: ReactivePartComponentProps,
  nextProps: ReactivePartComponentProps,
) {
  return isEqual(prevProps, nextProps);
}
