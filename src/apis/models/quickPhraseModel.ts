export interface IBaseQuickPhraseModelData {
  quickPhraseId: number;
  content: string;
  title: string;
  category: string;
  useCount: number;
  lastUsedAt: string;
  createdAt: string;
}

export class BaseQuickPhraseModel {
  quickPhraseId: number;
  content: string;
  title: string;
  category: string;
  useCount: number;
  lastUsedAt: Date;
  createdAt: Date;

  constructor(data: IBaseQuickPhraseModelData) {
    this.quickPhraseId = data.quickPhraseId;
    this.content = data.content;
    this.title = data.title;
    this.category = data.category;
    this.useCount = data.useCount;
    this.lastUsedAt = new Date(data.lastUsedAt);
    this.createdAt = new Date(data.createdAt);
  }

  static fromJson(data: IBaseQuickPhraseModelData): BaseQuickPhraseModel {
    return new BaseQuickPhraseModel(data);
  }
}
