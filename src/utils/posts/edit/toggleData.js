import { images } from "./loadImages";

const ToggleData = [
    { 
        "id": 1, 
        "name": "전체 공개",
        "name2": "친구만",
        "name3": "보관하기", 
        "image": images["all"],
        "image2": images["secret"],
        "image3": images["save"],
    },
    { 
        "id": 2, 
        "name": "삭제하기", 
        "image": images["trash"],
    },
]

export default ToggleData;