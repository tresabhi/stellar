import { Layout } from 'routes/components/Layout';
import { Tabs } from 'routes/components/Tabs';
import { DeviceVariantContainer } from 'routes/Mobile';

const Desktop = () => (
  <DeviceVariantContainer>
    <Tabs />
    <Layout />
  </DeviceVariantContainer>
);

export default Desktop;
