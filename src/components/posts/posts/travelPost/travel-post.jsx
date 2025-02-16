import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from '../../../../styles/travel-post';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import locationPin from '../../../../assets/images/travel-post/locationPin.png';
import lock from '../../../../assets/images/travel-post/lock-person.png';
import share from '../../../../assets/images/posts/posts/share.png';
import default_profile_img from '../../../../assets/images/ProfileImage.png';
import useFetch from '../../../../hooks/useFetch';
import usePost from '../../../../hooks/usePost';

//예시 이미지
import image1 from '../../../../assets/images/travel-post/image 1.png';
import image2 from '../../../../assets/images/travel-post/image 2.png';
import image3 from '../../../../assets/images/travel-post/image 3.png';

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
const TravelPost = ({
    postId,
    postUserId,
    profileImg,
    nickname, 
    date, 
    location, 
    images, 
    title, 
    buttonType
}) => {

    const userId = localStorage.getItem('userId'); 
    //친구 요청
    const { triggerPost } = usePost(`friends/request`);

    const [isFriend, setIsFriend] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const currentUrl = window.location.origin + pathname;

    //친구 추가 버튼 상태
    const handleButtonClick = async() => {
        try {
            // 친구 요청 API 호출
            const response = await triggerPost({ toUserId: postUserId });
    
            if (response?.resultType === 'success') {
                setIsFriend(true); // 성공하면 친구 상태 변경
                console.log("친구 요청 성공:", response);
            } else {
                console.log("친구 요청 실패");
            }
        } catch (error) {
            console.error("친구 요청 중 오류 발생:", error);
        }
    };

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

    return (
        <S.Container>
            <S.Hr/>
            <S.InfoWrapper>
                <S.Info onClick={() => navigate(`/posts/${postId}`, {
                    state: {
                        postId: postId,
                        nickname: nickname,
                        date: date,
                        location: location,
                        profileImg: profileImg,
                        images: images
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
                        {/* <img src={lock} alt='lock' className='lock-icon' /> */}
                        <img src={share} alt="share" className="share-icon" onClick={handleCopyUrl}/>
                        <S.EditButton 
                            type="button" 
                            onClick={() => navigate('edit')}>
                                수정하기
                        </S.EditButton>
                    </S.EditBtnContainer>
                )}

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

            <S.QuickReview>{title}</S.QuickReview>

        </S.Container>
    )
}

export default TravelPost;