import * as s from "../../../../styles/ranking/ranking";
import ItemBottomRanking from "./item-bottomRanking";

const ListBottomRanking = ({ data }) => {
    const slicedData = data.slice(3);

    return (
        <>
            {slicedData.length > 0 ? (
                <s.ListBottomContainer>
                    {slicedData.map((item, index) => (
                        <ItemBottomRanking 
                            key={index}
                            id={item.id}
                        />
                    ))}
                </s.ListBottomContainer>
            ) : (
                <s.ListBottomContainer2>
                    <s.ErrorP>랭킹 정보가 없습니다.</s.ErrorP>
                </s.ListBottomContainer2>
            )}
        </>
    );
};

export default ListBottomRanking;
