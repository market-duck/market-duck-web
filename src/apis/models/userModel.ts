import { UserAuthority, UserLoginProviderType, UserStatusType } from '@market-duck/types/user';

export interface IBaseUserModelData {
  userId: number;
  nickname: string;
  username: string;
  profileImageUrl: string;
  userStatus: UserStatusType;
  authority: UserAuthority;
  loginType: UserLoginProviderType;
  createdAt: string;
  updatedAt: string;
}
export interface IUserModelData extends IBaseUserModelData {
  phoneNumber: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  roles: string[];
}

export class BaseUserModel {
  userId: number;
  nickname: string;
  username: string;
  profileImageUrl: string;
  userStatus: UserStatusType;
  authority: UserAuthority;
  loginProvider: UserLoginProviderType;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IBaseUserModelData) {
    this.userId = data.userId;
    this.nickname = data.nickname;
    this.username = data.username;
    this.userStatus = data.userStatus;
    this.profileImageUrl = data.profileImageUrl;
    this.authority = data.authority;
    this.loginProvider = data.loginType;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }

  static fromJson(data: IBaseUserModelData): BaseUserModel {
    return new BaseUserModel(data);
  }
}

export class UserModel extends BaseUserModel {
  phoneNumber: string;
  emailVerified: boolean;
  phoneVerified: boolean;

  constructor(data: IUserModelData) {
    super(data);
    this.phoneNumber = data.phoneNumber;
    this.emailVerified = data.emailVerified;
    this.phoneVerified = data.phoneVerified;
  }

  static fromJson(data: IUserModelData): UserModel {
    return new UserModel(data);
  }
}
