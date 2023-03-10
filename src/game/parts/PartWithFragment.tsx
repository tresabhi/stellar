import * as Properties from 'components/Properties';
import useTranslator from 'hooks/useTranslator';
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

export function PartWithFragmentProperties() {
  const { t } = useTranslator();

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.fragment`}</Properties.Title>
    </Properties.Group>
  );
}

export const registry = null;
