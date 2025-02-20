import { useState } from "react";
import * as S from '../../../../styles/posts/posts/Tabs/friends-tab';
import { FriendCard, FriendApplyCard } from "./friend-card";
import useFetch from "../../../../hooks/useFetch";

const FriendsTab = () => {
    const{ data: friendsData, loading, error } = useFetch(`/friends/list`);
    const{ data: applyFriendData, loading: applyFriendLoading } = useFetch(`/friends/list/received`);

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
                    {friendsData?.data?.length > 0 ? (
                        <>
                        {friendsData?.data?.map((item) => (
                            <FriendCard
                                key={item.requestId}
                                id={item.requestId}
                                profileImg={item.friendImage?.file_name}
                                name={item.friendNickname}
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
                    {applyFriendData?.data?.length > 0 ? (
                        <>
                        {applyFriendData?.data.map((item) => (
                            <FriendApplyCard
                                key={item.requestId}
                                id={item.requestId}
                                profileImg={item.fromUserImage?.file_name}
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