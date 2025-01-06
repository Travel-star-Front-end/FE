import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 29px 114px;
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
    font-size: 20px;
    line-height: 49px;

    &::placeholder {
        color: rgba(0, 0, 0, 0.49);
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
`;

export const SearchResultsContainer = styled.div`
    width: 100%;
    height: 137px;
    background-color: #F3F3F3;
    position: absolute;
    top: 32px;
    z-index: 0;
`;

export const Text = styled.div`
    margin-top: 144px;
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