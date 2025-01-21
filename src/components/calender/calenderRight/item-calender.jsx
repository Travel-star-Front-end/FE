import styled from "styled-components";
import colors from "../../../styles/common/colors";

const ItemContainer = styled.div`
    width: 100%;
    height: 3.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.05vw solid ${colors.calenderGray};
    background: ${({ selected }) => (selected ? colors.subMain : "transparent")};
    cursor: pointer;
`

const ItemInnerContainer = styled.div`
    width: 90%;
    display: flex;
    justify-contnet: space-between;
    align-items: center;
`

const LeftContainer = styled.div`
    width: calc(100% - 3vw);
    display: flex;
    align-items: center;
`

const ItemP = styled.p`
    font-size: 1.2vw;
    font-weight: 500;
    color: ${colors.black};
    width: 25%;
`

const ItemP2 = styled(ItemP)`
    font-size: 0.8vw;
    width: 100%;
`

const EditButton = styled.button`
    width: 3vw;
    height: 1.3vw;
    background: ${colors.homeGray};
    border: none;
    border-radius: 0.25vw;
    font-size: 0.8vw;
    font-weight: 500;
    color: ${colors.calenderGray4};
    cursor: pointer;
    display: ${({ selected }) => (selected ? "inline-block" : "none")};
`

const ItemCalender = ({ id, username, selected, onItemClick }) => {
    return (
        <ItemContainer selected={selected} onClick={onItemClick}>
            <ItemInnerContainer>
                <LeftContainer>
                    <ItemP>{id}</ItemP>
                    <ItemP2>{username}</ItemP2>
                </LeftContainer>
                <EditButton selected={selected}>수정</EditButton>
            </ItemInnerContainer>
        </ItemContainer>
    )
}

export default ItemCalender;