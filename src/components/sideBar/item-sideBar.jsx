import { useNavigate, useLocation } from "react-router-dom";
import * as s from "../../styles/common/sidebar/sidebar";

const ItemSideBar = ({ name, link, logo, logoClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(link);
    };

    const active = location.pathname.startsWith(link);
    const logoImage = active && logoClick ? logoClick : logo;

    return (
        <s.ItemContainer onClick={handleClick}>
            <s.ItemImg src={logoImage} alt="logo" />
            <s.ItemP active={active.toString()}>{name}</s.ItemP>
        </s.ItemContainer>
    )
}

export default ItemSideBar;