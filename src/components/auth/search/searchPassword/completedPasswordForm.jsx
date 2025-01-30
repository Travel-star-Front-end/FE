import * as s from "../../../../styles/auth/search/search";
import LogoP from "../../../../assets/images/auth/search/logoP.png";
import SearchButton from "../button/searchButton";
import { useNavigate } from "react-router-dom";

const CompletedPasswordForm = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }

    return (
        <s.SearchFormContainer>
            <s.LogoPImg src={LogoP} alt="logoP" />
            <s.SearchFormP>비밀번호 찾기</s.SearchFormP>
            <s.SearchInnerBar>
                <s.SearchIdBox>비밀번호 변경 완료</s.SearchIdBox>
            </s.SearchInnerBar>

            <SearchButton onClick={handleLoginClick}>로그인</SearchButton>
        </s.SearchFormContainer>
    )
}

export default CompletedPasswordForm;