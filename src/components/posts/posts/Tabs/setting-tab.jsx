import { useState } from 'react';
import * as S from '../../../../styles/posts/posts/Tabs/setting-tab';
import closeX from '../../../../assets/images/travel-post/friend-card/x.png';
import usePost from '../../../../hooks/usePost';

const SettingTab = ({ setActiveTab, setBanner, setComment }) => {
    const [activeTab, setActiveTabState] = useState(null);
    const [editComment, setEditComment] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    //코멘트 수정
    const {data, loading, error, triggerPost} = usePost('/posts/comment', {

    });

    const handleClick = (tab) => {
        if (activeTab === tab) {
            setActiveTabState(null);  // 같은 버튼을 다시 클릭하면 초기화
        } else {
            setActiveTabState(tab);  // 다른 버튼 클릭 시 해당 버튼으로 활성화
        }
    };

    //모든 설정 창 닫기
    const handleButtonClick = () => {
        setActiveTabState(null);
        setActiveTab(null);  // 상위 컴포넌트로도 상태를 리셋
    };

    const handleCommentBtnClick = () => {
        setActiveTabState(null);
    }

    // 앨범에서 이미지 선택
    const handleImageSelect = (event) => {
        const file = event.target.files[0]; // 사용자가 선택한 첫 번째 파일
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBanner(reader.result);
            };
            reader.readAsDataURL(file)
        }
    };

    //기본 배경화면 설정
    const handleDefaultBanner = () => {
        setBanner(null);
    }

    //댓글 등록
    const handleCommentSubmit = async() => {
        if (!editComment.trim()) return;

        const response = await triggerPost({editComment});
        
        if(response) {
            setComment(editComment)
            console.log('댓글 등록 성공', response);
        } else {
            console.log('댓글 등록 실패');
        }

        setEditComment('');
        setActiveTabState(null);
    }

    return(
        <>
            <S.Container>
                <div className="close" onClick={handleButtonClick}>
                    닫기
                </div>
                {activeTab === 'background-image-edit' || activeTab === 'comment-edit' ? (
                    <>
                        <S.Button type="button">적용하기</S.Button>
                        <S.Button type="button" onClick={handleButtonClick}>취소</S.Button>
                    </>
                ) : (
                    <>
                        <S.Button type="button" onClick={() => handleClick('background-image-edit')}>
                            배경화면 수정
                        </S.Button>
                        <S.Button type="button" onClick={() => handleClick('comment-edit')}>
                            코멘트 변경
                        </S.Button>
                    </>
                )}
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
                    <S.EditBtn type="button" onClick={handleDefaultBanner}>기본 커버 이미지</S.EditBtn>
                </S.EditBtnContainer>
            }
            {activeTab === 'comment-edit' &&
                <S.CommentContainer>
                    <S.CloseBtn src={closeX} alt='x' onClick={handleCommentBtnClick}/>
                    <S.CommentEditInput 
                        type='text' 
                        placeholder='코멘트를 입력하세요.'
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}/>
                    <S.CommentEditBtn 
                        type='button'
                        onClick={handleCommentSubmit}
                    >
                        변경하기
                    </S.CommentEditBtn>
                </S.CommentContainer>
            }
        </>

    );
}

export default SettingTab;