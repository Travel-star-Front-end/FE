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
  padding: 5rem 7.5rem;
  background-color: #f5f5f5;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 3rem 5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem;
  }
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

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 2.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  color: #555;
`;

const TableHeaderItem = styled.div`
  width: 15rem;
  font-size: 1.75rem;

  &:nth-child(2) {
    flex: 1;
  }
`;

const ListRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 2.5rem;
  margin-bottom: 2.5rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0px 2.5rem 0px #f5f5f5;

 
`;

const Date = styled.div`
  width: 15rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const Title = styled.div`
  flex: 1;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    width: 100%;
  }
`;

const CancelButton = styled.button`
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
