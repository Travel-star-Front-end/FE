import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../apis/axios";
import * as s from "../../../styles/posts/write/write";
import colors from "../../../styles/common/colors";
import WriteInput from "../write/input/writeInput";
import WriteTextarea from "../write/textarea/writeTextarea";
import WriteButton from "../write/button/writeButton";
import Toggle from "./toggle/toggle";
import ImageButton from "../write/button/imageButton";
import ListImage from "../write/list-image";
import ListLocation from "../write/list-location";
import ListMusic from "../write/list-music";
import useLocation from "../../../hooks/useLocation";
import useMusic from "../../../hooks/useMusic";
import Menu from "../../../assets/images/posts/write/menu.png";
import Location from "../../../assets/images/posts/write/location.png";
import Music from "../../../assets/images/posts/write/music.png";
import Modal from "../write/modal/modal";
import IframePlayer from "../write/iframePlayer";
import AIModal from "../write/modal/aiModal";

const EditForm = ({ data }) => {
    const [menu, setMenu] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
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
    const [analyzedFeeling, setAnalyzedFeeling] = useState("");
    const [iframeUrl, setIframeUrl] = useState("");
    const [subscribeModal, setSubscribeModal] = useState(false);
    const [aiModal, setAiModal] = useState(false);
    const navigate = useNavigate();

    // ai 모달
    const openAIModal = async () => {
        if (!feeling.trim()) {
            alert("감정을 작성해주세요.");
            return;
        }
    
        setAiModal(true);
    
        try {
            const response = await API.post("/analyze", { text: feeling });
            console.log("분석 결과:", response.data);
    
            setAnalyzedFeeling(response.data.feeling);
        } catch (error) {
            console.error("감정 분석 실패:", error);
            alert("감정 분석에 실패했습니다.");
        }
    };
    
    const closeAIModal = () => {
        setAiModal(false);
    };
    
    const handleFeelingSelect = (selectedFeeling) => {
        setAnalyzedFeeling(selectedFeeling);
        closeAIModal();
    };

    useEffect(() => {
        if (data) {
            setTitle(data.post.title);
            setContent(data.post.content);
            setFeeling(data.body);
        }
    }, [data]);

    const handleMenuClick = () => {
        setMenu(prevState => !prevState); 
    }

    // 이미지 선택
    const addImage = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImages(prevImages => [
                ...prevImages,
                { name: file.name, preview: reader.result }
            ]);
        };
        reader.readAsDataURL(file); 
    };

    // 이미지 삭제
    const handleDeleteImage = (index) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

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

    // 음악 검색
    const handleMusicChange = (e) => {
        setMusicQuery(e.target.value);
        setSelectedMusic("");
    };

    const handleMusicSelect = (track) => {
        setSelectedMusic(`${track.name} - ${track.artists[0].name}`);
        setMusicQuery("");
    
        if (track.id) {
            const trackUrl = `https://open.spotify.com/embed/track/${track.id}`;
            setIframeUrl(trackUrl);
        } else {
            setIframeUrl("");
            alert("선택한 트랙에는 재생할 수 있는 URL이 없습니다.");
        }
    };
    
    const handleSubmit = async () => {
        const postData = {
            title,
            photos: selectedImages.map(img => img.name), 
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
            console.log("Response:", response);
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

            <WriteTextarea placeholder="글 작성" value={content} onChange={(e) => setContent(e.target.value)} />

            <s.ImageContainer>
                <ListImage images={selectedImages} onDelete={handleDeleteImage} />
                <ImageButton onImageSelect={addImage} />
            </s.ImageContainer>
            
            <WriteTextarea width="100%" height="4.8vw" padding="0.95vw 20vw 0.95vw 0.85vw" placeholder="이번 여행을 통해 느낀 감정" value={feeling} onChange={(e) => setFeeling(e.target.value)} onAIClick={openAIModal} analyzedFeeling={analyzedFeeling}/>
            
            {aiModal && (
                <AIModal onClose={closeAIModal} analyzedFeeling={analyzedFeeling} onFeelingSelect={handleFeelingSelect} />
            )}

            <s.SearchContainer>
                <WriteInput width="100%" placeholder="위치 설정" padding="0 0.8vw 0 4.1vw" icon={Location} value={selectedLocation || locationQuery} onChange={handleLocationChangeHandler} />
                <ListLocation locationResults={locationResults} handleLocationSelect={handleLocationSelect} locationQuery={locationQuery} />
            </s.SearchContainer>

            <s.SearchContainer>
                <WriteInput width="100%" placeholder="음악 설정 - 부가 서비스" padding="0 0.8vw 0 4.1vw" icon={Music} value={selectedMusic || musicQuery} onChange={handleMusicChange} onClick={() => setSubscribeModal(true)}/>
                <ListMusic musicResults={musicResults} musicQuery={musicQuery} handleMusicSelect={handleMusicSelect} />
            </s.SearchContainer>

            {subscribeModal && <Modal onClose={() => setSubscribeModal(false)} />}

            <IframePlayer iframeUrl={iframeUrl} />

            <s.ButtonContainer>
                <WriteButton btncolor={colors.main} onClick={handleSubmit} disabled={!isFormValid}>일지 저장</WriteButton>
            </s.ButtonContainer>
        </s.FormContainer>
    );
};

export default EditForm;
