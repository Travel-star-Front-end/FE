import styled from "styled-components";
import colors from "../../../../styles/colors";

const ButtonContainer = styled.button`
    width: 26vw;
    height: 3.55vw;
    border: none;
    border-radius: 0.75vw;
    font-size: 1.1vw;
    font-weight: 800;
    color: ${colors.white};
    background: ${props => props.btncolor || colors.writeGray3};
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`

const WriteButton = ({ children, btncolor, onClick, disabled }) => {
    return (
        <ButtonContainer btncolor={btncolor} onClick={onClick} disabled={disabled}>
            {children}
        </ButtonContainer>
    )
}

export default WriteButton;