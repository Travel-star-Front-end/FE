import * as s from "../../../../styles/ranking/ranking";
import ItemTopRanking from "./item-topRanking";


const ListTopRanking = ({ data }) => {
    const topData = data.slice(0, 3);

    return (
        <s.ListTopContainer>
            <s.ListTopP>[이 달 랭]</s.ListTopP>
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
        </s.ListTopContainer>
    )
}

export default ListTopRanking;