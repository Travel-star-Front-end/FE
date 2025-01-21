import React, { useState, useEffect } from "react";
import * as s from "../../styles/common/sidebar/sidebar";
import ItemSideBar from "./item-sideBar";
import SideBarData from "../../utils/sideBar/sideBarData";

const ListSideBar = () => {
    const [sideBarData, setSideBarData] = useState([]);

    useEffect(() => {
        setSideBarData(SideBarData);
    }, []);

    return (
        <s.ListContainer>
            {sideBarData.map((item, index) => (
                <ItemSideBar 
                    key={index}
                    id={item.id}
                    name={item.name} 
                    link={item.link} 
                    logo={item.logo} 
                    logoClick={item.logoClick}
                />
            ))}
        </s.ListContainer>
    );
};

export default ListSideBar;
