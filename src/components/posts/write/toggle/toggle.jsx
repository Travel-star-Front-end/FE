import styled from "styled-components";
import colors from "../../../../styles/colors";
import Save from "../../../../assets/images/posts/write/save.png";
import Trash from "../../../../assets/images/posts/write/trash.png";

const ToggleContainer = styled.div`
    width: 10.75vw;
    height: 7.3vw;
    position: absolute;
    background: ${colors.writeGray};
    right: 0;
    top: 4.2vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InnerContainer = styled.div`
    width: 88%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.45vw 0; 
    cursor: pointer;
`

const ToggleP = styled.p`
    font-size: 1.2vw;
    font-weight: 400;
    color: ${colors.sideBarGray2};
`

const ToggleImg = styled.img`
    width: 1.35vw;
`

const ToggleBar = styled.div`
    width: 100%;
    height: 0.05vw;
    background: ${colors.white};
`

const Toggle = () => {
    return (
        <ToggleContainer>
            <InnerContainer>
                <ToggleP>보관하기</ToggleP>
                <ToggleImg src={Save} alt="save" />
            </InnerContainer>

            <ToggleBar />

            <InnerContainer>
                <ToggleP>친구만</ToggleP>
            </InnerContainer>

            <ToggleBar />

            <InnerContainer>
                <ToggleP style={{color: colors.writeRed}}>삭제하기</ToggleP>
                <ToggleImg src={Trash} alt="trash" />
            </InnerContainer>
        </ToggleContainer>
    )
}

export default Toggle;