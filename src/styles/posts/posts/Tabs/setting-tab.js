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

export const EditBtnContainer = styled.div`
    z-index: 100;   
    position: absolute;
    top: -10vw;
    left: -40vw;
    display: flex;
    gap: 2.65vw;
`;

export const EditBtn = styled.button`
    width: 18vw;
    height: 2.5vw;
    border-radius: 0.25vw;
    background-color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    font-size: 1vw;
    line-height: 1.21vw;
    color: rgba(85, 85, 85, 1);
`;

export const CommentContainer = styled.div`
    z-index: 100;   
    position: absolute;
    top: 10vw;;
    left: -40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5vw;
    justify-content: center;
    width: 31.55vw;
    height: 9.65vw;
    background-color: rgba(255, 255, 255, 0.87);
    border-radius: 0.75vw;
`;

export const CloseBtn = styled.img`
    width: 0.7vw;
    height: 0.7vw;
    align-self: flex-end;
    cursor: pointer;
`;

export const CommentEditInput = styled.input`
    width: 28.65vw;
    height: 2.15vw;
    padding-left: 0.6vw;
    border-radius: 0.75vw;
    background-color: rgba(217, 217, 217, 0.61);
    font-weight: 300;
    font-size: 0.75vw;
    color: rgba(0, 0, 0, 0.3);
    &::placeholder {

    }
`;

export const CommentEditBtn = styled.button`
    width: 12.55vw;
    height: 2.1vw;
    border-radius: 0.75vw;
    background-color: rgba(1, 188, 212, 1);
    font-weight: 700;
    font-size: 1vw;
    color: white;
`;