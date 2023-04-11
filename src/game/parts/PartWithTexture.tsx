import * as Properties from 'components/Properties';
import useTranslator from 'hooks/useTranslator';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export type ColorTexture =
  | '_'
  | 'Color_White'
  | 'Color_Gray'
  | 'Color_Black'
  | 'Color_Orange'
  | 'Metal'
  | 'Metal_2'
  | 'Metal_3'
  | 'Metal_4'
  | 'Pattern_Squares'
  | 'Pattern_Bars_Band'
  | 'Pattern_Bars'
  | 'Pattern_Bars_Half'
  | 'Pattern_Half'
  | 'Pattern_Cone'
  | 'SV_S1_USA'
  | 'SV_S1_Flag'
  | 'SV_S2'
  | 'SV_S3'
  | 'USA_Logo'
  | 'Gold_Foil'
  | 'Nozzle_2'
  | 'Nozzle_3'
  | 'Array'
  | 'Arrows'
  | 'Strut_Gray';

export type ShapeTexture =
  | '_'
  | 'Flat'
  | 'Flat Smooth'
  | 'Flat Smooth 4'
  | 'Flat Faces'
  | 'Edges Smooth'
  | 'Edges Faces'
  | 'Edges Faces Top'
  | 'Edges Faces Bottom'
  | 'Rivets'
  | 'Half Rivets'
  | 'Interstage'
  | 'Interstage Full'
  | 'Fairing'
  | 'Nozzle_4'
  | 'Capsule'
  | 'Strut';

export interface VanillaPartWithTexture extends VanillaPart {
  T: { color_tex: ColorTexture; shape_tex: ShapeTexture };
}

export interface PartWithTexture extends Part, VanillaPartWithTexture {}

export const VanillaPartWithTextureData: VanillaPartWithTexture = {
  ...VanillaPartData,

  n: 'Part With Texture',
  T: { color_tex: '_', shape_tex: '_' },
};

export const PartWithTextureData: PartWithTexture = {
  ...PartData,
  ...VanillaPartWithTextureData,
};

export function PartWithTextureProperties() {
  const { t } = useTranslator();

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.texture`}</Properties.Title>
      <Properties.Label>{t`tabs.layout.right_sidebar.properties.texture.coming_soon`}</Properties.Label>
    </Properties.Group>
  );
}
