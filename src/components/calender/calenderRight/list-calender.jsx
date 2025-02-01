import { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import ItemCalender from "./item-calender";

const ListContaienr = styled.div`
    width: 100%;
    height: 27.85vw;
    overflow-y: scroll; 
    margin-top: 1.2vw;
    border: 0.05vw solid ${colors.calenderGray};
`

const ListCalender = ({ data }) => {
    const [selectedId, setSelectedId] = useState(null);
    const safeData = Array.isArray(data) ? data : []; 

    const handleItemClick = (id) => {
        if (selectedId === null) {
            setSelectedId(id);
        } else if (selectedId !== id) {
            setSelectedId(id);
        }
    };

    return (
        <ListContaienr>
            {safeData.map((item, index) => (
                <ItemCalender 
                    key={index}
                    id={item.id} 
                    username={item.username}
                    selected={selectedId === item.id} 
                    onItemClick={() => handleItemClick(item.id)} 
                />
            ))}
        </ListContaienr>
    )
}

export default ListCalender;