import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { FeedForm } from './components/FeedForm';

export const Create = () => {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      return navigate('/login');
    }
  }, []);

  if (!userData) return null;
  return (
    <>
      <NavigationTop leftButtonIconType="back" title="피드 작성" rightButton={<></>} />
      <AppGutter>
        <FeedForm />
      </AppGutter>
    </>
  );
};
