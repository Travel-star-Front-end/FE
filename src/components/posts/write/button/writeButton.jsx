import * as s from "../../../../styles/posts/write/write";

const WriteButton = ({ children, btncolor, onClick, disabled }) => {
    return (
        <s.WriteButtonContainer btncolor={btncolor} onClick={onClick} disabled={disabled}>
            {children}
        </s.WriteButtonContainer>
    )
}

export default WriteButton;