import * as S from '../../styles/posts';
import setting from '../../assets/images/setting.png';
import friends from '../../assets/images/friends.png';
import share from '../../assets/images/share.png';
import add from '../../assets/images/add.png';
import TravelPost from '../../components/travelPost/travel-post';

//example img
import banner from '../../assets/images/ex-banner.png';
import profile from '../../assets/images/logo.png';

const Posts = () => {
    return (
        <S.Container>
            <S.BannerContainer>
                <img src={banner} alt='banner-img' className='banner-img'/>
                <S.BannerInfo>
                    <S.BannerHeader>
                        <div className='title'>벨라의 세계일주</div>
                        <S.InfoContainer>
                            <S.ProfileImg>
                                <img src={profile} alt='profile' className='profile-img'/>
                            </S.ProfileImg>
                            <div>
                                <div className='nickname'>벨라</div>
                                <div className='planet-name'>깐따삐야 행성</div>
                            </div>
                        </S.InfoContainer>
                    </S.BannerHeader>

                    <S.ToolbarContainer>
                        <img src={setting} alt='setting' className='toolbar-icon'/>
                        <img src={friends} alt='friends' className='toolbar-icon'/>
                        <img src={share} alt='share' className='toolbar-icon'/>
                        <img src={add} alt='add'className='toolbar-icon'/>
                    </S.ToolbarContainer>
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