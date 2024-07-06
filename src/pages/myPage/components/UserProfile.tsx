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
  background-color: ${AppSemanticColor.BG_SECONDARY.hex};
  border-radius: ${AppRadii.M};
  margin-bottom: 1.5rem;
`;

//TODO:: userInfo schema에 따라 type 변경하기
export const UserProfile = ({
  userInfo,
}: {
  userInfo: {
    name: string;
    imgSrc: string;
    email: string;
    phoneNum: string;
  };
}) => {
  return (
    <ProfileWrap>
      <Avatar imgSrc={userInfo.imgSrc} size="lg" />
      <div className="user-data">
        <Typo tag="p" type="BODY_MD" className={AppSemanticColor.TEXT_PRIMARY.color}>
          어쩌고 님{/* userInfo.name */}
        </Typo>
        <div>
          <Typo tag="p" type="CAPTION_MD" className={AppSemanticColor.TEXT_SECONDARY.color}>
            ooo@pppp.com{/* userInfo.email */}
          </Typo>
          <Typo tag="p" type="CAPTION_MD" className={AppSemanticColor.TEXT_SECONDARY.color}>
            010-1234-5678{/* userInfo.phoneNum */}
          </Typo>
        </div>
      </div>
    </ProfileWrap>
  );
};
