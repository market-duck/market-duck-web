import { Column, Row } from '@market-duck/components/Flex/Flex';
import styled from 'styled-components';
import { ArchiveBoxIcon, GiftIcon, HeartIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';

const SummaryMenusWrap = styled(Row)`
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${AppSemanticColor.BG_SECONDARY.hex};

  > .menuItem {
    flex: 1;

    > svg {
      width: 1.5rem;
      height: 1.5rem;
      color: ${AppSemanticColor.ICON_PRIMARY.hex};
    }
  }
`;

export const SummaryMenus = () => {
  const menuList = [
    {
      title: '판매내역',
      icon: <ArchiveBoxIcon />,
    },
    {
      title: '구매내역',
      icon: <GiftIcon />,
    },
    {
      title: '찜목록',
      icon: <HeartIcon />,
    },
    {
      title: '내 상품',
      icon: <DocumentTextIcon />,
    },
  ];

  return (
    <SummaryMenusWrap gap="M">
      {menuList.map((item) => {
        return (
          <Column className="menuItem" justify="center" alignItems="center">
            {item.icon}
            <Typo tag="span" type="BODY_SM" weight={500} className={AppSemanticColor.TEXT_PRIMARY.color}>
              {item.title}
            </Typo>
          </Column>
        );
      })}
    </SummaryMenusWrap>
  );
};
