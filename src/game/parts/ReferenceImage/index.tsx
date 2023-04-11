import { ImageIcon as Icon, PlusIcon, UploadIcon } from '@radix-ui/react-icons';
import { useTexture } from '@react-three/drei';
import referenceImageDefault from 'assets/images/referenceImageDefault.png';
import { fileOpen } from 'browser-fs-access';
import * as Properties from 'components/Properties';
import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import prompt from 'core/interface/prompt';
import getPart from 'core/part/getPart';
import PartCategory from 'hooks/constants/partCategory';
import useMutualProperty from 'hooks/useMutualProperty';
import usePhysicalPart from 'hooks/usePartPhysical';
import useTranslator from 'hooks/useTranslator';
import { useRef } from 'react';
import ReferenceImageURLPrompt from 'routes/components/ReferenceImageURLPrompt';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import { PartRegistryItem } from 'stores/partRegistry';
import { Mesh, PlaneGeometry } from 'three';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import getImageDimensionsByURL from 'utilities/getImageDimensionsByURL';
import { PartData } from '../Part';
import {
  PartWithTransformations,
  PartWithTransformationsData,
} from '../PartWithTransformations';

export interface ReferenceImage extends PartWithTransformations {
  readonly n: 'Reference Image';
  source?: string;
  sourceName?: string;
}

export const ReferenceImageData: ReferenceImage = {
  ...PartData,
  ...PartWithTransformationsData,

  n: 'Reference Image',
  source: undefined,
  sourceName: undefined,
};

function LayoutComponent({ id }: PartComponentProps) {
  const mesh = useRef<Mesh>(null);
  const source = useBlueprint(
    (draft) => (draft.parts[id] as ReferenceImage).source,
  );
  const resolvedSource = source ?? referenceImageDefault;
  const texture = useTexture(resolvedSource);
  const props = usePhysicalPart(id, mesh);

  getImageDimensionsByURL(resolvedSource).then(([width, height]) => {
    if (mesh.current) {
      const part = getPart<ReferenceImage>(id);
      const max = Math.max(width, height);
      const compensatedWidth = width / max;
      const compensatedHeight = height / max;

      mesh.current.geometry = new PlaneGeometry(
        compensatedWidth,
        compensatedHeight,
      );

      boundsStore[id] = {
        needsRecomputation: false,
        bounds: {
          x: part.p.x,
          y: part.p.y,
          width: compensatedWidth * part.o.x,
          height: compensatedHeight * part.o.y,
          rotation: part.o.z,
        },
      };

      declareBoundsUpdated(id);
    }
  });

  return (
    <mesh {...props} ref={mesh}>
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export function ReferenceImageProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();
  const sourceName = useMutualProperty(
    ids,
    (state: ReferenceImage) => state.sourceName,
  );
  const resolvedSourceName =
    sourceName.value === undefined
      ? t`tabs.layout.right_sidebar.properties.reference_image.unknown`
      : sourceName.value;

  const handleImageURLClick = () => prompt(ReferenceImageURLPrompt);
  const handleImageUploadClick = async () => {
    const blob = await fileOpen({
      mimeTypes: ['image/*'],
    });
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      mutateBlueprint((draft) => {
        draft.selections.forEach((selection) => {
          const part = draft.parts[selection];

          if (part.n === 'Reference Image') {
            (part as ReferenceImage).source = fileReader.result as string;
            (part as ReferenceImage).sourceName =
              blob.handle?.name ??
              t`tabs.layout.right_sidebar.properties.reference_image.no_file`;
          }
        });
      });
    };
    fileReader.readAsDataURL(blob);
  };

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.reference_image`}</Properties.Title>

      <Properties.Row>
        <Properties.Label>
          {sourceName.mixed ? '~' : resolvedSourceName}
        </Properties.Label>
      </Properties.Row>

      <Properties.Row>
        <Properties.Button onClick={handleImageURLClick}>
          <PlusIcon />
          {t`tabs.layout.right_sidebar.properties.reference_image.url`}
        </Properties.Button>
        <Properties.Button onClick={handleImageUploadClick}>
          <UploadIcon />
          {t`tabs.layout.right_sidebar.properties.reference_image.upload`}
        </Properties.Button>
      </Properties.Row>
    </Properties.Group>
  );
}

export default {
  category: PartCategory.Abstract,
  vanillaData: null,
  data: ReferenceImageData,
  label: 'reference_image',

  Icon,
  LayoutComponent,
} as PartRegistryItem<ReferenceImage>;
