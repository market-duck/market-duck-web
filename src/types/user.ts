export type UserStatusType = 'ACTIVE' | 'INACTIVE' | 'WAIT_INFO' | 'VERIFY_EMAIL_WAIT';
export type UserLoginProviderType = 'GOOGLE' | 'KAKAO' | 'APPLE';
export type UserAuthority = 'ADMIN' | 'USER';

export interface EditUserType {
  nickname?: string;
  phoneNumber?: string;
}
