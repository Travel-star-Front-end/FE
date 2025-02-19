import { useState } from "react";
import * as s from "../../../../styles/posts/edit/edit";
import ToggleData from "../../../../utils/posts/edit/toggleData";
import ListToggle from "./list-toggle";

const Toggle = ({ postId, storage, setStorage }) => {
    return (
        <s.ToggleContainer>
            <ListToggle data={ToggleData} storage={storage} setStorage={setStorage} postId={postId} />
        </s.ToggleContainer>
    );
};

export default Toggle;
