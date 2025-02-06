import styled from "styled-components";
import RightArrow from '../assets/images/travel-post/right-arrow.png';
import LeftArrow from '../assets/images/travel-post/left-arrow.png';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 2.85vw;
    width: 71.15vw;
    height: 100vh;
    box-sizing: border-box;
`;

export const Hr = styled.hr`
    width: 100%;
    border: 0;
    height: 0.05vw;
    background-color: #D9D9D9;
`;

export const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1vw;

    .share-icon {
        width: 1.55vw;//31px
        height: 1.55vw;
        cursor: pointer;
    }
`;

export const Info = styled.div`
    display: flex;
    gap: 0.65vw;
`;

export const DetailInfo = styled.div`
    display: flex;
    flex-direction: column; 
`;

export const TitleDateWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 0.25vw;
    margin-bottom: 0.35vw;

    .nickname {
        font-weight: bold;
        font-size: 0.8vw;
        color: #000000;
    }
    .date {
        font-weight: 100;
        font-size: 0.65vw;
        color: #000000;
    }    
`;

export const MetaWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5vw;
`;

export const LocationWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25vw;
    color: #555555;
    font-weight: 500;
    font-size: 0.55vw;
`;


export const MusicWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 9.35vw;
    height: 1vw;
    border-radius: 0.25vw;
    padding: 0 0.2vw;
    background-color: #ECECEC;
    color: rgba(0, 0, 0, 0.49);
    font-weight: 400;
    font-size: 0.5vw;
    line-height: 0.6vw;
`;

export const MusicName = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4vw;
`;

export const AudioImgWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 0.8vw;
    height: 0.9vw;
    overflow: hidden;

    .audio_png {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }    
`;

export const ProfileImg = styled.div`
    width: 2.5vw;
    height: 2.5vw;
    border-radius: 70%;
    overflow: hidden;

    .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const LocPin = styled.img`
    height: 0.65vw;
`;

export const SliderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 92%;
    margin: 0 auto;
    margin-bottom: 1vw;

    .slick-list {
        overflow: hidden;
        padding: 0;
    }

    .slick-slider {
        width: 100%;
        position: relative;
    }

    .slick-track {
        width: 90%;
        display: flex !important;
        flex-wrap: nowrap;
    }

     .slick-slide {
        width: 20vw !important;
        height: 16.65vw !important;
        margin-right: 0.4vw;
    }

    .slick-prev::before, .slick-next::before {
        content: ''; /* 기본 화살표 제거 */
    }

    .slick-prev, .slick-next {
        position: absolute;
        top: 50%; /* 버튼 수직 중앙 정렬 */
        transform: translateY(-50%);
        z-index: 1000;
        width: 2.5vw;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        background-size: 50% auto;
        background-repeat: no-repeat;
        background-position: center;
    }

    .slick-prev {
        left: -4.1%;
        background-image: url(${LeftArrow});
    }

    .slick-next {
        right: -4%;
        background-image: url(${RightArrow});
    }
`;

export const TravelImg = styled.div`
    width: 20vw;
    height: 16.65vw;
    overflow: hidden;

    .travel-img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const Text = styled.div`
    font-weight: 600;
    font-size: 1.2vw;
    color: #555555;
`;

export const PostWrapper = styled.div`
    padding: 1.5vw 0;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75vw;
    width: 100%;
    font-weight: 300px;
    .title {
        font-size: 1vw;
        line-height: 1.21vw; 
    }

    .content {
        font-size: 0.8vw;
        line-height: 0.968vw;        
    }
`; 