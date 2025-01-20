import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileImage from '../../../assets/images/ProfileImage.png';
import { API } from '../../../apis/axios'; 

function FriendManagement() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await API.get('https://jsonplaceholder.typicode.com/users?_limit=7'); 
      
      const data = response.data;
      const mappedFriends = data.map((user) => ({
        id: user.id,
        name: user.name,
        avatar: ProfileImage, 
      }));

      setFriends(mappedFriends);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleRemoveFriend = async (id) => {
    try {
      //  DELETE 요청. 실제로는 반영되지 않는 Mock API입니다.
      await API.delete(`https://jsonplaceholder.typicode.com/users/1/`);

      // 삭제 요청 성공 시, 로컬 state에서도 제거합니다.
      setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== id));
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  return (
    <Container>
      <MainTitle>친구 관리 {friends.length}</MainTitle>
      <ListTitle>목록</ListTitle>
      {friends.map((friend) => (
        <FriendRow key={friend.id}>
          <Avatar src={friend.avatar} alt={`${friend.name} avatar`} />
          <FriendName>{friend.name}</FriendName>
          <RemoveButton onClick={() => handleRemoveFriend(friend.id)}>
            친구 삭제
          </RemoveButton>
        </FriendRow>
      ))}
    </Container>
  );
}

export default FriendManagement;

const Container = styled.div`
  width: 100%;
  padding: 5rem 7.5rem;
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
  font-size: 1.6rem;

  &:hover {
    background-color: #ddd;
  }
`;
