import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 2.85vw;
    width: 80%;
    height: 100vh;
    box-sizing: border-box;
`;

export const SearchWrapper = styled.div`
    position: relative;
    width: 100%;
`;

export const SearchInput = styled.input`
    width: 100%;
    height: 2.45vw;
    background-color: #FFFFFF;
    border: solid 1px #747474;
    border-radius: 15px;
    padding-left: 3.65vw;
    position: relative;
    z-index: 1;
    font-weight: 400;
    font-size: 1.2vw;
    line-height: 29.05px;
    align-items: center;

    &::placeholder {
        color: rgba(0, 0, 0, 0.49);
    }
`;

export const SearchIcon = styled.img`
    width: 1.15vw;
    height: 1.2vw;
    position: absolute;
    left: 0.7vw;
    bottom: 0.65vw;
    z-index: 2;
`;

export const SearchResultsContainer = styled.div`
    width: 100%;
    height: 8.65vw;
    background-color: #F3F3F3;
    position: absolute;
    top: 1.3vw;
    z-index: 0;
    display: flex;
    gap: 10px;

    .search-suggesion {
        position: absolute;
        top: 1.55vw;
        left: 0.7vw;
        z-index: 1;
        font-weight: 400;
        font-size: 1vw;
        color: rgba(0, 0, 0, 0.49);
    }
`;

export const SuggestionBox = styled.div`
    width: 100%;
    position: absolute;
    top: 3.25vw;
    left: 5%;
    bottom: 2%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items:center;
    grid-gap: 0.5vw 3vw;
    padding-right: 2.5vw;

    @media (max-width: 768px) {
        grid-gap: 5px;
    }
`;

export const SuggestionItem = styled.div`
    display: flex;
    align-items:center;
    gap: 9px;
    font-weight: 400;
    font-size: 1vw;
    color: rgba(0, 0, 0, 0.49);

    .arrow {
        width: 1.2vw;
        height: 1.2vw; 
    }
`;

export const Text = styled.div`
    margin-top: 9vw;
    font-weight: 600;
    font-size: 1.2vw;
    color: #555555;
`;

export const PostWrapper = styled.div`
   widht: 100%;
`;