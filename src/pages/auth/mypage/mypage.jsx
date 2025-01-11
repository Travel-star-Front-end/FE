import React from 'react';
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
          <ProfileEditButton onClick={() => navigate('edit')}>프로필 수정</ProfileEditButton>
        </ProfileSection>

        <InfoSection>
          <ButtonGroup>
            <BlueButton onClick={() => navigate('friends')}>친구관리</BlueButton>
            <BlueButton onClick={() => navigate('posts')}>보관 글 관리</BlueButton>
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
  padding: 40px;
  box-sizing: border-box;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  object-fit: contain;
  margin-right: 20px; 
`;

const ProfileInfo = styled.div`
  flex: 1;
  margin-top: 60px;
`;

const UserNickname = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const UserPlanet = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 10px; 
  align-items: flex-start;
  margin-bottom: 20px;
`;

const BlueButton = styled.button`
  padding: 8px 12px;
  background-color: white;
  color: #00c2ff;
  border: 1px solid #00c2ff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  width: 141px; 
  height: 34px;

  &:hover {
    background-color: #f0fcff;
  }
`;

const ProfileEditButton = styled.button`
  position: absolute;
  top: 75px;
  right: 0;
  padding: 8px 16px;
  background-color: white;
  color: #00c2ff;
  border: 1px solid #00c2ff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  width: 141px;
  height: 34px;

  &:hover {
    background-color: #f0fcff;
  }
`;

const InfoSection = styled.div`
  width: 100%;
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 19px 0;
  max-width: 600px; 
  margin: 0 auto; 
  border-bottom: 1px solid #ddd;
  position: relative;
  top: -50px; 
`;

const InfoLabel = styled.div`
  width: 150px; 
  color: #565656;
  font-size: 14px;
  text-align: left;
`;

const InfoValue = styled.div`
  font-size: 14px;
  color: #999;
  text-align: left;
  padding-left: 180px;
  flex: 1; 
`;
