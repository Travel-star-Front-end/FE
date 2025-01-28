import styled from "styled-components";

export const Container = styled.div`
    z-index: 100;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.35vw;
    bottom: 3.1585vw;
    width: 16.6vw;
    height: 12vw;
    border-radius: 0.75vw;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 0.6vw 0.75vw 0 0.75vw;
`;

export const Title = styled.div`
    font-weight: 600;
    font-size: 0.6vw;
    line-height: 0.726vw;
    color: rgba(85, 85, 85, 1);
`;

export const TabContnet = styled.div`
    overflow-y: scroll;
    /* 스크롤바 숨기기 (크로스 브라우저 지원) */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer */
    
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
    }

    display: flex;
    flex-direction: column;
    gap: 0.8vw;
    padding-bottom: 0.35vw;
`;

export const Container2 = styled.div`
    position: relative;
    width: 17.05vw;
    height: 6.4vw;
    border-radius: 0.25vw;
    background-color: rgba(255, 255, 255, 0.6);
`;