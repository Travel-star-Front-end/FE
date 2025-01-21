import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../../../apis/axios'; 

function ArchivedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchArchivedPosts();
  }, []);

  const fetchArchivedPosts = async () => {
    try {
      const response = await API.get('https://jsonplaceholder.typicode.com/posts?_limit=4');
      const data = response.data;

      //JSONPlaceholder에 date 필드가 없어서, 일단 임의로 날짜를 넣었습니다.
      const mappedPosts = data.map((post) => ({
        id: post.id,
        date: '2025.01.20', 
        title: post.title,
      }));

      setPosts(mappedPosts);
    } catch (error) {
      console.error('Error fetching archived posts:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await API.delete(`https://jsonplaceholder.typicode.com/posts/1`);
      // 요청 성공하면 로컬 상태에서 해당 항목을 제거합니다.
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error removing post:', error);
    }
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
          <CancelButton onClick={() => handleCancel(post.id)}>
            보관 취소
          </CancelButton>
        </ListRow>
      ))}
    </Container>
  );
}

export default ArchivedPosts;

const Container = styled.div`
  width: 100%;
  padding: 5rem 7.5rem;
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
