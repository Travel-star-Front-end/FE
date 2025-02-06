import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "../../../../styles/ranking/ranking";
import colors from "../../../../styles/common/colors";
import View from "../../../../assets/images/ranking/view.png";
import { API } from "../../../../apis/axios";

const ItemTopRanking = ({ id, name, rank }) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    const handleViewClick = (id) => {
        navigate(`/planet/${id}`);
    }

    const handleVoteClick = async () => {
        try {
            const response = await API.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                count: count + 1,
            });

            console.log(response.data);
            setCount(count + 1);
            alert("투표가 반영되었습니다.");
        } catch (error) {
            console.error("Error", error);
        }
    }

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