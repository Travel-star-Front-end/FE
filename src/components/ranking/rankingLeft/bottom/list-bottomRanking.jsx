import styled from "styled-components";
import ItemBottomRanking from "./item-bottomRanking";

const ListContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 1vw;
`

const ListBottomRanking = ({ data }) => {
    const slicedData = data.slice(3); 

    return (
        <ListContainer>
            {slicedData.map((item, index) => (
                <ItemBottomRanking 
                    key={index}
                    id={item.id}
                    username={item.username}
                />
            ))}
        </ListContainer>
    )
}

export default ListBottomRanking;