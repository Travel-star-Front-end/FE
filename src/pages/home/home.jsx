import * as S from '../../styles/home';
import searchIcon from '../../assets/images/home/search.png';
import upArrow from '../../assets/images/home/search-up-arrow.png';
import decreaseArrow from '../../assets/images/home/search-decrease-arrow.png';
import TravelPost from '../../components/posts/posts/travelPost/travel-post';
import { API } from '../../apis/axios';

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
    return (
        <S.Container>
            <S.SearchWrapper>
                <S.SearchIcon src={searchIcon} alt="검색"/>
                <S.SearchInput type="text" placeholder="검색어를 입력하시오."/>
                <S.SearchResultsContainer>
                    <div className='search-suggesion'>검색어 추천</div>
                    <S.SuggestionBox>
                    {suggestions.map((item) => (
                        <S.SuggestionItem key={item.id}>
                            <div>{`${item.id}. ${item.text}`}</div>
                        </S.SuggestionItem>
                    ))}
                    </S.SuggestionBox>
                </S.SearchResultsContainer>
            </S.SearchWrapper>

            <div>
                <S.Text>추천 게시글</S.Text>
                <S.PostWrapper>
                    <TravelPost
                        id='1'
                        nickname="여행별 일지 콩콩" 
                        date="2024.09.15" 
                        location="일본, 오사카" 
                        quickReview="일본 오사카에서 행복했던 여행"
                        buttonType="friend"  />
                    <TravelPost
                        id='2'
                        nickname="여행별 일지 콩콩" 
                        date="2024.09.15" 
                        location="일본, 오사카" 
                        quickReview="일본 오사카에서 행복했던 여행"
                        buttonType="friend"  />
                </S.PostWrapper>
            </div>
        </S.Container>
    )
}

export default Home;
