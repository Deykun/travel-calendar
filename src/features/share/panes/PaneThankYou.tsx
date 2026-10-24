import { useTranslation } from 'react-i18next';

import { Pane } from '@/features/sidebar/components/pane/Pane';

type Props = {
  className?: string;
};

export function PaneThankYou({ className }: Props) {
  const { t } = useTranslation();

  return (
    <Pane className={className}>
      <Pane.Title>{t('share.thanks.title')}</Pane.Title>
      <p className="text-[#b3b3a8] text-sm">{t('share.thanks.text')}</p>
    </Pane>
  );
}
