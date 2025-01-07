import styled from "styled-components";
import colors from "../../../../styles/colors";

const ButtonContainer = styled.button`
    width: 100%;
    height: 3.55vw;
    background: ${props => props.btncolor || colors.loginGray};
    border: none;
    border-radius: 0.75vw;
    color: ${colors.white};
    font-weight: 800;
    font-size: 1.1vw;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`

const LoginButton = ({ type="button", children, btncolor, disabled, onClick }) => {
    return (
        <ButtonContainer type={type} btncolor={btncolor} disabled={disabled} onClick={onClick}>
            {children}
        </ButtonContainer>
    )
}

export default LoginButton;