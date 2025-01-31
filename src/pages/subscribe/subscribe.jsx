import styled from 'styled-components';
import colors from '../../styles/common/colors';
import { useState } from 'react';
import Payment from '../../components/subscribe/Payment';

const PageContainer = styled.div`
  background: ${colors.homeGray};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 3.1vw 0 2.25vw 0;
`;

const PageInnerContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const BackButton = styled.p`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2vw;
  font-weight: 600;
  color: ${colors.sideBarGray2};
`;

const Bar = styled.div`
  width: 100%;
  height: 0.05vw;
  background: ${colors.writeGray};
  margin-top: 0.5vw;
`;

const SubscribeWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
`;

const SubscribeContainer = styled.div`
  padding: 3vw 3vw 0 3vw;
  display: flex;
  gap: 5%;
  justify-content: center;
  align-items: center;
`;

const SubscriptionCard = styled.div`
  background-color: #ececec;
  padding: 3rem;
  border-radius: 1rem;
  width: 50rem;
  height: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
  }

  &:hover {
    background-color: rgb(15, 155, 180);

    h2,
    p,
    div {
      color: #fff;
    }
  }
`;

const Title = styled.h2`
  color: ${colors.sideBarGray2};
  font-size: 3.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${colors.sideBarGray2};
  margin-top: 0.9rem;
  font-size: 1.7rem;
  margin-bottom: 5rem;
`;

const Price = styled.div`
  color: ${colors.sideBarGray2};
  border: 1px dashed ${colors.main};
  padding: 1.5rem 8rem;
  font-size: 2.2rem;
  font-weight: 600;
  border-radius: 1rem;
  margin-bottom: 3rem;
`;

const Button = styled.button`
  background-color: ${colors.main};
  color: white;
  border: none;
  padding: 1.5rem 5rem;
  font-size: 2rem;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #00a5bb;
  }
`;

const Notice = styled.p`
  font-size: 2rem;
  color: #888;
  text-align: center;
  margin-top: 0;
`;

const SubscribePage = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    name: '',
    price: 0,
  });

  const handleSubscribe = (planName, price) => {
    setSelectedPlan({
      name: planName,
      price: price,
    });
    setShowPayment(true);
  };

  const handleClose = () => {
    setShowPayment(false);
  };

  return (
    <>
      <PageContainer>
        <PageInnerContainer>
          <BackButton>부가 서비스 옵션 구독</BackButton>
          <Bar />

          <SubscribeWrapper>
            {!showPayment ? (
              <SubscribeContainer>
                <SubscriptionCard>
                  <Title>한달 구독</Title>
                  <Description>
                    한달 간 무제한 음악 설정 및 재생 가능
                  </Description>
                  <Price>매달 1900원</Price>
                  <Button onClick={() => handleSubscribe('한달', 1900)}>
                    구독하기
                  </Button>
                </SubscriptionCard>
                <SubscriptionCard>
                  <Title>프리미엄 구독</Title>
                  <Description>12달 무제한 음악 설정 및 재생 가능</Description>
                  <Price>연간 5900원</Price>
                  <Button onClick={() => handleSubscribe('프리미엄', 5900)}>
                    구독하기
                  </Button>
                </SubscriptionCard>
              </SubscribeContainer>
            ) : (
              <Payment
                price={selectedPlan.price}
                name={selectedPlan.name}
                onClose={handleClose}
              />
            )}
          </SubscribeWrapper>
          <Notice>
            구독하지 않은 사용자는 다른 사용자의 일지 노래 30초 듣기로로
            제한됩니다.
          </Notice>
        </PageInnerContainer>
      </PageContainer>
    </>
  );
};

export default SubscribePage;
