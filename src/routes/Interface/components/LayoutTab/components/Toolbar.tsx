import {
  AllSidesIcon,
  BoxModelIcon,
  CardStackMinusIcon,
  CardStackPlusIcon,
  ClipboardIcon,
  Component1Icon,
  CopyIcon,
  CursorArrowIcon,
  DiscordLogoIcon,
  DoubleArrowDownIcon,
  DownloadIcon,
  EnterIcon,
  ExclamationTriangleIcon,
  ExitIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  FileIcon,
  FilePlusIcon,
  GearIcon,
  GitHubLogoIcon,
  GroupIcon,
  HandIcon,
  InfoCircledIcon,
  KeyboardIcon,
  LightningBoltIcon,
  LockClosedIcon,
  LockOpen2Icon,
  MagicWandIcon,
  MarginIcon,
  Pencil1Icon,
  PlusCircledIcon,
  PlusIcon,
  ResetIcon,
  RulerHorizontalIcon,
  ScissorsIcon,
  StackIcon,
  TransformIcon,
  TrashIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar-icon.svg';
import centerOfBuild from 'assets/images/center-of-build.png';
import { groupedControls } from 'components/Canvas/components/EditControls';
import * as ToolbarPrimitive from 'components/Toolbar';
import { DISCORD, WEBSITE } from 'constants/social';
import { GH_REPO_URL } from 'constants/sourceCode';
import mutateApp from 'core/app/mutateApp';
import mutateSettings from 'core/app/mutateSettings';
import exportFile from 'core/blueprint/exportFile';
import importFile from 'core/blueprint/importFile';
import loadBlueprint from 'core/blueprint/loadBlueprint';
import openFile from 'core/blueprint/openFile';
import redoVersion from 'core/blueprint/redoVersion';
import saveFile from 'core/blueprint/saveFile';
import saveFileAs from 'core/blueprint/saveFileAs';
import undoVersion from 'core/blueprint/undoVersion';
import confirmProgressReset from 'core/interface/confirmProgressReset';
import prompt from 'core/interface/prompt';
import copySelected from 'core/part/copySelected';
import createSnippetSelected from 'core/part/createSnippetSelected';
import cutPartsBySelection from 'core/part/cutSelected';
import deleteSelected from 'core/part/deleteSelected';
import duplicateSelected from 'core/part/duplicateSelected';
import enterEditMode from 'core/part/enterEditMode';
import groupSelected from 'core/part/groupSelected';
import paste from 'core/part/paste';
import selectConcurrentAtRoot from 'core/part/selectConcurrentAtRoot';
import toggleSelectedLocked from 'core/part/toggleSelectedLocked';
import toggleSelectedVisible from 'core/part/toggleSelectedVisible';
import ungroupSelected from 'core/part/ungroupSelected';
import unselectAll from 'core/part/unselectAll';
import useTranslator from 'hooks/useTranslator';
import InsertPartPrompt from 'routes/components/InsertPartPrompt';
import RenamePartsPrompt from 'routes/components/RenamePartsPrompt';
import SettingsPrompt from 'routes/components/SettingsPrompt';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import useSettings from 'stores/settings';
import useVersionControl from 'stores/versionControl';

export function UniversalToolbarControlsRight() {
  const { t } = useTranslator();
  const hasUndos = useVersionControl((state) => state.index > -1);
  const hasRedos = useVersionControl(
    (state) => state.history.length - 1 > state.index,
  );
  const link = (url: string) => () => window.open(url, '_blank');

  return (
    <ToolbarPrimitive.Group>
      <ToolbarPrimitive.Button
        onClick={() => undoVersion()}
        disabled={!hasUndos}
      >
        <ResetIcon />
      </ToolbarPrimitive.Button>

      <ToolbarPrimitive.Button
        onClick={() => redoVersion()}
        disabled={!hasRedos}
      >
        <ResetIcon style={{ transform: 'scaleX(-1)' }} />
      </ToolbarPrimitive.Button>

      <ToolbarPrimitive.DropdownMenu icon={<InfoCircledIcon />}>
        <ToolbarPrimitive.DropdownMenuItem
          icon={<InfoCircledIcon />}
          keybind="F1"
          onClick={link(WEBSITE)}
        >
          {t`tabs.layout.toolbar.help.about`}
        </ToolbarPrimitive.DropdownMenuItem>

        <ToolbarPrimitive.DropdownMenuItem
          icon={<ExclamationTriangleIcon />}
          keybind="F4"
          onClick={link(`${GH_REPO_URL}issues/new/choose`)}
        >
          {t`tabs.layout.toolbar.help.report`}
        </ToolbarPrimitive.DropdownMenuItem>

        <ToolbarPrimitive.DropdownMenuItem
          icon={<DiscordLogoIcon />}
          onClick={link(DISCORD)}
        >
          {t`tabs.layout.toolbar.help.discord`}
        </ToolbarPrimitive.DropdownMenuItem>

        <ToolbarPrimitive.DropdownMenuItem
          icon={<GitHubLogoIcon />}
          onClick={link(GH_REPO_URL)}
        >
          {t`tabs.layout.toolbar.help.github`}
        </ToolbarPrimitive.DropdownMenuItem>
      </ToolbarPrimitive.DropdownMenu>

      <ToolbarPrimitive.DropdownMenu icon={<GearIcon />}>
        <ToolbarPrimitive.DropdownMenuItem
          onClick={() => prompt(SettingsPrompt)}
          icon={<GearIcon />}
          keybind="Ctrl + ,"
        >
          {t`tabs.layout.toolbar.preferences.settings`}
        </ToolbarPrimitive.DropdownMenuItem>

        <ToolbarPrimitive.DropdownMenuItem
          disabled
          keybind="Ctrl + K"
          icon={<KeyboardIcon />}
        >
          {t`tabs.layout.toolbar.preferences.keybinds`}
        </ToolbarPrimitive.DropdownMenuItem>
      </ToolbarPrimitive.DropdownMenu>
    </ToolbarPrimitive.Group>
  );
}

export function UniversalToolbarControlsLeft() {
  const { t } = useTranslator();

  return (
    <>
      <ToolbarPrimitive.Button disabled>
        <StellarIcon />
      </ToolbarPrimitive.Button>

      <ToolbarPrimitive.DropdownMenu icon={<FileIcon />}>
        <ToolbarPrimitive.DropdownMenuItem
          icon={<FilePlusIcon />}
          keybind="Ctrl + N"
          onClick={async () => {
            if (await confirmProgressReset()) loadBlueprint();
          }}
        >
          {t`tabs.layout.toolbar.file.new`}
        </ToolbarPrimitive.DropdownMenuItem>

        <ToolbarPrimitive.DropdownMenuItem
          icon={<UploadIcon />}
          keybind="Ctrl + O"
          onClick={() => openFile()}
        >
          {t`tabs.layout.toolbar.file.open`}
        </ToolbarPrimitive.DropdownMenuItem>

        <ToolbarPrimitive.DropdownMenuItem
          icon={<DownloadIcon />}
          keybind="Ctrl + S"
          onClick={() => saveFile()}
        >
          {t`tabs.layout.toolbar.file.save`}
        </ToolbarPrimitive.DropdownMenuItem>

        <ToolbarPrimitive.DropdownMenuItem
          icon={<DownloadIcon />}
          keybind="Ctrl + Shift + S"
          onClick={() => saveFileAs()}
        >
          {t`tabs.layout.toolbar.file.save_as`}
        </ToolbarPrimitive.DropdownMenuItem>

        <ToolbarPrimitive.DropdownMenuItem
          icon={<EnterIcon />}
          keybind="Ctrl + I"
          onClick={() => importFile()}
        >
          {t`tabs.layout.toolbar.file.import`}
        </ToolbarPrimitive.DropdownMenuItem>

        <ToolbarPrimitive.DropdownMenuItem
          icon={<ExitIcon />}
          keybind="Ctrl + E"
          onClick={() => exportFile()}
        >
          {t`tabs.layout.toolbar.file.export`}
        </ToolbarPrimitive.DropdownMenuItem>
      </ToolbarPrimitive.DropdownMenu>
    </>
  );
}

export default function Toolbar() {
  const { t, translate } = useTranslator();
  const showCenterOfBuild = useSettings(
    (state) => state.editor.showCenterOfBuild,
  );
  const selectMultiple = useApp((state) => state.editor.selectMultiple);
  const selectDeep = useApp((state) => state.editor.selectDeep);
  const focusMode = useApp((state) => state.interface.focusMode);
  const snap = useApp((state) => state.editor.snap);
  const scaleWithRatio = useApp((state) => state.editor.scaleWithRatio);
  const tool = useApp((state) =>
    state.editor.isSpacePanning || state.editor.isTouchPanning
      ? Tool.Pan
      : state.editor.tool,
  );
  const isOneHidden = useBlueprint(({ part_selections, parts }) =>
    part_selections.some((selection) => {
      const part = parts[selection];
      return !part.visible;
    }),
  );
  const isOneLocked = useBlueprint(({ part_selections, parts }) =>
    part_selections.some((selection) => {
      const part = parts[selection];
      return part.locked;
    }),
  );
  const hasNoSelections = useBlueprint(
    (state) => state.part_selections.length === 0,
  );
  const hasParts = useBlueprint((state) => Object.keys(state.parts).length > 0);
  const hasNoItemInClipboard = useApp(
    (state) => state.editor.clipboard === undefined,
  );
  const hasControllablePart = useBlueprint(
    (state) =>
      state.part_selections.length >= 1 &&
      state.parts[state.part_selections[0]].n in groupedControls,
  );

  return (
    <ToolbarPrimitive.Root>
      <ToolbarPrimitive.Group>
        <UniversalToolbarControlsLeft />

        <ToolbarPrimitive.DropdownMenu
          icon={
            <>
              {tool === Tool.Pan && <HandIcon />}
              {tool === Tool.Transform && <CursorArrowIcon />}
              {tool === Tool.Edit && <MagicWandIcon />}
            </>
          }
        >
          <ToolbarPrimitive.DropdownMenuItem
            icon={<HandIcon />}
            keybind="Space"
            onClick={() =>
              mutateApp((draft) => {
                draft.editor.tool = Tool.Pan;
              })
            }
          >
            {t`tabs.layout.toolbar.tool.pan`}
          </ToolbarPrimitive.DropdownMenuItem>
          <ToolbarPrimitive.DropdownMenuItem
            icon={<CursorArrowIcon />}
            keybind="V"
            onClick={() =>
              mutateApp((draft) => {
                draft.editor.tool = Tool.Transform;
              })
            }
          >
            {t`tabs.layout.toolbar.tool.transform`}
          </ToolbarPrimitive.DropdownMenuItem>
          <ToolbarPrimitive.DropdownMenuItem
            disabled={!hasControllablePart}
            icon={<MagicWandIcon />}
            keybind="Enter"
            onClick={enterEditMode}
          >
            {t`tabs.layout.toolbar.tool.edit`}
          </ToolbarPrimitive.DropdownMenuItem>
        </ToolbarPrimitive.DropdownMenu>

        <ToolbarPrimitive.Button onClick={() => prompt(InsertPartPrompt)}>
          <PlusIcon />
        </ToolbarPrimitive.Button>
      </ToolbarPrimitive.Group>

      <ToolbarPrimitive.Group>
        <ToolbarPrimitive.DropdownMenu
          disabled={hasNoSelections}
          icon={<Pencil1Icon />}
        >
          <ToolbarPrimitive.DropdownMenuItem
            icon={<Pencil1Icon />}
            onClick={() => prompt(RenamePartsPrompt)}
            keybind="Ctrl + R"
          >
            {t`tabs.layout.toolbar.edit.rename`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            icon={isOneHidden ? <EyeOpenIcon /> : <EyeClosedIcon />}
            onClick={() => toggleSelectedVisible()}
          >
            {translate(
              `tabs.layout.toolbar.edit.${isOneHidden ? 'hidden' : 'unhidden'}`,
            )}
          </ToolbarPrimitive.DropdownMenuItem>
          <ToolbarPrimitive.DropdownMenuItem
            icon={isOneLocked ? <LockOpen2Icon /> : <LockClosedIcon />}
            onClick={() => toggleSelectedLocked()}
          >
            {translate(
              `tabs.layout.toolbar.edit.${isOneLocked ? 'locked' : 'unlocked'}`,
            )}
          </ToolbarPrimitive.DropdownMenuItem>
          <ToolbarPrimitive.DropdownMenuItem
            icon={<TrashIcon />}
            onClick={() => deleteSelected()}
            keybind="Del"
          >
            {t`tabs.layout.toolbar.edit.delete`}
          </ToolbarPrimitive.DropdownMenuItem>
        </ToolbarPrimitive.DropdownMenu>

        <ToolbarPrimitive.DropdownMenu
          disabled={!hasParts && hasNoSelections}
          icon={<GroupIcon />}
        >
          <ToolbarPrimitive.DropdownMenuItem
            disabled={!hasParts}
            icon={<CardStackPlusIcon />}
            onClick={() => selectConcurrentAtRoot()}
            keybind="Ctrl + A"
          >
            {t`tabs.layout.toolbar.selection.select_all`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            disabled={hasNoSelections}
            icon={<CardStackMinusIcon />}
            onClick={() => unselectAll()}
            keybind="Esc"
          >
            {t`tabs.layout.toolbar.selection.unselect_all`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            disabled={hasNoSelections}
            icon={<TransformIcon />}
            onClick={() => groupSelected()}
            keybind="Ctrl + G"
          >
            {t`tabs.layout.toolbar.selection.group`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            disabled={hasNoSelections}
            icon={<StackIcon />}
            onClick={() => ungroupSelected()}
            keybind="Ctrl + Shift + G"
          >
            {t`tabs.layout.toolbar.selection.ungroup`}
          </ToolbarPrimitive.DropdownMenuItem>
        </ToolbarPrimitive.DropdownMenu>

        <ToolbarPrimitive.DropdownMenu
          disabled={hasNoItemInClipboard && hasNoSelections}
          icon={<ClipboardIcon />}
        >
          <ToolbarPrimitive.DropdownMenuItem
            icon={<CopyIcon />}
            onClick={() => copySelected()}
            keybind="Ctrl + C"
            disabled={hasNoSelections}
          >
            {t`tabs.layout.toolbar.clipboard.copy`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            icon={<ScissorsIcon />}
            onClick={() => cutPartsBySelection()}
            keybind="Ctrl + X"
            disabled={hasNoSelections}
          >
            {t`tabs.layout.toolbar.clipboard.cut`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            icon={<ClipboardIcon />}
            onClick={() => paste()}
            keybind="Ctrl + V"
            disabled={hasNoItemInClipboard}
          >
            {t`tabs.layout.toolbar.clipboard.paste`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            icon={<StackIcon />}
            onClick={() => duplicateSelected()}
            keybind="Ctrl + D"
            disabled={hasNoSelections}
          >
            {t`tabs.layout.toolbar.clipboard.duplicate`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            icon={<Component1Icon />}
            keybind="Ctrl + M"
            disabled={hasNoSelections}
            onClick={() => createSnippetSelected()}
          >
            {t`tabs.layout.toolbar.clipboard.create_snippet`}
          </ToolbarPrimitive.DropdownMenuItem>
        </ToolbarPrimitive.DropdownMenu>

        <ToolbarPrimitive.DropdownMenu icon={<AllSidesIcon />}>
          <ToolbarPrimitive.DropdownMenuItem
            onClick={() =>
              mutateApp((draft) => {
                draft.editor.selectDeep = !draft.editor.selectDeep;
              })
            }
            color={selectDeep ? 'accent' : undefined}
            icon={<DoubleArrowDownIcon />}
            keybind="Ctrl"
          >
            {t`tabs.layout.toolbar.cursor.select_deep`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            onClick={() =>
              mutateApp((draft) => {
                draft.editor.selectMultiple = !draft.editor.selectMultiple;
              })
            }
            color={selectMultiple ? 'accent' : undefined}
            icon={<PlusCircledIcon />}
            keybind="Shift"
          >
            {t`tabs.layout.toolbar.cursor.select_multiple`}
          </ToolbarPrimitive.DropdownMenuItem>

          <ToolbarPrimitive.DropdownMenuItem
            onClick={() =>
              mutateApp((draft) => {
                draft.interface.focusMode = !draft.interface.focusMode;
              })
            }
            color={focusMode ? 'accent' : undefined}
            icon={<LightningBoltIcon />}
            keybind="Alt + F"
          >
            {t`tabs.layout.toolbar.cursor.focus_mode`}
          </ToolbarPrimitive.DropdownMenuItem>
        </ToolbarPrimitive.DropdownMenu>

        <ToolbarPrimitive.DropdownMenu icon={<RulerHorizontalIcon />}>
          <ToolbarPrimitive.DropdownMenuItem
            icon={<MarginIcon />}
            color={snap ? 'accent' : undefined}
            onClick={() => {
              mutateApp((draft) => {
                draft.editor.snap = true;
              });
            }}
          >
            {t`tabs.layout.toolbar.measurements.snap`}
          </ToolbarPrimitive.DropdownMenuItem>
          <ToolbarPrimitive.DropdownMenuItem
            icon={<BoxModelIcon />}
            keybind="Ctrl"
            color={!snap ? 'accent' : undefined}
            onClick={() => {
              mutateApp((draft) => {
                draft.editor.snap = false;
              });
            }}
          >
            {t`tabs.layout.toolbar.measurements.no_snap`}
          </ToolbarPrimitive.DropdownMenuItem>
          <ToolbarPrimitive.DropdownMenuItem
            icon={<TransformIcon />}
            keybind="Shift"
            color={scaleWithRatio ? 'accent' : undefined}
            onClick={() => {
              mutateApp((draft) => {
                draft.editor.scaleWithRatio = !draft.editor.scaleWithRatio;
              });
            }}
          >
            {t`tabs.layout.toolbar.measurements.scale_with_ratio`}
          </ToolbarPrimitive.DropdownMenuItem>
          <ToolbarPrimitive.DropdownMenuItem
            icon={<img src={centerOfBuild} alt="center of build" />}
            keybind="Alt + B"
            color={showCenterOfBuild ? 'accent' : undefined}
            onClick={() => {
              mutateSettings((draft) => {
                draft.editor.showCenterOfBuild =
                  !draft.editor.showCenterOfBuild;
              });
            }}
          >
            {t`tabs.layout.toolbar.measurements.center_of_build`}
          </ToolbarPrimitive.DropdownMenuItem>
        </ToolbarPrimitive.DropdownMenu>
      </ToolbarPrimitive.Group>

      <UniversalToolbarControlsRight />
    </ToolbarPrimitive.Root>
  );
}
