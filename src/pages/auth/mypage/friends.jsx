import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileImage from '../../../assets/images/ProfileImage.png';
import { API } from '../../../apis/axios'; 

function FriendManagement() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }
    fetchFriends(token);
  }, []);

  const fetchFriends = async (accessToken) => {
    try {
      console.log("Fetching friends with token:", accessToken);
      
      const response = await API.get('/friends/list', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { resultType, data } = response.data;

      if (resultType === 'success') {
        setFriends(
          data.map((friend) => ({
            id: friend.requestId,
            name: friend.friendNickname,
            avatar: friend.friendImage || ProfileImage,
            requestedAt: friend.requestedAt,
          }))
        );
      } else {
        setFriends([]);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleRemoveFriend = async (requestId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }

    try {
      console.log("Removing friend with requestId:", requestId, "token:", token);
      
      const response = await API.delete(`/friends/request/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.resultType === 'success') {
        setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== requestId));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.warn('존재하지 않는 친구 관계입니다.', error.response.data);
        } else if (error.response.status === 500) {
          console.error('서버 에러가 발생하였습니다.', error.response.data);
        }
      } else {
        console.error('Error removing friend:', error);
      }
    }
  };

  return (
    <Container>
      <MainTitle>친구 관리 {friends.length}</MainTitle>
      <ListTitle>목록</ListTitle>
      {friends.length === 0 ? (
        <NoFriendsMsg>친구 목록이 없습니다.</NoFriendsMsg>
      ) : (
        friends.map((friend) => (
          <FriendRow key={friend.id}>
            <Avatar src={friend.avatar} alt={`${friend.name} avatar`} />
            <FriendName>{friend.name}</FriendName>
            <RemoveButton onClick={() => handleRemoveFriend(friend.id)}>
              친구 삭제
            </RemoveButton>
          </FriendRow>
        ))
      )}
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const NoFriendsMsg = styled.div`
  font-size: 1.8rem;
  color: #888;
  margin-left: 2.125rem;
`;
