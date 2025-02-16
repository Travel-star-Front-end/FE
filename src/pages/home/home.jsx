import { useState } from 'react';
import * as S from '../../styles/home';
import searchIcon from '../../assets/images/home/search.png';
import TravelPost from '../../components/posts/posts/travelPost/travel-post';
import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';
import SearchTravelPost from '../../components/search/search-travel-post';

const Home = () => {
    const [searchValue, setSearchValue] = useState('');
    const debounceText = useDebounce(searchValue, 500);

    //추천 일지 조회(최신순 10개)
    const { data: posts, loading: postsLoading, error: postsError } = useFetch(`/home`);
    //검색
    const { data: searchItem, loading: searchLoading, error: searchError } = useFetch(
        debounceText ? `/home/search?term=${encodeURIComponent(debounceText)}` : null
    );
    //검색 순위 조회
    const { data: rankData, loading: rankingLoading, error: rankingError} = useFetch(`/home/search/rankings`);


    return (
        <S.Container>
            <S.SearchWrapper>
                <S.SearchIcon src={searchIcon} alt="검색"/>
                <S.SearchInput 
                    type="text" 
                    placeholder="검색어를 입력하시오."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}/>
                <S.SearchResultsContainer>
                    <div className='search-suggesion'>검색어 추천</div>
                    <S.SuggestionBox>
                    {rankData?.data.length > 0 ? (
                        <>
                        {rankData?.data.map((item, index) => (
                            <S.SuggestionItem key={item.search_id}>
                                <div>{`${index + 1}. ${item.word}`}</div>
                            </S.SuggestionItem>
                        ))}
                        </>
                    ) : (
                        <S.NothingSearch>검색어 추천 결과가 없습니다.</S.NothingSearch>
                    )}
                    </S.SuggestionBox>
                </S.SearchResultsContainer>
            </S.SearchWrapper>

            <div>
                <S.Text>추천 게시글</S.Text>
                <S.PostWrapper>
                <TravelPost 
                    key={1}
                    postId={1}
                    postUserId={1}
                    date='2022'
                    location='japan'
                    title='travle of japan'
                    nickname='totoro'
                    buttonType='friend'
                />
                {posts?.data.posts.length > 0 ? (
                        <>
                        {posts?.data.posts.map((post) => (
                            <TravelPost 
                                key={post.post_id}
                                postId={post.post_id}
                                postUserId={post.user_id}
                                profileImg={post.user.profileImg}
                                nickname={post.user.nickname}
                                date={post.updated_at}
                                location={post.region}
                                travelImages={post.images}                                
                                title={post.title}
                                buttonType='friend'
                            />
                        ))}                        
                        </>
                    ) : (
                        <S.NothingText>추천 게시글이 없습니다.</S.NothingText>
                    )}
                </S.PostWrapper>
            </div>
        </S.Container>
    )
}

export default Home;
