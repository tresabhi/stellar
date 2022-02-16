import { isEqual } from 'lodash';
import { ReactivePartComponentProps } from 'types/Parts';

const compareAddressesProps = (
  prevProps: ReactivePartComponentProps,
  nextProps: ReactivePartComponentProps,
) => {
  return isEqual(prevProps.address, nextProps.address);
};
export default compareAddressesProps;
