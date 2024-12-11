import { ImageItem } from '@market-duck/types/image';
import { ChangeEventHandler, useState } from 'react';

/**
 * ### useImageInput
 * - 여러 이미지를 받기 위한 커스텀 훅
 * @hook
 */
export const useImageInput = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [deleteIdx, setDeleteIdx] = useState<number[]>([]);

  const imageHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files && files.length) {
      const newImages: ImageItem[] = [];

      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const src = reader.result as string;
          newImages.push({ src, file, isUploaded: false });

          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages]);
          }
        };
      }
    }
  };

  const serverImageHandler = (serverImgSrcs: string[]) => {
    const serverImages = serverImgSrcs.map((src) => ({
      src,
      file: null,
      isUploaded: true,
    }));
    setImages((prev) => [...serverImages, ...prev]);
  };

  const deleteHandler = (idx: number) => {
    setImages((prev) => prev.filter((_, imageIdx) => imageIdx !== idx));
    const targetImage = images[idx];

    if (targetImage?.isUploaded) {
      setDeleteIdx((prev) => [...prev, idx]);
    }
  };

  return { images, deleteIdx, imageHandler, serverImageHandler, deleteHandler };
};
