import * as s from "../../../../styles/posts/write/write";
import styled from "styled-components";
import colors from "../../../../styles/common/colors";
import FeelingData from "../../../../utils/posts/write/feelingData";

const FeelingImgContainer = styled.div`
    width: 2.9vw;
    height: 2.9vw;
    border-radius: 0.25vw;
    border: 0.05vw solid ${colors.writeGray5};
    position: absolute;
    top: 50%;
    right: 13vw;
    transform: translateY(-50%); 
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FeelingImg = styled.img`
    width: 2.3vw;
    height: 2.3vw;
`

const WriteTextarea = ({ width, height, placeholder, value, onChange, padding, onAIClick, analyzedFeeling }) => {
    const matchedFeeling = FeelingData.find(item => item.feeling === analyzedFeeling);
    const feelingImage = matchedFeeling ? matchedFeeling.smallimage : null;

    return (
        <s.TextareaWrapper width={width} height={height}>
            <s.TextareaContainer 
                width={width}
                height={height}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                padding={padding}
            />

            {feelingImage && (
                <FeelingImgContainer>
                    <FeelingImg src={feelingImage} alt={matchedFeeling.text} />
                </FeelingImgContainer>
            )}

            {onAIClick && (
                <s.AIButtonContainer onClick={onAIClick}>
                    분석하기
                </s.AIButtonContainer>
            )}
        </s.TextareaWrapper>
    );
}

export default WriteTextarea;
