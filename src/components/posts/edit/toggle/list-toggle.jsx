import { useState } from "react";
import ItemToggle from "./item-toggle";

const ListToggle = ({ postId, data, storage, setStorage }) => {
    return (
        <>
            {data.map((item, index) => (
                <ItemToggle 
                    key={item.id}
                    data={item}
                    index={index}
                    storage={storage}
                    setStorage={setStorage}
                    postId={postId}
                />
            ))}
        </>
    );
};

export default ListToggle;
