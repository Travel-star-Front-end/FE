import styled from "styled-components";
import colors from "../../../../styles/colors";

const TextareaContainer = styled.textarea`
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "20vw"};
    border: none;
    border-radius: 0.25vw;
    background: ${colors.writeGray2};
    font-size: 1.2vw;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.49);
    padding: 1.55vw 1.65vw;
    box-sizing: border-box;
    resize: none;
    outline: none;
`

const WriteTextarea = ({ width, height, placeholder }) => {
    return (
        <TextareaContainer 
            width={width}
            height={height}
            placeholder={placeholder}
        />
    )
}

export default WriteTextarea;