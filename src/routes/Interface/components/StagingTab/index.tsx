import { useTranslator } from 'hooks/useTranslator';
import { theme } from 'stitches.config';
import { TabContainer } from '../TabContainer';

export const StagingTab = () => {
  const { t } = useTranslator();

  return (
    <TabContainer>
      <div
        style={{
          backgroundColor: theme.colors.componentBackground.toString(),
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.colors.textHighContrast.toString(),
          fontSize: theme.fontSizes[16].toString(),
        }}
      >
        {t`tab.coming_soon`}
      </div>
    </TabContainer>
  );
};