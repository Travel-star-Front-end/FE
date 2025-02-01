import * as s from "../../../../styles/posts/write/write";

const WriteInput = ({ width, height, padding, placeholder, icon, value, onChange, onClick }) => {
    return (
        <s.InputWrapper width={width} height={height}>
            {icon && <s.IconImg src={icon} alt="icon" />}
            <s.InputContainer 
                padding={padding}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onClick={onClick}
            />
        </s.InputWrapper>
    );
};

export default WriteInput;
