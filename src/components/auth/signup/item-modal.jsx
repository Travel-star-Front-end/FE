import React from 'react';
import styled from 'styled-components';
import colors from "../../../styles/common/colors";

const ItemModalContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1vw;
`;

const ItemP = styled.p`
    font-size: 0.9vw;
    font-weight: 500;
    color: ${colors.black};
`;

const ItemModalListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const ItemModalPContainer = styled.div`
    display: flex;
    gap: 0.5vw;
`

const ItemModal = ({ title, number, explain }) => {
    const TitleParts = title.split('@') || [];

    return (
        <ItemModalContainer>
            <ItemModalPContainer>
                {number && <ItemP>{number}</ItemP>}
                {TitleParts.length > 1 ? (
                    <ItemP>
                        {TitleParts[0]} <br />
                        {TitleParts[1]}
                    </ItemP>
                ) : (
                    <ItemP>{TitleParts[0]}</ItemP>
                )}
            </ItemModalPContainer>

            {explain?.map((item) => (
                <ItemModalListContainer key={item.id}>
                    <ItemModalPContainer>
                        <ItemP>{item.number}</ItemP>
                        {item.content && <ItemP>{item.content}</ItemP>}
                    </ItemModalPContainer>
                </ItemModalListContainer>
            ))}
        </ItemModalContainer>
    );
};

export default ItemModal;
