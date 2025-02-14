import { useNavigate } from "react-router-dom";
import * as s from "../../../../styles/ranking/ranking";
import colors from "../../../../styles/common/colors";
import View from "../../../../assets/images/ranking/view.png";
import { API } from "../../../../apis/axios";

const ItemTopRanking = ({ id, name, rank, user_id }) => {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate(`/planet/${id}`);
    }

    const handleVoteClick = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                alert("로그인이 필요합니다.");
                return;
            }
    
            const response = await API.post(
                "/stars/vote",
                {
                    stars_id: id,
                    post_user_id: user_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    
            // console.log(response.data);
            alert("투표가 반영되었습니다.");
        } catch (error) {
            // console.error("Error", error);
            alert("이미 투표하셨습니다.");
        }
    };
    

    return (
        <s.ItemTopContainer id={id}>
            <s.ItemTopInnerContainer>
                <s.ItemTopImgContainer>
                    <s.ItemTopRankingContainer>
                        <s.ItemTopRankingP>{rank}<span style={{fontSize: "1.2vw"}}>위</span></s.ItemTopRankingP>
                    </s.ItemTopRankingContainer>
                </s.ItemTopImgContainer>

                <s.ItemTopPContainer>
                    <s.ItemTopP>
                        이름<br/>
                        <span style={{fontSize: "0.9vw", fontWeight: "500"}}>{name}</span>
                    </s.ItemTopP>

                    <s.ItemTopViewContainer onClick={handleViewClick}>
                        <s.ItemTopViewImg src={View} alt="view" />
                        <s.ItemTopRankingP style={{fontSize: "0.65vw", fontWeight: "600", color: colors.main}}>{name} 별자리 보러가기</s.ItemTopRankingP>
                    </s.ItemTopViewContainer>

                    <s.ItemTopVoteButton onClick={handleVoteClick}>투표하기</s.ItemTopVoteButton>
                </s.ItemTopPContainer>
            </s.ItemTopInnerContainer>
        </s.ItemTopContainer>
    )
}

export default ItemTopRanking;