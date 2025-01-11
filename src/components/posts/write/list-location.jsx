import styled from "styled-components";
import colors from "../../../styles/colors";
import ItemLocation from "./item-location";

const ListContainer = styled.div`
    position: absolute;
    width: 100%;
    background-color: ${colors.writeGray};
    z-index: 10;
    margin-top: 0.5vw;
`;

const ListLocation = ({ locationResults, locationQuery, handleLocationSelect }) => {
    if (locationResults.length === 0 || !locationQuery) {
        return null;
    }

    return (
        <ListContainer>
            {locationResults.map((location, index) => (
                <ItemLocation
                    key={index}
                    location={location}
                    onSelect={handleLocationSelect}
                />
            ))}
        </ListContainer>
    );
};

export default ListLocation;
