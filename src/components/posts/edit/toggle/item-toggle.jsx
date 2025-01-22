import { useState } from 'react';
import * as s from "../../../../styles/posts/edit/edit";
import colors from "../../../../styles/common/colors";

const ItemToggle = ({ data, index }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleClick = () => {
        setIsToggled(!isToggled);
    };

    return (
        <s.InnerContainer onClick={handleClick}>
            <s.ToggleImg src={isToggled && data.image2 ? data.image2 : data.image} alt={isToggled && data.name2 ? data.name2 : data.name} />
            <s.ToggleP style={{ color: index === 2 ? colors.writeRed2 : 'inherit' }}>
                {isToggled && data.name2 ? data.name2 : data.name}
            </s.ToggleP>
        </s.InnerContainer>
    );
};

export default ItemToggle;
