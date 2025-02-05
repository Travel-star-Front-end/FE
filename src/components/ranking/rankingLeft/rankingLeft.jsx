import { useState, useEffect } from "react";
import * as s from "../../../styles/ranking/ranking";
import ListTopRanking from "./top/list-topRanking";
import ListBottomRanking from "./bottom/list-bottomRanking";

const RankingLeft = ({ data }) => {
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        if (Array.isArray(data)) {
            const sorted = [...data].sort((a, b) => b.id - a.id);
            setSortedData(sorted);
        }
    }, [data]);

    return (
        <s.LeftContainer>
            <ListTopRanking data={sortedData} />
            <s.BottomBar />
            <s.BottomContainer>
                <ListBottomRanking data={sortedData} />
            </s.BottomContainer>
        </s.LeftContainer>
    );
};

export default RankingLeft;
