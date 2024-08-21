import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

//TODO:: 추후 해당 MenuEnum을 가지고 Routes의 path를 생성할 예정
export const NavigationMenuEnum = {
  home: '/',
  search: 'search',
  create: 'feed/create',
  edit: 'feed/edit',
  chat: 'chat',
  myPage: 'myPage',
} as const;

export type NavigationMenuEnum = ValueOfType<typeof NavigationMenuEnum>;

export const navigationMenuAtom = atom<NavigationMenuEnum>({
  key: 'navigationMenuAtom',
  default: NavigationMenuEnum.home,
});

export const useNavigationMenu = () => {
  const [menu, setMenu] = useRecoilState(navigationMenuAtom);

  const getCurrentMenu = () => {
    return menu;
  };

  const changeMenu = useCallback((menu: NavigationMenuEnum) => {
    setMenu(menu);
  }, []);

  return { getCurrentMenu, changeMenu };
};
