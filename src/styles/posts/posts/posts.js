import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    gap: 3.35vw;
`;

export const BannerContainer = styled.div`
    width: 100%;
    height: 21.75vw;
    position: relative;

    .banner-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .default-banner {
        width: 100%;
        height: 100%;
        background-color: rgba(245, 245, 245, 1);
    }
`;

export const BannerInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.05vw;
    width: 100%;
    padding: 0 2.35vw;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1.15vw;
    font-weight: 400;
    font-size: 1.8vw;
    line-height: 2.1785vw;

    .title {
        color: white;
    }

    .default-title {
        color: rgba(85, 85, 85, 0.5);
    }
`;

export const BannerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
    padding-left: 0.3vw;//6px
    align-items:center;
    color: white;

    .nickname{
        font-weight: 400;
        font-size: 1vw;
        line-height: 1.243vw;
        margin-bottom: 0.25vw;//5px
    }
    .planet-name{
        font-weight: 300;
        font-size: 0.7vw;
        line-height: 1.05vw;
    }
`;

export const ProfileImg = styled.div`
    width: 3.1vw;//62px
    height: 3.1vw;
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
    gap: 0.7vw;
    position: relative;

    .toolbar-icon{
        width: 1.7vw;//34px
        height: 1.7vw;
        cursor: pointer;
    }

    .toolbar-icon2{
        width: 1.95vw;
        height: 1.95vw;
        cursor: pointer;
    }
`;

export const Toolbar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 13.8vw;//276px
    height: 2.5vw;//50px
    border-radius: 36px;
    line-height: 50px;
    background-color: rgba(255, 255, 255, 0.67);
    align-items:center;
    padding: 0 1vw;
`;

export const AddToolbar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.55vw;
    height: 2.55vw;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.67);
`;

export const FriendApplyContainer = styled.div`
    z-index: 100;
    position: absolute;
    bottom: 3.1585vw;

    width: 16.6vw;
    height: 12vw;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
`;

export const DiaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 95%;
`;

export const Text = styled.div`
    font-weight: 600;
    font-size: 1.2vw;
    color: #555555;
`;

export const PostWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const NothingText = styled.div`
    margin-top: 2.75vw;
    font-weight: 400;
    font-size: 1vw;
    color: rgba(85, 85, 85, 0.5);
`;