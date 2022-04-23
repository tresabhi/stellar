const timeoutDebounce = (callback: () => void, cooldown: number) => {
  let timeout: NodeJS.Timeout;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, cooldown);
  };
};
export default timeoutDebounce;
