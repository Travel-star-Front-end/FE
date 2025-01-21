import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/posts';
import setting from '../../assets/images/posts/posts/setting.png';
import friends from '../../assets/images/posts/posts/friends.png';
import share from '../../assets/images/posts/posts/share.png';
import add from '../../assets/images/posts/posts/add.png';
import alert from '../../assets/images/posts/posts/alert.png';
import TravelPost from '../../components/travelPost/travel-post';
import FriendsTab from '../../components/travelPost/FriendsTab/friends-tab';

//example img
import banner from '../../assets/images/ex-banner.png';
import profile from '../../assets/images/auth/login/logo.png';

const Posts = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(null);

    const handleClick = (tab) => {
        setActiveTab((prevTab) => (prevTab === tab ? null : tab));
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
                                <img src={friends} alt='friends' className='toolbar-icon' onClick={() => handleClick('friends')} />
                                <img src={share} alt='share' className='toolbar-icon'/>
                                <img src={alert} alt='alert' className='toolbar-icon'/>                                
                            </S.Toolbar>
                            <S.AddToolbar>
                                <img src={add} alt='add'className='toolbar-icon2' onClick={() => navigate('/posts/write')}/>
                            </S.AddToolbar>

                            {activeTab === 'friends' && <FriendsTab/>}
                        </S.ToolbarContainer>
                    </S.BannerHeader>
                </S.BannerInfo>
            </S.BannerContainer>

            <S.DiaryContainer>
                <S.Text>전체 일지</S.Text>
                <S.PostWrapper>
                    <TravelPost
                        id='1'
                        nickname="벨라" 
                        date="2024.09.15 14:58" 
                        location="베트남, 다낭" 
                        quickReview="바보 원숭이 !! 다낭여행 (2)"
                        buttonType="edit"  />
                    <TravelPost
                        id='2'
                        nickname="벨라2" 
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