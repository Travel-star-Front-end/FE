import styled from "styled-components";
import colors from "../../../../styles/colors";

const InputContainer = styled.input`
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "3.05vw"};
    border: none;
    border-radius: 0.25vw;
    background: ${colors.writeGray2};
    font-size: 1.2vw;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.49);
    padding: ${props => props.padding || "0 1.55vw"};
    box-sizing: border-box;
    outline: none;
`

const WriteInput = ({ width, height, padding, placeholder }) => {
    return (
        <InputContainer 
            width={width}
            height={height}
            padding={padding}
            placeholder={placeholder}
        />
    )
}

export default WriteInput;