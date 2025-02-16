import axios from 'axios';
import { useState } from 'react';
import * as S from '../../../../styles/posts/posts/Tabs/friend-card';
import default_profile_img from '../../../../assets/images/ProfileImage.png';
import closeX from '../../../../assets/images/travel-post/friend-card/x.png';
import {SharedTab} from './share-tab';

//친구 목록 리스트 컴포넌트
export const FriendCard = ({id, profileImg, name}) => {
    
    return (
        <S.Container>
            <S.ProfileWrapper>
                {profileImg ? (
                    <img src={profileImg} alt='profile-img' className='profile-img'/> 
                ) : (
                    <img src={default_profile_img} alt='profile-img' className='profile-img'/> 
                )} 
            </S.ProfileWrapper>
            <S.Name>{name}</S.Name>
        </S.Container>
    );
}

//친구 신청 리스트 컴포넌트
export const FriendApplyCard = ({id, profileImg, name}) => {
    const [accepted, setAccepted] = useState(false);

    const handleAcceptRequest = async() => {
        try {
            const response = await axios.patch(`friends/request/${id}`, { requestId: id });

            if (response.data.resultType === "success") {
                alert("친구 요청이 수락되었습니다!");
                setAccepted(true);
            } else {
                alert("친구 요청 수락에 실패했습니다.");
            }
        } catch (error) {
            console.error("친구 요청 수락 오류:", error);
            alert("오류가 발생했습니다.");
        }
    };

    return (
        <S.Container2>
            <S.FriendContnet>
                <S.CloseBtnWrapper>
                    <img src={closeX} alt='x' className='close-btn'/>
                </S.CloseBtnWrapper>
                <S.ProfileWrapper>
                    {profileImg ? (
                        <img src={profileImg} alt='profile-img' className='profile-img'/> 
                    ) : (
                        <img src={default_profile_img} alt='profile-img' className='profile-img'/> 
                    )} 
                </S.ProfileWrapper>
                <S.Name>{name}</S.Name>                
            </S.FriendContnet>
            {accepted ? (
                <S.AcceptedText>수락됨</S.AcceptedText>
            ) : (
                <S.AccpetBtn type='button' onClick={handleAcceptRequest}>요청 수락</S.AccpetBtn>
            )}
        </S.Container2>
    );
}

//공유 리스트 컴포넌트
export const ShareCard = ({id, profileImg, name}) => {
    const [isShared, setIsShared] = useState(false); // 공유 상태 관리
    const [activeTab, setActiveTab] = useState(null);

    const handleButtonClick = () => {
        setIsShared(true); // 버튼 클릭 시 상태 변경
        // setActiveTab((prevTab) => (prevTab === tab ? null : tab));
    };

    return(
        <S.Container2>
            <S.FriendContnet>
                <S.ProfileWrapper>
                    {profileImg ? (
                        <img src={profileImg} alt='profile-img' className='profile-img'/> 
                    ) : (
                        <img src={default_profile_img} alt='profile-img' className='profile-img'/> 
                    )} 
                </S.ProfileWrapper>
                <S.Name>{name}</S.Name>                
            </S.FriendContnet>
            {isShared ? (
                <S.ShareBtn type='button' shared={isShared ? "true" : undefined}>공유됨</S.ShareBtn>
            ) : (
                <S.ShareBtn type='button' onClick={handleButtonClick}>공유하기</S.ShareBtn>
            )}
            {/* {activeTab === 'share' && <SharedTab />} */}
        </S.Container2>
    );
}