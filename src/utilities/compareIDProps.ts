import { PartComponentProps } from 'types/Parts';
import compareIDs from './compareIDs';

const compareIDProps = (
  prevProps: PartComponentProps,
  nextProps: PartComponentProps,
) => compareIDs(prevProps.ID, nextProps.ID);
export default compareIDProps;
