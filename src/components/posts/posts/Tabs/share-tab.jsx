import * as S from '../../../../styles/posts/posts/Tabs/share-tab';
import { ShareCard } from './friend-card';

//예시 공유 리스트트
const shareCardData = [
    { id: 1, name: '두구두굳굳' },
    { id: 2, name: '여행질주' },
    { id: 3, name: '조이' },
    { id: 4, name: '오렌지' },
    { id: 5, name: '여행복한 사람' },
    { id: 6, name: '히힣ㅎ히힣 일주' },
    { id: 7, name: 'Hello.K ' },
    { id: 8, name: '오렌지' },
    { id: 9, name: 'Hello.K ' },
    { id: 10, name: '여행질주' },
];


export const ShareTab = () => {
    return(
        <S.Container>
            <S.Title>공유하기</S.Title>
            <S.TabContnet>
                {shareCardData.map((item) => (
                    <ShareCard
                        key={item.id}
                        profileImg={null}
                        name={item.name}
                    />
                ))}
            </S.TabContnet>
        </S.Container>
    );
}

export const SharedTab = () => {
    return(
        <S.Container2>
            <S.Title>공유됨</S.Title>
            <div>
                Hello.K님이 두루두루행성을 공유하였습니다.
            </div>
        </S.Container2>
    );
}