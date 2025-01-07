import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/sideBar";
import styled from "styled-components";

const RootContainer = styled.div`
    display: flex;
`

const RootLayout = () => {
    return (
        <RootContainer>
            <SideBar />
            <Outlet />
        </RootContainer>
    )
}

export default RootLayout;