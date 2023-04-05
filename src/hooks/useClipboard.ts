const input = document.createElement('input');
let isMounted = false;

export default function useClipboard() {
  const copy = (text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      input.value = text;
      input.select();
      document.execCommand('copy');
    }
  };

  if (!isMounted) {
    isMounted = true;
    document.body.appendChild(input);
    input.style.display = 'none';
  }

  const hook = { copy };

  return hook;
}
