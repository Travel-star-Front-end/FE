import { images } from "./loadImages";

// 다시 수정 해..
const SideBarData = [
    { 
        "id": 1, 
        "name": "일지 작성", 
        "link": "/posts",
        "logo": images["posts"],
        "logoClick": images["postsClick"],

        "width": "2.8rem",
        "height": "2.9rem",
        "padding": "3.2rem",
        "gap": "2rem",
    },
    { 
        "id": 2, 
        "name": "행성 보기", 
        "link": "/planet",
        "logo": images["planet"],
        "logoClick": images["planetClick"],

        "width": "3.2rem",
        "height": "2.7rem",
        "padding": "3.1rem",
        "gap": "2.2rem",
    },
    { 
        "id": 3, 
        "name": "별자리 랭킹", 
        "link": "/ranking",
        "logo": images["ranking"],
        "logoClick": images["ranking"],

        "width": "2.2rem",
        "height": "3rem",
        "padding": "3.6rem",
        "gap": "2.2rem",
    },
    { 
        "id": 4, 
        "name": "캘린더", 
        "link": "/calender",
        "logo": images["calender"],
        "logoClick": images["calenderClick"],

        "width": "3rem",
        "height": "3rem",
        "padding": "3.2rem",
        "gap": "1.8rem",
    },
    { 
        "id": 5, 
        "name": "마이 페이지", 
        "link": "/mypage",
        "logo": images["mypage"],
        "logoClick": images["mypageClick"],

        "width": "2.7rem",
        "height": "2.7rem",
        "padding": "3.4rem",
        "gap": "1.9rem",
    },
]

export default SideBarData;