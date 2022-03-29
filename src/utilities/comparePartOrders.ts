import { UUID } from 'types/Parts';

const comparePartOrders = (prevIDs: UUID[], nextIDs: UUID[]) => {
  if (prevIDs.length !== nextIDs.length) {
    return false;
  } else {
    return !prevIDs.some((prevID, index) => {
      const nextID = nextIDs[index];
      return prevID !== nextID;
    });
  }
};

export default comparePartOrders;
