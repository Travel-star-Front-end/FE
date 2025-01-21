import styled from "styled-components";
import colors from "../../../../styles/common/colors";

const ButtonContainer = styled.button`
    width: 100%;
    height: 3.05vw;
    background: ${colors.main};
    border: none;
    border-radius: 0.75vw;
    cursor: pointer;
    font-size: 1.1vw;
    font-weight: 800;
    color: ${colors.white};
    margin-top: 1.55vw;
`

const ButtonRankingRight = ({ children, onClick }) => {
    return (
        <ButtonContainer onClick={onClick}>
            {children}
        </ButtonContainer>
    )
}

export default ButtonRankingRight;