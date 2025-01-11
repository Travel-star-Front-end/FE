import styled from "styled-components";
import colors from "../../../../styles/colors";

const TextareaWrapper = styled.div`
    position: relative;
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "20vw"};
`;

const TextareaContainer = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.25vw;
    background: ${colors.writeGray2};
    font-size: 1.2vw;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.49);
    padding: 0.85vw 0.95vw;
    box-sizing: border-box;
    resize: none;
    outline: none;
`;

const IconContainer = styled.div`
    position: absolute;
    bottom: 0.85vw;
    right: 0.95vw;
    display: flex;
    gap: 0.65vw;
`;

const IconImg = styled.img`
    width: 2.3vw;
    height: 2.3vw;
    cursor: pointer;
`;

const WriteTextarea = ({ width, height, placeholder, IconData, value, onChange }) => {
    const validIconData = Array.isArray(IconData) && IconData.length > 0;

    return (
        <TextareaWrapper width={width} height={height}>
            <TextareaContainer 
                width={width}
                height={height}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            {validIconData && (
                <IconContainer>
                    {IconData.map((icon) => (
                        icon.src && <IconImg key={icon.id} src={icon.src} alt={`icon-${icon.id}`} />
                    ))}
                </IconContainer>
            )}
        </TextareaWrapper>
    );
}

export default WriteTextarea;
