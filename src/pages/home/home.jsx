import { useState } from 'react';
import * as S from '../../styles/home';
import searchIcon from '../../assets/images/home/search.png';
import upArrow from '../../assets/images/home/search-up-arrow.png';
import decreaseArrow from '../../assets/images/home/search-decrease-arrow.png';
import TravelPost from '../../components/posts/posts/travelPost/travel-post';
import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';

//에시 검색어 추천 데이터
const suggestions = [
    { id: 1, text: '홍콩', arrow: upArrow },
    { id: 3, text: '일본', arrow: decreaseArrow },
    { id: 5, text: '싱가포르', arrow: decreaseArrow },
    { id: 7, text: '다낭', arrow: decreaseArrow },
    { id: 2, text: '뉴질랜드', arrow: upArrow },
    { id: 4, text: '베를린', arrow: upArrow },
    { id: 6, text: '태국', arrow: decreaseArrow },
    { id: 8, text: '보스턴', arrow: upArrow },
];

const Home = () => {
    const [searchValue, setSearchValue] = useState('');
    const debounceText = useDebounce(searchValue, 500);

    //추천 일지 조회(최신순 10개)
    const userId = localStorage.getItem('userId');
    const { data: posts, loading, error } = useFetch(`/users/${userId}/home`);
    if (error && status === 404) return <div>게시물이 없습니다.</div>;

    //검색
    const { data: searchItem, loading: searchLoading, error: searchError } = useFetch(
        debounceText ? `/users/${userId}/home/search?term=${debounceText}` : null
    );

    //검색 순위 조회
    const { data: ranking, loading: rankingLoading, error: rankingError} = useFetch(`/users/${userId}/home/search/rankings`);


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
                    {suggestions.map((item) => (
                        <S.SuggestionItem key={item.id}>
                            <div>{`${item.id}. ${item.text}`}</div>
                        </S.SuggestionItem>
                    ))}
                    {/* {ranking?.data.map((item) => (
                        <S.SuggestionItem key={item.number}>
                            <div>{`${item.number}. ${item.word}`}</div>
                        </S.SuggestionItem>
                    ))} */}
                    </S.SuggestionBox>
                </S.SearchResultsContainer>
            </S.SearchWrapper>

            <div>
                <S.Text>추천 게시글</S.Text>
                <S.PostWrapper>
                {/* <TravelPost 
                    key={1}
                    id={1}
                    nickname="여행돌이"
                    date='2024.02.07'
                    location='일본'
                    title='일본여행행' 
                />  */}
                {posts?.data.length > 0 ? (
                        <>
                        {posts?.data.map((post) => (
                            <TravelPost 
                                key={post.id}
                                id={post.id}
                                date={post.createdAt}
                                location={post.region}
                                title={post.title}
                                travelImages={post.images}
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
