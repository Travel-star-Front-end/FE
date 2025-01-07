import * as S from '../../styles/home';
import searchIcon from '../../assets/images/search.png'
import upArrow from '../../assets/images/search-up-arrow.png';
import decreaseArrow from '../../assets/images/search-decrease-arrow.png';
import TravelPost from '../../components/travelPost/travel-post';

const Home = () => {
    return (
        <S.Container>
            <S.SearchWrapper>
                <S.SearchIcon src={searchIcon} alt="검색"/>
                <S.SearchInput type="text" placeholder="검색어를 입력하시오."/>
                <S.SearchResultsContainer>
                    <div className='search-suggesion'>검색어 추천</div>
                    <S.SuggestionBox>
                        <S.SuggestionItem>
                            <img src={upArrow} alt='up-arrow' className='arrow'/>
                            <div>1. 홍콩</div>
                        </S.SuggestionItem>
                        <S.SuggestionItem>
                            <img src={decreaseArrow} alt='decrease-arrow' className='arrow'/>
                            <div>3. 일본</div>
                        </S.SuggestionItem>
                        <S.SuggestionItem>
                            <img src={decreaseArrow} alt='decrease-arrow' className='arrow'/>
                            <div>5. 싱가포르</div>
                        </S.SuggestionItem>
                        <S.SuggestionItem>
                            <img src={decreaseArrow} alt='decrease-arrow' className='arrow'/>
                            <div>7. 다낭</div>
                        </S.SuggestionItem>
                        <S.SuggestionItem>
                            <img src={upArrow} alt='up-arrow' className='arrow'/>
                            <div>2. 뉴질랜드</div>
                        </S.SuggestionItem>
                        <S.SuggestionItem>
                            <img src={upArrow} alt='up-arrow' className='arrow'/>
                            <div>4. 베를린</div>
                        </S.SuggestionItem>
                        <S.SuggestionItem>
                            <img src={decreaseArrow} alt='decrease-arrow' className='arrow'/>
                            <div>6. 태국</div>
                        </S.SuggestionItem>
                        <S.SuggestionItem>
                            <img src={upArrow} alt='up-arrow' className='arrow'/>
                            <div>8.보스턴</div>
                        </S.SuggestionItem>
                    </S.SuggestionBox>
                </S.SearchResultsContainer>
            </S.SearchWrapper>

            <div>
                <S.Text>추천 게시글</S.Text>
                <S.Hr/>
                <S.PostWrapper>
                    <TravelPost
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