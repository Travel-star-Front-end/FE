import styled from "styled-components";
import RightArrow from '../assets/images/travel-post/right-arrow.png';
import LeftArrow from '../assets/images/travel-post/left-arrow.png';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 1vw;
`;

export const Hr = styled.hr`
    width: 100%;
    border: 0;
    height: 0.05vw;
    background-color: #D9D9D9;
    margin-bottom: 2vw;
`;

export const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1vw;
`;

export const Info = styled.div`
    display: flex;
    gap: 13px;
`;

export const DetailInfo = styled.div`
    display: flex;
    flex-direction: column; 
`;

export const TitleDateWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 5px;
    margin-bottom: 7px;

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

export const LocationWrapper = styled.div`
    display: flex;
    gap: 5px;
    color: #555555;
    font-weight: 500;
    font-size: 0.55vw;
`;

export const ProfileImg = styled.div`
    width: 2.5vw;//50px
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

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6.05vw; // 121px
    height: 1.7vw; // 34px
    border-radius: 15px;
    background-color: ${(props) => (props.$isFriend ? "white" : "#01BCD4")};
    color: ${(props) => (props.$isFriend ? "#01BCD4" : "white")};
    border: ${(props) => (props.$isFriend ? "1px solid #01BCD4" : "none")};
    
    font-weight: 300;
    font-size: 0.8vw;
    cursor: pointer;
`;


export const EditBtnContainer= styled.div`
    display: flex;
    align-items: center;
    gap: 9px;

    .lock-icon {
        width: 1.15vw;
        height: 1.15vw;
    }

    .share-icon {
        width: 1.55vw;//31px
        height: 1.55vw;
        cursor: pointer;
    }
`;

export const EditButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6.1vw;//122px
    height: 1.65vw;//33px
    border: 1px solid #555555;
    border-radius: 5px;
    background-color: white;

    font-weight: 400;
    font-size: 0.7vw;
    line-height: 16.94px;
    color: rgba(0, 0, 0, 0.49);
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
    width: 20vw;//400px
    height: 16.65vw;//333px
    overflow: hidden;

    .travel-img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const QuickReview = styled.div`
    font-weight: 100;
    font-size: 1vw;
    color: #000000;
`;
