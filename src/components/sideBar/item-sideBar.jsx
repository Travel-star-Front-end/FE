import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";

// padding, margin, gap, 이미지 다시 수정 해..
const ItemContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: ${(props) => props.padding || '3.2rem'};
    gap: ${(props) => props.gap || '2rem'};
    cursor: pointer;
`

const ItemImg = styled.img`
    width: ${(props) => props.width || '2.8rem'};
    height: ${(props) => props.height || '2.9rem'};
`

const ItemP = styled.p`
    font-size: 2rem;
    font-weight: 400;
    color: ${(props) => (props.active ? colors.main : colors.sideBarGray2)};

    &:hover {
        font-weight: bold;
    }
`

const ItemSideBar = ({ name, link, logo, logoClick, width, height, padding, gap }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(link);
    };

    const active = location.pathname.startsWith(link);
    const logoImage = active && logoClick ? logoClick : logo;

    return (
        <ItemContainer padding={padding} gap={gap} onClick={handleClick}>
            <ItemImg src={logoImage} width={width} height={height} alt="logo" />
            <ItemP active={active}>{name}</ItemP>
        </ItemContainer>
    )
}

export default ItemSideBar;