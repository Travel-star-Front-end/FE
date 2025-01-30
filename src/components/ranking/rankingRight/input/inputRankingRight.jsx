import * as s from "../../../../styles/ranking/ranking";

const InputRankingRight = ({ placeholder, value, onChange }) => {
    return (
        <s.InputRightContainer 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default InputRankingRight;