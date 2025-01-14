import styled from "styled-components";
import colors from "../../styles/common/colors";
import RankingLeft from "../../components/ranking/rankingLeft/rankingLeft";
import RankingRight from "../../components/ranking/rankingRight/rankingRight";
import useFetch from "../../hooks/useFetch";

const RankingContainer = styled.div`
    background: ${colors.homeGray};
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3.1vw 0 2.25vw 0;
`

const RankingInnerContainer = styled.div`
    width: 90%;
`

const RankingP = styled.p`
    font-size: 1.2vw;
    font-weight: 600;
    color: ${colors.sideBarGray2};
`

const RankingBar = styled.div`
    width: 100%;
    height: 0.05vw;
    background: ${colors.writeGray};
    margin-top: 0.5vw;
`

const RankingContentContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 1.25vw;
`

const Ranking = () => {
    const { data, loading, error } = useFetch("/users");
    // console.log(data);

    return (
        <RankingContainer>
            <RankingInnerContainer>
                <RankingP>여행 별자리 랭킹</RankingP>
                <RankingBar />

                <RankingContentContainer>
                    <RankingLeft data={data} />
                    <RankingRight />
                </RankingContentContainer>
            </RankingInnerContainer>
        </RankingContainer>
    )
}

export default Ranking;