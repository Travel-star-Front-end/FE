import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/sideBar";
import styled from "styled-components";

const RootContainer = styled.div`
    display: flex;
`

const SideBarContainer = styled.div`
    width: 15vw;
`

const OutletContainer = styled.div`
    width: 100%;
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