import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "../../../../styles/auth/search/search";
import colors from "../../../../styles/common/colors";
import LogoP from "../../../../assets/images/auth/search/logoP.png";
import SearchInput from "../input/searchInput";
import SearchButton from "../button/searchButton";
import { API } from "../../../../apis/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchIdForm = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(120);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [code, setCode] = useState(null);
    const [enteredCode, setEnteredCode] = useState("");
    const [isCodeInputDisabled, setIsCodeInputDisabled] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const schema = z.object({
        email: z.string().email("유효한 이메일을 입력해주세요."),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

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

    const timerStyle = timer <= 10 ? { color: colors.searchRed } : {};
    const getErrorStyle = (field) => (errors[field] ? { borderColor: colors.searchRed } : {});

    const handleSearchIdClick = () => {
        navigate("/search/id/completed");
    }

    return (
        <s.SearchFormContainer>
            <s.LogoPImg src={LogoP} alt="logo" />
            <s.SearchFormP>아이디 찾기</s.SearchFormP>

            <s.SearchInnerContainer>
                <s.SearchItemContainer>
                    <s.SearchItemP>이메일</s.SearchItemP>
                    <SearchInput placeholder="가입하신 이메일을 입력해주세요." {...register("email")} style={getErrorStyle("email")} />
                        {errors.email && <s.ErrorP>{errors.email.message}</s.ErrorP>}
                    <s.SearchIdButton onClick={handleSubmit(onSubmit)}>인증번호 발송</s.SearchIdButton>
                </s.SearchItemContainer>

                <s.SearchItemContainer>
                    <s.SearchItemP>인증번호</s.SearchItemP>
                    <SearchInput placeholder="이메일로 발송한 6자리 숫자를 입력해주세요." value={enteredCode} onChange={(e) => setEnteredCode(e.target.value)} disabled={isCodeInputDisabled} />
                    <s.SearchIdButton onClick={handleCodeSubmit} disabled={isCodeInputDisabled}>인증완료</s.SearchIdButton>
                </s.SearchItemContainer>

                {isTimerActive && <s.SearchTimeP style={timerStyle}>{formatTime(timer)}분</s.SearchTimeP>}
            </s.SearchInnerContainer>

            <SearchButton disabled={!isVerified} onClick={handleSearchIdClick}>아이디찾기</SearchButton>        
        </s.SearchFormContainer>
    );
};

export default SearchIdForm;
