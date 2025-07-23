export const checkImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

export const checkMultipleImageUrls = async (urls: string[] = []): Promise<boolean[]> => {
  if (!urls.length) return [];

  const results = await Promise.all(urls.map((url) => checkImageUrl(url)));

  return results;
};
