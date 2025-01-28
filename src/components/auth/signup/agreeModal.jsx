import { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from "../../../styles/common/colors";
import ListModal from './list-modal';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 65.5vw;
  height: 48.1vw;
  background: ${colors.completedGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalP = styled.p`
  font-size: 1.35vw;
  font-weight: 800;
  color: ${colors.black};
  margin-bottom: 2.35vw;
`;

const ModalP2 = styled.p`
  font-size: 0.85vw;
  font-weight: 500;
  color: ${colors.black};
  text-align: center;
`;

const CheckContainer = styled.div`
  width: 45vw;
  display: flex;
  gap: 2.1vw;
  margin-top: 2.7vw;
`;

const CheckBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'agree'
})`
  width: 1.45vw;
  height: 1.4vw;
  border: 0.01vw solid ${colors.signupGray};
  border-radius: 0.4vw;
  background: ${({ agree }) => (agree ? colors.main : 'transparent')};
  cursor: pointer;
`;

const ModalP3 = styled.p`
  font-size: 1vw;
  font-weight: 500;
  color: ${colors.black};
`;

const ModalPContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;

const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3.1vw;
`;

const ModalCloseButton = styled.button`
  width: 27vw;
  height: 3.65vw;
  border: 0.05vw solid ${colors.white};
  border-radius: 0.4vw;
  background: ${colors.main};
  cursor: pointer;
  font-size: 1.6vw;
  font-weight: 500;
  color: ${colors.white};
`;

const AgreeModal = ({ isOpen, data, onClose, onAgreeChange, termsAgreement }) => {
  if (!isOpen) return null; 
  const [agree, setAgree] = useState(termsAgreement[data?.id] || false);
  const subTitleParts = data?.subTitle?.split('@') || [];

  const handleAgreeClick = () => {
    if (!data?.id) {
      console.error("id가 없음:", data);
      return;
    }
    
    const newAgreeState = !agree;
    setAgree(newAgreeState);

    onAgreeChange(newAgreeState, data.id);
    // console.log("새로운 동의 상태:", data.id, newAgreeState);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalInnerContainer>
          <ModalP>{data?.title}</ModalP>
          <ModalP2>
            {subTitleParts[0]}<br />
            {subTitleParts[1]}
          </ModalP2>

          <ListModal data={data} />
          
          <CheckContainer>
            <CheckBox agree={agree} onClick={handleAgreeClick} />
            <ModalPContainer>
              <ModalP3 style={{ color: colors.signupRed }}>(필수 정보)</ModalP3>
              <ModalP3>동의함</ModalP3>
            </ModalPContainer>
          </CheckContainer>

          <ModalButtonContainer>
            <ModalCloseButton onClick={onClose}>닫기</ModalCloseButton>
          </ModalButtonContainer>
        </ModalInnerContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AgreeModal;
