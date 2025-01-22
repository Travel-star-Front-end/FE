import ListToggle from "./list-toggle";
import * as s from "../../../../styles/posts/edit/edit";
import ToggleData from "../../../../utils/posts/edit/toggleData";

const Toggle = () => {
    return (
        <s.ToggleContainer>
            <ListToggle data={ToggleData} />
        </s.ToggleContainer>
    )
}

export default Toggle;