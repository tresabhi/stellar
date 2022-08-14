import { Layout } from 'routes/components/Layout';
import { Popups } from 'routes/components/Popups';
import { Tabs } from 'routes/components/Tabs';
import { styled } from 'stitches.config';

export const DeviceVariantContainer = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Mobile = () => (
  <DeviceVariantContainer>
    <Popups />

    <Tabs />
    <Layout />
  </DeviceVariantContainer>
);

export default Mobile;
