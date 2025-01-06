import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ItemSideBar from "./item-sideBar";
import SideBarData from "../../utils/sideBar/sideBarData"; // Assuming this contains the actual data

const ListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 17.4rem;
    padding-left: 3.9rem;
    gap: 4.8rem;
`;

const ListSideBar = () => {
    const [sideBarData, setSideBarData] = useState([]);

    useEffect(() => {
        setSideBarData(SideBarData);
    }, []);

    return (
        <ListContainer>
            {sideBarData.map((item, index) => (
                <ItemSideBar 
                    key={index}
                    id={item.id}
                    name={item.name} 
                    link={item.link} 
                    logo={item.logo} 
                    logoClick={item.logoClick}
                    width={item.width}
                    height={item.height}
                    padding={item.padding}
                    gap={item.gap}
                />
            ))}
        </ListContainer>
    );
};

export default ListSideBar;
