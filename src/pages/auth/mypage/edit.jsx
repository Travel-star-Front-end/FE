import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Profile from '../../../assets/images/ProfileImage.png';
import ProfileEditIcon from '../../../assets/images/ProfileEdit.png';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../apis/axios';

const Edit = ({
  userId = 'BBbbe.1',
  nickname = '벨라',
  password = 'mySecret1',
  name = '김은수',
  birth = '2003-02-14',
  phoneNumber = '010-5479-8234',
  email = 'yoonsu0214@naver.com',
  planetName = '깐따삐야 행성',
}) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
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

  const [formValues, setFormValues] = useState({ ...userData });
  const [profileImage, setProfileImage] = useState(Profile);
  const fileInputRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [planetNameState, setPlanetNameState] = useState(planetName);
  const [isEditing, setIsEditing] = useState(true);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [serverCode, setServerCode] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const maskPassword = (pwd) => {
    return pwd ? '*'.repeat(pwd.length) : '';
  };

  useEffect(() => {
    fetchUserData();
    fetchPlanetName();
    fetchProfileImage();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await API.get('/mypage', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userDataFromApi = response.data.data;
      const phoneParts = userDataFromApi.phonenum
        ? userDataFromApi.phonenum.split('-')
        : userData.phonenum?.split('-') || [];
      const emailParts = userDataFromApi.email
        ? userDataFromApi.email.split('@')
        : userData.email.split('@');
      const birthParts = userDataFromApi.birth
        ? userDataFromApi.birth.split('T')[0].split('-')
        : [userData.birthYear, userData.birthMonth, userData.birthDay];

      const newUserData = {
        userId: userDataFromApi.user_id || userId,
        nickname: userDataFromApi.nickname || nickname,
        password: userDataFromApi.password || userData.password,
        name: userDataFromApi.name || name,
        birthYear: birthParts[0],
        birthMonth: birthParts[1],
        birthDay: birthParts[2],
        phonePart1: phoneParts[0] || '',
        phonePart2: phoneParts[1] || '',
        phonePart3: phoneParts[2] || '',
        emailUser: emailParts[0] || '',
        emailDomain: emailParts[1] || '',
      };

      setUserData(newUserData);
      setFormValues(newUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchPlanetName = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await API.get('/planet', {
        params: { user_id: formValues.userId },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data.planet_name) {
        setPlanetNameState(response.data.planet_name);
      } else {
        setPlanetNameState('행성 이름 미지정');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setPlanetNameState('행성 이름 미지정');
      } else {
        console.error('행성 이름 조회 중 오류 발생:', error);
      }
    }
  };

  const fetchProfileImage = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await API.get('/profile-image', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data.data) {
        setProfileImage(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setProfileImage(Profile);
      } else {
        console.error('프로필 사진 조회 중 오류 발생:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    if (isUploading) return;
    setIsUploading(true);
    const file = e.target.files?.[0];
    if (!file) {
      setIsUploading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('images', file);
      const token = localStorage.getItem('accessToken');
      const response = await API.patch('/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data.fileUrl) {
        setProfileImage(response.data.fileUrl);
      }
      setIsMenuOpen(false);
    } catch (error) {
      console.error('프로필 사진 업로드 중 오류 발생:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoRegister = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoDelete = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await API.delete('/profile-image', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setProfileImage(Profile);
      }
      setIsMenuOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('프로필 사진 삭제 중 오류 발생:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleProfileEdit = async () => {
    try {
      if (isCodeVerified) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formValues.password)) {
          alert(
            '새 비밀번호는 8자리 이상이며 대소문자를 모두 포함해야 합니다.'
          );
          return;
        }
        if (formValues.password !== confirmPassword) {
          alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
          return;
        }
        const resetPayload = {
          user_id: formValues.userId,
          email: formValues.emailUser + '@' + formValues.emailDomain,
          newPassword: formValues.password,
          confirmPassword: confirmPassword,
        };
        const resetResponse = await API.post('/reset-pw', resetPayload);
        console.log('Password reset successful:', resetResponse.data);
      } else {
        const updatePayload = {
          nickname: formValues.nickname,
          name: formValues.name,
          password: formValues.nickname,
          birth:
            formValues.birthYear +
            '-' +
            formValues.birthMonth +
            '-' +
            formValues.birthDay,
          phonenum:
            formValues.phonePart1 +
            '-' +
            formValues.phonePart2 +
            '-' +
            formValues.phonePart3,
          email: formValues.emailUser + '@' + formValues.emailDomain,
        };

        const token = localStorage.getItem('accessToken');
        const response = await API.patch('/mypage', updatePayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('User data updated:', response.data);
        setUserData(formValues);
      }
      setTimeout(() => {
        window.location.reload();
      }, 100);
      navigate('/mypage');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // 인증번호 발송 함수
  const handleSendCode = async () => {
    try {
      const emailFull = formValues.emailUser + '@' + formValues.emailDomain;
      const accessToken = localStorage.getItem('accessToken');

      const response = await API.post(
        '/email',
        { email: emailFull },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setServerCode(response.data.authCode);
      setIsCodeSent(true);
      alert('인증번호가 발송되었습니다.');
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('인증번호 발송에 실패했습니다.');
    }
  };

  // 인증번호 확인 함수
  const handleVerifyCode = () => {
    if (verificationCode === serverCode) {
      setIsCodeVerified(true);
      setFormValues((prev) => ({ ...prev, password: '' }));
      setConfirmPassword('');
      setVerificationCode('');
      alert('인증이 완료되었습니다. 새 비밀번호를 입력해 주세요.');
    } else {
      alert('인증번호가 올바르지 않습니다.');
    }
  };

  const handleNewPasswordChange = (e) => {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      password: value,
    }));

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(value)) {
      setNewPasswordError('8자리 이상이며, 대소문자를 모두 포함해야 합니다.');
    } else {
      setNewPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);

    if (value.length === 0) {
      setConfirmPasswordError('');
      return;
    }

    if (formValues.password === value) {
      setConfirmPasswordError('비밀번호가 일치합니다.');
    } else {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
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
            <UserNickname>{userData.nickname}</UserNickname>
            <UserPlanet>{planetNameState}</UserPlanet>
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
              // 아이디는 항상 수정 불가능하도록
              disabled={true}
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
            <InfoLabel>{isCodeVerified ? '새 비밀번호' : '비밀번호'}</InfoLabel>
            <WideInput
              type={isCodeVerified ? 'password' : 'text'}
              name="password"
              value={
                isCodeVerified
                  ? formValues.password
                  : maskPassword(formValues.password)
              }
              // 인증이 완료되어 새 비밀번호 입력 상태가 되기 전에는 수정 불가능하게
              onChange={isCodeVerified ? handleNewPasswordChange : undefined}
              disabled={!isEditing || !isCodeVerified}
            />
            {isCodeVerified && newPasswordError && (
              <ErrorMessage>{newPasswordError}</ErrorMessage>
            )}
            {!isCodeVerified && (
              <SameWidthButton onClick={handleSendCode} disabled={!isEditing}>
                인증번호 발송
              </SameWidthButton>
            )}
          </InfoRow>

          <InfoRow>
            <InfoLabel>
              {isCodeVerified ? '비밀번호 확인' : '인증번호'}
            </InfoLabel>
            {!isCodeVerified ? (
              <WideInput
                type="text"
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={!isEditing}
              />
            ) : (
              <WideInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                disabled={!isEditing}
                style={{
                  borderColor:
                    confirmPasswordError === '비밀번호가 일치합니다.'
                      ? 'green'
                      : confirmPasswordError === '비밀번호가 일치하지 않습니다.'
                      ? 'red'
                      : '#adadad',
                }}
              />
            )}
            {isCodeVerified && confirmPasswordError && (
              <ConfirmPasswordMessage
                $isMatch={confirmPasswordError === '비밀번호가 일치합니다.'}
              >
                {confirmPasswordError}
              </ConfirmPasswordMessage>
            )}
            {!isCodeVerified && (
              <SameWidthButton
                onClick={handleVerifyCode}
                disabled={!isEditing || !isCodeSent}
              >
                인증하기
              </SameWidthButton>
            )}
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
  border-bottom: 0.125rem solid #d9d9d9;
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
  border: 1px solid #d0d0d0;
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
  background: #cdcdcd;
  border: 1px solid #d9d9d9;
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
  border-top: 0.125rem solid #d9d9d9;
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
  background-color: #01bcd4;
  color: white;
  border: 0.125rem solid #01bcd4;
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
  gap: 1rem;
`;

const InfoLabel = styled.div`
  width: 18.75rem;
  color: #565656;
  font-size: 1.75rem;
  text-align: left;
`;

const WideInput = styled.input`
  flex: 1;
  width: calc(46.625rem - 14rem - 1rem);
  height: 4.5rem;
  color: #565656;
  font-size: 1.75rem;
  border: 0.125rem solid #adadad;
  border-radius: 0.5rem;
  padding: 0 1rem;

  &:focus {
    outline: none;
    border-color: #00c2ff;
  }
`;

const SameWidthButton = styled.button`
  width: 13rem;
  height: 4.5rem;
  font-size: 1.6rem;
  cursor: pointer;
  background-color: white;
  color: #01bcd4;
  border: 0.125rem solid #01bcd4;
  border-radius: 0.5rem;
  flex-shrink: 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.4rem;
  margin-top: 7rem;
  margin-left: 20rem;
  position: absolute;
`;

const ConfirmPasswordMessage = styled.div`
  font-size: 1.4rem;
  position: absolute;
  top: 7rem;
  left: 20rem;
  color: ${({ $isMatch }) => ($isMatch ? 'green' : 'red')};
`;
