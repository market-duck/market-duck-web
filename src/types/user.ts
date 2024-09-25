export type UserStatusType = 'ACTIVE' | 'INACTIVE';
export type UserLoginProviderType = 'GOOGLE' | 'KAKAO' | 'APPLE';
export type UserAuthority = 'ADMIN' | 'USER';

export interface EditUserType {
  nickname: string;
  phoneNumber: string;
}
