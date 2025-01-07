import styled from "styled-components";
import LoginForm from "../../../components/auth/login/loginForm";
import LoginBackground from "../../../assets/images/loginBackground.png";

const LoginContainer = styled.div`
    background: url(${LoginBackground}) no-repeat center center/cover;
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Login = () => {
    return (
        <LoginContainer>
            <LoginForm />
        </LoginContainer>
    )
}

export default Login;