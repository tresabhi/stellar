import {
  Search as SearchPrimitive,
  SearchProps as SearchPrimitiveProps,
} from 'components/Search';
import { FC, HTMLAttributes } from 'react';
import { styled, theme } from 'stitches.config';

export interface SearchProps
  extends SearchPrimitiveProps,
  HTMLAttributes<HTMLDivElement> {}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.colors.appBackground1,
  borderRadius: theme.radii[4],
  overflowY: 'auto',
});

export const Search: FC<SearchProps> = ({
  list,
  input,
  fallback,
  escape,
  debounce,
  ...props
}) => (
  <Container {...props}>
    <SearchPrimitive
      list={list}
      input={input}
      fallback={fallback}
      escape={escape}
      debounce={debounce}
    />
  </Container>
);
