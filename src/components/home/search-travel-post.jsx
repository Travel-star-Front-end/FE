import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import TravelPost from "../posts/posts/travelPost/travel-post";

const SearchTravelPost = ({ searchValue }) => {
    if (!searchValue) return null;
    
    const url =  `/home/search?term=${encodeURIComponent(searchValue)}`
    const { data: posts, loading: searchLoading, error: searchError } = useFetch(url);
    
    if (searchLoading) {
        return <div>로딩 중...</div>;
    }

    if (searchError) {
        return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
    }

    if(posts.data?.length === 0){
        <Container>
            <h3>검색 결과가 없습니다.</h3>
        </Container>
    }

    return (
        <Container>
            <Text>검색 결과</Text>
            <PostWrapper>
                {posts?.data.map((post) => (
                    <TravelPost 
                        key={post.post_id}
                        postId={post.post_id}
                        postUserId={post.user_id}
                        profileImg={post.user.profileImg}
                        nickname={post.user.nickname}
                        date={post.updated_at}
                        location={post.star.region}
                        images={post.images}                                
                        title={post.title}
                        isFriend={post.isFriend}
                        buttonType='friend'
                    />
                ))}
            </PostWrapper>
        </Container>
    );
}

export default SearchTravelPost;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 2.85vw;
    width: 71.15vw;
    height: 100vh;
    box-sizing: border-box;
`;

const Text = styled.div`
    margin-top: 8vw;
    font-weight: 600;
    font-size: 1.2vw;
    color: #555555;
`;

const PostWrapper = styled.div`
    widht: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;