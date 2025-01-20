import * as S from '../../../styles/friend-card';
import default_profile_img from '../../../assets/images/ProfileImage.png';
import closeX from '../../../assets/images/travel-post/friend-card/x.png';

//친구 목록 리스트 컴포넌트
export const FriendCard = ({profileImg, name}) => {
    
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
export const FriendApplyCard = ({profileImg, name}) => {

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
            <S.AccpetBtn type='button'>요청 수락</S.AccpetBtn>
        </S.Container2>
    );
}