import { useLocation } from 'react-router-dom';
import * as S from '../../styles/detail';
import TravelPost from '../../components/posts/posts/travelPost/travel-post';

const Detail = () => {
    const location = useLocation();
    const { nickname, date, location: postLocation, quickReview, profileImg } = location.state || {};

    return (
        <S.Container>
            <S.Text>일지 보기</S.Text>
                <S.PostWrapper>
                    <TravelPost
                        profileImg={profileImg}
                        nickname={nickname}
                        date={date}
                        location={postLocation}
                        buttonType="edit"  />
                    <S.ContentWrapper>
                        <div className='title'>{quickReview}</div>
                        <div className='content'>
                            content
                        </div>
                    </S.ContentWrapper>
                </S.PostWrapper>
        </S.Container>
    )
}

export default Detail;