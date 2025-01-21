import Delete from "../../../assets/images/posts/write/delete.png";
import * as s from "../../../styles/posts/write/write";

const ItemImage = ({ image, index, onDelete }) => {
    return (
        <s.ItemImageContainer>
            <s.DeleteImg src={Delete} alt="delete" onClick={() => onDelete(index)} />
            <img src={image.preview} alt={`selected-${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </s.ItemImageContainer>
    );
};

export default ItemImage;
