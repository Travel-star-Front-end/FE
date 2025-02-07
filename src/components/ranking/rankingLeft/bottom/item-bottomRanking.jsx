import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../../apis/axios";
import * as s from "../../../../styles/ranking/ranking";
import View from "../../../../assets/images/ranking/view.png";


const ItemBottomRanking = ({ id, name }) => {
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