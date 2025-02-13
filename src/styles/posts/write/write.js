import styled, { keyframes } from "styled-components";
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

export const FeelingImgContainer = styled.div`
    width: 2.9vw;
    height: 2.9vw;
    border-radius: 0.25vw;
    border: 0.05vw solid ${colors.writeGray5};
    position: absolute;
    top: 50%;
    right: 13vw;
    transform: translateY(-50%); 
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FeelingImg = styled.img`
    width: 2.3vw;
    height: 2.3vw;
`

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

// Modal
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 15vw;
    width: calc(100% - 15vw);
    height: 100vh;
    background: rgba(217, 217, 217, 0.45);
    display: flex;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    margin-top: 24.45vw;
    width: 31.55vw;
    height: 9.65vw;
    border-radius: 0.75vw;
    background: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

export const CloseImg = styled.img`
    position: absolute;
    top: 0.5vw;
    right: 0.8vw;
    cursor: pointer;
    width: 0.65vw;
    height: 0.65vw;
`;

export const ModalP = styled.p`
    font-size: 1vw;
    font-weight: 600;
    color: ${colors.sideBarGray2};
    text-align: center;
    margin-top: 2.15vw;
`

export const SubscribeButton = styled.div`
    width: 12.55vw;
    height: 2.1vw;
    border-radius: 0.25vw;
    background: ${colors.main};
    font-size: 1vw;
    font-weight: 700;
    color: ${colors.white};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.55vw;
`

// loadingModal.jsx
export const LoadingModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 15vw;
    width: calc(100vw - 15vw);
    height: 100vh;
    background: rgba(217, 217, 217, 0.83);
    display: flex;
    justify-content: center;
    padding-top: 12.6vw;
    z-index: 1000;
`;

export const LoadingModalContainer = styled.div`
    width: 47.45vw;
    height: 28.75vw;
    border-radius: 0.75vw;
    background: rgba(255, 255, 255, 0.8);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LoadingDeleteImg = styled.img`
    width: 1vw;
    height: 1vw;
    position: absolute;
    right: 1vw;
    top: 1vw;
    cursor: pointer;
`

export const LoadingP = styled.p`
    font-size: 1.25vw;
    font-weight: 600;
    color: ${colors.sideBarGray2};
    margin-top: 5.01vw;
`

// feelingModal.jsx
export const FeelingModalContainer = styled(LoadingModalContainer)`
    justify-content: center;
`;

export const AIContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1vw;
    margin-top: 1vw;
`

export const FeelingP = styled.p`
    font-size: 2vw;
    font-weight: 800;
    color: ${colors.sideBarGray2};
`;

export const StarImg = styled.img`
    width: 12.25vw;
    height: 12.25vw;
`

export const PContainer = styled.div`
    display: flex;
    gap: 0.5vw;
`

export const FeelingP2 = styled.p`
    font-size: 1.25vw;
    font-weight: 500;
    color: ${colors.sideBarGray2};
`

export const FeelingP3 = styled.p`
    font-size: 1.25vw;
    font-weight: 600;
    color: ${({ color }) => color || colors.sideBarGray2};
`

// spinner.jsx
export const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.85vw;
    height: 4.85vw;
    position: relative;
    margin-top: 10.65vw;
`;

export const SpinnerBackground = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 0.4vw solid ${colors.writeGray};
    position: absolute;
`;

export const SpinnerForeground = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 0.4vw solid transparent;
    border-top-color: ${colors.writeGray4};
    animation: ${rotate} 1.5s linear infinite;
    position: absolute;
`;