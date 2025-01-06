import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import Logo from "../../assets/images/logo.png";
import LogoP from "../../assets/images/logoP.png";
import Profile from "./profile";
import ListSideBar from "./list-sideBar";

const SideBarContainer = styled.div`
    width: 31.9rem;
    min-height: 100vh;
    background: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-top: 7.4rem;
    cursor: pointer;
`

const LogoImg = styled.img`
    width: ${(props) => props.width || '11.5rem'};
    height: ${(props) => props.height || '4.4rem'};
`

const SideBar = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/home");
    }

    return (
        <SideBarContainer>
            <LogoContainer onClick={handleHomeClick}>
                <LogoImg src={Logo} alt="logo" width="6.1rem" height="6.1rem" />
                <LogoImg src={LogoP} alt="logoP" />
            </LogoContainer>

            <Profile />

            <ListSideBar />
        </SideBarContainer>
    )
}

export default SideBar;