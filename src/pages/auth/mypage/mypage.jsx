import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Profile from '../../../assets/images/ProfileImage.png';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../apis/axios';
import ConfirmModal from './confirmmodal';
import useFetch from "../../../hooks/useFetch";

const formatDate = (dateString) => {
  if (!dateString) return '';
  return dateString.split('T')[0];
};

const MyPage = () => {
  const navigate = useNavigate();
  const [planetName, setPlanetName] = useState("");
  const [profileImage, setProfileImage] = useState(Profile);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);

  const { data: planetData } = useFetch("/planet");
  const { data: userData } = useFetch("/mypage");
  const { data: profileData } = useFetch("/profile-image");

  useEffect(() => {
    if (planetData && planetData.planet_name) {
      setPlanetName(planetData.planet_name);
    }
  }, [planetData]);

  useEffect(() => {
    setProfileImage(profileData?.data);
  }, [profileData]);

  const handleClick = (path) => {
    const absolutePath = `/mypage/${path}`;
    if (clickedButton === absolutePath) return;
    setClickedButton(absolutePath);
    navigate(absolutePath);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLoggedIn');
      alert("로그아웃이 완료 되었습니다.");
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const onDeleteClick = () => {
    setShowDeleteModal(true);
  };
 
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await API.delete('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log('회원탈퇴 요청 응답:', response);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLoggedIn');
      alert("회원탈퇴가 완료 되었습니다.");
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const maskPassword = (password) => {
    return password ? '*'.repeat(password.length) : '';
  };

  return (
    <Container>
      {showDeleteModal && (
        <ConfirmModal 
          onConfirm={handleDeleteAccount} 
          onCancel={handleCancelDelete} 
        />
      )}
      <MainContent>
        <Header>마이페이지</Header>
        <ProfileSection>
          <ProfileImage src={profileData?.data || Profile} alt="Profile" />
          <ProfileInfo>
            <UserNickname>{userData?.data?.nickname}</UserNickname>
            <UserPlanet>
              {planetName || '행성 이름 미지정'} 행성
            </UserPlanet>
          </ProfileInfo>
          <ProfileEditButton
            onClick={() => handleClick('edit')}
            disabled={clickedButton === '/mypage/edit'}
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
            <BlueButton onClick={handleLogout}>
              로그아웃
            </BlueButton>
            <BlueButton onClick={onDeleteClick}>
              회원탈퇴
            </BlueButton>
          </ButtonGroup>
          <InfoDetails>
            <InfoRow>
              <InfoLabel>아이디</InfoLabel>
              <InfoValue>{userData?.data?.user_id}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>닉네임</InfoLabel>
              <InfoValue>{userData?.data?.nickname}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>비밀번호</InfoLabel>
              <InfoValue>{maskPassword(userData?.data?.password)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>{userData?.data?.name}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>생년월일</InfoLabel>
              <InfoValue>{formatDate(userData?.data?.birth)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>전화번호</InfoLabel>
              <InfoValue>{userData?.data?.phonenum}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>이메일</InfoLabel>
              <InfoValue>{userData?.data?.email}</InfoValue>
            </InfoRow>
          </InfoDetails>
        </InfoSection>
      </MainContent>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
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
  object-fit: cover;
  margin-right: 2.5rem;
  border-radius: 50%;
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

const ProfileEditButton = styled.button`
  position: absolute;
  top: 9.375rem;
  right: 0;
  padding: 1rem 2rem;
  background-color: white;
  color: #01bcd4;
  border: 0.125rem solid #01bcd4;
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
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
  width: 100%;
  border-top: 0.125rem solid #ddd;
  padding-top: 2.5rem;
  @media (max-width: 768px) {
    gap: 8rem;
    padding-top: 2rem;
  }
  @media (max-width: 480px) {
    padding-top: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: flex-start;
  flex: 1;
  margin-bottom: 2.5rem;
  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 2rem;
  }
  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const BlueButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: white;
  color: #01bcd4;
  border: 0.125rem solid #01bcd4;
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

const InfoDetails = styled.div`
  flex: 2;
  padding-right: 40rem;
  padding-top: 4rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 2.375rem 0;
  max-width: 75rem;
  border-bottom: 0.125rem solid #ddd;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 0;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 768px) {
    padding-left: 0;
    font-size: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;
