import { ArchiveBoxIcon, DocumentTextIcon, GiftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { Link } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

const SummaryMenusWrap = styled(Row)`
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${AppSemanticColor.BG_SECONDARY.hex};

  > .menuItem {
    flex: 1;

    svg {
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
      to: '',
    },
    {
      title: '구매내역',
      icon: <GiftIcon />,
      to: '',
    },
    {
      title: '찜 목록',
      icon: <HeartIcon />,
      to: '',
    },
    {
      title: '내 상품',
      icon: <DocumentTextIcon />,
      to: '',
    },
  ];

  return (
    <SummaryMenusWrap gap="M">
      {menuList.map((item) => {
        return (
          <Link className="menuItem" to={item.to} key={item.title}>
            <Column gap="XS" justify="center" alignItems="center">
              {item.icon}
              <Typo tag="span" type="BODY_SM" weight={500} className={AppSemanticColor.TEXT_PRIMARY.color}>
                {item.title}
              </Typo>
            </Column>
          </Link>
        );
      })}
    </SummaryMenusWrap>
  );
};
