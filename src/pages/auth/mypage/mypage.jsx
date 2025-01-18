import React, { useState } from 'react';
import styled from 'styled-components';
import Profile from '../../../assets/images/ProfileImage.png';
import { useNavigate } from "react-router-dom";

const MyPage = ({ 
  userId = 'BBbbe.1', 
  nickname = '벨라', 
  password = '******', 
  name = '김은수', 
  birth = '2003년 02월 14일', 
  phoneNumber = '010-5479-8234', 
  email = 'yoonsu0214@naver.com',
  planetName = '깐따삐야 행성' 
}) => {
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState(null); // 클릭된 버튼 상태 관리

  const handleClick = (path) => {
    const absolutePath = `/mypage/${path}`; // 절대 경로로 설정
    if (clickedButton === absolutePath) return; // 중복 이동 방지
    setClickedButton(absolutePath); // 클릭된 버튼 상태 업데이트
    navigate(absolutePath);
  };

  return (
    <Container>
      <MainContent>
        <Header>마이페이지</Header>

        <ProfileSection>
          <ProfileImage src={Profile} alt="Profile" />
          <ProfileInfo>
            <UserNickname>{nickname}</UserNickname>
            <UserPlanet>{planetName}</UserPlanet>
          </ProfileInfo>
          <ProfileEditButton 
            onClick={() => handleClick('edit')} 
            disabled={clickedButton === '/mypage/edit'} // 버튼 비활성화 처리
          >
            프로필 수정
          </ProfileEditButton>
        </ProfileSection>

        <InfoSection>
          <ButtonGroup>
            <BlueButton 
              onClick={() => handleClick('friends')} 
              disabled={clickedButton === '/mypage/friends'}
            >
              친구관리
            </BlueButton>
            <BlueButton 
              onClick={() => handleClick('posts')} 
              disabled={clickedButton === '/mypage/posts'}
            >
              보관 글 관리
            </BlueButton>
          </ButtonGroup>
          <InfoRow>
            <InfoLabel>아이디</InfoLabel>
            <InfoValue>{userId}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>닉네임</InfoLabel>
            <InfoValue>{nickname}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>비밀번호</InfoLabel>
            <InfoValue>{password}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>이름</InfoLabel>
            <InfoValue>{name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>생년월일</InfoLabel>
            <InfoValue>{birth}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>전화번호</InfoLabel>
            <InfoValue>{phoneNumber}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>이메일</InfoLabel>
            <InfoValue>{email}</InfoValue>
          </InfoRow>
        </InfoSection>
      </MainContent>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F5F5F5;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 5rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 3rem;
  }

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 3.75rem;
  color: #333;
  border-bottom: 0.125rem solid #ddd;
  padding-bottom: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.75rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 3rem;
  }
`;

const ProfileImage = styled.img`
  width: 16.25rem;
  height: 16.25rem;
  object-fit: contain;
  margin-right: 2.5rem; 

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  margin-top: 7.5rem;

  @media (max-width: 768px) {
    margin-top: 0;
    text-align: center;
  }
`;

const UserNickname = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.625rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const UserPlanet = styled.div`
  font-size: 1.75rem;
  color: #777;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 1.25rem; 
  align-items: flex-start;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const BlueButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: white;
  color: #00c2ff;
  border: 0.125rem solid #00c2ff;
  border-radius: 0.5rem;
  font-size: 1.75rem;
  cursor: pointer;
  width: 17.625rem; 
  height: 4.25rem;

  &:hover {
    background-color: #f0fcff;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    width: 15rem;
    height: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    width: 13rem;
    height: 3.5rem;
  }
`;

const ProfileEditButton = styled.button`
  position: absolute;
  top: 9.375rem;
  right: 0;
  padding: 1rem 2rem;
  background-color: white;
  color: #00c2ff;
  border: 0.125rem solid #00c2ff;
  border-radius: 0.5rem;
  font-size: 1.75rem;
  cursor: pointer;
  width: 17.625rem;
  height: 4.25rem;

  &:hover {
    background-color: #f0fcff;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    width: 15rem;
    height: 4rem;
    top: 1rem;
    position: static;
    align-self: center;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    width: 13rem;
    height: 3.5rem;
  }
`;

const InfoSection = styled.div`
  width: 100%;
  border-top: 0.125rem solid #ddd;
  padding-top: 2.5rem;

  @media (max-width: 768px) {
    padding-top: 2rem;
  }

  @media (max-width: 480px) {
    padding-top: 1.5rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 2.375rem 0;
  max-width: 75rem; 
  margin: 0 auto; 
  border-bottom: 0.125rem solid #ddd;
  position: relative;
  top: -6.25rem; 

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 0;
    top: 0;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0;
  }
`;

const InfoLabel = styled.div`
  width: 18.75rem; 
  color: #565656;
  font-size: 1.75rem;
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const InfoValue = styled.div`
  font-size: 1.75rem;
  color: #999;
  text-align: left;
  padding-left: 22.5rem;
  flex: 1; 

  @media (max-width: 768px) {
    padding-left: 0;
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;
