import styled from "styled-components";

export const Container = styled.div`
    z-index: 100;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 0.5vw;
    gap: 0.25vw;
`;

export const Container2 = styled.div`
    z-index: 100;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 0.5vw;
    justify-content: space-between;
`;

export const FriendContnet = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25vw;
`;

export const ProfileWrapper = styled.div`
    width: 1.092vw;
    height: 1.092vw;
    border-radius: 70%;
    overflow: hidden;

    .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const Name = styled.div`
    font-weigh: 400px;
    font-size: 0.6vw;
    line-height: 0.726vw;
`;

export const CloseBtnWrapper = styled.div`
    width: 0.4vw;
    height: 0.4vw;
    overflow: hidden;
    cursor: pointer;
    margin-right: 0.24vw;

    .close-btn {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const AccpetBtn = styled.button`
    width: 2.95vw;
    height: 0.75vw;
    background-color: #FFFFFF;
    border-radius: 5px;
    font-weight: 600px;
    font-size: 0.4vw;
    line-height: 0.484vw;
    color: #555555;
`;