import mutateApp from 'core/app/mutateApp';
import mutateSettings from 'core/app/mutateSettings';
import mutateSnippets from 'core/app/mutateSnippets';
import { createTranslator } from 'hooks/useTranslator';
import moment from 'moment';
import useApp from 'stores/app';
import useBlueprint from 'stores/blueprint';
import { SidebarTab } from 'stores/settings';
import useSnippets, { Snippet, SnippetListing } from 'stores/snippets';
import { MethodIds } from 'types/Parts';
import getTouchscreenMode from 'utilities/getTouchscreenMode';
import normalizeIds from 'utilities/normalizeIds';
import resizeImage from 'utilities/resizeImage';
import clone from './clone';
import panToSelected from './panToSelected';

const PREVIEW_RESOLUTION = 128;

export default function createSnippet(
  ids: MethodIds,
  blueprint = useBlueprint.getState(),
) {
  const snippet: Snippet = { parts: {}, part_order: [] };

  normalizeIds(ids).forEach((id) => {
    const [clonedPartId, clonedParts] = clone(id, blueprint);

    snippet.part_order.push(clonedPartId);
    Object.keys(clonedParts).forEach((clonedPartChildId) => {
      const clonedPart = clonedParts[clonedPartChildId];
      snippet.parts[clonedPartChildId] = clonedPart;
    });
  });

  panToSelected();
  setTimeout(async () => {
    const { f } = createTranslator();
    const { canvas } = useApp.getState().editor;
    const screenshot = canvas?.toDataURL();
    const image = screenshot
      ? await resizeImage(screenshot, PREVIEW_RESOLUTION)
      : '';
    const snippetListing: SnippetListing = {
      image,
      snippet,
      label: `${f`tabs.layout.left_sidebar.snippets.unnamed`[0]}${
        useSnippets.getState().snippets.length + 1
      }${f`tabs.layout.left_sidebar.snippets.unnamed`[1]}`,
      created: moment.now(),
    };

    mutateApp((draft) => {
      draft.interface.snippetSelection = useSnippets.getState().snippets.length;
    });
    mutateSnippets((draft) => {
      draft.snippets.push(snippetListing);
    });
    mutateSettings((draft) => {
      if (getTouchscreenMode()) {
        draft.interface.tabs.layout.rightSidebar.visible.inTouchscreenMode =
          true;
        draft.interface.tabs.layout.rightSidebar.tab = SidebarTab.Left;
      } else {
        draft.interface.tabs.layout.leftSidebar.tab = SidebarTab.Right;
      }
    });
  }, (1 / 60) * 1000);
}
