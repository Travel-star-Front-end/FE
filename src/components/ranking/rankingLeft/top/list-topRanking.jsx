import styled from "styled-components";
import colors from "../../../../styles/common/colors";
import ItemTopRanking from "./item-topRanking";

const ListContainer = styled.div`
    width: 100%;
    height: 23.75vw;
    background: ${colors.white};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    box-shadow: 0 0.2vw 0.68vw 0 rgba(0, 0, 0, 0.04);
    margin-top: 0.45vw;
`

const ListTopRanking = ({ data }) => {
    const topData = data.slice(0, 3);

    return (
        <ListContainer>
            {topData.map((item, index) => (
                <ItemTopRanking 
                    key={index}
                    id={item.id} 
                    username={item.username}
                    rank={index + 1}
                />
            ))}
        </ListContainer>
    )
}

export default ListTopRanking;