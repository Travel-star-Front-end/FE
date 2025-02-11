import { useState } from "react";
import * as S from '../../../../styles/posts/posts/Tabs/friends-tab';
import { FriendCard, FriendApplyCard } from "./friend-card";
import useFetch from "../../../../hooks/useFetch";

//예시 데이터터
const exampleData = [
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

const FriendsTab = ({ friends, requests }) => {
    //친구 목록
    const{data: friendsData, loading, error} = useFetch(`/friends/list`);
    const{data: applyFriendData, loading: applyFriendLoading, error:applyFriendError } = useFetch(`/friends/list/received`);

    const [activeTab, setActiveTab] = useState("friends");

    return (
        <S.Container>
            <S.TabHeader>
                <button
                    className={activeTab === "friends" ? "active" : "inactive"}
                    onClick={() => setActiveTab("friends")}
                >
                    친구 목록
                </button>
                <button
                    className={activeTab === "requests" ? "active" : "inactive"}
                    onClick={() => setActiveTab("requests")}
                >
                    친구 신청
                </button>                    
            </S.TabHeader>
            <S.TabContent>
                {activeTab === "friends" && (
                <S.CardListContainer>
                    {friendsData?.friends?.length > 0 ? (
                        <>
                        {friendsData?.map((item) => (
                            <FriendCard
                                key={item.friend_id}
                                id={item.friend_id}
                                profileImg={item.profile_image}
                                name={item.friend_name}
                            />
                        ))}
                        </>
                    ) : (
                        <S.NoFreinds>친구 목록이 없습니다.</S.NoFreinds>
                    )}
                </S.CardListContainer>
                )}
                
                {activeTab === "requests" && (
                <S.CardListContainer>
                    {friendsData?.data?.length > 0 ? (
                        <>
                        {friendsData?.data.map((item) => (
                            <FriendApplyCard
                                key={item.requestId}
                                id={item.requestId}
                                profileImg={item.fromUserImage}
                                name={item.fromUserNickname}
                            />
                        ))}
                        </>
                    ) : (
                        <S.NoFreinds>친구 신청 목록이 없습니다.</S.NoFreinds>
                    )}
                </S.CardListContainer>
                )}
            </S.TabContent>
        </S.Container>
    );
}

export default FriendsTab;