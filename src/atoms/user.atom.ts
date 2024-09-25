import { UserModel } from '@market-duck/models/userModel';
import { atom } from 'recoil';

export const userDataAtom = atom<UserModel | null>({
  key: 'userData',
  default: null,
});
