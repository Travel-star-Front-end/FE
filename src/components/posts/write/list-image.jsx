import ItemImage from "./item-image";
import * as s from "../../../styles/posts/write/write";

const ListImage = ({ postId, images, onDelete }) => {
    return (
        <s.ListItemContainer>
            {images.map((image, index) => (
                <ItemImage 
                    key={index} 
                    image={image} 
                    index={index} 
                    onDelete={onDelete}
                    postId={postId}
                />
            ))}
        </s.ListItemContainer>
    );
};

export default ListImage;