import * as s from "../../../styles/posts/write/write";
import ItemLocation from "./item-location";

const ListLocation = ({ locationResults, locationQuery, handleLocationSelect }) => {
    if (locationResults.length === 0 || !locationQuery) {
        return null;
    }

    return (
        <s.ListContainer>
            {locationResults.map((location, index) => (
                <ItemLocation
                    key={index}
                    location={location}
                    onSelect={handleLocationSelect}
                />
            ))}
        </s.ListContainer>
    );
};

export default ListLocation;
