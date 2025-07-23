import defaultImg from '@market-duck/assets/images/defaultThumbnail.svg';
import { checkImageUrl, checkMultipleImageUrls } from '@market-duck/utils/imageValidation';
import { useEffect, useState } from 'react';

export const useSingleImageValidation = (imgSrc?: string) => {
  const [validImage, setValidImage] = useState<string>(defaultImg);

  useEffect(() => {
    const validateImage = async () => {
      if (!imgSrc) {
        setValidImage(defaultImg);
        return;
      }

      const isValid = await checkImageUrl(imgSrc);
      setValidImage(isValid ? imgSrc : defaultImg);
    };

    validateImage();
  }, [imgSrc]);

  return validImage;
};

export const useMultipleImageValidation = (imgSrcs?: string[]) => {
  const [validImages, setValidImages] = useState<string[]>([]);

  useEffect(() => {
    const validateImages = async () => {
      if (!imgSrcs?.length) {
        setValidImages([defaultImg]);
        return;
      }

      const results = await checkMultipleImageUrls(imgSrcs);
      const validUrls = imgSrcs.filter((_, index) => results[index]);
      setValidImages(validUrls.length ? validUrls : [defaultImg]);
    };

    validateImages();
  }, [imgSrcs]);

  return validImages;
};
