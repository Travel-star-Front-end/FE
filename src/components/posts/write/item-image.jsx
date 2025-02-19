import Delete from "../../../assets/images/posts/write/delete.png";
import * as s from "../../../styles/posts/write/write";
import { API } from "../../../apis/axios";

const ItemImage = ({ image, index, onDelete, postId }) => {
    // console.log("id", image.id);

    const handleDelete = async () => {
        if (!image.id) {
            onDelete(index);
            return;
        }

        try {
            const accessToken = localStorage.getItem("accessToken");

            const response = await API.patch(`/posts/${postId}/image`, 
                { url_id: image.id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // console.log("이미지 삭제 응답:", response);
            onDelete(index);
        } catch (error) {
            console.error("이미지 삭제 실패:", error);
            alert("이미지 삭제에 실패했습니다.");
        }
    };

    return (
        <s.ItemImageContainer>
            <s.DeleteImg src={Delete} alt="delete" onClick={handleDelete} />
            <img src={image.preview} alt={`selected-${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </s.ItemImageContainer>
    );
};

export default ItemImage;
