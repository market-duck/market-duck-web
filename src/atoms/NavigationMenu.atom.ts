import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [currentMenu, setCurrentMenu] = useRecoilState(navigationMenuAtom);
  const location = useLocation();
  const navigate = useNavigate();

  const changeMenu = useCallback(
    (menu: NavigationMenuEnum) => {
      setCurrentMenu(menu);
      navigate(`/${menu}`);
    },
    [setCurrentMenu, navigate],
  );

  // URL 경로가 변경되면 currentMenu를 업데이트
  useEffect(() => {
    const path = location.pathname;

    let matchedMenu: NavigationMenuEnum = NavigationMenuEnum.home;

    if (path === '/') {
      matchedMenu = NavigationMenuEnum.home;
    } else {
      for (const value of Object.values(NavigationMenuEnum)) {
        if (value !== '/' && path.startsWith(`/${value}`)) {
          matchedMenu = value;
          break;
        }
      }

      if (path === '/login') {
        matchedMenu = NavigationMenuEnum.myPage;
      }
    }

    setCurrentMenu(matchedMenu);
  }, [location.pathname, setCurrentMenu]);

  // 호출 대신 currentMenu 상태를 바로 리턴
  return { currentMenu, changeMenu };
};
