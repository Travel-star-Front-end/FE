import styled, { keyframes } from "styled-components";
import colors from "../../../../styles/common/colors";

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.85vw;
  height: 4.85vw;
  position: relative;
  margin-top: 10.65vw;
`;

const SpinnerBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 0.4vw solid ${colors.writeGray};
  position: absolute;
`;

const SpinnerForeground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 0.4vw solid transparent;
  border-top-color: ${colors.writeGray4};
  animation: ${rotate} 1.5s linear infinite;
  position: absolute;
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerBackground />
      <SpinnerForeground />
    </SpinnerContainer>
  );
};

export default Spinner;
