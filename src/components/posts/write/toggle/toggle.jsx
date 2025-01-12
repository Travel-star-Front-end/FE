import * as s from "../../../../styles/posts/write/write";
import colors from "../../../../styles/common/colors";
import Save from "../../../../assets/images/posts/write/save.png";
import Trash from "../../../../assets/images/posts/write/trash.png";

const Toggle = () => {
    return (
        <s.ToggleContainer>
            <s.InnerContainer>
                <s.ToggleP>보관하기</s.ToggleP>
                <s.ToggleImg src={Save} alt="save" />
            </s.InnerContainer>

            <s.ToggleBar />

            <s.InnerContainer>
                <s.ToggleP>친구만</s.ToggleP>
            </s.InnerContainer>

            <s.ToggleBar />

            <s.InnerContainer>
                <s.ToggleP style={{color: colors.writeRed}}>삭제하기</s.ToggleP>
                <s.ToggleImg src={Trash} alt="trash" />
            </s.InnerContainer>
        </s.ToggleContainer>
    )
}

export default Toggle;