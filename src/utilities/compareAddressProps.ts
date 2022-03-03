import { ReactivePartComponentProps } from 'types/Parts';

const compareAddressProps = (
  prevProps: ReactivePartComponentProps,
  nextProps: ReactivePartComponentProps,
) =>
  prevProps.ID[prevProps.ID.length - 1] ===
  nextProps.ID[nextProps.ID.length - 1];
export default compareAddressProps;
