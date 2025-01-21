import styled from "styled-components";
import colors from "../../../styles/common/colors";
import Check from "../../../assets/images/auth/signup/completed/check.png";
import { useNavigate } from "react-router-dom";

const CompletedContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.white};
`
const CompletedInnerContainer = styled.div`
    width: 65.5vw;
    height: 48.6vw;
    background: ${colors.completedGray};
    display: flex;
    justify-content: center;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 14.2vw;
`

const CompletedImg = styled.img`
    width: 11.5vw;
    height: 11.5vw;
`

const CompletedBar = styled.div`
    width: 8.4vw;
    height: 0.3vw;
    background: ${colors.loginGreen};
    margin-top: 3.35vw;
`

const CompletedP = styled.p`
    font-size: 2.4vw;
    font-weight: 600;
    color: ${colors.loginP};
`

const Completed = () => {
    const navigate = useNavigate();

    const handleCompletedClick = () => {
        navigate("/login");
    }

    return (
        <CompletedContainer>
            <CompletedInnerContainer>
                <ContentContainer>
                    <CompletedImg src={Check} alt="check" />
                    <CompletedBar />
                    <CompletedP style={{marginTop: "1.9vw"}}>회원가입 완료</CompletedP>
                    <CompletedP style={{fontSize: "1.2vw", fontWeight: "500", color: colors.main, cursor: "pointer", marginTop: "7.65vw"}} onClick={handleCompletedClick}>로그인 하러가기</CompletedP>
                </ContentContainer>
            </CompletedInnerContainer>
        </CompletedContainer>
    )
}

export default Completed;