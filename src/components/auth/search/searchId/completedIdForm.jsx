import * as s from "../../../../styles/auth/search/search";
import LogoP from "../../../../assets/images/auth/search/logoP.png";
import SearchButton from "../button/searchButton";
import { useNavigate } from "react-router-dom";

const CompletedIdForm = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }

    // api 로직을 몰라서 임시로 텍스트로 아이디 넣음
    return (
        <s.SearchFormContainer>
            <s.LogoPImg src={LogoP} alt="logoP" />
            <s.SearchFormP>아이디 찾기</s.SearchFormP>
            <s.SearchInnerBar>
                <s.SearchIdBox>
                    회원님의 아이디는&nbsp;
                    <span style={{fontWeight: "600"}}>BBbbe_1</span>&nbsp;
                    입니다.
                </s.SearchIdBox>
            </s.SearchInnerBar>

            <SearchButton onClick={handleLoginClick}>로그인</SearchButton>
        </s.SearchFormContainer>
    )
}

export default CompletedIdForm;