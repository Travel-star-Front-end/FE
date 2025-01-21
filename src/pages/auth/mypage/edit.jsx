import React, { useState } from 'react';
import styled from 'styled-components';
import Profile from '../../../assets/images/ProfileImage.png';
import { useNavigate } from "react-router-dom";

const Edit = ({
  userId = 'BBbbe.1',
  nickname = '벨라',
  password = '******',
  name = '김은수',
  birth = '2003-02-14',
  phoneNumber = '010-5479-8234',
  email = 'yoonsu0214@naver.com',
  planetName = '깐따삐야 행성'
}) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    userId,
    nickname,
    password,
    name,
    birthYear: birth.split('-')[0],
    birthMonth: birth.split('-')[1],
    birthDay: birth.split('-')[2],
    phonePart1: phoneNumber.split('-')[0],
    phonePart2: phoneNumber.split('-')[1],
    phonePart3: phoneNumber.split('-')[2],
    emailUser: email.split('@')[0],
    emailDomain: email.split('@')[1],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Container>
      <MainContent>
        <Header>마이페이지</Header>

        <ProfileSection>
          <ProfileImage src={Profile} alt="Profile" />
          <ProfileInfo>
            <UserNickname>{formValues.nickname}</UserNickname>
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
            <WideInput
              type="text"
              name="userId"
              value={formValues.userId || ''}
              onChange={handleChange}
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>닉네임</InfoLabel>
            <WideInput
              type="text"
              name="nickname"
              value={formValues.nickname || ''}
              onChange={handleChange}
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>비밀번호</InfoLabel>
            <WideInput
              type="password"
              name="password"
              value={formValues.password || ''}
              onChange={handleChange}
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>이름</InfoLabel>
            <WideInput
              type="text"
              name="name"
              value={formValues.name || ''}
              onChange={handleChange}
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>생년월일</InfoLabel>
            <DateInputWrapper>
              <InfoInput
                type="text"
                name="birthYear"
                value={formValues.birthYear || ''}
                onChange={handleChange}
              />
              <span>년</span>
              <InfoInput
                type="text"
                name="birthMonth"
                value={formValues.birthMonth || ''}
                onChange={handleChange}
              />
              <span>월</span>
              <InfoInput
                type="text"
                name="birthDay"
                value={formValues.birthDay || ''}
                onChange={handleChange}
              />
              <span>일</span>
            </DateInputWrapper>
          </InfoRow>
          <InfoRow>
            <InfoLabel>전화번호</InfoLabel>
            <PhoneInputWrapper>
              <InfoInput
                type="text"
                name="phonePart1"
                value={formValues.phonePart1 || ''}
                onChange={handleChange}
              />
              <span>-</span>
              <InfoInput
                type="text"
                name="phonePart2"
                value={formValues.phonePart2 || ''}
                onChange={handleChange}
              />
              <span>-</span>
              <InfoInput
                type="text"
                name="phonePart3"
                value={formValues.phonePart3 || ''}
                onChange={handleChange}
              />
            </PhoneInputWrapper>
          </InfoRow>
          <InfoRow>
            <InfoLabel>이메일</InfoLabel>
            <EmailInputWrapper>
              <ShortInput
                type="text"
                name="emailUser"
                value={formValues.emailUser || ''}
                onChange={handleChange}
              />
              <span>@</span>
              <ShortInput
                type="text"
                name="emailDomain"
                value={formValues.emailDomain || ''}
                onChange={handleChange}
              />
            </EmailInputWrapper>
          </InfoRow>
        </InfoSection>
      </MainContent>
    </Container>
  );
};

export default Edit;

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
  padding: 10px 0;
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

const WideInput = styled.input`
  width: 373px; 
  height: 36px;
  color: #565656;   
  font-size: 14px;
  border: 1px solid #ADADAD;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }
`;

const ShortInput = styled.input`
  width: 158px; 
  height: 36px;
  font-size: 14px;
  color: #565656;
  border: 1px solid #ADADAD;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }
`;

const InfoInput = styled.input`
  width: 86px;
  height: 36px;
  font-size: 14px;
  color: #565656;
  border: 1px solid #ADADAD;
  border-radius: 4px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }
`;

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    color: #999;
    font-size: 14px;
  }
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    color: #999;
    font-size: 14px;
  }
`;

const EmailInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    color: #999;
    font-size: 14px;
  }
`;
