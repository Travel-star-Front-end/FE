import React, { useState } from 'react';
import styled from 'styled-components';

function ArchivedPosts() {
  const [posts, setPosts] = useState([
    { id: 1, date: '2019.03.24', title: '낭만적인 야경의 부다페스트,,,' },
    { id: 2, date: '2019.08.22', title: '알마 리조트에서 보내는 여름 ~!!!' },
    { id: 3, date: '2022.07.01', title: '교환중 떠나는 파리여행' },
    { id: 4, date: '2023.02.14', title: '드디어 먹는 정통피자 --이탈리이이야' },
  ]);

  const handleCancel = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <Container>
      <MainTitle>보관 글 관리</MainTitle>
      <ListTitle>목록</ListTitle>
      <TableHeader>
        <TableHeaderItem>날짜</TableHeaderItem>
        <TableHeaderItem>제목</TableHeaderItem>
      </TableHeader>
      {posts.map((post) => (
        <ListRow key={post.id}>
          <Date>{post.date}</Date>
          <Title>{post.title}</Title>
          <CancelButton onClick={() => handleCancel(post.id)}>보관 취소</CancelButton>
        </ListRow>
      ))}
    </Container>
  );
}

export default ArchivedPosts;

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

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 20px;
  border-radius: 4px;
  font-weight: bold;
  color: #555;
`;

const TableHeaderItem = styled.div`
  width: 120px;
  font-size: 14px;
  &:nth-child(2) {
    flex: 1;
  }
`;

const ListRow = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 20px 0px #f5f5f5;
`;

const Date = styled.div`
  width: 120px;
  color: #555;
`;

const Title = styled.div`
  flex: 1;
  color: #333;
`;

const CancelButton = styled.button`
  background-color: #d9d9d9;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;
