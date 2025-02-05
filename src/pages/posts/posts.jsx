import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/posts/posts/posts';
import default_profile_img from '../../assets/images/ProfileImage.png';
import setting from '../../assets/images/posts/posts/setting.png';
import friends from '../../assets/images/posts/posts/friends.png';
import share from '../../assets/images/posts/posts/share.png';
import add from '../../assets/images/posts/posts/add.png';
import alert from '../../assets/images/posts/posts/alert.png';
import TravelPost from '../../components/posts/posts/travelPost/travel-post';
import FriendsTab from '../../components/posts/posts/Tabs/friends-tab';
import { ShareTab } from '../../components/posts/posts/Tabs/share-tab';
import SettingTab from '../../components/posts/posts/Tabs/setting-tab';
import useFetch from '../../hooks/useFetch';

//example img
import banner from '../../assets/images/ex-banner.png';
import profile from '../../assets/images/auth/login/logo.png';

const Posts = () => {
    //유저 전체 일지 조회(최신순 10개)
    const userId = localStorage.getItem('userId');
    const { data: posts, loading, error } = useFetch(`/users/${userId}/posts`);
    if (error && status === 404) return <div>게시물이 없습니다.</div>;

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
                                <img src={setting} alt='setting' className='toolbar-icon' onClick={() => handleClick('setting')}/>
                                <img src={friends} alt='friends' className='toolbar-icon' onClick={() => handleClick('friends')} />
                                <img src={share} alt='share' className='toolbar-icon' onClick={() => handleClick('share')}/>
                                <img src={alert} alt='alert' className='toolbar-icon'/>                                
                            </S.Toolbar>
                            <S.AddToolbar>
                                <img src={add} alt='add'className='toolbar-icon2' onClick={() => navigate('/posts/write')}/>
                            </S.AddToolbar>

                            {activeTab === 'friends' && <FriendsTab/>}
                            {activeTab === 'share' && <ShareTab/>}
                            {activeTab === 'setting' && <SettingTab setActiveTab={setActiveTab} />}
                        </S.ToolbarContainer>
                    </S.BannerHeader>
                </S.BannerInfo>
            </S.BannerContainer>

            <S.DiaryContainer>
                <S.Text>전체 일지</S.Text>
                <S.PostWrapper>
                    {posts?.data ? (
                        <>
                        {posts?.data.map((post) => (
                            <TravelPost 
                                key={post.id}
                                id={post.id}
                                date={post.createdAt}
                                location={post.region}
                                quickReview={post.title}
                            />
                        ))}                        
                        </>
                    ) : (
                        <S.NothingText>작성된 일지가 없습니다.</S.NothingText>
                    )}

                </S.PostWrapper>
            </S.DiaryContainer>
        </S.Container>
    )
}

export default Posts;