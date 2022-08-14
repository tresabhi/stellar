import * as Listing from 'components/Listing';
import { Search } from 'components/Search';
import { popupClose } from 'core/ui';
import { go } from 'fuzzysort';
import useApp from 'hooks/useApp';
import { FC, KeyboardEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { styled, theme } from 'stitches.config';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';

export interface PalletItem {
  name: string;
  callback: () => void;
  note?: string;
  icon?: ReactNode;
}

export interface PalletProps {
  debounce?: number;
  iconGap?: boolean;
  items: PalletItem[];
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: theme.space.padding,
  gap: theme.space.gapRelatedMajor,
  borderRadius: theme.radii[4],
  border: theme.borderStyles.componentInteractive,
  backgroundColor: theme.colors.componentBackground,
  width: theme.sizes.palletWidth,
});

export const Pallet: FC<PalletProps> = ({ items, iconGap, debounce = 0 }) => {
  const nameMap = useMemo(() => new Map(items.map((item) => [item.name, item])), [items]);
  const names = useMemo(() => items.map((item) => item.name), [items]);
  const [search, setSearch] = useState('');
  const results = useMemo(() => go(search, names), [names, search]);
  const input = useRef<HTMLInputElement>(null!);
  const handleChange = fallingEdgeDebounce(() => setSearch(input.current.value), debounce);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') popupClose();
  };
  const listings = useMemo(
    () =>
      results.map((result) => {
        const item = nameMap.get(result.target)!;

        return (
          <Listing.Item onClick={item.callback} key={item.name} note={item.note} iconGap={iconGap} icon={item.icon}>
            {item.name}
          </Listing.Item>
        );
      }),
    [iconGap, nameMap, results],
  );

  useEffect(() => {
    input.current.focus();
  });

  useEffect(() => {
    useApp.setState({ isInteractingWithUI: true });

    return () => useApp.setState({ isInteractingWithUI: false });
  }, []);

  return (
    <Container>
      <Search ref={input} onKeyDown={handleKeyDown} onChange={handleChange} placeholder="Search parts..." />
      {listings.length > 0 && <Listing.Container>{listings}</Listing.Container>}
    </Container>
  );
};
