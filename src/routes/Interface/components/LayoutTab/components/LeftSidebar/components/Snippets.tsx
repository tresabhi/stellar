import Button from 'components/Button';
import * as ScrollArea from 'components/ScrollArea';
import * as Sidebar from 'components/Sidebar';
import mutateApp from 'core/app/mutateApp';
import mutateSnippets from 'core/app/mutateSnippets';
import loadSnippet from 'core/part/loadSnippet';
import useTranslator from 'hooks/useTranslator';
import moment from 'moment';
import { useRef } from 'react';
import { styled, theme } from 'stitches.config';
import useApp from 'stores/app';
import useSnippets from 'stores/snippets';
import createInputEscape from 'utilities/createInputEscape';

const Listings = styled(ScrollArea.Root, {
  flex: '1 0 0',
});
const Wrapper = styled('div', {
  display: 'grid',
  gridTemplateRows: 'repeat(2, auto)',
  gridTemplateColumns: 'repeat(2, 1fr)',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  gridGap: theme.space.paddingRegular,
  padding: theme.space.paddingRegular,
});
const Listing = styled(Button, {
  borderRadius: theme.radii.regular,
  display: 'flex',
  flexDirection: 'column',

  defaultVariants: { border: true },
});
const Preview = styled('img', {
  flex: 1,
  width: '100%',
});
const Label = styled('div', {
  width: '100%',
  boxSizing: 'border-box',
  padding: theme.space.paddingMinor,
  borderTop: theme.borderStyles.interactive,
  display: 'flex',
  flexDirection: 'column',
});
const Name = styled('input', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[12],
  minWidth: '0',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textAlign: 'center',
});
const Modified = styled('span', {
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[10],
});
const Actions = styled('div', {
  display: 'flex',
  padding: theme.space.paddingRegular,
  gap: theme.space.gapRelatedMajor,
  borderTop: theme.borderStyles.nonInteractive,
});
const Action = styled(Button, {
  borderRadius: theme.radii.regular,
  padding: theme.space.paddingRegular,
  fontSize: theme.fontSizes[14],
  color: theme.colors.textHighContrast,
  flex: 1,

  defaultVariants: { border: true },
});

export default function Snippets() {
  const { t } = useTranslator();
  const hasNoSnippets = useSnippets((state) => state.snippets.length === 0);
  const snippets = useSnippets((state) => state.snippets);
  const selected = useApp((state) => state.interface.snippetSelection);
  const selectedLabel = useRef<HTMLInputElement>(null);

  return hasNoSnippets ? (
    <Sidebar.MessageRoot>
      <Sidebar.Message>{t`tabs.layout.left_sidebar.snippets.no_snippets`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {t`tabs.layout.left_sidebar.snippets.no_snippets.instructions`}
      </Sidebar.Message>
    </Sidebar.MessageRoot>
  ) : (
    <>
      <Listings
        onClick={() => {
          mutateApp((draft) => {
            draft.interface.snippetSelection = undefined;
          });
        }}
      >
        <ScrollArea.Viewport>
          <Wrapper>
            {snippets.map((snippetListing, index) => (
              <Listing
                color={selected === index ? 'accent' : undefined}
                key={`snippet-${
                  snippetListing.snippet.parts[
                    snippetListing.snippet.part_order[0]
                  ].id
                }`}
                onClick={(event) => {
                  event.stopPropagation();

                  mutateApp((draft) => {
                    draft.interface.snippetSelection =
                      selected === index ? undefined : index;
                  });
                }}
              >
                <Preview
                  src={snippetListing.image}
                  alt={snippetListing.label}
                />
                <Label>
                  <Name
                    ref={selected === index ? selectedLabel : undefined}
                    size={1}
                    defaultValue={snippetListing.label}
                    onFocus={(event) => event.target.select()}
                    onClick={(event) => event.stopPropagation()}
                    onBlur={(event) => {
                      mutateSnippets((draft) => {
                        if (event.target.value.trim().length > 0) {
                          draft.snippets[index].label = event.target.value;
                        } else {
                          event.target.value = draft.snippets[index].label;
                        }
                      });
                    }}
                    onKeyDown={createInputEscape()}
                    onKeyUp={(event) => event.preventDefault()}
                  />
                  <Modified>
                    {moment(snippetListing.created).fromNow()}
                  </Modified>
                </Label>
              </Listing>
            ))}
          </Wrapper>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </Listings>

      {selected !== undefined && (
        <Actions>
          <Action
            color="danger"
            onClick={() => {
              mutateSnippets((draft) => {
                draft.snippets.splice(selected, 1);
              });
              mutateApp((draft) => {
                draft.interface.snippetSelection = undefined;
              });
            }}
          >
            Delete
          </Action>
          <Action onClick={() => selectedLabel.current?.focus()}>Rename</Action>
          <Action
            color="accent"
            onClick={() => {
              loadSnippet(snippets[selected]);
            }}
          >
            Load
          </Action>
        </Actions>
      )}
    </>
  );
}
