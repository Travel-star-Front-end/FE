import { useNavigate, useLocation } from "react-router-dom";
import * as s from "../../styles/common/sidebar/sidebar";

const ItemSideBar = ({ name, link, link2, link3, logo, logoClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(link);
    };

    const active = location.pathname.startsWith(link) || location.pathname.startsWith(link2) || location.pathname.startsWith(link3);
    const logoImage = active && logoClick ? logoClick : logo;

    return (
        <s.ItemContainer onClick={handleClick}>
            <s.ItemImg src={logoImage} alt="logo" />
            <s.ItemP active={active.toString()}>{name}</s.ItemP>
        </s.ItemContainer>
    )
}

export default ItemSideBar;