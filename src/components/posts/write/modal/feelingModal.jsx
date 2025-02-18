import * as s from "../../../../styles/posts/write/write";
import colors from "../../../../styles/common/colors";
import Delete from "../../../../assets/images/posts/write/delete3.png";
import FeelingData from "../../../../utils/posts/write/feelingData";

const FeelingModal = ({ analyzedFeeling, onFeelingSelect }) => {
    const matchedFeeling = FeelingData.find(item => item.id == analyzedFeeling);
    const displayText = matchedFeeling ? matchedFeeling.text : "분석 실패";
    const displayColor = matchedFeeling ? colors[matchedFeeling.pcolor] : colors.sideBarGray2;
    const displayImage = matchedFeeling ? matchedFeeling.bigimage : null;

    const handleSelectFeeling = () => {
        onFeelingSelect(analyzedFeeling);
    };

    return (
        <s.LoadingModalOverlay>
            <s.FeelingModalContainer onClick={(e) => e.stopPropagation()}>
                <s.LoadingDeleteImg onClick={handleSelectFeeling} src={Delete} alt="delete" />
                
                <s.AIContainer>
                    <s.FeelingP>분석완료</s.FeelingP>
                    <s.StarImg src={displayImage} alt="star" />
                    <s.PContainer>
                        <s.FeelingP2>당신의 여행은</s.FeelingP2>
                        <s.FeelingP3 color={displayColor}> {displayText} </s.FeelingP3>
                        <s.FeelingP2>입니다.</s.FeelingP2>
                    </s.PContainer>
                </s.AIContainer>
            </s.FeelingModalContainer>
        </s.LoadingModalOverlay>
    );
};

export default FeelingModal;
