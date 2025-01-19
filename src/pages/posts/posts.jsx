import { useState } from 'react';
import * as S from '../../styles/posts';
import setting from '../../assets/images/posts/posts/setting.png';
import friends from '../../assets/images/posts/posts/friends.png';
import share from '../../assets/images/posts/posts/share.png';
import add from '../../assets/images/posts/posts/add.png';
import alert from '../../assets/images/posts/posts/alert.png';
import TravelPost from '../../components/travelPost/travel-post';

//example img
import banner from '../../assets/images/ex-banner.png';
import profile from '../../assets/images/auth/login/logo.png';

const Posts = () => {
    const [activeTab, setActiveTab] = useState(null);

    const handleClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <S.Container>
            <S.BannerContainer>
                <img src={banner} alt='banner-img' className='banner-img'/>
                <S.BannerInfo>
                    <div className='title'>벨라의 세계일주</div>
                    <S.BannerHeader>
                        <S.InfoContainer>
                            <S.ProfileImg>
                                <img src={profile} alt='profile' className='profile-img'/>
                            </S.ProfileImg>
                            <div>
                                <div className='nickname'>벨라</div>
                                <div className='planet-name'>깐따삐야 행성</div>
                            </div>
                        </S.InfoContainer>

                        <S.ToolbarContainer>
                            <S.Toolbar>
                                <img src={setting} alt='setting' className='toolbar-icon'/>
                                <img src={friends} alt='friends' className='toolbar-icon'/>
                                <img src={share} alt='share' className='toolbar-icon'/>
                                <img src={alert} alt='alert' className='toolbar-icon'/>                                
                            </S.Toolbar>
                            <S.AddToolbar>
                                <img src={add} alt='add'className='toolbar-icon2'/>
                            </S.AddToolbar>

                            {activeTab === 'friends' && 
                            <S.FriendApply>
                                <div>친구 목록</div>
                                <div>친구 신청</div>
                            </S.FriendApply>}
                        </S.ToolbarContainer>
                    </S.BannerHeader>
                </S.BannerInfo>
            </S.BannerContainer>

            <S.DiaryContainer>
                <S.Text>전체 일지</S.Text>
                <S.Hr/>
                <S.PostWrapper>
                    <TravelPost
                        nickname="벨라" 
                        date="2024.09.15 14:58" 
                        location="베트남, 다낭" 
                        quickReview="바보 원숭이 !! 다낭여행 (2)"
                        buttonType="edit"  />
                </S.PostWrapper>
            </S.DiaryContainer>
        </S.Container>
    )
}

export default Posts;