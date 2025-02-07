import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
`;

const spinner = () => {
  return (
    <SpinnerContainer>
      <ClipLoader color={'white'} size={100} />
    </SpinnerContainer>
  );
};

export default spinner;
