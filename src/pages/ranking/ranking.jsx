import * as s from "../../styles/ranking/ranking";
import RankingLeft from "../../components/ranking/rankingLeft/rankingLeft";
import RankingRight from "../../components/ranking/rankingRight/rankingRight";
import useFetch from "../../hooks/useFetch";

const Ranking = () => {
    const { data, loading, error } = useFetch("/users");
    // console.log(data);

    return (
        <s.RankingContainer>
            <s.RankingInnerContainer>
                <s.RankingP>여행 별자리 랭킹</s.RankingP>
                <s.RankingBar />

                <s.RankingContentContainer>
                    <RankingLeft data={data} />
                    <RankingRight />
                </s.RankingContentContainer>
            </s.RankingInnerContainer>
        </s.RankingContainer>
    )
}

export default Ranking;