import { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import WriteInput from "./input/writeInput";
import WriteTextarea from "./textarea/writeTextarea";
import AIButton from "./button/AIButton";
import WriteButton from "./button/writeButton";
import Menu from "../../../assets/images/posts/write/menu.png";
import Location from "../../../assets/images/posts/write/location.png";
import Music from "../../../assets/images/posts/write/music.png";
import Toggle from "./toggle/toggle";
import IconData from "../../../utils/posts/iconData";
import useLocation from "../../../hooks/useLocation";
import useMusic from "../../../hooks/useMusic";
import ListMusic from "./list-music";

const FormContainer = styled.div`
    width: 100%;
    padding: 0.55vw 0 2.25vw 0;
    display: flex;
    flex-direction: column;
    gap: 1.15vw;
`

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

const MenuImg = styled.img`
    width: 1.75vw;
    height: 1.6vw;
    cursor: pointer;
`

const MusicContainer = styled.div`
    width: 100%;
    position: relative;
`

const AIContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 0.9vw;
    margin-bottom: 0.65vw;
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1.45vw;
`


const WriteForm = () => {
    const [menu, setMenu] = useState(false);
    const [musicQuery, setMusicQuery] = useState("");
    const [selectedMusic, setSelectedMusic] = useState("");
    const { location, latLng, error: locationError } = useLocation();
    const { musicResults, loading, error: musicError } = useMusic(musicQuery);

    const handleMenuClick = () => {
        setMenu(prevState => !prevState); 
    }

    const handleMusicChange = (e) => {
        setMusicQuery(e.target.value);
        // console.log("검색어 변경:", e.target.value);
        setSelectedMusic("");
    };

    const handleMusicSelect = (track) => {
        setSelectedMusic(`${track.name} - ${track.artists[0].name}`);
        setMusicQuery("");
    };

    useEffect(() => {
        // console.log("음악 검색 결과:", musicResults);
    }, [musicResults]);

    /*
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = {
            locationAddress: location,
            locationCoordinates: latLng,
        };

        console.log("폼 제출 데이터:", formData);
    }
    */

    return (
        <FormContainer>
            <TitleContainer>
                <WriteInput width="95%" placeholder="제목" />
                <MenuImg src={Menu} alt="menu" onClick={handleMenuClick} />
                
                {menu && <Toggle />}
            </TitleContainer>

            <WriteInput width="18%" placeholder="위치 설정" padding="0 0.8vw 0 4.1vw" icon={Location} value={location || locationError || "Loading..."} onChange={() => {}} readOnly />

            <MusicContainer>
                <WriteInput width="36%" placeholder="음악 설정 - 부가 서비스" padding="0 0.8vw 0 4.1vw" icon={Music} value={selectedMusic || musicQuery} onChange={handleMusicChange} />
                <ListMusic musicResults={musicResults} musicQuery={musicQuery} handleMusicSelect={handleMusicSelect} />
            </MusicContainer>

            <WriteTextarea placeholder="글 작성" IconData={IconData} />

            <AIContainer>
                <WriteTextarea width="48%" height="8.65vw" placeholder="이번 여행을 통해 느낀 감정" />
                <AIButton>분석하기</AIButton>
            </AIContainer>

            <ButtonContainer>
                <WriteButton btncolor={colors.main}>일지 저장</WriteButton>
            </ButtonContainer>
        </FormContainer>
    )
}

export default WriteForm;