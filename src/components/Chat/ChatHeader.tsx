import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Container = styled(Row)`
  position: sticky;
  top: 48px;
  width: 100%;
  padding: ${AppSpcing.XS} ${AppSpcing.M};
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
`;

export const ChatHeader = () => {
  return (
    <Container gap="XS" alignItems="center">
      <Thumbnail size="md" />
      <Column flex={1}>
        <Typo tag="span" type="CAPTION_MD" weight={500} className={AppSemanticColor.TEXT_TERTIARY.color}>
          {'title'}
        </Typo>
        <Typo tag="span" type="BODY_SM" weight={600} className={AppSemanticColor.TEXT_SECONDARY.color}>
          {'00,000'}
        </Typo>
      </Column>
    </Container>
  );
};
