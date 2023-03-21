import { CircleIcon, Half2Icon } from '@radix-ui/react-icons';
import * as Properties from 'components/Properties';
import useToggleGroupProperty from 'hooks/propertyControllers/useToggleGroupProperty';
import useTranslator from 'hooks/useTranslator';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithFragment extends VanillaPart {
  T: { fragment: null | '' | 'left' | 'right' };
}

export interface PartWithFragment extends Part, VanillaPartWithFragment {}

export const VanillaPartWithFragmentData: VanillaPartWithFragment = {
  ...VanillaPartData,

  T: { fragment: '' },
};

export const PartWithFragmentData: PartWithFragment = {
  ...PartData,
  ...VanillaPartWithFragmentData,

  label: 'Unlabeled Part With Fragment',
};

export function PartWithFragmentProperties({
  ids,
}: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const fragment = useToggleGroupProperty(
    ids,
    (state: PartWithFragment) =>
      state.T.fragment === '' ? 'null' : `${state.T.fragment}`,
    (draft, value) => {
      draft.T.fragment = value === 'null' ? '' : value;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.fragment`}</Properties.Title>

      <Properties.ToggleGroup
        {...fragment}
        label={t`tabs.layout.right_sidebar.properties.fragment.section`}
      >
        <Properties.ToggleGroupItem value="left">
          <Half2Icon /> Left
        </Properties.ToggleGroupItem>
        <Properties.ToggleGroupItem value="null">
          <CircleIcon /> Whole
        </Properties.ToggleGroupItem>
        <Properties.ToggleGroupItem value="right">
          <Half2Icon /> Right
        </Properties.ToggleGroupItem>
      </Properties.ToggleGroup>
    </Properties.Group>
  );
}

export const registry = null;
