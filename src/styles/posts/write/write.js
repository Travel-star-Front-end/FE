import styled from "styled-components";
import colors from "../../common/colors";

// write.jsx
export const WriteContainer = styled.div`
    background: ${colors.homeGray};
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3.1vw 0 2.25vw 0;
`

export const WriteInnerContainer = styled.div`
    width: 90%;
`

export const WriteP = styled.p`
    font-size: 1.2vw;
    font-weight: 600;
    color: ${colors.sideBarGray2};
`

export const WriteBar = styled.div`
    width: 100%;
    height: 0.05vw;
    background: ${colors.writeGray};
    margin-top: 0.035vw;
`

// writeForm.jsx
export const FormContainer = styled.div`
    width: 100%;
    padding: 0.55vw 0 2.25vw 0;
    display: flex;
    flex-direction: column;
    gap: 1.15vw;
`

export const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

export const MenuImg = styled.img`
    width: 1.75vw;
    height: 1.6vw;
    cursor: pointer;
`

export const SearchContainer = styled.div`
    width: 100%;
    position: relative;
`

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const ImageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.45vw;
`

// writeInput.jsx
export const InputWrapper = styled.div`
    position: relative;
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "3.05vw"};
    display: flex;
`;

export const InputContainer = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.25vw;
    background: ${colors.writeGray2};
    font-size: 1.2vw;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.49);
    padding: ${props => props.padding || "0 1.05vw"};
    box-sizing: border-box;
    outline: none;
`;

export const IconImg = styled.img`
    position: absolute;
    top: 50%;
    left: 0.4vw;
    transform: translateY(-50%);
    width: 2.3vw;
    height: 2.3vw;
`;

// writeTextarea.jsx
export const TextareaWrapper = styled.div`
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "20vw"};
    position: relative;
`;

export const TextareaContainer = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.25vw;
    background: ${colors.writeGray2};
    font-size: 1.2vw;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.49);
    padding: ${props => props.padding || "0.85vw 0.95vw"};
    box-sizing: border-box;
    resize: none;
    outline: none;
`;

// AIButton.jsx
export const AIButtonContainer = styled.button`
    width: 8.55vw;
    height: 1.65vw;
    border: 0.055vw solid ${colors.sideBarGray2};
    border-radius: 0.25vw;
    font-size: 0.7vw;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.49);
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translate(-130%, -50%);

    &:hover {
        font-weight: bold;
    }
`

export const WriteButtonContainer = styled.button`
    width: 26vw;
    height: 3.55vw;
    border: none;
    border-radius: 0.75vw;
    font-size: 1.1vw;
    font-weight: 800;
    color: ${colors.white};
    background: ${props => props.btncolor || colors.writeGray3};
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`

// list-location.jsx, list-music.jsx
export const ListContainer = styled.div`
    position: absolute;
    width: 100%;
    background-color: ${colors.writeGray};
    z-index: 10;
    margin-top: 0.5vw;
`;

// item-location.jsx, item-music.jsx
export const ItemContainer = styled.div`
    width: 100%;
    padding: 0.5vw;
    cursor: pointer;
    border-bottom: 0.05vw solid ${colors.white};

    &:hover {
        background-color: ${colors.writeGray2};
    }
`;

export const ItemP = styled.p`
    font-size: 1.2vw;
    font-weight: 400;
    color: ${colors.sideBarGray2};
`

// list-image.jsx
export const ListItemContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 0.45vw;
`;

// item-image.jsx
export const ItemImageContainer = styled.div`
    width: 4.85vw;
    height: 4.85vw;
    position: relative;
`;

export const DeleteImg = styled.img`
    width: 0.39vw;
    height: 0.39vw;
    cursor: pointer;
    position: absolute;
    right: 0;
`;