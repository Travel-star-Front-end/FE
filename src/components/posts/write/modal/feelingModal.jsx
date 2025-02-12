import styled from "styled-components";
import colors from "../../../../styles/common/colors";
import Delete from "../../../../assets/images/posts/write/delete3.png";
import FeelingData from "../../../../utils/posts/write/feelingData";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 15vw;
    width: calc(100vw - 15vw);
    height: 100vh;
    background: rgba(217, 217, 217, 0.83);
    display: flex;
    justify-content: center;
    padding-top: 12.6vw;
    z-index: 1000;
`;

const FeelingModalContainer = styled.div`
    width: 47.45vw;
    height: 28.75vw;
    border-radius: 0.75vw;
    background: rgba(255, 255, 255, 0.8);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const DeleteImg = styled.img`
    width: 1vw;
    height: 1vw;
    position: absolute;
    right: 1vw;
    top: 1vw;
    cursor: pointer;
`;

const AIContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1vw;
    margin-top: 1vw;
`

const LoadingP = styled.p`
    font-size: 2vw;
    font-weight: 800;
    color: ${colors.sideBarGray2};
`;

const StarImg = styled.img`
    width: 12.25vw;
    height: 12.25vw;
`

const PContainer = styled.div`
    display: flex;
    gap: 0.5vw;
`

const LoadingP2 = styled.p`
    font-size: 1.25vw;
    font-weight: 500;
    color: ${colors.sideBarGray2};
`

const LoadingP3 = styled.p`
    font-size: 1.25vw;
    font-weight: 600;
    color: ${({ color }) => color || colors.sideBarGray2};
`

const FeelingModal = ({ analyzedFeeling, onFeelingSelect }) => {
    const defaultFeeling = "happy";

    const matchedFeeling = FeelingData.find(item => item.feeling === defaultFeeling);
    const displayText = matchedFeeling ? matchedFeeling.text : "분석 실패";
    const displayFeeling = matchedFeeling ? matchedFeeling.feeling : "분석 실패";
    const displayColor = matchedFeeling ? colors[matchedFeeling.pcolor] : colors.sideBarGray2;
    const displayImage = matchedFeeling ? matchedFeeling.bigimage : null;

    const handleSelectFeeling = () => {
        onFeelingSelect(displayFeeling);
    };

    return (
        <ModalOverlay>
            <FeelingModalContainer onClick={(e) => e.stopPropagation()}>
                <DeleteImg onClick={handleSelectFeeling} src={Delete} alt="delete" />
                
                <AIContainer>
                    <LoadingP>분석완료</LoadingP>
                    <StarImg src={displayImage} alt="star" />
                    <PContainer>
                        <LoadingP2>당신의 여행은</LoadingP2>
                        <LoadingP3 color={displayColor}> {displayText} </LoadingP3>
                        <LoadingP2>입니다.</LoadingP2>
                    </PContainer>
                </AIContainer>
            </FeelingModalContainer>
        </ModalOverlay>
    );
};

export default FeelingModal;
