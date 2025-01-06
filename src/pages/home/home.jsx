import * as S from '../../styles/home';
import searchIcon from '../../assets/images/search.png'
import TravelPost from '../../components/travelPost/travel-post';

const Home = () => {
    return (
        <S.Container>
            <S.SearchWrapper>
                <S.SearchIcon src={searchIcon} alt="검색"/>
                <S.SearchInput type="text" placeholder="검색어를 입력하시오."/>
                <S.SearchResultsContainer/>
            </S.SearchWrapper>

            <div>
                <S.Text>추천 게시글</S.Text>
                <S.Hr/>
                <S.PostWrapper>
                    <TravelPost />
                </S.PostWrapper>
            </div>
        </S.Container>
    )
}

export default Home;