import { useState } from 'react';
import * as S from '../../styles/home';
import searchIcon from '../../assets/images/home/search.png';
import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';
import PostList from '../../components/home/post-list';
import SearchTravelPost from '../../components/home/search-travel-post';

const Home = () => {
    const [searchValue, setSearchValue] = useState('');
    const debounceText = useDebounce(searchValue, 500);

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

            {debounceText && <SearchTravelPost searchValue={debounceText} />}
            {!debounceText && <PostList text={'추천 게시글'} />}
        </S.Container>
    )
}

export default Home;
