import { PartAddress } from 'types/Blueprint';

const compareAddressArrays = (
  prevProps: PartAddress[],
  nextProps: PartAddress[],
) => {
  if (prevProps.length !== nextProps.length) {
    return false;
  } else {
    return !prevProps.some((prevAddress, index) => {
      const nextAddress = nextProps?.[index];

      return (
        prevAddress[prevAddress.length - 1] !==
        nextAddress?.[nextAddress.length - 1]
      );
    });
  }
};

export default compareAddressArrays;
