import * as s from "../../../../styles/ranking/ranking";

const ButtonRankingRight = ({ children, onClick }) => {
    return (
        <s.ButtonRihgtContainer onClick={onClick}>
            {children}
        </s.ButtonRihgtContainer>
    )
}

export default ButtonRankingRight;