import Scrollable from 'components/Scrollable';
import useStellarContext from 'hooks/useStellarContext';
import { isMobile } from 'react-device-detect';
import appStore from 'stores/app';
import 'styles/index.scss';
import { BufferGeometry, Mesh } from 'three';
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from 'three-mesh-bvh';

const App = () => {
  const stellarContext = useStellarContext();

  BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
  BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
  Mesh.prototype.raycast = acceleratedRaycast;

  if (stellarContext.codeName !== 'dev') {
    console.log(
      '%cWARNING!',
      `
        background-color: red;
        color: white;
        font-size: 32px;
        font-weight: bold;
      `,
    );
    console.log(
      `%cDo not paste in anything here unless you know what you are doing!\n\nMalicious code can harm ${stellarContext.title} and your data (blueprints, snippets, etc.) permanently`,
      `
        background-color: orange;
        color: white;
        font-weight: bold;
        font-size: 16px;
      `,
    );
  }

  if (window.location.pathname === '/')
    window.location.pathname = isMobile ? '/mobile' : '/desktop';

  const version = stellarContext.version.split('.');
  document.title = `${stellarContext.title} ${version[0]}.${version[1]}`;

  appStore.subscribe(
    (state) => state.hasUnsavedChanges,
    (hasUnsavedChanges) => {
      document.title = `${stellarContext.title} ${version[0]}.${version[1]}${
        hasUnsavedChanges ? '*' : ''
      }`;
    },
  );

  /*
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  );
  */

  return (
    <Scrollable
      style={{
        width: 500,
        height: 500,
        color: 'white',
        backgroundColor: 'rgb(40, 40, 40)',
      }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas auctor
      elit vitae lectus blandit, nec interdum sem consectetur. Morbi sed congue
      orci. Fusce at blandit dui, nec finibus ligula. Suspendisse volutpat odio
      euismod, ultricies libero at, suscipit est. In hac habitasse platea
      dictumst. Pellentesque ullamcorper faucibus arcu nec euismod. Mauris
      hendrerit sem eu nibh ultrices hendrerit. Donec massa metus, viverra et
      aliquet et, malesuada ultricies ipsum. Fusce cursus elit nec semper
      facilisis. In interdum at orci id imperdiet. Suspendisse faucibus non
      felis eu euismod. Nunc et metus ac erat lobortis venenatis. Vestibulum id
      tristique urna. Aenean venenatis, elit vel efficitur commodo, neque dolor
      bibendum ligula, et lobortis arcu mi nec mauris. Curabitur ornare
      dignissim elit. Vivamus ultricies nec nisi et maximus. Suspendisse eu urna
      nisi. Nulla non dignissim odio, ut fringilla velit. Pellentesque hendrerit
      vel dui id tempor. Praesent semper semper scelerisque. Pellentesque
      tincidunt ante at dui efficitur, id rutrum massa congue. Morbi a semper
      mi, quis dignissim eros. Integer venenatis ut mauris vel dictum. Donec sed
      euismod nisl, quis pellentesque ante. Curabitur ornare tellus nibh, ut
      mollis purus finibus vel. Donec et erat nec mauris mattis facilisis.
      Phasellus nec accumsan odio, malesuada vestibulum nunc. Nullam tellus leo,
      feugiat sed urna eu, dapibus ultrices libero. Mauris sodales ut ligula ac
      pharetra. Praesent fringilla, erat non commodo tempus, dui diam tristique
      odio, vel rutrum sem velit sed neque. Curabitur aliquam lorem finibus
      venenatis vehicula. Donec tristique, nisi vitae vulputate lacinia, lacus
      enim fringilla libero, at vehicula lectus risus nec odio. Phasellus
      euismod feugiat libero, sit amet iaculis velit venenatis eu. Quisque
      sagittis nibh mi, et mattis arcu pellentesque nec. In convallis enim non
      efficitur luctus. Suspendisse sodales libero vel erat laoreet commodo. Ut
      non leo sed augue vestibulum sollicitudin. Cras aliquam pellentesque quam
      non elementum. Sed at auctor est. Duis vitae lacus tortor. Nam luctus
      vestibulum malesuada. Donec ligula nulla, tempus eget felis eget,
      malesuada dignissim ligula. Aenean eleifend nunc ligula, quis convallis
      leo rutrum nec. Nunc commodo tincidunt nulla ac commodo. Fusce urna lorem,
      sagittis ut blandit quis, imperdiet et eros. Phasellus posuere sapien
      purus, vel ultrices diam consequat semper. Mauris et sapien magna. Nam
      risus enim, iaculis vitae metus a, pellentesque sollicitudin nisl. Aliquam
      erat volutpat. Sed ex dolor, posuere ut blandit ut, feugiat eu erat.
      Aliquam sodales nibh enim, vitae efficitur eros sollicitudin eu. Nulla vel
      dignissim odio. Fusce lacinia, orci in varius tincidunt, leo odio
      consequat elit, eget ultrices risus libero mollis velit. Morbi id nisi
      quis ante porttitor luctus a quis libero. Praesent pharetra condimentum
      vulputate. Ut vel hendrerit leo. Donec leo diam, lobortis dignissim
      bibendum in, posuere in enim. Praesent rutrum purus ac ligula posuere,
      eget lacinia nulla malesuada. Praesent blandit nulla eget dui
      pellentesque, id sodales lorem sagittis. Proin risus augue, luctus a
      mauris vitae, feugiat imperdiet eros. Phasellus sed nisl a eros hendrerit
      fringilla vitae a urna. Nam mauris enim, tristique non turpis vitae,
      bibendum egestas mauris. Proin aliquet ante nibh, nec ultrices nibh
      feugiat non. Donec sodales vulputate orci, eget ullamcorper felis semper
      a.
    </Scrollable>
  );
};
export default App;
