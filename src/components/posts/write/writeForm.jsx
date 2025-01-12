import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../apis/axios";
import * as s from "../../../styles/posts/write/write";
import colors from "../../../styles/common/colors";
import WriteInput from "./input/writeInput";
import WriteTextarea from "./textarea/writeTextarea";
import AIButton from "./button/AIButton";
import WriteButton from "./button/writeButton";
import Toggle from "./toggle/toggle";
import IconData from "../../../utils/posts/iconData";
import ListLocation from "./list-location";
import ListMusic from "./list-music";
import useLocation from "../../../hooks/useLocation";
import useMusic from "../../../hooks/useMusic";
import Menu from "../../../assets/images/posts/write/menu.png";
import Location from "../../../assets/images/posts/write/location.png";
import Music from "../../../assets/images/posts/write/music.png";

const WriteForm = () => {
    const [menu, setMenu] = useState(false);
    const { locationQuery, locationResults, loading: locationLoading, error: locationError, handleLocationChange, setLocationQuery } = useLocation();
    const [selectedLocation, setSelectedLocation] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [musicQuery, setMusicQuery] = useState("");
    const [selectedMusic, setSelectedMusic] = useState("");
    const { musicResults, loading, error: musicError } = useMusic(musicQuery);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [feeling, setFeeling] = useState("");
    const navigate = useNavigate();

    const handleMenuClick = () => {
        setMenu(prevState => !prevState); 
    }

    // 위치 검색
    const handleLocationSelect = (location) => {
        setSelectedLocation(location.formatted_address);
        setLocationQuery(location.formatted_address);
        setLatitude(location.geometry.location.lat);
        setLongitude(location.geometry.location.lng);

        setLocationQuery("");
    };

    const handleLocationChangeHandler = (e) => {
        if (selectedLocation) {
            setSelectedLocation("");
            setLatitude(null);
            setLongitude(null);
        }
        handleLocationChange(e);
    };

    /*
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            console.log("선택된 위치 위도:", latitude);
            console.log("선택된 위치 경도:", longitude);
        }
    }, [latitude, longitude]);
    */

    // 음악 검색
    const handleMusicChange = (e) => {
        setMusicQuery(e.target.value);
        // console.log("검색어 변경:", e.target.value);
        setSelectedMusic("");
    };

    const handleMusicSelect = (track) => {
        setSelectedMusic(`${track.name} - ${track.artists[0].name}`);
        setMusicQuery("");
    };

    /*
    useEffect(() => {
        // console.log("음악 검색 결과:", musicResults);
    }, [musicResults]);
    */

    const handleSubmit = async () => {
        const postData = {
            title,
            location: {
                latitude,
                longitude,
                address: selectedLocation || "" 
            },
            music: selectedMusic || null,
            content,
            feeling
        };

        try {
            const response = await API.post("/users", postData);
            // console.log("게시글 작성 성공.", response.data);
            alert("일지가 저장되었습니다.");
            navigate("/posts");
        } catch (error) {
            console.error("게시글 작성 실패:", error);
        }
    };

    const isFormValid = title.trim() && selectedLocation.trim() && content.trim() && feeling.trim();

    return (
        <s.FormContainer>
            <s.TitleContainer>
                <WriteInput width="95%" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
                <s.MenuImg src={Menu} alt="menu" onClick={handleMenuClick} />
                
                {menu && <Toggle />}
            </s.TitleContainer>

            <s.SearchContainer>
                <WriteInput width="100%" placeholder="위치 설정" padding="0 0.8vw 0 4.1vw" icon={Location} value={selectedLocation || locationQuery} onChange={handleLocationChangeHandler} />
                <ListLocation locationResults={locationResults} handleLocationSelect={handleLocationSelect} locationQuery={locationQuery} />
            </s.SearchContainer>

            <s.SearchContainer>
                <WriteInput width="100%" placeholder="음악 설정 - 부가 서비스" padding="0 0.8vw 0 4.1vw" icon={Music} value={selectedMusic || musicQuery} onChange={handleMusicChange} />
                <ListMusic musicResults={musicResults} musicQuery={musicQuery} handleMusicSelect={handleMusicSelect} />
            </s.SearchContainer>

            <WriteTextarea placeholder="글 작성" IconData={IconData} value={content} onChange={(e) => setContent(e.target.value)} />

            <s.AIContainer>
                <WriteTextarea width="48%" height="8.65vw" placeholder="이번 여행을 통해 느낀 감정" value={feeling} onChange={(e) => setFeeling(e.target.value)} />
                <AIButton>분석하기</AIButton>
            </s.AIContainer>

            <s.ButtonContainer>
                <WriteButton btncolor={colors.main} onClick={handleSubmit} disabled={!isFormValid}>일지 저장</WriteButton>
            </s.ButtonContainer>
        </s.FormContainer>
    )
}

export default WriteForm;