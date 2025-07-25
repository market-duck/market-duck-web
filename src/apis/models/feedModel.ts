import { CategoryModel, ICategoryModelData } from '@market-duck/apis/models/categoryModel';
import { BaseUserModel, IBaseUserModelData } from '@market-duck/apis/models/userModel';
import { FeedStatusType } from '@market-duck/types/feed';

interface IBaseFeedModelData {
  feedId: number;
  genreCategory: ICategoryModelData[];
  goodsCategory: ICategoryModelData[];
  title: string;
  price: number;
  content: string;
  likeCount: number;
  viewCount: number;
  status: FeedStatusType;
  feedType: 'SALE' | 'BUY';
  liked: boolean;
  createdAt: string;
  updatedAt: string;
}

export class BaseFeedModel {
  feedId: number;
  genreCategory: CategoryModel[];
  goodsCategory: CategoryModel[];
  title: string;
  price: number;
  content: string;
  viewCount: number;
  likeCount: number;
  status: FeedStatusType;
  feedType: 'SALE' | 'BUY';
  liked: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IBaseFeedModelData) {
    this.feedId = data.feedId;
    this.genreCategory = data.genreCategory.map((category) => CategoryModel.fromJson(category));
    this.goodsCategory = data.goodsCategory.map((category) => CategoryModel.fromJson(category));
    this.title = data.title;
    this.price = data.price;
    this.content = data.content;
    this.likeCount = data.likeCount;
    this.viewCount = data.viewCount;
    this.status = data.status;
    this.feedType = data.feedType;
    this.liked = data.liked;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}

export interface IFeedModelData extends IBaseFeedModelData {
  mainImageUrl: string;
}

export class FeedModel extends BaseFeedModel {
  mainImageUrl: string;

  constructor(data: IFeedModelData) {
    super(data);
    this.mainImageUrl = data.mainImageUrl;
  }

  static fromJson(data: IFeedModelData): FeedModel {
    return new FeedModel(data);
  }
}

export interface IFeedDetailModelData extends Omit<IBaseFeedModelData, 'liked'> {
  userInfo: IBaseUserModelData;
  images: {
    feedImageId: number;
    feedId: number;
    fileUrl: string;
    imageIndex: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

export class FeedDetailModel extends BaseFeedModel {
  userInfo: BaseUserModel;
  images: {
    feedImageId: number;
    feedId: number;
    fileUrl: string;
    imageIndex: number;
    createdAt: Date;
    updatedAt: Date;
  }[];

  constructor(data: IFeedDetailModelData, liked: boolean) {
    super({ ...data, liked });
    this.userInfo = new BaseUserModel(data.userInfo);
    this.images = data.images.map((image) => ({
      ...image,
      createdAt: new Date(image.createdAt),
      updatedAt: new Date(image.updatedAt),
    }));
  }

  static fromJson(data: IFeedDetailModelData, liked: boolean) {
    return new FeedDetailModel(data, liked);
  }

  updateLiked(liked: boolean, likeCount: number) {
    const newModel = new FeedDetailModel(
      {
        feedId: this.feedId,
        genreCategory: this.genreCategory,
        goodsCategory: this.goodsCategory,
        title: this.title,
        price: this.price,
        content: this.content,
        viewCount: this.viewCount,
        likeCount,
        status: this.status,
        feedType: this.feedType,
        createdAt: this.createdAt.toISOString(),
        updatedAt: this.updatedAt.toISOString(),
        userInfo: {
          userId: this.userInfo.userId,
          nickname: this.userInfo.nickname,
          username: this.userInfo.username,
          profileImageUrl: this.userInfo.profileImageUrl,
          userStatus: this.userInfo.userStatus,
          authority: this.userInfo.authority,
          loginType: this.userInfo.loginProvider,
          createdAt: this.userInfo.createdAt.toISOString(),
          updatedAt: this.userInfo.updatedAt.toISOString(),
        },
        images: this.images.map((image) => ({
          ...image,
          createdAt: image.createdAt.toISOString(),
          updatedAt: image.updatedAt.toISOString(),
        })),
      },
      liked,
    );
    return newModel;
  }
}
