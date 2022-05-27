const compareStringArrays = (prevState: string[], nextState: string[]) => {
  if (prevState.length !== nextState.length) {
    return false;
  } else {
    return !prevState.some((prevId, index) => {
      const nextId = nextState[index];
      return prevId !== nextId;
    });
  }
};

export default compareStringArrays;
