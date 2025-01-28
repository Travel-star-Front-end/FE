import ItemToggle from "./item-toggle";

const ListToggle = ({ data }) => {
    return (
        <>
            {data.map((item, index) => (
                <ItemToggle 
                    key={item.id}
                    data={item}
                    index={index}
                />
            ))}
        </>
    );
};

export default ListToggle;
