import * as Sidebar from 'components/Sidebar';
import useTranslator from 'hooks/useTranslator';

export default function Snippets() {
  const { t } = useTranslator();

  return (
    <Sidebar.MessageContainer>
      <Sidebar.Message>{t`tabs.layout.left_sidebar.snippets.coming_soon`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {t`tabs.layout.left_sidebar.snippets.coming_soon.instructions`}
      </Sidebar.Message>
    </Sidebar.MessageContainer>
  );
}
