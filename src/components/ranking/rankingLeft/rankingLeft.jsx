import styled from "styled-components";
import colors from "../../../styles/common/colors";
import ListTopRanking from "./top/list-topRanking";
import ListBottomRanking from "./bottom/list-bottomRanking";

const LeftContainer = styled.div`
    width: 68%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LeftP = styled.p`
    font-size: 1vw;
    font-weight: 600;
    color: ${colors.main};
`

const BottomContainer = styled.div`
    width: 100%;
    margin: 1.05vw 0 0.45vw 0;
`

const BottomBar = styled.div`
    width: 100%;
    height: 0.05vw;
    background: ${colors.writeGray};
`


const RankingLeft = ({ data }) => {
    if (!data) {
        return null;
    }
    
    const sortedData = data.sort((a, b) => b.id - a.id);
    const currentMonth = new Date().getMonth() + 1;

    return (
        <LeftContainer>
            <LeftP>[이 달 랭]</LeftP>
            <ListTopRanking data={sortedData} />

            <BottomContainer>
                <LeftP style={{color: colors.sideBarGray2}}>{currentMonth}월 랭킹</LeftP>
                <BottomBar />

                <ListBottomRanking data={sortedData}/>
            </BottomContainer>
        </LeftContainer>
    )
}

export default RankingLeft;