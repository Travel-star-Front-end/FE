import { useState, useEffect } from "react";
import * as s from "../../../../styles/auth/search/search";
import LogoP from "../../../../assets/images/auth/search/logoP.png";
import SearchButton from "../button/searchButton";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../../../../apis/axios";

const CompletedIdForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [userId, setUserId] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!email) {
            setError("이메일 정보가 없습니다.");
            return;
        }

        const fetchUserId = async () => {
            console.log(email);
            try {
                const response = await API.post("/find-id", { email });
                console.log(response.data);
                setUserId(response.data.user_id);
            } catch (err) {
                setError("아이디를 찾을 수 없습니다.");
            }
        };

        fetchUserId();
    }, [email]);

    const handleLoginClick = () => {
        navigate("/login");
    }

    return (
        <s.SearchFormContainer>
            <s.LogoPImg src={LogoP} alt="logoP" />
            <s.SearchFormP>아이디 찾기</s.SearchFormP>
            <s.SearchInnerBar>
                <s.SearchIdBox>
                    회원님의 아이디는&nbsp;
                    <span style={{fontWeight: "600"}}>{userId}</span>&nbsp;
                    입니다.
                </s.SearchIdBox>
            </s.SearchInnerBar>

            <SearchButton onClick={handleLoginClick}>로그인</SearchButton>
        </s.SearchFormContainer>
    )
}

export default CompletedIdForm;