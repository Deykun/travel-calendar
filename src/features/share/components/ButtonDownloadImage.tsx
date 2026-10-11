import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './ButtonDownloadImage.css';

import { Button } from '@/components/button/Button';
import IconImage from '@/components/icons/IconImage';
import useDataStore from '@/features/settings/stores/useDateStore';

export function ButtonDownloadImage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const isReady = useDataStore((store) => !!store.integration.lastUpdate);
  const { t } = useTranslation();

  const handleDownload = async () => {
    if (isDownloading) {
      return;
    }
    const domElement = document.getElementById('shareable-content-wrapper');

    console.log('domElement', domElement);

    if (!domElement) {
      return;
    }

    setIsDownloading(true);

    domElement.classList.add('SHARING-VIEW');

    try {
      const dataUrl = await htmlToImage.toJpeg(domElement);

      download(dataUrl, `deykun-github-io-travel-calendar.jpeg`);
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
