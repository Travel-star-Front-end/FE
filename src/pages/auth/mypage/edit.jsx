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

  const handleNavigate = (path) => {
    navigate(`/mypage/${path}`); // 절대 경로로 이동
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
          <ProfileEditButton onClick={() => handleNavigate('edit')}>프로필 수정</ProfileEditButton>
        </ProfileSection>

        <InfoSection>
          <ButtonGroup>
            <BlueButton onClick={() => handleNavigate('friends')}>친구관리</BlueButton>
            <BlueButton onClick={() => handleNavigate('posts')}>보관 글 관리</BlueButton>
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

// 스타일 컴포넌트 생략 (기존 코드 그대로 유지)

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

const WideInput = styled.input`
  width: 46.625rem; 
  height: 4.5rem;
  color: #565656;   
  font-size: 1.75rem;
  border: 0.125rem solid #ADADAD;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }

  @media (max-width: 768px) {
    width: 50%;
    font-size: 1.5rem;
    height: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    height: 3.5rem;
  }
`;

const ShortInput = styled.input`
  width: 19.75rem; 
  height: 4.5rem;
  font-size: 1.75rem;
  color: #565656;
  border: 0.125rem solid #ADADAD;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
    height: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    height: 3.5rem;
  }
`;

const InfoInput = styled.input`
  width: 10.75rem;
  height: 4.5rem;
  font-size: 1.75rem;
  color: #565656;
  border: 0.125rem solid #ADADAD;
  border-radius: 0.5rem;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
    height: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    height: 3.5rem;
  }
`;

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  span {
    color: #999;
    font-size: 1.75rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  span {
    color: #999;
    font-size: 1.75rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }
`;

const EmailInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  span {
    color: #999;
    font-size: 1.75rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }
`;
