import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
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
        font-size: 16px;
        color: #000000;
    }
    .date {
        font-weight: 100;
        font-size: 13px;
        color: #000000;
    }    
`;

export const LocationWrapper = styled.div`
    display: flex;
    gap: 5px;
    color: #555555;
`;

export const ProfileImg = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 70%;
    overflow: hidden;

    .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const LocPin = styled.img`
    height: 13px;
`;

export const Button = styled.button`
    width: 121px;
    height: 34px;
    border-radius: 15px;
    background-color: #01BCD4;
    color: white;

    font-weight: 300;
    font-size: 16px;
`;

export const EditBtnContainer= styled.div`
    display: flex;
    gap: 9px;

    .share-icon {
        width: 31px;
        height: 31px;
    }
`;

export const EditButton = styled.button`
    width: 122px;
    height: 33px;
    border: 1px solid #555555;
    border-radius: 5px;
    background-color: white;

    font-weight: 400;
    font-size: 14px;
    line-height: 16.94px;
    color: rgba(0, 0, 0, 0.49);
`;

export const SliderWrapper = styled.div`
    .slick-list {
        // display: flex !important;
        overflow: hidden;
    }

    .slick-track {
        display: flex !important; /* 수평 레이아웃 유지 */
        flex-wrap: nowrap; /* 슬라이드가 한 줄로 유지되도록 설정 */
    }

     .slick-slide {
        width: 400px !important; /* 슬라이드 항목 너비 강제 설정 */
        margin-right: 8px;
    }

    .slick-prev::before,
    .slick-next::before{
        color: #9eb23b;
    }
`;

export const TravelImg = styled.div`
    width: 400px;
    height: 333px;
    overflow: hidden;

    .travel-img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const QuickReview = styled.div`
    font-weight: 100;
    font-size: 20px;
    color: #000000;
`;

export const Hr = styled.hr`
    width: 100%;
    border: 0;
    height: 1px;
    background-color: #D9D9D9;
    margin-bottom: 43px;
`;
