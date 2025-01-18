import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileImage from '../../../assets/images/ProfileImage.png'; 

function FriendManagement() {
  const [friends, setFriends] = useState([
    { id: 1, name: '두구두구굴근', avatar: ProfileImage },
    { id: 2, name: '여행질주', avatar: ProfileImage },
    { id: 3, name: '조이', avatar: ProfileImage },
    { id: 4, name: '오렌지', avatar: ProfileImage },
    { id: 5, name: '여행복한 사람', avatar: ProfileImage },
    { id: 6, name: '히힝ㅎ히힝 일주', avatar: ProfileImage },
    { id: 7, name: 'Hello.k', avatar: ProfileImage },
  ]);

  const handleRemoveFriend = (id) => {
    setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== id));
  };

  return (
    <Container>
      <MainTitle>친구 관리 {friends.length}</MainTitle>
      <ListTitle>목록</ListTitle>
      {friends.map((friend) => (
        <FriendRow key={friend.id}>
          <Avatar src={friend.avatar} alt={`${friend.name} avatar`} />
          <FriendName>{friend.name}</FriendName>
          <RemoveButton onClick={() => handleRemoveFriend(friend.id)}>친구 삭제</RemoveButton>
        </FriendRow>
      ))}
    </Container>
  );
}

export default FriendManagement;

const Container = styled.div`
  width: 100%;
  padding: 5rem 7.5rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
`;

const MainTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 3.75rem;
  color: #333;
  border-bottom: 0.125rem solid #ddd;
  padding-bottom: 2.5rem;
`;

const ListTitle = styled.div`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  margin-left: 2.125rem;
`;

const FriendRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 2.5rem;
  margin-bottom: 2.5rem;
  border-radius: 0.5rem;
  border-bottom: 0.125rem solid #ddd;
`;

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-right: 2.5rem;
`;

const FriendName = styled.div`
  flex: 1;
  font-size: 2rem;
  color: #333;
`;

const RemoveButton = styled.button`
  background-color: #d9d9d9;
  border: 0.125rem solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.5rem 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    align-self: flex-start;
  }
`;
