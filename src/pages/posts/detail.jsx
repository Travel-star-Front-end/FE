import * as S from '../../styles/detail';
import TravelPost from '../../components/travelPost/travel-post';

const Detail = () => {
    return (
        <S.Container>
            <S.Text>일지 보기</S.Text>
                <S.Hr/>
                <S.PostWrapper>
                    <TravelPost
                        nickname="벨라" 
                        date="2024.09.15 14:58" 
                        location="베트남, 다낭" 
                        quickReview="바보 원숭이 !! 다낭여행 (2)"
                        buttonType="edit"  />
            </S.PostWrapper>
        </S.Container>
    )
}

export default Detail;