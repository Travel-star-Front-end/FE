import styled from "styled-components";
import colors from "../../common/colors";

// searchId.jsx, searchPassword.jsx
export const SearchContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: ${colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
`

// searchIdForm.jsx, searchPasswordForm.jsx
export const SearchFormContainer = styled.div`
    width: 65.5vw;
    height: 48.1vw;
    background: ${colors.completedGray};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

export const LogoPImg = styled.img`
    width: 2.75vw;
    height: 1.05vw;
    margin-top: 2.6vw;
`

export const SearchFormP = styled.p`
    font-size: 1.8vw;
    font-weight: 600;
    color: ${colors.sideBarGray2};
    margin-top: 0.5vw;
`

export const SearchInnerContainer = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 1.3vw;
    align-items: center;
    border-top: 0.06vw solid ${colors.loginPurple};
    border-bottom: 0.06vw solid ${colors.searchGray};
    margin-top: 1.7vw;
    padding: 1.7vw 0;
    position: relative;
`

export const SearchItemContainer = styled.div`
    width: 85%;
    display: flex;
    align-items: center;
    gap: 1.15vw;
`

export const SearchItemP = styled.p`
    font-size: 1vw;
    font-weight: 400;
    color: ${colors.calenderGray4};
    width: 7vw;
`

export const SearchIdButton = styled.button`
    width: 6.65vw;
    height: 2.25vw;
    border: 0.05vw solid ${colors.calenderGray3};
    border-radius: 0.25vw;
    font-size: 0.8vw;
    font-weight: 400;
    color: ${colors.calenderGray4};
    cursor: pointer;
`

export const SearchTimeP = styled.p`
    font-size: 0.9vw;
    font-weight: 400;
    color: ${colors.calenderGray4};
    position: absolute;
    right: 11.8vw;
    bottom: 0.2vw;
`

// completedIdForm.jsx
export const SearchInnerBar = styled(SearchInnerContainer)`
    border-bottom: none;
`

export const SearchIdBox = styled.div`
    width: 100%;
    height: 4.25vw;
    border-radius: 0.75vw;
    background: rgba(217, 217, 217, 0.29);
    font-size: 1vw;
    font-weight: 400;
    color: ${colors.calenderGray4};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 14.3vw;
`

// searchInput.jsx
export const SearchInputContainer = styled.input`
    width: 26vw;
    height: 2.25vw;
    border-radius: 0.25vw;
    border: 0.05vw solid ${colors.calenderGray3};
    font-size: 0.8vw;
    font-weight: 400;
    color: ${colors.calenderGray3};
    outline: none;

    &::placeholder {
        font-size: 0.8vw;
        font-weight: 400;
        color: ${colors.calenderGray3};
    }
`

// searchButton.jsx
export const SearchButtonContainer = styled.button`
    width: 26vw;
    height: 3.05vw;
    border-radius: 0.75vw;
    background: ${colors.main};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    font-size: 1.1vw;
    font-weight: 800;
    color: ${colors.white};
    position: absolute;
    bottom: 1.8vw;
`