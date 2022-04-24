const useClipboard = () => {
  const copy = (text: string) => navigator.clipboard.writeText(text);

  const hook = { copy };

  return hook;
};
export default useClipboard;
