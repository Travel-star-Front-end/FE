import { useNavigate } from "react-router-dom";
import * as s from "../../../../styles/ranking/ranking";
import colors from "../../../../styles/common/colors";
import View from "../../../../assets/images/ranking/view.png";
import { API } from "../../../../apis/axios";
import useFetch from "../../../../hooks/useFetch";

const ItemTopRanking = ({ id, name, rank, user_id, imageUrl }) => {
    const navigate = useNavigate();
    const { data } = useFetch(`/stars/vote/check/${id}`);
    const isVoted = data?.voted === 1;

    const handleViewClick = () => {
        navigate(`/planet/${id}`, { state: { user_id: user_id } });
    };

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
            alert("투표가 반영되었습니다.");
            setTimeout(() => {
                window.location.reload(); 
            }, 100);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                alert("본인의 별자리에는 투표할 수 없습니다.");
            } else {
                console.error("Error", error);
                alert("투표 중 오류가 발생했습니다.");
            }
        }
    };
    
    return (
        <s.ItemTopContainer id={id}>
            <s.ItemTopInnerContainer>
                <s.ItemTopImgContainer imageurl={imageUrl}>
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

                    <s.ItemTopVoteButton onClick={handleVoteClick} disabled={isVoted} style={isVoted ? { backgroundColor: colors.calenderGray3, cursor: "not-allowed" } : {}}>
                        {isVoted ? "투표완료" : "투표하기"}
                    </s.ItemTopVoteButton>
                </s.ItemTopPContainer>
            </s.ItemTopInnerContainer>
        </s.ItemTopContainer>
    )
}

export default ItemTopRanking;