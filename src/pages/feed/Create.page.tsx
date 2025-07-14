import { userDataAtom } from '@market-duck/atoms/user.atom';
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
  }, [navigate, userData]);

  if (!userData) return null;
  return <FeedForm />;
};
