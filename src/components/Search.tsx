import { go } from 'fuzzysort';
import {
  Fragment,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

export interface SearchItem {
  string: string;
  node: ReactNode;
  callback?: () => void;
}

export type SearchItems = SearchItem[];

export interface SearchProps {
  list: SearchItem[];
  input: RefObject<HTMLInputElement>;
  fallback?: ReactNode;
  escape?: () => void;
  debounce?: number;
}

export default function Search({
  list,
  input,
  fallback,
  escape,
  debounce = 0,
}: SearchProps) {
  const [defaultList] = useState<ReactNode[]>(
    list.map(({ node, string }) => <Fragment key={string}>{node}</Fragment>),
  );
  const [children, setChildren] = useState(defaultList);
  const firstCallback = useRef<(() => void) | undefined>(list[0]?.callback);

  const handleChange = fallingEdgeDebounce((event: Event) => {
    const { value } = event.target as HTMLInputElement;

    if (value === '') {
      setChildren(defaultList);
    } else {
      const results = go(value, list, { key: 'string' });
      const resultNodes = results.map((result, index) => {
        if (index === 0) firstCallback.current = result.obj.callback;
        return result.obj.node;
      });

      if (resultNodes.length === 0) {
        firstCallback.current = undefined;

        if (fallback) {
          setChildren([fallback]);
        } else {
          setChildren([]);
        }
      } else {
        setChildren(resultNodes);
      }
    }
  }, debounce);
  const handleKeydown = (event: Event) => {
    if ((event as KeyboardEvent).key === 'Enter') {
      if (firstCallback.current) firstCallback.current();
    } else if ((event as KeyboardEvent).key === 'Escape') {
      if (escape) escape();
    }
  };

  useEffect(() => {
    const copiedInput = input.current;

    copiedInput?.addEventListener('input', handleChange);
    copiedInput?.addEventListener('keydown', handleKeydown);

    return () => {
      copiedInput?.removeEventListener('input', handleChange);
      copiedInput?.removeEventListener('keydown', handleKeydown);
    };
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
