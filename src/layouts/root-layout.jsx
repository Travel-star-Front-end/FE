import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/sideBar";
import styled from "styled-components";

const RootContainer = styled.div`
    display: flex;
    min-height: 100vh;
`

const SideBarContainer = styled.div`
    width: 15vw;
`

const OutletContainer = styled.div`
    width: calc(100% - 15vw);
`

const RootLayout = () => {
    return (
        <RootContainer>
            <SideBarContainer>
                <SideBar />
            </SideBarContainer>
            <OutletContainer>
                <Outlet />
            </OutletContainer>
        </RootContainer>
    )
}

export default RootLayout;