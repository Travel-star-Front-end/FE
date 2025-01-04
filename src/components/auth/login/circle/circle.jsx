import styled from "styled-components";
import colors from "../../../../styles/colors";

const CircleContainer = styled.div`
    width: ${(props) => props.width || "69.4rem"};
    height: ${(props) => props.height || "69.4rem"};
    background: ${colors.white};
    opacity: ${(props) => props.opacity};
    border-radius: 50%;
    border: none;
    position: absolute;
    z-index: 2;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
`;

const Circle = ({ width, height, opacity, top, left }) => {
  return (
    <CircleContainer 
        width={width} 
        height={height} 
        opacity={opacity} 
        top={top}
        left={left}
    />
  );
};

export default Circle;
