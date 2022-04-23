const element = document.createElement('input');
let isMounted = false;

const useClipboard = () => {
  if (!isMounted) {
    document.body.appendChild(element);
    element.style.display = 'none';

    isMounted = true;
  }

  const copy = (text: string) => {
    element.value = text;
    element.select();

    return navigator.clipboard.writeText(text);
  };

  const hook = { copy };

  return hook;
};
export default useClipboard;
