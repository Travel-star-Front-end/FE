import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    //max-width: 1320px;
    box-sizing: border-box;
    gap: 67px;
`;

export const BannerContainer = styled.div`
    width: 100%;
    height: 435px;
    position: relative;

    .banner-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const BannerInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    width: 100%;
    padding: 0 50px;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 23px;
`;

export const BannerHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    color: white;

    .title {
        font-weight: 400;
        font-size: 36px;
        line-height: 43.57px;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    gap: 20px;
    padding-left: 6px;
    align-items:center;

    .nickname{
        font-weight: 400;
        font-size: 20px;
        line-height: 24.86px;
        margin-bottom: 5px;
    }
    .planet-name{
        font-weight: 300;
        font-size: 14px;
        line-height: 21px;
    }
`;

export const ProfileImg = styled.div`
    width: 62px;
    height: 62px;
    border-radius: 70%;
    overflow: hidden;

    .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const DetailInfo = styled.div`
    display: flex;
    flex-direction: column; 
`;

export const ToolbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 276px;
    height: 50px;
    border-radius: 36px;
    line-height: 50px;
    background-color: rgba(255, 255, 255, 0.67);
    align-items:center;
    padding: 0 20px;

    .toolbar-icon{
        width: 34px;
        height: 34px;
        cursor: pointer;
    }
`;

export const DiaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 95%;
`;

export const Text = styled.div`
    font-weight: 600;
    font-size: 24px;
    color: #555555;
`;

export const Hr = styled.hr`
    width: 100%;
    border: 0;
    height: 1px;
    background-color: #D9D9D9;
`;

export const PostWrapper = styled.div`
    padding: 30px 0;
`;