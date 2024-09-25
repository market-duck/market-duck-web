import { UserAuthority, UserLoginProviderType, UserStatusType } from '@market-duck/types/user';

export interface IUserModelData {
  userId: number;
  nickname: string;
  username: string;
  profileImageUrl: string;
  phoneNumber: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  userStatus: UserStatusType;
  authority: UserAuthority;
  loginType: UserLoginProviderType;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export class UserModel {
  userId: number;
  nickname: string;
  username: string;
  phoneNumber: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  userStatus: UserStatusType;
  authority: UserAuthority;
  loginProvider: UserLoginProviderType;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IUserModelData) {
    this.userId = data.userId;
    this.nickname = data.nickname;
    this.username = data.username;
    this.phoneNumber = data.phoneNumber;
    this.emailVerified = data.emailVerified;
    this.phoneVerified = data.phoneVerified;
    this.userStatus = data.userStatus;
    this.authority = data.authority;
    this.loginProvider = data.loginType;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }

  // JSON에서 유저 모델 생성
  static fromJson(data: IUserModelData): UserModel {
    return new UserModel(data);
  }
}
