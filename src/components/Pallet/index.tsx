import * as Listing from 'components/Listing';
import { Search } from 'components/Search';
import { popupClose } from 'core/ui';
import { go } from 'fuzzysort';
import {
  FC,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { styled, theme } from 'stitches.config';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

export interface PalletItem {
  name: string;
  callback: () => void;
  note?: string;
  noteURL?: string;
  icon?: ReactNode;
}

export interface PalletProps {
  debounce?: number;
  iconGap?: boolean;
  items: PalletItem[];
  placeholder?: string;
  transparent?: boolean;
  darkBackground?: boolean;
  hasMaxHeight?: boolean;
  gainFocus?: boolean;
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelatedMajor,
  flex: 1,

  variants: {
    transparent: {
      false: {
        borderRadius: theme.radii[4],
        border: theme.borderStyles.componentInteractive,
        backgroundColor: theme.colors.componentBackground,
        padding: theme.space.padding,
        width: theme.sizes.palletWidth,
      },
    },

    hasMaxHeight: {
      true: {
        maxHeight: theme.sizes.palletMaxHeight,
      },
    },
  },

  defaultVariants: {
    transparent: false,
    hasMaxHeight: true,
  },
});

const FlexListingContainer = styled(Listing.Container, {
  flex: '1 0 0',
});

export const Pallet: FC<PalletProps> = ({
  items,
  iconGap,
  debounce = 0,
  placeholder,
  transparent,
  darkBackground,
  hasMaxHeight,
  gainFocus,
}) => {
  const nameMap = useMemo(
    () => new Map(items.map((item) => [item.name, item])),
    [items],
  );
  const names = useMemo(() => items.map((item) => item.name), [items]);
  const namesFormatted = useMemo(
    () => names.map((name) => ({ target: name })),
    [names],
  );
  const [search, setSearch] = useState('');
  const results = useMemo(() => go(search, names), [names, search]);
  const input = useRef<HTMLInputElement>(null!);
  const firstResult = useRef<HTMLButtonElement>(null);
  const handleChange = fallingEdgeDebounce(
    () => setSearch(input.current.value),
    debounce,
  );
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      firstResult.current?.click();
    } else if (event.key === 'Escape') {
      popupClose();
    }
  };
  const listings = useMemo(
    () =>
      (search.length > 0 ? results : namesFormatted).map((result, index) => {
        const item = nameMap.get(result.target)!;

        return (
          <Listing.Item
            ref={index === 0 ? firstResult : undefined}
            onClick={item.callback}
            key={item.name}
            note={item.note}
            noteURL={item.noteURL}
            iconGap={iconGap}
            icon={item.icon}
          >
            {item.name}
          </Listing.Item>
        );
      }),
    [iconGap, nameMap, results, namesFormatted, search],
  );

  useEffect(() => {
    if (gainFocus) input.current.focus();
  });

  return (
    <Container hasMaxHeight={hasMaxHeight} transparent={transparent}>
      <Search
        ref={input}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={placeholder}
      />

      <FlexListingContainer darkBackground={darkBackground}>
        {listings}
      </FlexListingContainer>
    </Container>
  );
};
