import styled from "styled-components";
import Spinner from "../spinner/spinner";
import colors from "../../../../styles/common/colors";
import Delete from "../../../../assets/images/posts/write/delete3.png";

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

const LoadingModalContainer = styled.div`
    width: 47.45vw;
    height: 28.75vw;
    border-radius: 0.75vw;
    background: rgba(255, 255, 255, 0.8);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DeleteImg = styled.img`
    width: 1vw;
    height: 1vw;
    position: absolute;
    right: 1vw;
    top: 1vw;
    cursor: pointer;
`

const LoadingP = styled.p`
    font-size: 1.25vw;
    font-weight: 600;
    color: ${colors.sideBarGray2};
    margin-top: 5.01vw;
`

const LoadingModal = ({ onClose }) => {
    return (
        <ModalOverlay>
            <LoadingModalContainer onClick={(e) => e.stopPropagation()}>
                <DeleteImg  onClick={onClose} src={Delete} alt="delete" />
                <Spinner />
                <LoadingP>분석중 입니다</LoadingP>
            </LoadingModalContainer>
        </ModalOverlay>
    );
};

export default LoadingModal;
