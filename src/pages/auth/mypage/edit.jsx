import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Profile from '../../../assets/images/ProfileImage.png';
import ProfileEditIcon from '../../../assets/images/ProfileEdit.png';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../apis/axios';

const Edit = ({
  userId = 'BBbbe.1',
  nickname = '벨라',
  password = '******',
  name = '김은수',
  birth = '2003-02-14',
  phoneNumber = '010-5479-8234',
  email = 'yoonsu0214@naver.com',
  planetName = '깐따삐야 행성',
}) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(Profile);
  const fileInputRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await API.get('https://jsonplaceholder.typicode.com/users/1');
      const userData = response.data;
      
      setFormValues({
        userId: userData.username || userId,
        nickname: userData.name || nickname,
        password: password,
        name: userData.name || name,
        birthYear: birth.split('-')[0],
        birthMonth: birth.split('-')[1],
        birthDay: birth.split('-')[2],
        phonePart1: userData.phone ? userData.phone.split('-')[0] : phoneNumber.split('-')[0],
        phonePart2: userData.phone ? userData.phone.split('-')[1] : phoneNumber.split('-')[1],
        phonePart3: userData.phone ? userData.phone.split('-')[2] : phoneNumber.split('-')[2],
        emailUser: userData.email ? userData.email.split('@')[0] : email.split('@')[0],
        emailDomain: userData.email ? userData.email.split('@')[1] : email.split('@')[1],
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setProfileImage(fileUrl);
    setIsMenuOpen(false);
  };

  const handlePhotoRegister = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoDelete = () => {
    setProfileImage(Profile);
    setIsMenuOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleProfileEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      try {
        const updatedUserData = {
          username: formValues.userId,
          name: formValues.name,
          phone: `${formValues.phonePart1}-${formValues.phonePart2}-${formValues.phonePart3}`,
          email: `${formValues.emailUser}@${formValues.emailDomain}`,
        };

        const response = await API.patch('https://jsonplaceholder.typicode.com/users/1', updatedUserData);
        console.log('User data updated:', response.data);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  return (
    <Container>
      <MainContent>
        <Header>마이페이지</Header>

        <ProfileSection>
          <ProfileImageWrapper>
            <ProfileImage src={profileImage} alt="Profile" />
            <CameraIcon src={ProfileEditIcon} onClick={toggleMenu} />
            {isMenuOpen && (
              <CameraMenu>
                <CameraMenuItem onClick={handlePhotoRegister}>
                  사진 등록
                </CameraMenuItem>
                <CameraMenuItemDelete onClick={handlePhotoDelete}>
                  사진 삭제
                </CameraMenuItemDelete>
              </CameraMenu>
            )}
            <HiddenFileInput
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </ProfileImageWrapper>

          <ProfileInfo>
            <UserNickname>{formValues.nickname}</UserNickname>
            <UserPlanet>{planetName}</UserPlanet>
          </ProfileInfo>

          <ProfileEditButton onClick={handleProfileEdit}>
            {isEditing ? '수정 완료' : '프로필 수정'}
          </ProfileEditButton>
        </ProfileSection>

        <InfoSection>
          <InfoRow>
            <InfoLabel>아이디</InfoLabel>
            <WideInput
              type="text"
              name="userId"
              value={formValues.userId}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>닉네임</InfoLabel>
            <WideInput
              type="text"
              name="nickname"
              value={formValues.nickname}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>비밀번호</InfoLabel>
            <WideInput
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>이름</InfoLabel>
            <WideInput
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </InfoRow>
          <InfoRow>
            <InfoLabel>생년월일</InfoLabel>
            <DateInputWrapper>
              <InfoInput
                type="text"
                name="birthYear"
                value={formValues.birthYear}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <span>년</span>
              <InfoInput
                type="text"
                name="birthMonth"
                value={formValues.birthMonth}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <span>월</span>
              <InfoInput
                type="text"
                name="birthDay"
                value={formValues.birthDay}
                onChange={handleChange}
                disabled={!isEditing}
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
                value={formValues.phonePart1}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <span>-</span>
              <InfoInput
                type="text"
                name="phonePart2"
                value={formValues.phonePart2}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <span>-</span>
              <InfoInput
                type="text"
                name="phonePart3"
                value={formValues.phonePart3}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </PhoneInputWrapper>
          </InfoRow>
          <InfoRow>
            <InfoLabel>이메일</InfoLabel>
            <EmailInputWrapper>
              <ShortInput
                type="text"
                name="emailUser"
                value={formValues.emailUser}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <span>@</span>
              <ShortInput
                type="text"
                name="emailDomain"
                value={formValues.emailDomain}
                onChange={handleChange}
                disabled={!isEditing}
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
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 5rem;
  box-sizing: border-box;
`;

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 3.75rem;
  color: #333;
  border-bottom: 0.125rem solid #D9D9D9;
  padding-bottom: 2.5rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.75rem;
  position: relative;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  margin-right: 2.5rem;
`;

const ProfileImage = styled.img`
  width: 16.25rem;
  height: 16.25rem;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #D0D0D0;
`;

const CameraIcon = styled.img`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

const CameraMenu = styled.div`
  position: absolute;
  width: 13rem;
  bottom: -7.8rem; 
  right: -8rem;
  background: #CDCDCD;
  border: 1px solid #D9D9D9;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CameraMenuItem = styled.div`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  font-weight: bold;
`;

const CameraMenuItemDelete = styled(CameraMenuItem)`
  color: #ff4444;
  border-top: 1px solid #D9D9D9;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileInfo = styled.div`
  flex: 1;
  margin-top: 7.5rem;
`;

const UserNickname = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.625rem;
  color: #333;
`;

const UserPlanet = styled.div`
  font-size: 1.75rem;
  color: #777;
  margin-bottom: 1.25rem;
`;

const ProfileEditButton = styled.button`
  position: absolute;
  top: 9.375rem;
  right: 0;
  padding: 1rem 2rem;
  background-color: #01BCD4;
  color: white;
  border: 0.125rem solid #01BCD4;
  border-radius: 0.5rem;
  font-size: 1.75rem;
  cursor: pointer;
  width: 17.625rem;
  height: 4.25rem;

  
`;

const InfoSection = styled.div`
  width: 100%;
  border-top: 0.125rem solid #ddd;
  padding-top: 10rem;
  padding-right: 4rem;
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
`;

const InfoLabel = styled.div`
  width: 18.75rem;
  color: #565656;
  font-size: 1.75rem;
  text-align: left;
`;

const WideInput = styled.input`
  width: 46.625rem;
  height: 4.5rem;
  color: #565656;
  font-size: 1.75rem;
  border: 0.125rem solid #adadad;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }
`;

const InfoInput = styled.input`
  width: 10.75rem;
  height: 4.5rem;
  font-size: 1.75rem;
  color: #565656;
  border: 0.125rem solid #adadad;
  border-radius: 0.5rem;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }
`;

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  span {
    color: #999;
    font-size: 1.75rem;
  }
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  span {
    color: #999;
    font-size: 1.75rem;
  }
`;

const EmailInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  span {
    color: #999;
    font-size: 1.75rem;
  }
`;

const ShortInput = styled.input`
  width: 19.75rem;
  height: 4.5rem;
  font-size: 1.75rem;
  color: #565656;
  border: 0.125rem solid #adadad;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }
`;
