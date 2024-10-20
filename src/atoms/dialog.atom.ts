import { Dialog } from '@market-duck/types/dialog';
import { atom } from 'recoil';

export const dialogAtom = atom<Dialog[]>({
  key: 'dialogAtom',
  default: [],
});
