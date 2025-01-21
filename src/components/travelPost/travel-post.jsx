import { useState } from 'react';
import * as S from '../../styles/travel-post';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import locationPin from '../../assets/images/travel-post/locationPin.png';
import lock from '../../assets/images/travel-post/lock-person.png';
import share from '../../assets/images/posts/posts/share.png';
import default_profile_img from '../../assets/images/ProfileImage.png';

//예시 이미지
import image1 from '../../assets/images/travel-post/image 1.png';
import image2 from '../../assets/images/travel-post/image 2.png';
import image3 from '../../assets/images/travel-post/image 3.png';

//slick setting
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

//추천 게시글 컴포넌트
const TravelPost = ({id, profileImg, nickname, date, location, travelImages, quickReview, buttonType}) => {

    const [isFriend, setIsFriend] = useState(false);
    const navigate = useNavigate();

    //친구 추가 버튼 상태태
    const handleButtonClick = () => {
        setIsFriend((prevState) => !prevState);
      };

    return (
        <S.Container>
            <S.Hr/>
            <S.InfoWrapper>
                <S.Info onClick={() => navigate(`/posts/${id}`, {
                    state: { 
                        nickname, 
                        date, 
                        location, 
                        quickReview, 
                        profileImg 
                    } 
                })}>
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
                        <S.LocationWrapper>
                            <S.LocPin src={locationPin} alt="위치" />
                            <div>{location}</div>
                        </S.LocationWrapper>
                    </S.DetailInfo>
                </S.Info>

                {buttonType === 'friend' && (
                    <S.Button
                        type="button"
                        $isFriend={isFriend} 
                        onClick={handleButtonClick}
                    >
                        {isFriend ? "친구" : "+ 친구 추가"}
                  </S.Button>
                )}
                {buttonType === 'edit' && (
                    <S.EditBtnContainer>
                        <img src={lock} alt='lock' className='lock-icon' />
                        <img src={share} alt="share" className="share-icon" />
                        <S.EditButton type="button" onClick={() => navigate('edit')}>수정하기</S.EditButton>
                    </S.EditBtnContainer>
                )}

            </S.InfoWrapper>

            <S.SliderWrapper>
                <Slider {...settings}>
                    <S.TravelImg>
                        <img src={image1} className='travel-img' />
                    </S.TravelImg>
                    <S.TravelImg>
                        <img src={image2} className='travel-img' />
                    </S.TravelImg>
                    <S.TravelImg>
                        <img src={image3} className='travel-img' />
                    </S.TravelImg>
                    <S.TravelImg>
                        <img src={image1} className='travel-img' />
                    </S.TravelImg>
                    <S.TravelImg>
                        <img src={image2} className='travel-img' />
                    </S.TravelImg>
                    <S.TravelImg>
                        <img src={image3} className='travel-img' />
                    </S.TravelImg>
                </Slider>
            </S.SliderWrapper>

            <S.QuickReview>{quickReview}</S.QuickReview>

        </S.Container>
    )
}

export default TravelPost;