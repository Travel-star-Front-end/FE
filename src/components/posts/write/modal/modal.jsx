import * as s from "../../../../styles/posts/write/write";
import Delete2 from "../../../../assets/images/posts/write/delete2.png";
import { useNavigate } from "react-router-dom";

const Modal = ({ onClose }) => {
    const navigate = useNavigate();

    const handleSubscribeClick = () => {
        navigate("/subscribe");
    }

    return (
        <s.ModalOverlay onClick={onClose}>
            <s.ModalContainer onClick={(e) => e.stopPropagation()}>
                <s.CloseImg src={Delete2} alt="close" onClick={onClose} />
                <s.ModalP>
                    '일지 노래 구독'을 진행하겠습니까?<br/>
                    <span style={{fontWeight: "400", fontSize: "0.75vw"}}>본 구독 시 사용자의 일지에 노래 설정이 가능합니다.</span>
                </s.ModalP>
                <s.SubscribeButton onClick={handleSubscribeClick}>구독하기</s.SubscribeButton>
            </s.ModalContainer>
        </s.ModalOverlay>
    );
};

export default Modal;
