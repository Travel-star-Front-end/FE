import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileImage from '../../../assets/images/ProfileImage.png';
import { API } from '../../../apis/axios'; 
import useFetch from "../../../hooks/useFetch";

function FriendManagement() {
  const [friends, setFriends] = useState([]);
  const { data } = useFetch("/friends/list"); 

  useEffect(() => {
    if (data?.data) {
      console.log(data.data);
      setFriends(data.data);
    }
  }, [data]);
  
  const handleRemoveFriend = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }

    try {
      // console.log("id", id);
      const response = await API.delete(`/friends/request/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("친구 목록에서 삭제 되었습니다.")
    } catch (error) {
      console.log("err", error);
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
          <FriendRow id={friend.requestId}>
            <Avatar src={friend.friendImage.file_name} alt={`${friend.name} avatar`} />
            <FriendName>{friend.friendNickname}</FriendName>
            <RemoveButton onClick={() => handleRemoveFriend(friend.requestId)}>
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
