import { useLocation, useParams } from 'react-router-dom';
import * as S from '../../styles/detail';
import TravelPost from '../../components/posts/posts/travelPost/travel-post';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import locationPin from '../../assets/images/travel-post/locationPin.png';
import share from '../../assets/images/posts/posts/share.png';
import audio from '../../assets/images/posts/detail/audio.png';
import default_profile_img from '../../assets/images/ProfileImage.png';
import useFetch from '../../hooks/useFetch';

//예시 이미지
import image1 from '../../assets/images/travel-post/image 1.png';
import image2 from '../../assets/images/travel-post/image 2.png';
import image3 from '../../assets/images/travel-post/image 3.png';

const settings = {
    rows: 1,
    slidesPerRow: 1,  
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
}

const Detail = () => {
    const location = useLocation();
    const { pathname } = useLocation();
    const currentUrl = window.location.origin + pathname;
    const {postId, postUserId, nickname, date, location: region, profileImg, images } = location.state || {};

    //회원 일지 상세 조회 api 
    const { data: postData, loading: postLoading } = useFetch(`posts/${postId}/user/${postUserId}`);

    //현재 url복사
    const handleCopyUrl = () => {
        navigator.clipboard.writeText(currentUrl)
        .then(() => {
            alert(`주소가 복사되었습니다.\n${currentUrl}`);
        })
        .catch((err) => {
            alert('주소 복사에 실패했습니다. 다시 시도해주세요.');
            console.error('주소 복사 실패:', err);
        });
    };

    if (postLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <S.Container>
            <S.Text>일지 보기</S.Text>
                <S.Hr/>
                <S.PostWrapper>
                    <div>
                    <S.InfoWrapper>
                        <S.Info>
                            <S.ProfileImg>
                                {profileImg ? (
                                    <img src={profileImg} alt="프로필" className="profile-img" />
                                ) : (
                                    <img src={default_profile_img} alt="프로필" className="profile-img" />
                                )}
                            </S.ProfileImg>
                            <S.DetailInfo>
                                <S.TitleDateWrapper>
                                    <div className='nickname'>{nickname}</div>
                                    <div className='date'>{date}</div>
                                </S.TitleDateWrapper>
                                <S.MetaWrapper>
                                    <S.LocationWrapper>
                                        <S.LocPin src={locationPin} alt="위치" />
                                        <div>{region}</div>                                        
                                    </S.LocationWrapper>
                                    <S.MusicWrapper>
                                        <S.MusicName>
                                            <S.AudioImgWrapper>
                                                <img src={audio} alt='audio' className='audio_png'/>
                                            </S.AudioImgWrapper>
                                            {/* <div>{postData.data.music}</div> */}
                                        </S.MusicName>
                                        <div>00:30</div>
                                    </S.MusicWrapper>
                                </S.MetaWrapper>
                            </S.DetailInfo>
                        </S.Info>
                        <img src={share} alt="share" className="share-icon" onClick={handleCopyUrl}/>
                    </S.InfoWrapper>

                    {images && images.length > 0 && (
                        <S.SliderWrapper>
                            <Slider {...settings}>
                                {images.map((image, index) => (
                                    <S.TravelImg key={index}>
                                        <img src={image} className='travel-img' />
                                    </S.TravelImg>
                                ))}
                            </Slider>
                        </S.SliderWrapper>
                    )}
                    </div>

                    <S.ContentWrapper>
                        {/* <div className='title'>{postData.data.title}</div>
                        <div className='content'>
                            {postData.data.content}
                        </div> */}
                    </S.ContentWrapper>
                </S.PostWrapper>
        </S.Container>
    )
}

export default Detail;