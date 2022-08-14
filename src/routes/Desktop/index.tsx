import { Layout } from 'routes/components/Layout';
import { Popups } from 'routes/components/Popups';
import { Tabs } from 'routes/components/Tabs';
import { DeviceVariantContainer } from 'routes/Mobile';

const Desktop = () => (
  <DeviceVariantContainer>
    <Popups />

    <Tabs />
    <Layout />
  </DeviceVariantContainer>
);

export default Desktop;
