import { z } from 'zod';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from '@hookform/resolvers/zod';
import { API } from "../../../apis/axios";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import colors from "../../../styles/colors";
import Logo from "../../../assets/images/logo.png";
import LogoP from "../../../assets/images/logoP.png";
import LoginInput from "./input/loginInput";
import LoginButton from "./button/loginButton";

const FormContainer = styled.form`
    width: 35.8vw;
    height: 38.45vw;
    background: ${colors.white};
    border: none;
    border-radius: 0.75vw;
    margin-top: 4vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.3vw 0;
    z-index: 9999;
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7vw;
`

const LogoImg = styled.img`
    width: ${(props) => props.width || '3.45vw'};
    height: ${(props) => props.height || '3.45vw'};
`

const LoginP = styled.p`
    font-size: 2.4vw;
    font-weight: 600;
    color: ${colors.loginP};
    margin: 1.45vw 0 1.95vw 0;
    border-bottom: 0.03vw solid ${colors.loginGreen};
    cursor: default;
`

const InputContainer = styled.div`
    width: 26vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vw;
    margin-bottom: 3.69vw;
`

const ButtonContainer = styled(InputContainer)`
    gap: 0.6vw;
    margin: 0 0 1.6vw 0;
`

const LoginP2 = styled.p`
    font-size: ${(props) => props.size || '0.75vw'};
    font-weight: 300;
    color: ${(props) => props.color || colors.loginP2};
    cursor: pointer;
    margin-top: 0.25vw;
`

const LoginForm = () => {
    const navigate = useNavigate();

    const schema = z.object({
        id: z.string().min(1, '아이디는 필수 입력 요소입니다.'),
        password: z.string().min(1, '비밀번호는 필수 입력 요소입니다.'),
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(schema),
    });

    const loginMutation = useMutation({
        mutationFn: (userData) => API.post("/posts", userData),
        onSuccess: (data) => {
            console.log("로그인 성공: ", data);
            // localStorage.setItem('isLoggedIn', 'true');
            navigate("/home");
        },
        onError: (error) => {
            console.error("로그인 오류: ", error.response?.data || error.message);
        },
    });

    const onSubmit = (data) => {
        // console.log('전송된 데이터:', data);

        loginMutation.mutate({
            id: data.id,
            password: data.password,
        });
    };

    const handleSignUpClick = () => {
        navigate("/signup");
    }

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <LogoContainer>
                <LogoImg src={Logo} alt="logo" />
                <LogoImg src={LogoP} width="3.75vw" height="1.45vw" alt="logoP" />
            </LogoContainer>

            <LoginP>Login</LoginP>
                
            <InputContainer>
                <LoginInput type={'text'} {...register("id")} placeholder="아이디"/>
                <LoginInput type={'password'} {...register("password")} placeholder="비밀번호" />
            </InputContainer>

            <ButtonContainer>
                <LoginButton type={'submit'} disabled={!isValid || loginMutation.isLoading} btncolor={colors.main}>로그인</LoginButton>
                <LoginButton onClick={handleSignUpClick}>회원가입</LoginButton>
                <LoginP2>아이디 찾기 / 비밀번호 찾기</LoginP2>
            </ButtonContainer>

            <LoginP2 size="0.65vw" color={colors.loginP3} style={{cursor: "default"}}>계속 진행하면 여행별의 <span style={{ color: colors.loginPurple }}>개인정보 처리방침</span> 및 <span style={{ color: colors.loginPurple }}>이용약관</span>에 동의하게 됩니다.</LoginP2>
        </FormContainer>
    )
}

export default LoginForm;