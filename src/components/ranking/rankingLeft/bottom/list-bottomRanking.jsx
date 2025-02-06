import * as s from "../../../../styles/ranking/ranking";
import ItemBottomRanking from "./item-bottomRanking";

const ListBottomRanking = ({ data }) => {
    const slicedData = data.slice(3); 

    return (
        <s.ListBottomContainer>
            {slicedData.map((item, index) => (
                <ItemBottomRanking 
                    key={index}
                    id={item.id}
                    name={item.name}
                />
            ))}
        </s.ListBottomContainer>
    )
}

export default ListBottomRanking;