import { PartComponentProps } from 'types/Parts';
import compareIds from './compareIds';

const compareIdProps = (
  prevProps: PartComponentProps,
  nextProps: PartComponentProps,
) => compareIds(prevProps.id, nextProps.id);
export default compareIdProps;
