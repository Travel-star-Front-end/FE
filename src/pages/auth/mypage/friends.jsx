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
  padding: 40px 60px;
  background-color: #f5f5f5;
  box-sizing: border-box;
`;

const MainTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
`;

const ListTitle = styled.div`
  font-size: 20px;
  margin-bottom: 16px;
  margin-left: 17px;
`;

const FriendRow = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  border-bottom: 1px solid #ddd;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
`;

const FriendName = styled.div`
  flex: 1;
  font-size: 16px;
  color: #333;
`;

const RemoveButton = styled.button`
  background-color: #d9d9d9;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;
