const compareStringArrays = (prevState: string[], nextState: string[]) => {
  if (prevState.length !== nextState.length) {
    return false;
  } else {
    return !prevState.some((prevID, index) => {
      const nextID = nextState[index];
      return prevID !== nextID;
    });
  }
};

export default compareStringArrays;
