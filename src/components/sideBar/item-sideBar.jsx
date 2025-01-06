import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";

const ItemContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.4rem;
    cursor: pointer;
`

const ItemImg = styled.img`
    width: 3.1rem;
    height: 3.1rem;
`

const ItemP = styled.p`
    font-size: 2rem;
    font-weight: 400;
    color: ${(props) => (props.active === "true" ? colors.main : colors.sideBarGray2)};

    &:hover {
        font-weight: bold;
    }
`

const ItemSideBar = ({ name, link, logo, logoClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(link);
    };

    const active = location.pathname.startsWith(link);
    const logoImage = active && logoClick ? logoClick : logo;

    return (
        <ItemContainer onClick={handleClick}>
            <ItemImg src={logoImage} alt="logo" />
            <ItemP active={active.toString()}>{name}</ItemP>
        </ItemContainer>
    )
}

export default ItemSideBar;