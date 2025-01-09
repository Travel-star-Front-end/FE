import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 90%;
    max-width: 1320px;
    box-sizing: border-box;
`;

export const SearchWrapper = styled.div`
    position: relative;
    width: 100%;
`;

export const SearchInput = styled.input`
    width: 100%;
    height: 49px;
    background-color: #FFFFFF;
    border: solid 1px #747474;
    border-radius: 15px;
    padding-left: 73px;
    position: relative;
    z-index: 1;
    font-weight: 400;
    font-size: 24px;
    line-height: 29.05px;
    align-items: center;

    &::placeholder {
        color: rgba(0, 0, 0, 0.49);
    }

    @media (max-width: 768px) {
        font-size: 3.5vw;
        height: 4vh;
    }
`;

export const SearchIcon = styled.img`
    width: 23px;
    height: 24px;
    position: absolute;
    top: 12px;
    left: 14px;
    bottom: 13px;
    z-index: 2;

    @media (max-width: 768px) {
        width: 4vw;
        height: 4vw;
        margin: auto;
    }
`;

export const SearchResultsContainer = styled.div`
    width: 100%;
    height: 137px;
    background-color: #F3F3F3;
    position: absolute;
    top: 32px;
    z-index: 0;
    display: flex;
    gap: 10px;

    .search-suggesion {
        position: absolute;
        top: 31px;
        left: 14px;
        z-index: 1;
        font-weight: 400;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.49);

        @media (max-width: 1024px) {
            font-size: 2.5vw;
            top: 2.5vh;
        }

        @media (max-width: 768px) {
            font-size: 3.3vw;
            top: 2vh;
        }
    }
`;

export const SuggestionBox = styled.div`
    width: 100%;
    position: absolute;
    top: 65px;
    left: 5%;
    bottom: 2%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items:center;
    grid-gap: 10px 3vw;
    padding-right: 2.5vw;

    @media (max-width: 1024px) {
        top: 7vh;
    }

    @media (max-width: 768px) {
        top: 6vh;
    }
`;

export const SuggestionItem = styled.div`
    display: flex;
    align-items:center;
    gap: 9px;
    font-weight: 400;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.49);

    .arrow {
        width: 24px;
        height: 24px; 
    }


    @media (max-width: 1024px) {
        .arrow {
            width: 2vw;
            height: 2vw;
        }
        font-size: 2vw;
    }

    @media (max-width: 768px) {
        .arrow {
            width: 3vw;
            height: 3vw;
        }
        font-size: 2.5vw;
    }
`;

export const Text = styled.div`
    margin-top: 144px;
    font-weight: 600;
    font-size: 3rem;
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