import SearchPrimitive, {
  SearchProps as SearchPrimitiveProps,
} from 'components/Search';
import { HTMLAttributes } from 'react';
import { styled, theme } from 'stitches.config';

export interface SearchProps
  extends SearchPrimitiveProps,
    HTMLAttributes<HTMLDivElement> {}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.colors.appBackground1,
  borderRadius: theme.radii.regular,
  overflowY: 'auto',
});

export function Search({
  list,
  input,
  fallback,
  escape,
  debounce,
  ...props
}: SearchProps) {
  return (
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
}
