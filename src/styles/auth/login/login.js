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
    width: 71.6rem;
    height: 76.9rem;
    background: ${colors.white};
    border: none;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2.6rem 0;
    z-index: 9999;
`

export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
`

export const LogoImg = styled.img`
    width: ${(props) => props.width || '5.7rem'};
    height: ${(props) => props.height || '5.7rem'};
`

export const LoginP = styled.p`
    font-size: 4.8rem;
    font-weight: 600;
    color: ${colors.loginP};
    margin: 2.9rem 0 3.9rem 0;
    border-bottom: 0.6rem solid ${colors.loginGreen};
    cursor: default;
`

export const InputContainer = styled.div`
    width: 52rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    margin-bottom: 7.38rem;
`

export const ButtonContainer = styled(InputContainer)`
    gap: 1.2rem;
    margin: 0 0 3.2rem 0;
`

export const LoginP2 = styled.p`
    font-size: ${(props) => props.size || '1.5rem'};
    font-weight: 300;
    color: ${(props) => props.color || colors.loginP2};
    cursor: pointer;
    margin-top: 0.5rem;
`

export const LoginInputContainer = styled.input`
    width: 100%;
    height: 5.6rem;
    background: ${colors.white};
    border: none;
    outline: none;
    border-bottom: 0.12rem solid ${colors.loginPurple};
    font-size: 2rem;
    font-weight: 300;
    color: ${colors.loginP2};
    cursor: pointer;
    caret-color: ${colors.loginP2};

    &::placeholder {
        font-size: 2rem;
        font-weight: 300;
        color: ${colors.loginP2};
    }
`;

export const LoginButtonContainer = styled.button`
    width: 100%;
    height: 6.1rem;
    background: ${props => props.btncolor || colors.loginGray};
    border: none;
    border-radius: 1.5rem;
    color: ${colors.white};
    font-weight: 800;
    font-size: 2.2rem;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`