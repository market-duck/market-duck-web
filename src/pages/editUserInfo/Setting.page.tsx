import { userAPI } from '@market-duck/apis/userAPI';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useDialog } from '@market-duck/hooks/useDialog';
import { SelectInterestTag } from '@market-duck/pages/myPage/components/SelectInterestTag';
import { EditUserType } from '@market-duck/types/user';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export const Setting = () => {
  const navigate = useNavigate();
  const [currentUserInfo, setCurrentUserInfo] = useRecoilState(userDataAtom);
  const { alert } = useDialog();

  const { mutateAsync } = useMutation({
    mutationKey: ['patch', 'user', currentUserInfo?.userId],
    mutationFn: async (data: EditUserType) => {
      if (!currentUserInfo?.userId) return;
      const res = await userAPI.editUserById({
        userId: currentUserInfo?.userId,
        userData: data,
      });
      return res;
    },
    onSuccess: (data) => {
      if (data) setCurrentUserInfo(data);
    },
    onError: (err) => {
      alert({ title: '전송 오류', desc: '데이터를 보내는 중 오류가 발생하였습니다.\n다시 시도해주세요.' });
    },
  });

  return (
    <>
      <NavigationTop leftButtonIconType="back" title="관심태그 수정" />
      <SelectInterestTag
        page="editUser"
        onNext={() => {
          navigate('/');
        }}
        mutate={mutateAsync}
      />
    </>
  );
};
