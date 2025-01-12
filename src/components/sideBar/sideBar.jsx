import { useNavigate } from "react-router-dom";
import * as s from "../../styles/common/sidebar/sidebar";
import Logo from "../../assets/images/auth/login/logo.png";
import LogoP from "../../assets/images/auth/login/logoP.png";
import Profile from "./profile";
import ListSideBar from "./list-sideBar";

const SideBar = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/home");
    }

    return (
        <s.SideBarContainer>
            <s.LogoContainer onClick={handleHomeClick}>
                <s.LogoImg src={Logo} alt="logo" width="2.86vw" height="2.86vw" />
                <s.LogoImg src={LogoP} alt="logoP" />
            </s.LogoContainer>

            <Profile />

            <ListSideBar />
        </s.SideBarContainer>
    )
}

export default SideBar;