import { images } from "./loadImages";

const SideBarData = [
    { 
        "id": 1, 
        "name": "일지 작성", 
        "link": "/posts",
        "logo": images["posts"],
        "logoClick": images["postsClick"],
    },
    { 
        "id": 2, 
        "name": "행성 보기", 
        "link": "/planet",
        "logo": images["planet"],
        "logoClick": images["planetClick"],
    },
    { 
        "id": 3, 
        "name": "별자리 랭킹", 
        "link": "/ranking",
        "logo": images["ranking"],
        "logoClick": images["rankingClick"],
    },
    { 
        "id": 4, 
        "name": "캘린더", 
        "link": "/calender",
        "logo": images["calender"],
        "logoClick": images["calenderClick"],
    },
    { 
        "id": 5, 
        "name": "마이 페이지", 
        "link": "/mypage",
        "logo": images["mypage"],
        "logoClick": images["mypageClick"],
    },
]

export default SideBarData;