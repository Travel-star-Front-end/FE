import * as S from '../../styles/travel-post';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import locationPin from '../../assets/images/locationPin.png';
import img from '../../assets/images/logo.png';

//예시 이미지지
import image1 from '../../assets/images/image 1.png';
import image2 from '../../assets/images/image 2.png';
import image3 from '../../assets/images/image 3.png';

const settings = {
    rows: 1,
    slidesPerRow: 1,  
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,   //width 1024px 미만
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768, // 화면 너비 768px 이하
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
}

//추천 게시글 컴포넌트
const TravelPost = ({profileSrc, nickname, date, location, travelImages}) => {
    return (
        <S.Container>
            <S.InfoWrapper>
                <S.Info>
                    <S.ProfileImg>
                        <img src={img} alt="프로필" className='profile-img'/>
                    </S.ProfileImg>
                    <S.DetailInfo>
                        <S.TitleDateWrapper>
                            <div className='nickname'>여행별 일지 콩콩</div>
                            <div className='date'>2024.09.15</div>
                        </S.TitleDateWrapper>
                        <S.LocationWrapper>
                            <S.LocPin src={locationPin} alt="위치" />
                            <div>일본, 오사카</div>
                        </S.LocationWrapper>
                    </S.DetailInfo>
                </S.Info>
                <S.Button type="button">+ 친구 추가</S.Button>
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

            <S.QuickReview>일본 오사카에서 행복했던 여행</S.QuickReview>

            <S.Hr/>

        </S.Container>
    )
}

export default TravelPost;