import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../../../apis/axios';

function ArchivedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchArchivedPosts();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const fetchArchivedPosts = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('토큰이 존재하지 않습니다.');
        setPosts([]);
        return;
      }
      const response = await API.get('/mypage/storaged-posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = response.data;
      
      if (result.resultType === 'success' && result.data) {
        const postsData = Array.isArray(result.data) ? result.data : [result.data];

        const mappedPosts = postsData.map((post) => ({
          id: post.post_id,
          date: formatDate(post.created_at),
          title: post.title,
        }));

        setPosts(mappedPosts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching archived posts:', error);
      setPosts([]);
    }
  };

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('토큰이 존재하지 않습니다.');
        return;
      }
      await API.patch(`/mypage/storaged-posts/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

      {posts.length === 0 ? (
        <NoPostsMessage>보관 중인 글이 없습니다.</NoPostsMessage>
      ) : (
        posts.map((post) => (
          <ListRow key={post.id}>
            <Date>{post.date}</Date>
            <Title>{post.title}</Title>
            <CancelButton onClick={() => handleCancel(post.id)}>
              보관 취소
            </CancelButton>
          </ListRow>
        ))
      )}
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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

const NoPostsMessage = styled.div`
  padding: 2rem;
  font-size: 1.75rem;
  color: #777;
  text-align: center;
`;
