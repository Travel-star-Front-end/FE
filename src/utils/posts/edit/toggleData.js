import { images } from "./loadImages";

const ToggleData = [
    { 
        "id": 1, 
        "name": "친구만", 
        "name2": "전체 공개",
        "endpoint": "/posts",
        "method": "put",
        "image": images["secret"],
        "image2": images["all"],
    },
    { 
       "id": 2, 
        "name": "보관하기",
        "name2": "보관됨",
        "endpoint": "/posts",
        "method": "put",
        "image": images["save"],
        "image": images["save"],
    },
    { 
        "id": 3, 
        "name": "삭제하기", 
        "endpoint": "/posts",
        "method": "delete",
        "image": images["trash"],
    },
]

export default ToggleData;