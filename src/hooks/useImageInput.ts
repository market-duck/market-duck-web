import { ChangeEventHandler, useState } from 'react';

/**
 * ### useImageInput
 * - 여러 이미지를 받기 위한 커스텀 훅
 * @hook
 */
export const useImageInput = () => {
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgSrcs, setImgSrcs] = useState<(string | undefined)[]>([]);

  const imageHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files && files.length) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        setImgFiles((prev) => [...prev, file]);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string | undefined;
          if (result) {
            setImgSrcs((prev) => [...prev, result]);
          }
        };
      }
    }
  };

  const deleteHandler = (idx: number) => {
    setImgFiles((prev) => prev.filter((_, fileIdx) => fileIdx !== idx));
    setImgSrcs((prev) => prev.filter((_, srcIdx) => srcIdx !== idx));
  };

  return { imgFiles, imgSrcs, imageHandler, setImgFiles, setImgSrcs, deleteHandler };
};
