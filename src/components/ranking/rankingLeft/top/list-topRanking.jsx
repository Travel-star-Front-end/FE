import * as s from "../../../../styles/ranking/ranking";
import ItemTopRanking from "./item-topRanking";

const ListTopRanking = ({ data }) => {
    const topData = data.slice(0, 3);

    return (
        <s.ListTopContainer>
            <s.ListTopP>[이 달 랭]</s.ListTopP>
            
            {topData.length > 0 ? (
                <s.ListTopInnerContainer>
                    {topData.map((item, index) => (
                        <ItemTopRanking 
                            key={index}
                            id={item.id} 
                            username={item.username}
                            rank={index + 1}
                        />
                    ))}
                </s.ListTopInnerContainer>
            ) : (
                <s.ListTopInnerContainer2>
                    <s.ErrorP>랭킹 정보가 없습니다.</s.ErrorP>
                </s.ListTopInnerContainer2>
            )}
        </s.ListTopContainer>
    );
};

export default ListTopRanking;
