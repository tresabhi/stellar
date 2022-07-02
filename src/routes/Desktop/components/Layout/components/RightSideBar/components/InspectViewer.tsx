import * as PropertiesExplorer from 'components/PropertiesExplorer';
import useBlueprint from 'hooks/useBlueprint';
import usePart from 'hooks/usePart';
import useTranslator from 'hooks/useTranslator';
import { isUndefined } from 'lodash';

const InspectViewer = () => {
  const { t } = useTranslator();
  const selections = useBlueprint((state) => state.selections);
  const id = selections[0];
  const part = usePart(id); // TODO: this is reactive, but we need to make it not reactive

  return part && selections.length === 1 ? (
    <PropertiesExplorer.Container>
      {/* TODO: implement this feature */}
      {/* <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>JSON</PropertiesExplorer.Title>
        <PropertiesExplorer.Title>
          eh, imma do this part later
        </PropertiesExplorer.Title>
      </PropertiesExplorer.Group> */}
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>{t`properties_explorer.inspect.internal_data`}</PropertiesExplorer.Title>
        <PropertiesExplorer.Property
          type="full-width"
          label={t`properties_explorer.inspect.internal_data.id`}
          value={id}
          copyable
        />
        <PropertiesExplorer.Property
          type="full-width"
          label={t`properties_explorer.inspect.internal_data.parent_id`}
          value={`${part.parentId}`}
          copyable={!isUndefined(part.parentId)}
        />
      </PropertiesExplorer.Group>
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>{t`properties_explorer.inspect.meta_data`}</PropertiesExplorer.Title>
        <PropertiesExplorer.Property
          label={t`properties_explorer.inspect.meta_data.name`}
          value={part.n}
        />
        <PropertiesExplorer.Property
          label={t`properties_explorer.inspect.meta_data.locked`}
          value={`${part.locked}`}
        />
        <PropertiesExplorer.Property
          label={t`properties_explorer.inspect.meta_data.hidden`}
          value={`${part.hidden}`}
        />
      </PropertiesExplorer.Group>
    </PropertiesExplorer.Container>
  ) : (
    <PropertiesExplorer.Container>
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>
          {selections.length > 1
            ? t`properties_explorer.inspect.too_many_parts_selected`
            : t`properties_explorer.inspect.no_parts_selected`}
        </PropertiesExplorer.Title>
      </PropertiesExplorer.Group>
    </PropertiesExplorer.Container>
  );
};
export default InspectViewer;
