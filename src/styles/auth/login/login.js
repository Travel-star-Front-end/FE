import styled from "styled-components";
import colors from "../../common/colors";
import LoginBackground from "../../../assets/images/auth/login/loginBackground.png";

export const LoginContainer = styled.div`
    background: url(${LoginBackground}) no-repeat center center/cover;
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FormContainer = styled.form`
    width: 35.8vw;
    height: 38.45vw;
    background: ${colors.white};
    border: none;
    border-radius: 0.75vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.3vw 0;
    z-index: 9999;
`

export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7vw;
`

export const LogoImg = styled.img`
    width: ${(props) => props.width || '2.85vw'};
    height: ${(props) => props.height || '2.85vw'};
`

export const LoginP = styled.p`
    font-size: 2.4vw;
    font-weight: 600;
    color: ${colors.loginP};
    margin: 1.45vw 0 1.95vw 0;
    border-bottom: 0.3vw solid ${colors.loginGreen};
    cursor: default;
`

export const InputContainer = styled.div`
    width: 26vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vw;
    margin-bottom: 3.69vw;
`

export const ButtonContainer = styled(InputContainer)`
    gap: 0.6vw;
    margin: 0 0 1.6vw 0;
`

export const LoginP2 = styled.p`
    font-size: ${(props) => props.size || '0.75vw'};
    font-weight: 300;
    color: ${(props) => props.color || colors.loginP2};
    cursor: pointer;
    margin-top: 0.25vw;
`

export const LoginInputContainer = styled.input`
    width: 100%;
    height: 2.8vw;
    background: ${colors.white};
    border: none;
    outline: none;
    border-bottom: 0.06vw solid ${colors.loginPurple};
    font-size: 1vw;
    font-weight: 300;
    color: ${colors.loginP2};
    cursor: pointer;
    caret-color: ${colors.loginP2};

    &::placeholder {
        font-size: 1vw;
        font-weight: 300;
        color: ${colors.loginP2};
    }
`;

export const LoginButtonContainer = styled.button`
    width: 100%;
    height: 3.05vw;
    background: ${props => props.btncolor || colors.loginGray};
    border: none;
    border-radius: 0.75vw;
    color: ${colors.white};
    font-weight: 800;
    font-size: 1.1vw;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`