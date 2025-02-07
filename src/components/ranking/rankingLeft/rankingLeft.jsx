import { useState, useEffect } from "react";
import * as s from "../../../styles/ranking/ranking";
import ListTopRanking from "./top/list-topRanking";
import ListBottomRanking from "./bottom/list-bottomRanking";

const RankingLeft = ({ data }) => {
    return (
        <s.LeftContainer>
            <ListTopRanking data={data} />

            <s.BottomBar />
            <s.BottomContainer>
                <ListBottomRanking data={data} />
            </s.BottomContainer>
        </s.LeftContainer>
    );
};

export default RankingLeft;
