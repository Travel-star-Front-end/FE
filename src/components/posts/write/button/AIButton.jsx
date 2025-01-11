import styled from "styled-components";
import colors from "../../../../styles/colors";

const ButtonContainer = styled.button`
    width: 8.55vw;
    height: 1.65vw;
    border: 0.055vw solid ${colors.sideBarGray2};
    border-radius: 0.25vw;
    background: ${colors.homeGray};
    font-size: 0.7vw;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.49);
    cursor: pointer;

    &:hover {
        font-weight: bold;
    }
`

const AIButton = ({ children }) => {
    return (
        <ButtonContainer>
            {children}
        </ButtonContainer>
    )
}

export default AIButton;