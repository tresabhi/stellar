import { PartIDs } from 'types/Parts';
import compareIDs from './compareIDs';

const compareIDArrays = (prevIDs: PartIDs, nextIDs: PartIDs) => {
  if (prevIDs.length !== nextIDs.length) {
    return false;
  } else {
    return !prevIDs.some((prevID, index) => {
      const nextID = nextIDs?.[index];
      return compareIDs(prevID, nextID);
    });
  }
};

export default compareIDArrays;
