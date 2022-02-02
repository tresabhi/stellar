import { isEqual } from 'lodash';
import { PartComponentProps } from 'types/Parts';

export default function compareAddressProps(
  prevProps: PartComponentProps,
  nextProps: PartComponentProps,
) {
  return isEqual(prevProps, nextProps);
}
