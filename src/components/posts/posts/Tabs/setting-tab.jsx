import * as S from '../../../../styles/posts/posts/Tabs/setting-tab';

const SettingTab = ({ setActiveTab }) => {

    const handleButtonClick = () => {
        setActiveTab(null);
    };

    return(
        <S.Container>
            <div className="close" onClick={handleButtonClick}>
                닫기
            </div>
            <S.Button type="button">배경화면 수정</S.Button>
            <S.Button type="button">코멘트 변경</S.Button>
        </S.Container>
    );
}

export default SettingTab;