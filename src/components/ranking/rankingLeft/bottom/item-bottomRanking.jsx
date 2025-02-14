import { useNavigate } from "react-router-dom";
import { API } from "../../../../apis/axios";
import * as s from "../../../../styles/ranking/ranking";
import View from "../../../../assets/images/ranking/view.png";


const ItemBottomRanking = ({ id, name, user_id }) => {
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
        <s.ItemBottomContainer id={id}>
            <s.ItemBottomInnerContainer>
                <s.ItemBottomImgContainer />

                <s.ItemBottomPContainer>
                    <s.ItemBottomP>
                        이름<br />
                        <span style={{fontSize: "0.65vw", fontWeight: "600"}}>{name}</span>
                    </s.ItemBottomP>
                    
                    <s.ItemBottomViewContainer onClick={handleViewClick}>
                        <s.ItemTopViewImg src={View} alt="view" />
                        <s.ItemBottomP2>별자리 보러가기</s.ItemBottomP2>
                    </s.ItemBottomViewContainer>

                    <s.ItemBottomVoteButton onClick={handleVoteClick}>투표하기</s.ItemBottomVoteButton>
                </s.ItemBottomPContainer>
            </s.ItemBottomInnerContainer>
        </s.ItemBottomContainer>
    )
}

export default ItemBottomRanking;