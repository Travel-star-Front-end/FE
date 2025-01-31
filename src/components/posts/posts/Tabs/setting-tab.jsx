import { useState } from 'react';
import * as S from '../../../../styles/posts/posts/Tabs/setting-tab';

const SettingTab = ({ setActiveTab }) => {
    const [activeTab, setActiveTabState] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleClick = (tab) => {
        if (activeTab === tab) {
            setActiveTabState(null);  // 같은 버튼을 다시 클릭하면 초기화
        } else {
            setActiveTabState(tab);  // 다른 버튼 클릭 시 해당 버튼으로 활성화
        }
    };

    const handleButtonClick = () => {
        setActiveTabState(null);
        setActiveTab(null);  // 상위 컴포넌트로도 상태를 리셋
    };

    // 앨범에서 이미지 선택
    const handleImageSelect = (event) => {
        const file = event.target.files[0]; // 사용자가 선택한 첫 번째 파일
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // 이미지 파일을 URL로 변환하여 상태에 저장
        }
    };

    return(
        <>
            <S.Container>
                <div className="close" onClick={handleButtonClick}>
                    닫기
                </div>
                <S.Button type="button" onClick={() => handleClick('background-image-edit')}>배경화면 수정</S.Button>
                <S.Button type="button">코멘트 변경</S.Button>
            </S.Container>       
            {activeTab === 'background-image-edit' && 
                <S.EditBtnContainer>
                    <S.EditBtn type="button">
                        <input
                            type="file"
                            accept="image/*"  // 이미지 파일만 선택 가능
                            style={{ display: 'none' }}  // <input>을 보이지 않게 설정
                            onChange={handleImageSelect}
                            id="image-upload"
                        />
                        <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                            촬영 또는 앨범에서 선택
                        </label>
                    </S.EditBtn>
                    <S.EditBtn type="button">기본 커버 이미지</S.EditBtn>
                </S.EditBtnContainer>
            } 
        </>

    );
}

export default SettingTab;