import { ChangeEvent, useState } from 'react';

const useImageInput = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | ArrayBuffer | null>(null);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImgSrc(reader.result);
    }
  };

  return { imgFile, imgSrc, imageHandler, setImgFile, setImgSrc };
};

export default useImageInput;
