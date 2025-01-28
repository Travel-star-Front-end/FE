import styled from "styled-components";

export const Container = styled.div`
    z-index: 100;
    position: absolute;
    bottom: 3.1585vw;
    width: 16.6vw;
    height: 12vw;
    border-radius: 8px;
`;

export const TabHeader = styled.div`
    display: flex;
    justify-content: space-around;

    button {
        background: rgba(123, 123, 123, 0.72);
        color: #D6D6D6;
        width: 50%;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 1.75vw;
        font-weight: 600;
        font-size: 0.6vw;
        line-height: 0.726vw;

        &.active {
            background: rgba(255, 255, 255, 0.6);
            color: #555555;
        }

        &.inactive {
            background: rgba(123, 123, 123, 0.72);
            color: rgba(214, 214, 214, 1);
        }
    }
`;

export const TabContent = styled.div`
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer */
    
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
    }

    height: 10.25vw;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: rgba(255, 255, 255, 0.6);
`;

export const CardListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8vw;
    padding: 0.35vw 0.5vw;
`;