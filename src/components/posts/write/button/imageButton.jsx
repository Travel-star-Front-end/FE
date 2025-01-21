import React, { useRef } from "react";
import styled from "styled-components";
import Add from "../../../../assets/images/posts/write/add.png";
import colors from "../../../../styles/common/colors";

const ImageButtonContainer = styled.div`
    width: 4.85vw;
    height: 4.85vw;
    background: ${colors.writeGray2};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const AddImg = styled.img`
    width: 1.15vw;
    height: 1.15vw;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const ImageButton = ({ onImageSelect }) => {
    const fileInputRef = useRef(null);
    const handleImageSelection = (event) => {
        const file = event.target.files[0];
        if (file) {
            onImageSelect(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <ImageButtonContainer onClick={handleButtonClick}>
                <AddImg src={Add} alt="add" />
            </ImageButtonContainer>

            <HiddenFileInput 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageSelection}
            />
        </>
    );
};

export default ImageButton;
