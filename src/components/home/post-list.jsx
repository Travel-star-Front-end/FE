import styled from "styled-components";
import TravelPost from "../posts/posts/travelPost/travel-post";
import useFetch from "../../hooks/useFetch";

const PostList = ({text}) => {
    const { data: posts, loading: postsLoading, error: postsError } = useFetch(`/home`);

    return (
        <div>
            <Text>{text}</Text>
            <PostWrapper>
            {posts?.data.posts.length > 0 ? (
                <>
                {posts?.data.posts.map((post) => (
                    <TravelPost 
                        key={post.post_id}
                        postId={post.post_id}
                        postUserId={post.user_id}
                        profileImg={post.user.profileImg}
                        nickname={post.user.nickname}
                        date={post.created_at}
                        location={post.star.region}
                        images={post.images}                                
                        title={post.title}
                        isFriend={post.isFriend}
                        buttonType='friend'
                    />
                ))}                        
                </>
                ) : (
                    <NothingText>추천 게시글이 없습니다.</NothingText>
                )}
            </PostWrapper>
        </div>
    );
}

export default PostList;

const Text = styled.div`
    margin-top: 9vw;
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

const NothingText = styled.div`
    margin-top: 2.75vw;
    font-weight: 400;
    font-size: 1vw;
    color: rgba(85, 85, 85, 0.5);
`;