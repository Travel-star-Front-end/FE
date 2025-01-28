import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spinner = () => {
  return (
    <SpinnerContainer>
      <ClipLoader color={'white'} size={100} />
    </SpinnerContainer>
  );
};

export default spinner;