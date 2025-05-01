export interface IPageInfoModel {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export class PageInfoModel {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  constructor(data: IPageInfoModel) {
    this.page = data.page;
    this.size = data.size;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
  }
  static fromJson(data: IPageInfoModel) {
    return new PageInfoModel(data);
  }
}
