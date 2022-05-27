import * as PropertiesExplorer from 'components/PropertiesExplorer';
import useBlueprint from 'hooks/useBlueprint';
import usePart from 'hooks/usePart';
import { isUndefined } from 'lodash';

const InspectViewer = () => {
  const selections = useBlueprint((state) => state.selections);
  const id = selections[0];
  const part = usePart(id); // TODO: this is reactive, but we need to make it not reactive

  return part && selections.length === 1 ? (
    <PropertiesExplorer.Container>
      {/* <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>JSON</PropertiesExplorer.Title>
        <PropertiesExplorer.Title>
          eh, imma do this part later
        </PropertiesExplorer.Title>
      </PropertiesExplorer.Group> */}
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>Internal Data</PropertiesExplorer.Title>
        <PropertiesExplorer.Property
          type="wide"
          label="Id"
          value={id}
          copyable
        />
        <PropertiesExplorer.Property
          type="wide"
          label="Parent Id"
          value={`${part.parentId}`}
          copyable={!isUndefined(part.parentId)}
        />
      </PropertiesExplorer.Group>
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>Meta Data</PropertiesExplorer.Title>
        <PropertiesExplorer.Property label="Name" value={part.n} />
        <PropertiesExplorer.Property label="Locked" value={`${part.locked}`} />
        <PropertiesExplorer.Property label="Hidden" value={`${part.hidden}`} />
      </PropertiesExplorer.Group>
    </PropertiesExplorer.Container>
  ) : (
    <PropertiesExplorer.Container>
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>
          {selections.length > 1 ? '>1 Selections' : 'No Selections'}
        </PropertiesExplorer.Title>
      </PropertiesExplorer.Group>
    </PropertiesExplorer.Container>
  );
};
export default InspectViewer;
