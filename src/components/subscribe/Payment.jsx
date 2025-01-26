import styled from 'styled-components';
import colors from '../../styles/common/colors';
import kakao from '../../assets/images/subscribe/kakao.png';
import naver from '../../assets/images/subscribe/naver.png';
import card from '../../assets/images/subscribe/card.png';
import bank from '../../assets/images/subscribe/bank.png';
import close from '../../assets/images/subscribe/close.png';
import { useState } from 'react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ececec;
  padding: 2rem;
  border-radius: 1rem;
  width: 70rem;
  height: 95rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1rem;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CloseButton = styled.img`
  background: none;
  border: none;
  width: 5%;
  color: ${colors.sideBarGray2};
  cursor: pointer;
`;

const Title = styled.h2`
  color: ${colors.sideBarGray2};
  font-size: 3.5rem;
  margin-bottom: 1rem;
  margin-top: 3rem;
`;

const Description = styled.p`
  color: ${colors.sideBarGray2};
  margin-top: 0.9rem;
  font-size: 2.2rem;
  font-weight: 450;
  margin-bottom: 3rem;
`;

const Price = styled.p`
  color: ${colors.main};
  font-size: 3rem;
  font-weight: 600;
  margin: 1rem 0;
  margin-bottom: 2rem;
`;

const PaymentOptions = styled.div`
  background-color: #ececec;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const PaymentButton = styled.img`
  padding: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
  background: #ececec;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 45%;
  padding: 1.7rem;
  background: ${colors.main};
  color: white;
  border: none;
  border-radius: 2rem;
  margin-top: 10rem;
  font-size: 2.5rem;
  font-weight: 600;
`;

const CompleteModalContent = styled(ModalContent)`
  width: 65rem;
  height: 40rem;
`;

const CompleteTitle = styled.h2`
  color: ${colors.main};
  font-size: 4rem;
  text-align: center;
  margin-top: 7rem;
`;

const CompleteDescription = styled.p`
  color: #666666;
  font-size: 1.8rem;
  text-align: center;
  margin-top: 5rem;
`;

const Payment = ({ price, name, onClose }) => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handlePaymentSubmit = () => {
    setIsPaymentComplete(true);
  };

  return (
    <ModalOverlay>
      {!isPaymentComplete ? (
        <>
          <ModalContent>
            <HeaderContainer>
              <CloseButton src={close} onClick={onClose} alt="close" />
            </HeaderContainer>
            <BodyContainer>
              <Title>{name} 구독</Title>
              <Description>
                {price === 5900
                  ? '12달 무제한 음악 설정 및 재생 가능'
                  : '한달 간 무제한 음악 설정 및 재생 가능'}
              </Description>
              <Price>
                {price === 5900 ? `연간 ${price}원` : `매달 ${price}원`}
              </Price>
              <PaymentOptions>
                <PaymentButton src={kakao} alt="카카오페이" />
                <PaymentButton src={naver} alt="네이버페이" />
                <PaymentButton src={card} alt="신용카드" />
                <PaymentButton src={bank} alt="무통장입금" />
              </PaymentOptions>
              <SubmitButton onClick={handlePaymentSubmit}>
                결제하기
              </SubmitButton>
            </BodyContainer>
          </ModalContent>
        </>
      ) : (
        <CompleteModalContent>
          <HeaderContainer>
            <CloseButton src={close} onClick={onClose} alt="close" />
          </HeaderContainer>
          <CompleteTitle>결제가 완료되었습니다</CompleteTitle>
          <CompleteDescription>
            이제 무제한 음악 설정 및 재생 가능합니다
          </CompleteDescription>
        </CompleteModalContent>
      )}
    </ModalOverlay>
  );
};

export default Payment;
