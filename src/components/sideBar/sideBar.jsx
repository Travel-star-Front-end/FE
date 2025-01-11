import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import Logo from "../../assets/images/logo.png";
import LogoP from "../../assets/images/logoP.png";
import Profile from "./profile";
import ListSideBar from "./list-sideBar";

const SideBarContainer = styled.div`
    width: 15vw;
    height: 100%;
    background: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.7vw 0;
`

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.45vw;
    cursor: pointer;
`

const LogoImg = styled.img`
    width: ${(props) => props.width || '5.75vw'};
    height: ${(props) => props.height || '2.2vw'};
`

const SideBar = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/home");
    }

    return (
        <SideBarContainer>
            <LogoContainer onClick={handleHomeClick}>
                <LogoImg src={Logo} alt="logo" width="3.05vw" height="3.05vw" />
                <LogoImg src={LogoP} alt="logoP" />
            </LogoContainer>

            <Profile />

            <ListSideBar />
        </SideBarContainer>
    )
}

export default SideBar;