import { FeedForm } from './components/FeedForm';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';

export const Create = () => {
  return (
    <>
      <NavigationTop leftButtonIconType="back" title="피드 작성" rightButton={<></>} />
      <AppGutter>
        <FeedForm />
      </AppGutter>
    </>
  );
};
