import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../../styles/common/colors";
import View from "../../../../assets/images/ranking/view.png";

const ItemContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.8vw;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.9vw;
`

const ImgContainer = styled.div`
    position: relative;
    width: 10.65vw;
    height: 10.65vw;
    background: ${colors.black};
    border-radius: 50%;
`

const PContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const ItemP = styled.p`
    width: 100%;
    font-size: 0.65vw;
    font-weight: 600;
    color: ${colors.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
`

const ItemP2 = styled.p`
    font-size: 0.65vw;
    font-weight: 600;
    color: ${colors.main};
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

const ItemBottomRanking = ({ id, username }) => {
    const navigate = useNavigate();

    const handleViewClick = (id) => {
        navigate(`/planet/${id}`);
    }

    return (
        <ItemContainer id={id}>
            <InnerContainer>
                <ImgContainer />

                <PContainer>
                    <ItemP>
                        이름<br />
                        <span style={{fontSize: "0.8vw", fontWeight: "500"}}>{username}</span>
                    </ItemP>
                    <ViewContainer onClick={handleViewClick}>
                        <ViewImg src={View} alt="view" />
                        <ItemP2>별자리 보러가기</ItemP2>
                    </ViewContainer>
                </PContainer>
            </InnerContainer>
        </ItemContainer>
    )
}

export default ItemBottomRanking;