import { PartIDs } from 'types/Parts';

const compareAddressArrays = (prevIDs: PartIDs, nextIDs: PartIDs) => {
  if (prevIDs.length !== nextIDs.length) {
    return false;
  } else {
    return !prevIDs.some((prevAddress, index) => {
      const nextAddress = nextIDs?.[index];

      return (
        prevAddress[prevAddress.length - 1] !==
        nextAddress?.[nextAddress.length - 1]
      );
    });
  }
};

export default compareAddressArrays;
