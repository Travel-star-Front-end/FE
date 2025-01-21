import * as s from "../../../../styles/posts/write/write";

const WriteTextarea = ({ width, height, placeholder, value, onChange, AIButton, padding }) => {
    return (
        <s.TextareaWrapper width={width} height={height}>
            <s.TextareaContainer 
                width={width}
                height={height}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                padding={padding}
            />

            {AIButton && (
                <s.AIButtonContainer>
                    분석하기
                </s.AIButtonContainer>
            )}
        </s.TextareaWrapper>
    );
}

export default WriteTextarea;
