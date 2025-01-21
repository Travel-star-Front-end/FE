import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/sideBar";
import * as s from "../styles/common/layout/layout";

const RootLayout = () => {
    return (
        <s.RootContainer>
            <s.SideBarContainer>
                <SideBar />
            </s.SideBarContainer>
            <s.OutletContainer>
                <Outlet />
            </s.OutletContainer>
        </s.RootContainer>
    )
}

export default RootLayout;