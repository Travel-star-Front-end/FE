import { z } from 'zod';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from '@hookform/resolvers/zod';
import { API } from "../../../apis/axios";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import * as s from "../../../styles/auth/login/login";
import colors from '../../../styles/common/colors';
import Logo from "../../../assets/images/auth/login/logo.png";
import LogoP from "../../../assets/images/auth/login/logoP.png";
import LoginInput from "./input/loginInput";
import LoginButton from "./button/loginButton";

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
        mutationFn: (userData) => API.post("/login", userData),
        onSuccess: async (data) => {
            // console.log("로그인 성공: ", data);

            const accessToken = data?.data?.token;
            localStorage.setItem("accessToken", accessToken);
            if (!accessToken) {
                alert("로그인 실패: 토큰이 없습니다.");
                return;
            }

            try {
                const decodedToken = jwtDecode(accessToken);
                console.log("디코딩된 토큰: ", decodedToken);


                const userId = decodedToken?.id;
                if (!userId) {
                    alert("사용자 ID를 찾을 수 없습니다.");
                    return;
                }

                localStorage.setItem("userId", userId);
                localStorage.setItem("isLoggedIn", "true");
                // 일단 로그인 성공 시 무조건 setting으로 이동
                navigate("/setting");
            } catch (error) {
                console.error("토큰 디코딩 실패: ", error);
                alert("토큰이 유효하지 않습니다.");
            }
        },
        onError: () => {
            alert("아이디 또는 비밀번호가 틀렸습니다. 다시 시도해주세요.");
        },
    });

    const onSubmit = (data) => {
        // console.log('전송된 데이터:', data);
        loginMutation.mutate({
            id: data.id,
            pw: data.password,
        });
    };

    const handleSignUpClick = () => navigate("/signup");
    const handleSearchIdClick = () => navigate("/search/id");
    const handleSearchPasswordClick = () => navigate("/search/password");

    return (
        <s.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <s.LogoContainer>
                <s.LogoImg src={Logo} alt="logo" />
                <s.LogoImg src={LogoP} width="3.75vw" height="1.45vw" alt="logoP" />
            </s.LogoContainer>

            <s.LoginP>Login</s.LoginP>

            <s.InputContainer>
                <LoginInput type={'text'} {...register("id")} placeholder="아이디"/>
                <LoginInput type={'password'} {...register("password")} placeholder="비밀번호" />
            </s.InputContainer>

            <s.ButtonContainer>
                <LoginButton type={'submit'} disabled={!isValid || loginMutation.isLoading} btncolor={colors.main}>로그인</LoginButton>
                <LoginButton onClick={handleSignUpClick}>회원가입</LoginButton>
                <s.LoginPContainer>
                    <s.LoginP2 onClick={handleSearchIdClick}>아이디 찾기</s.LoginP2>
                    <s.LoginP2>/</s.LoginP2>
                    <s.LoginP2 onClick={handleSearchPasswordClick}>비밀번호 찾기</s.LoginP2>
                </s.LoginPContainer>
            </s.ButtonContainer>

            <s.LoginP2 size="0.65vw" color={colors.loginP3} style={{cursor: "default"}}>
                계속 진행하면 여행별의 <span style={{ color: colors.loginPurple }}>개인정보 처리방침</span> 및 
                <span style={{ color: colors.loginPurple }}>이용약관</span>에 동의하게 됩니다.
            </s.LoginP2>
        </s.FormContainer>
    );
}

export default LoginForm;
