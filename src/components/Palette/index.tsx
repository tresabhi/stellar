import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { IconInput } from 'components/IconInput';
import * as Listing from 'components/Listing';
import { popupClose } from 'core/interface';
import { go } from 'fuzzysort';
import {
  FC,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { styled, theme } from 'stitches.config';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

export interface PaletteItem {
  name: string;
  callback: () => void;
  note?: string;
  noteURL?: string;
  icon?: ReactNode;
}

export interface PaletteProps {
  debounce?: number;
  iconGap?: boolean;
  items: PaletteItem[];
  placeholder?: string;
  transparent?: boolean;
  darkBackground?: boolean;
  hasMaxHeight?: boolean;
  gainFocus?: boolean;
  collapse?: boolean;
}

const Container = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',
  gap: theme.space.gapRelatedMajor,
  flex: 1,

  variants: {
    transparent: {
      false: {
        borderRadius: theme.radii[4],
        border: theme.borderStyles.componentNonInteractive,
        backgroundColor: theme.colors.componentBackground,
        padding: theme.space.padding,
        width: theme.sizes.popupWidth,
      },
    },

    hasMaxHeight: {
      true: {
        maxHeight: theme.sizes.paletteMaxHeight,
      },
    },
  },

  defaultVariants: {
    transparent: false,
    hasMaxHeight: true,
  },
});

const FlexListingContainer = styled(Listing.Container, {
  variants: {
    collapse: {
      true: {
        flex: '1 0 0',
      },

      false: {
        flex: 1,
      },
    },
  },

  defaultVariants: {
    collapse: false,
  },
});

const NoResults = styled('span', {
  textAlign: 'center',
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[12],
  marginTop: theme.space.marginUnrelated,
});

export const Palette: FC<PaletteProps> = ({
  items,
  iconGap,
  debounce = 0,
  placeholder,
  transparent,
  darkBackground,
  hasMaxHeight,
  gainFocus,
  collapse,
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
      <IconInput
        icon={<MagnifyingGlassIcon />}
        ref={input}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={placeholder}
      />

      {listings.length > 0 ? (
        <FlexListingContainer collapse={collapse} contrast={darkBackground}>
          {listings}
        </FlexListingContainer>
      ) : (
        <NoResults>No parts found</NoResults>
      )}
    </Container>
  );
};
