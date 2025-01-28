import { useState, useEffect } from "react";
import * as s from "../../../../styles/auth/search/search";
import colors from "../../../../styles/common/colors";
import LogoP from "../../../../assets/images/auth/search/logoP.png";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { API } from "../../../../apis/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchInput from "../input/searchInput";
import SearchButton from "../button/searchButton";
import { useNavigate } from "react-router-dom";

const SearchPasswordForm = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(120);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [code, setCode] = useState(null);
    const [enteredCode, setEnteredCode] = useState("");
    const [isCodeInputDisabled, setIsCodeInputDisabled] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(
            z.object({
                id: z.string().min(1, "아이디를 입력해주세요."),
                email: z.string().email("유효한 이메일을 입력해주세요."),
            })
        ),
        mode: "onChange",
        shouldUnregister: true,
    });

    const id = useWatch({ control, name: "id" }) || "";
    const email = useWatch({ control, name: "email" }) || "";
    const password = useWatch({ control, name: "password" }) || "";
    const passwordCheck = useWatch({ control, name: "passwordCheck" }) || "";

    const passwordRequiredError = isVerified && password.trim().length === 0 ? "비밀번호를 입력해주세요." : null;
    const passwordCheckRequiredError = isVerified && passwordCheck.trim().length === 0 ? "비밀번호를 다시 입력해주세요." : null;
    const passwordMatchError = password && passwordCheck && password !== passwordCheck ? "비밀번호가 일치하지 않습니다." : null;

    useEffect(() => {
        let interval;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            alert("시간이 초과되었습니다. 다시 인증번호를 발송해주세요.");
            setIsTimerActive(false);
            setIsCodeInputDisabled(true);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const onSubmit = async (data) => {
        try {
            const response = await API.post("/users", { email: data.email });
            setCode(response.data.id);
            alert("인증번호가 발송되었습니다.");
            setIsTimerActive(true);
            setTimer(120);
            setIsCodeInputDisabled(false);
        } catch {
            alert("인증번호 발송에 실패했습니다.");
        }
    };

    const handleCodeSubmit = () => {
        if (enteredCode == code) {
            alert("인증번호가 일치합니다.");
            setIsVerified(true);
            setIsTimerActive(false);
            setIsCodeInputDisabled(true);
        } else {
            alert("인증번호가 틀렸습니다. 다시 입력해주세요.");
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const getErrorStyle = (field) => (errors[field] ? { borderColor: colors.searchRed } : {});

    // 하단 버튼
    useEffect(() => {
        if (
            id.trim().length > 0 &&
            email.trim().length > 0 &&
            isVerified &&
            password.trim().length > 0 &&
            passwordCheck.trim().length > 0 &&
            !passwordRequiredError &&
            !passwordCheckRequiredError &&
            !passwordMatchError
        ) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [id, email, password, passwordCheck, isVerified, passwordRequiredError, passwordCheckRequiredError, passwordMatchError]);

    const handleSearchPasswordClick = () => {
        navigate("/search/password/completed");
    }

    return (
        <s.SearchFormContainer>
            <s.LogoPImg src={LogoP} alt="logoP" />
            <s.SearchFormP>비밀번호 찾기</s.SearchFormP>

            <s.SearchInnerContainer>
                <s.SearchItemContainer>
                    <s.SearchItemP>아이디</s.SearchItemP>
                    <SearchInput placeholder="아이디를 입력해주세요." {...register("id")} style={getErrorStyle("id")} />
                    {errors.id && <s.ErrorP>{errors.id.message}</s.ErrorP>}
                </s.SearchItemContainer>

                <s.SearchItemContainer>
                    <s.SearchItemP>이메일</s.SearchItemP>
                    <SearchInput placeholder="가입하신 이메일을 입력해주세요." {...register("email")} style={getErrorStyle("email")}/>
                    {errors.email && <s.ErrorP>{errors.email.message}</s.ErrorP>}
                    <s.SearchIdButton onClick={handleSubmit(onSubmit)}>인증번호 발송</s.SearchIdButton>
                </s.SearchItemContainer>

                <s.SearchItemContainer>
                    <s.SearchItemP>인증번호</s.SearchItemP>
                    <SearchInput placeholder="이메일로 발송한 6자리 숫자를 입력해주세요." value={enteredCode} onChange={(e) => setEnteredCode(e.target.value)} disabled={isCodeInputDisabled} />
                    <s.SearchIdButton onClick={handleCodeSubmit} disabled={isCodeInputDisabled}>인증완료</s.SearchIdButton>
                </s.SearchItemContainer>

                {isTimerActive && <s.SearchTimeP>{formatTime(timer)}분</s.SearchTimeP>}
            </s.SearchInnerContainer>

            <s.SearchInnerContainer2>
                <s.SearchItemContainer>
                    <s.SearchItemP>새 비밀번호</s.SearchItemP>
                    <SearchInput type="password" placeholder="새로운 비밀번호를 입력해주세요." disabled={!isVerified} {...register("password")} style={passwordRequiredError ? { borderColor: 'red' } : {}}/>
                    {passwordRequiredError && <s.ErrorP>{passwordRequiredError}</s.ErrorP>}
                </s.SearchItemContainer>

                <s.SearchItemContainer>
                    <s.SearchItemP>비밀번호 확인</s.SearchItemP>
                    <SearchInput type="password" placeholder="비밀번호를 다시 입력해주세요." disabled={!isVerified} {...register("passwordCheck")} style={(passwordCheckRequiredError || passwordMatchError) ? { borderColor: 'red' } : {}}/>
                    {passwordCheckRequiredError && <s.ErrorP>{passwordCheckRequiredError}</s.ErrorP>}
                    {passwordMatchError && <s.ErrorP>{passwordMatchError}</s.ErrorP>}
                </s.SearchItemContainer>
            </s.SearchInnerContainer2>

            <SearchButton disabled={isSubmitDisabled} onClick={handleSearchPasswordClick}>완료</SearchButton>  
        </s.SearchFormContainer>
    );
};

export default SearchPasswordForm;
