import styled from "styled-components";
import colors from "../../../styles/common/colors";
import ItemModal from "./item-modal";

const ListModalContainer = styled.div`
    width: 45vw;
    height: 21.5vw;
    padding: 1.25vw 2.45vw 0.25vw 2.45vw;
    border: 0.05vw solid ${colors.black};
    overflow-y: scroll;
    margin-top: 1vw;
`

const ListModal = ({ data }) => {
    return (
        <ListModalContainer>
            {data?.content?.map((section) => (
                <ItemModal
                    key={section.id}
                    number={section.number}
                    title={section.title}
                    explain={section.explain}
                />
            ))}
        </ListModalContainer>
    )
}

export default ListModal;