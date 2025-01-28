import styled from "styled-components"
import colors from "../../common/colors";

export const ToggleContainer = styled.div`
    width: 9.2vw;
    height: 5vw;
    position: absolute;
    background: ${colors.writeGray};
    right: 0;
    top: 3.5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`

export const InnerContainer = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
`

export const ToggleP = styled.p`
    font-size: 0.85vw;
    font-weight: 300;
    color: ${colors.sideBarGray2};
    margin-left: 2.3vw;
`

export const ToggleImg = styled.img`
    width: 0.85vw;
    height: auto;
`