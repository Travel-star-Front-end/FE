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
    gap: 9px;

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
    .slick-list {
        overflow: hidden;
    }

    .slick-track {
        display: flex !important; /* 수평 레이아웃 유지 */
        flex-wrap: nowrap; /* 슬라이드가 한 줄로 유지되도록 설정 */
    }

     .slick-slide {
        width: 20vw !important; /* 슬라이드 항목 너비 강제 설정 */
        margin-right: 8px;
    }

    .slick-prev::before,
    .slick-next::before{
        color: #9eb23b;
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

export const Hr = styled.hr`
    width: 100%;
    border: 0;
    height: 1px;
    background-color: #D9D9D9;
    margin-bottom: 43px;
`;
