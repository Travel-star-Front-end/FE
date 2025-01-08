import styled from "styled-components";
import colors from "../../../../styles/colors";

const InputWrapper = styled.div`
    position: relative;
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "3.05vw"};
    display: flex;
`;

const InputContainer = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.25vw;
    background: ${colors.writeGray2};
    font-size: 1.2vw;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.49);
    padding: ${props => props.padding || "0 1.05vw"};
    box-sizing: border-box;
    outline: none;
`;

const IconImg = styled.img`
    position: absolute;
    top: 50%;
    left: 0.4vw;
    transform: translateY(-50%);
    width: 2.3vw;
    height: 2.3vw;
`;

const WriteInput = ({ width, height, padding, placeholder, icon }) => {
    return (
        <InputWrapper width={width} height={height}>
            {icon && <IconImg src={icon} alt="icon" />}
            <InputContainer 
                padding={padding}
                placeholder={placeholder}
            />
        </InputWrapper>
    );
};

export default WriteInput;
