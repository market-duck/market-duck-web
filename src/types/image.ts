export interface ImageItem {
  src: string;
  file: File | null;
  isUploaded: boolean;

  //for delete
  originIndex?: number;
}
