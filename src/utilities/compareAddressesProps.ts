import { ReactivePartComponentProps } from 'types/Parts';

const compareAddressesProps = (
  prevProps: ReactivePartComponentProps,
  nextProps: ReactivePartComponentProps,
) => {
  return (
    prevProps.address[prevProps.address.length - 1] ===
    nextProps.address[nextProps.address.length - 1]
  );
};
export default compareAddressesProps;
