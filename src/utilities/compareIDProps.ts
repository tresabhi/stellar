import { ReactivePartComponentProps } from 'types/Parts';

const compareAddressProps = (
  prevProps: ReactivePartComponentProps,
  nextProps: ReactivePartComponentProps,
) => prevProps.ID === nextProps.ID;
export default compareAddressProps;
