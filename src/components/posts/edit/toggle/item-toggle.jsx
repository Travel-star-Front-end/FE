import { useState, useEffect } from 'react';
import * as s from "../../../../styles/posts/edit/edit";
import colors from "../../../../styles/common/colors";
import { API } from "../../../../apis/axios";

const ItemToggle = ({ data, index, storage, setStorage, postId }) => {
    const [currentIndex, setCurrentIndex] = useState(storage);

    useEffect(() => {
        setCurrentIndex(storage);
    }, [storage]);

    const handleClick = async () => {
        if (index === 0) {
            const nextIndex = (currentIndex + 1) % 3;
            setCurrentIndex(nextIndex);
            setStorage(nextIndex);
        } else if (index === 1) {
            try {
                const accessToken = localStorage.getItem("accessToken");
                await API.delete(`/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                alert("삭제되었습니다.");
            } catch (error) {
                console.error("게시글 삭제 실패:", error);
                alert("게시글 삭제에 실패했습니다.");
            }
        }
    };

    const nameOptions = [data.name, data.name2, data.name3].filter(Boolean);
    const imageOptions = [data.image, data.image2, data.image3].filter(Boolean);

    return (
        <s.InnerContainer onClick={handleClick}>
            <s.ToggleImg 
                src={index === 0 ? imageOptions[currentIndex] : data.image} 
                alt={index === 0 ? nameOptions[currentIndex] : data.name} 
            />
            <s.ToggleP style={{ color: index === 0 ? 'inherit' : colors.writeRed2 }}>
                {index === 0 ? nameOptions[currentIndex] : data.name}
            </s.ToggleP>
        </s.InnerContainer>
    );
};

export default ItemToggle;
