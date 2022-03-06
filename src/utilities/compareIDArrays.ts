import { PartIDs } from 'types/Parts';

const compareIDArrays = (prevIDs: PartIDs, nextIDs: PartIDs) => {
  if (prevIDs.length !== nextIDs.length) {
    return false;
  } else {
    return !prevIDs.some((prevID, index) => {
      const nextID = nextIDs[index];
      return prevID !== nextID;
    });
  }
};

export default compareIDArrays;
