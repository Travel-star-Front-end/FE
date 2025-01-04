import styled from "styled-components";
import colors from "../../../styles/colors";
import LoginForm from "../../../components/auth/login/loginForm";
import Circle from "../../../components/auth/login/circle/circle";

const LoginContainer = styled.div`
    background: ${colors.main};
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Login = () => {
    // 배경 나중에 디자이너분께 말해서 수정할 것
    return (
        <LoginContainer>
            <LoginForm />

            <Circle width="67.1rem" height="67.1rem" opacity="0.06" top="-16.6rem" left="11.4rem" />
            <Circle opacity="0.78" top="63.9rem" left="-26.5rem" />
            <Circle width="25.6rem" height="25.6rem" opacity="0.31" top="85.8rem" left="113.2rem" />
            <Circle opacity="0.5" top="-6rem" left="142.1rem" />
        </LoginContainer>
    )
}

export default Login;