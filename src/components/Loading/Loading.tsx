import styled from 'styled-components';

const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  width: 100%;
`;

export const Loading = () => {
  return <LoadingIndicator>Loading..............</LoadingIndicator>;
};
