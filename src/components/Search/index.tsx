import { go } from 'fuzzysort';
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

export type SearchItem = {
  string: string;
  node: ReactNode;
  callback?: () => void;
};

export interface SearchProps {
  list: SearchItem[];
  input: RefObject<HTMLInputElement>;
  fallback?: ReactNode;
  escape?: () => void;
  debounce?: number;
}

export const Search: FC<SearchProps> = ({
  list,
  input,
  fallback,
  escape,
  debounce = 0,
}) => {
  const [defaultList] = useState(list.map(({ node }) => node));
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
      firstCallback.current && firstCallback.current();
    } else if ((event as KeyboardEvent).key === 'Escape') {
      escape && escape();
    }
  };

  useEffect(() => {
    input.current?.addEventListener('input', handleChange);
    input.current?.addEventListener('keydown', handleKeydown);

    return () => {
      input.current?.removeEventListener('input', handleChange);
      input.current?.removeEventListener('keydown', handleKeydown);
    };
  });

  return <>{children}</>;
};
