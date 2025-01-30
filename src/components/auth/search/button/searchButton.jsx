import * as s from "../../../../styles/auth/search/search";

const SearchButton = ({ children, onClick, disabled }) => {
    return (
        <s.SearchButtonContainer onClick={onClick} disabled={disabled}>
            {children}
        </s.SearchButtonContainer>
    )
}

export default SearchButton;