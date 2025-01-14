import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../../styles/common/colors";
import View from "../../../../assets/images/ranking/view.png";

const ItemContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.25vw;
`

const ImgContainer = styled.div`
    position: relative;
    width: 13.65vw;
    height: 13.65vw;
    background: ${colors.black};
    border-radius: 50%;
`

const RankingContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 4.05vw;
    height: 4.05vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.main};
    border-radius: 50%;
`

const RankingP = styled.p`
    font-size: 2vw;
    font-weight: 800;
    color: ${colors.white};
`

const PContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const ItemP = styled.p`
    width: 100%;
    font-size: 0.7vw;
    font-weight: 700;
    color: ${colors.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
`

const ViewContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

const ViewImg = styled.img`
    width: 1.2vw;
    height: 1.2vw;
`

const ItemTopRanking = ({ id, username, rank }) => {
    const navigate = useNavigate();

    const handleViewClick = (id) => {
        navigate(`/planet/${id}`);
    }

    return (
        <ItemContainer id={id}>
            <InnerContainer>
                <ImgContainer>
                    <RankingContainer>
                        <RankingP>{rank}<span style={{fontSize: "1.2vw"}}>위</span></RankingP>
                    </RankingContainer>
                </ImgContainer>

                <PContainer>
                    <ItemP>
                        이름<br/>
                        <span style={{fontSize: "0.9vw", fontWeight: "500"}}>{username}</span>
                    </ItemP>
                    <ViewContainer onClick={handleViewClick}>
                        <ViewImg src={View} alt="view" />
                        <RankingP style={{fontSize: "0.65vw", fontWeight: "600", color: colors.main}}>{username} 별자리 보러가기</RankingP>
                    </ViewContainer>
                </PContainer>
            </InnerContainer>
        </ItemContainer>
    )
}

export default ItemTopRanking;