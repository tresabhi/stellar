const fallingEdgeDebounce = <Args extends any[]>(
  callback: (...args: Args) => void,
  cooldown: number,
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, cooldown);
  };
};
export default fallingEdgeDebounce;
