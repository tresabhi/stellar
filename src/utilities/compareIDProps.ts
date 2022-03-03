import { ReactivePartComponentProps } from 'types/Parts';
import compareIDs from './compareIDs';

const compareIDProps = (
  prevProps: ReactivePartComponentProps,
  nextProps: ReactivePartComponentProps,
) => compareIDs(prevProps.ID, nextProps.ID);
export default compareIDProps;
