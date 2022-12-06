import { ClipboardIcon, Component1Icon } from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import { useTranslator } from 'hooks/useTranslator';

export const Snippets = () => {
  const { t, f } = useTranslator();

  return (
    <Sidebar.MessageContainer>
      <Sidebar.Message>{t`tabs.layout.left_sidebar.snippets.coming_soon`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {f`tabs.layout.left_sidebar.snippets.coming_soon.instructions`[0]}
        <ClipboardIcon />
        {f`tabs.layout.left_sidebar.snippets.coming_soon.instructions`[1]}
        <Component1Icon />
        {f`tabs.layout.left_sidebar.snippets.coming_soon.instructions`[2]}
      </Sidebar.Message>
    </Sidebar.MessageContainer>
  );
};
