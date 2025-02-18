import * as s from "../../../../styles/posts/write/write";
import FeelingData from "../../../../utils/posts/write/feelingData";

const WriteTextarea = ({ width, height, placeholder, value, onChange, padding, onAIClick, analyzedFeeling }) => {
    const matchedFeeling = analyzedFeeling ? FeelingData.find(item => item.id === analyzedFeeling) : null;
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
                <s.FeelingImgContainer>
                    <s.FeelingImg src={feelingImage} alt={matchedFeeling.text} />
                </s.FeelingImgContainer>
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
