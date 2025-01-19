import { UserModel } from '@market-duck/apis/models/userModel';
import { Row } from '@market-duck/components/Flex/Flex';
import { Avatar } from '@market-duck/components/Image/Avatar';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const ProfileWrap = styled(Row)`
  justify-content: flex-start;
  align-items: center;
  gap: ${AppSpcing.S};
  background-color: ${AppSemanticColor.BG_SECONDARY.hex};
  border-radius: ${AppRadii.M};
  margin-bottom: 1.5rem;
  margin-top: ${AppSpcing.M};
  padding: ${AppSpcing.S};
`;

export const UserProfile = ({ userInfo }: { userInfo: UserModel }) => {
  return (
    <ProfileWrap>
      <Avatar imgSrc={userInfo.profileImageUrl} size="lg" />
      <div className="user-data">
        <Typo tag="p" type="BODY_MD" className={AppSemanticColor.TEXT_PRIMARY.color}>
          {userInfo.nickname}님
        </Typo>
        <div>
          <Typo tag="p" type="CAPTION_MD" className={AppSemanticColor.TEXT_SECONDARY.color}>
            {userInfo.username}
          </Typo>
          <Typo tag="p" type="CAPTION_MD" className={AppSemanticColor.TEXT_SECONDARY.color}>
            {userInfo.phoneNumber}
          </Typo>
        </div>
      </div>
    </ProfileWrap>
  );
};
