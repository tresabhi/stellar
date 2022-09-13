import * as Sidebar from 'components/Sidebar';
import { useTranslator } from 'hooks/useTranslator';

export const Inspect = () => {
  const { t } = useTranslator();

  return (
    <Sidebar.MessageContainer>
      <Sidebar.Message>{t`tab.layout.right_sidebar.inspect.coming_soon`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {t`tab.layout.right_sidebar.inspect.coming_soon.instructions`}
      </Sidebar.Message>
    </Sidebar.MessageContainer>
  );
};
