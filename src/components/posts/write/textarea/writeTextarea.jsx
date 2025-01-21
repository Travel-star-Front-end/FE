import * as s from "../../../../styles/posts/write/write";

const WriteTextarea = ({ width, height, placeholder, IconData, value, onChange }) => {
    const validIconData = Array.isArray(IconData) && IconData.length > 0;

    return (
        <s.TextareaWrapper width={width} height={height}>
            <s.TextareaContainer 
                width={width}
                height={height}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            {validIconData && (
                <s.IconContainer>
                    {IconData.map((icon) => (
                        icon.src && <s.TextareaIconImg key={icon.id} src={icon.src} alt={`icon-${icon.id}`} />
                    ))}
                </s.IconContainer>
            )}
        </s.TextareaWrapper>
    );
}

export default WriteTextarea;
