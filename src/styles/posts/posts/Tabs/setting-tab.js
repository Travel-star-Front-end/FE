import styled from "styled-components";

export const Container = styled.div`
    z-index: 100;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.35vw;
    bottom: 3.1585vw;
    width: 15.65vw;
    height: 5.05vw;

    .close {
        display: flex;
        justify-content: flex-end;
        font-weight: 700;
        font-size: 0.5vw;
        line-height: 0.605vw;
        color: white;
        cursor: pointer;
    }
`;

export const Button = styled.button`
    width: 100%;
    height: 1.7vw;
    border-radius: 0.25vw;
    background-color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    font-size: 0.6vw;
    line-height: 0.726vw;
    color: rgba(85, 85, 85, 1);
`;