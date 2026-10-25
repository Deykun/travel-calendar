import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './ButtonDownloadImage.css';

import { Button } from '@/components/button/Button';
import IconImage from '@/components/icons/IconImage';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { openSidebarShare } from '@/features/sidebar/stores/useSidebarStore';

export function ButtonDownloadImage() {
  const { from, to } = useFiltersStore((store) => store.activeFilters);
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);
  const [isDownloading, setIsDownloading] = useState(false);
  const isReady = useDataStore((store) => !!store.integration.lastUpdate);
  const { t } = useTranslation();

  const handleDownload = async () => {
    if (isDownloading) {
      return;
    }
    const domElement = document.getElementById('shareable-content-wrapper');

    if (!domElement) {
      return;
    }

    setIsDownloading(true);
    openSidebarShare();

    domElement.classList.add('SHARING-VIEW');

    try {
      const dataUrl = await htmlToImage.toJpeg(domElement);

      const nameIndex = [counterShouldShow, from, to].filter(Boolean).join('-');

      download(dataUrl, `travel-calendar-${nameIndex}.jpeg`);
    } catch (error) {
      console.error(error);
    }

    setIsDownloading(false);
    domElement.classList.remove('SHARING-VIEW');
  };

  if (!isReady) {
    return null;
  }

  return (
    <Button onClick={handleDownload} isLoading={isDownloading}>
      <IconImage />
      <span>{t('integration.downloadImage')}</span>
    </Button>
  );
}
