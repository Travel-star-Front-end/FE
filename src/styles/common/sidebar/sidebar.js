import styled from "styled-components"
import colors from "../colors";

export const SideBarContainer = styled.div`
    width: 100%;
    height: 100%;
    background: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.75vw 0;
`

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5vw;
    cursor: pointer;
`

export const LogoImg = styled.img`
    width: ${(props) => props.width || '5.75vw'};
    height: ${(props) => props.height || '2.2vw'};
`

export const ProfileContainer = styled.div`
    width: 12.8vw;
    height: 11.95vw;
    border: none;
    border-radius: 0.75vw;
    background: ${colors.sideBarGray};
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.1vw;
    padding-top: 2.15vw;
    gap: 0.8vw;
`

export const ProfileImgContainer = styled.img`
    width: 5.05vw;
    height: 5.05vw;
    background: ${colors.white};
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const PContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

export const ProfileP = styled.p`
    text-align: center;
    font-size: ${(props) => props.size || '0.7vw'};
    font-weight: ${(props) => props.weight || '300'};
    color: ${colors.black};
`

export const ListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10.7vw;
    padding-left: 4.2vw;
    gap: 2.05vw;
`;

export const ItemContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.7vw;
    cursor: pointer;
`

export const ItemImg = styled.img`
    width: 1.55vw;
    height: 1.55vw;
`

export const ItemP = styled.p`
    font-size: 1vw;
    font-weight: 400;
    color: ${(props) => (props.active === "true" ? colors.main : colors.sideBarGray2)};

    &:hover {
        font-weight: bold;
    }
`