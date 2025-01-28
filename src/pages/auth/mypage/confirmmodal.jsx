import React from 'react';
import styled from 'styled-components';

function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalMessage>회원 탈퇴하시겠습니까?</ModalMessage>
        <ButtonGroup>
          <YesButton onClick={onConfirm}>예</YesButton>
          <NoButton onClick={onCancel}>아니오</NoButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ConfirmModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; 

  @media (max-width: 768px) {
    align-items: flex-start; 
    padding-top: 40rem; 
  }

  @media (max-width: 480px) {
    align-items: flex-start; 
    padding-top: 40rem; 
  }
`;

const ModalContainer = styled.div`
  width: 50rem;
  height: 15rem; 
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 3rem; 
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 

  @media (max-width: 768px) {
    width: 40rem;
    height: 13rem;
    padding: 2rem;
  }

  @media (max-width: 480px) {
    width: 40rem;
    height: auto;
    padding: 1.5rem;
  }
`;

const ModalMessage = styled.div`
  font-size: 1.8rem; 
  margin-bottom: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem; 

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const YesButton = styled.button`
  flex: 1;
  margin-right: 0.5rem;
  background-color: #01bcd4;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 0.25rem;
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #00a0bb;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.6rem;
    margin-right: 0;
  }
`;

const NoButton = styled.button`
  flex: 1;
  margin-left: 0.5rem;
  background-color: #eee;
  color: #333;
  border: none;
  padding: 1rem;
  border-radius: 0.25rem;
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #ddd;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.6rem;
    margin-left: 0;
  }
`;
