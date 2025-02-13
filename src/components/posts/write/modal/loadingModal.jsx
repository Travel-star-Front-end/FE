import * as s from "../../../../styles/posts/write/write";
import Spinner from "../spinner/spinner";
import Delete from "../../../../assets/images/posts/write/delete3.png";


const LoadingModal = ({ onClose }) => {
    return (
        <s.LoadingModalOverlay>
            <s.LoadingModalContainer onClick={(e) => e.stopPropagation()}>
                <s.LoadingDeleteImg onClick={onClose} src={Delete} alt="delete" />
                <Spinner />
                <s.LoadingP>분석중 입니다</s.LoadingP>
            </s.LoadingModalContainer>
        </s.LoadingModalOverlay>
    );
};

export default LoadingModal;
