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
      <p className="text-[#979797] text-sm">{t('share.thanks.text')}</p>
    </Pane>
  );
}
