import styled from "styled-components";
import colors from "../../../../styles/common/colors";

const InputContainer = styled.input`
    width: 100%;
    height: 3.4vw;
    border: none;
    border-radius: 0.25vw;
    background: ${colors.homeGray};
    margin-top: 0.45vw;
    font-size: 0.8vw;
    font-weight: 400;
    color: ${colors.rankingGray};
`

const InputRankingRight = ({ placeholder, value, onChange }) => {
    return (
        <InputContainer 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default InputRankingRight;