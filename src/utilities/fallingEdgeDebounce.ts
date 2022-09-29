const fallingEdgeDebounce = <Args extends unknown[]>(
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
