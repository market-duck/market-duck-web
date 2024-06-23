import styled from 'styled-components';

export const BgImage = styled.div.attrs<{ $src: string }>(({ $src }) => {
  return {
    style: {
      backgroundImage: `url(${$src})`,
    },
  };
})``;
